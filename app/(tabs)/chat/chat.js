import React, { useState, useRef, useEffect } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  FlatList, 
  Keyboard,
  StyleSheet, 
  ActivityIndicator,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
  Image,
  Alert
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './styles';
import OpenAI from 'openai';
import Constants from 'expo-constants';

// Dapatkan API key dari berbagai sumber yang mungkin
const apiKey =Constants.expoConfig?.extra?.EXPO_PUBLIC_OPENAI_API_KEY ||
              process.env.EXPO_PUBLIC_OPENAI_API_KEY;

// Debug log untuk membantu troubleshooting (akan muncul di console)
console.log("OpenAI API Key tersedia:", apiKey ? "Ya" : "Tidak");

// Inisialisasi OpenAI dengan API key
const openai = new OpenAI({
  apiKey: apiKey
});

const ChatAI = () => {
  const router = useRouter();
  const [messages, setMessages] = useState([
    { id: '1', text: 'Halo! Kawan Sosial. Ada yang bisa saya bantu?', isUser: false }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const flatListRef = useRef(null);

  // Format pesan untuk API OpenAI
  const formatMessagesForOpenAI = (messages) => {
    return messages.map(msg => ({
      role: msg.isUser ? 'user' : 'assistant',
      content: msg.text
    }));
  };

  // Function untuk memanggil API OpenAI
  const sendMessage = async () => {
    if (inputText.trim() === '') return;
    
    // Tambahkan pesan pengguna ke riwayat chat
    const userMessage = {
      id: Date.now().toString(),
      text: inputText,
      isUser: true,
    };
    
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInputText('');
    setIsLoading(true);
    
    try {
      // Verifikasi API key tersedia
      if (!apiKey) {
        throw new Error("API key tidak tersedia. Silakan periksa konfigurasi aplikasi.");
      }
      
      // Format pesan untuk OpenAI
      const formattedMessages = formatMessagesForOpenAI(updatedMessages);
      
      // Panggil API OpenAI
      const response = await openai.chat.completions.create({
        model: "gpt-4o-mini", // Pilih model yang sesuai
        messages: [
          // Berikan konteks kepada AI
          {
            role: "system",
            content: "Anda adalah asisten AI Dinsos Mobile yang membantu pengguna dengan informasi dan layanan Dinas Sosial. Berikan informasi yang akurat dan ramah tentang program bantuan sosial, persyaratan, dan prosedur pelayanan. Jika ditanya tentang hal di luar konteks Dinas Sosial, minta pengguna untuk mengajukan pertanyaan yang relevan dengan layanan Dinas Sosial."
          },
          ...formattedMessages
        ],
        temperature: 0.7,
      });
      
      // Tambahkan respons AI ke riwayat chat
      const botResponse = {
        id: Date.now().toString() + '-bot',
        text: response.choices[0].message.content,
        isUser: false,
      };
      
      setMessages(prevMessages => [...prevMessages, botResponse]);
    } catch (error) {
      console.error('Error:', error);
      // Tambahkan pesan error
      const errorMessage = {
        id: Date.now().toString() + '-error',
        text: 'Maaf, terjadi kesalahan saat menghubungi server. Silakan coba lagi nanti.',
        isUser: false,
        isError: true,
      };
      
      setMessages(prevMessages => [...prevMessages, errorMessage]);
      
      // Tampilkan alert dengan informasi error untuk debugging
      if (__DEV__) {
        Alert.alert('Error', error.message || 'Unknown error occurred');
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Auto scroll ke bawah saat ada pesan baru
  useEffect(() => {
    if (flatListRef.current) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  }, [messages]);

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  // Render message bubbles
  const renderItem = ({ item }) => (
    <View style={[
      styles.messageBubble, 
      item.isUser ? styles.userBubble : styles.botBubble,
      item.isError && styles.errorBubble
    ]}>
      {!item.isUser && (
        <View style={styles.avatarContainer}>
          <Image 
            source={require('../../../assets/images/cakji.png')} 
            style={styles.avatar}
            defaultSource={require('../../../assets/images/cakji.png')}
          />
        </View>
      )}
      <View style={[
        styles.messageContent,
        item.isUser ? styles.userContent : styles.botContent
      ]}>
        <Text style={item.isUser ? styles.userText : styles.botText}>
          {item.text}
        </Text>
      </View>
    </View>
  );

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard} accessible={false}>
    <View style={styles.container}>
      <StatusBar style="light" />
      
      <View style={styles.header}>
        {/* <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity> */}
        <View style={styles.avatarContainer}>
          <Image 
            source={require('../../../assets/images/cakji.png')} 
            style={styles.avatar}
            defaultSource={require('../../../assets/images/cakji.png')}
          />
        </View>

        <Text style={styles.headerText}>Tanya JSC</Text>
      </View>
      
      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        style={styles.messageList}
        contentContainerStyle={styles.messageListContent}
      />
      
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
        style={styles.inputWrapper}
      >
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={inputText}
            onChangeText={setInputText}
            placeholder="Ketik pesan..."
            placeholderTextColor="#999"
            multiline
          />
          {isLoading ? (
            <ActivityIndicator size="small" color="#0084ff" style={styles.sendButton} />
          ) : (
            <TouchableOpacity 
              style={[styles.sendButton, inputText.trim() === '' && styles.sendButtonDisabled]} 
              onPress={sendMessage}
              disabled={inputText.trim() === ''}
            >
              <Ionicons name="send" size={20} color="white" />
            </TouchableOpacity>
          )}
        </View>
      </KeyboardAvoidingView>
    </View>
    </TouchableWithoutFeedback>
  );
};

export default ChatAI;