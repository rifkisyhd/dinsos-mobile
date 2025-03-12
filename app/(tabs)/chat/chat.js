import React, { useState, useRef, useEffect } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  FlatList, 
  StyleSheet, 
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Image
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './styles';

const ChatAI = () => {
  const router = useRouter();
  const [messages, setMessages] = useState([
    { id: '1', text: 'Halo! Saya asisten AI Anda. Ada yang bisa saya bantu?', isUser: false }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const flatListRef = useRef(null);

  // Function backend API call
  const sendMessage = async () => {
    if (inputText.trim() === '') return;
    
    // Add user message to chat history
    const userMessage = {
      id: Date.now().toString(),
      text: inputText,
      isUser: true,
    };
    
    setMessages([...messages, userMessage]);
    setInputText('');
    setIsLoading(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // This is where you'll integrate with your actual backend
      // const response = await yourBackendApiCall(inputText);
      
      // Simulate AI response
      const botResponse = {
        id: Date.now().toString() + '-bot',
        text: `Saya mengerti pertanyaan Anda tentang "${inputText}". Saat ini saya dalam mode demo, tapi nanti akan terintegrasi dengan backend Anda.`,
        isUser: false,
      };
      
      setMessages(prevMessages => [...prevMessages, botResponse]);
    } catch (error) {
      console.error('Error:', error);
      // Add error message
      const errorMessage = {
        id: Date.now().toString() + '-error',
        text: 'Maaf, terjadi kesalahan. Silakan coba lagi.',
        isUser: false,
        isError: true,
      };
      
      setMessages(prevMessages => [...prevMessages, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  // Auto scroll to bottom when new messages arrive
  useEffect(() => {
    if (flatListRef.current) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  }, [messages]);

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
            source={require('../../../assets/images/ChatGPT-Logo.png')} 
            style={styles.avatar}
            defaultSource={require('../../../assets/images/ChatGPT-Logo.png')}
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
    <View style={styles.container}>
      <StatusBar style="light" />
      
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Asisten AI</Text>
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
        keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
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
  );
};

export default ChatAI;