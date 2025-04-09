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
  Alert,
  ScrollView
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './styles';
import OpenAI from 'openai';
import Constants from 'expo-constants';

const apiKey = Constants.expoConfig?.extra?.EXPO_PUBLIC_OPENAI_API_KEY || process.env.EXPO_PUBLIC_OPENAI_API_KEY;

console.log("OpenAI API Key tersedia:", apiKey ? "Ya" : "Tidak");

const openai = new OpenAI({ apiKey });

const ChatAI = () => {
  const router = useRouter();
  const [messages, setMessages] = useState([
    { id: '1', text: 'Halo! Kawan Sosial. Ada yang bisa saya bantu?', isUser: false }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const flatListRef = useRef(null);

  const formatMessagesForOpenAI = (messages) => {
    return messages.map(msg => ({
      role: msg.isUser ? 'user' : 'assistant',
      content: msg.text
    }));
  };

  const sendMessage = async () => {
    if (inputText.trim() === '') return;

    const userMessage = {
      id: Date.now().toString(),
      text: inputText,
      isUser: true,
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInputText('');
    setIsLoading(true);

    flatListRef.current?.scrollToEnd({ animated: true });

    try {
      if (!apiKey) {
        throw new Error("API key tidak tersedia. Silakan periksa konfigurasi aplikasi.");
      }

      const formattedMessages = formatMessagesForOpenAI(updatedMessages);

      const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: "Anda adalah asisten AI Dinsos Mobile yang membantu pengguna dengan informasi dan layanan Dinas Sosial. Berikan informasi yang akurat dan ramah tentang program bantuan sosial, persyaratan, dan prosedur pelayanan. Jika ditanya tentang hal di luar konteks Dinas Sosial, minta pengguna untuk mengajukan pertanyaan yang relevan dengan layanan Dinas Sosial."
          },
          ...formattedMessages
        ],
        temperature: 0.7,
      });

      const botResponse = {
        id: Date.now().toString() + '-bot',
        text: response.choices[0].message.content,
        isUser: false,
      };

      setMessages(prevMessages => {
        const updated = [...prevMessages, botResponse];
        setTimeout(() => flatListRef.current?.scrollToEnd({ animated: true }), 100);
        return updated;
      });
    } catch (error) {
      console.error('Error:', error);
      const errorMessage = {
        id: Date.now().toString() + '-error',
        text: 'Maaf, terjadi kesalahan saat menghubungi server. Silakan coba lagi nanti.',
        isUser: false,
        isError: true,
      };

      setMessages(prevMessages => [...prevMessages, errorMessage]);

      if (__DEV__) {
        Alert.alert('Error', error.message || 'Unknown error occurred');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

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
          onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
          keyboardShouldPersistTaps="handled"
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
              maxHeight={100}
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
