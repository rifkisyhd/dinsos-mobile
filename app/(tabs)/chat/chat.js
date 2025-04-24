import React, { useState, useRef, useEffect } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    FlatList,
    Keyboard,
    ActivityIndicator,
    TouchableWithoutFeedback,
    Image,
    SafeAreaView,
    Platform,
    KeyboardAvoidingView,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./styles"; 
import OpenAI from "openai";
import Constants from "expo-constants";
import { useRouter } from "expo-router";
import LottieView from "lottie-react-native";

import { supabase } from "../../../lib/supabaseClient";

const apiKey =
    Constants.expoConfig?.extra?.EXPO_PUBLIC_OPENAI_API_KEY ||
    process.env.EXPO_PUBLIC_OPENAI_API_KEY;
const openai = new OpenAI({ apiKey });

const fetchFileContent = async () => {
    const { data, error } = await supabase.storage
        .from("chat-jsc")
        .download(`faq.json?t=${Date.now()}`);


    if (error || !data) {
        console.error("Gagal ambil file:", error?.message || "Data kosong");
        return "";
    }

    try {
        const reader = new FileReader();
        return await new Promise((resolve, reject) => {
            reader.onload = () => {
                try {
                    const json = JSON.parse(reader.result);
                    const combinedText = json.map((item) => `question: ${item.question}\nanswer: ${item.answer}`).join("\n\n");
                    resolve(combinedText);
                } catch (parseErr) {
                    console.error("Gagal parsing isi file JSON:", parseErr.message);
                    reject("");
                }
            };

            reader.onerror = () => {
                console.error("Gagal membaca file dengan FileReader");
                reject("");
            };

            reader.readAsText(data);
        });
    } catch (err) {
        console.error("Error saat membaca dan parsing JSON:", err.message);
        return "";
    }
};

const ChatAI = () => {
    const router = useRouter();
    const [messages, setMessages] = useState([
        {
            id: "1",
            text: "Halo! Kawan Showsial. Ada yang bisa Cak J Bantu?",
            isUser: false,
        },
    ]);
    const [inputText, setInputText] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const flatListRef = useRef(null);
    
    // Fungsi untuk memastikan scroll ke bawah
    const scrollToBottom = (delay = 100) => {
        setTimeout(() => {
            if (flatListRef.current) {
                flatListRef.current.scrollToEnd({ animated: true });
            }
        }, delay);
    };

    // Scroll ke bawah ketika ada pesan baru
    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // Keyboard listener untuk iOS
    // useEffect(() => {
    //     if (Platform.OS === 'ios') {
    //         const keyboardDidShowListener = Keyboard.addListener(
    //             'keyboardDidShow', 
    //             () => scrollToBottom(300)
    //         );
            
    //         return () => {
    //             keyboardDidShowListener.remove();
    //         };
    //     }
    // }, []);
    // Add this to your useEffect section specifically for Android
useEffect(() => {
  if (Platform.OS === 'android') {
      const keyboardDidShowListener = Keyboard.addListener(
          'keyboardDidShow', 
          () => {
              scrollToBottom(100);
          }
      );
      
      const keyboardDidHideListener = Keyboard.addListener(
          'keyboardDidHide',
          () => {
              // Force scroll update after keyboard closes on Android
              setTimeout(() => {
                  if (flatListRef.current) {
                      flatListRef.current.scrollToEnd({ animated: false });
                      // Try again after a slightly longer delay to ensure it works
                      setTimeout(() => {
                          flatListRef.current.scrollToEnd({ animated: false });
                      }, 300);
                  }
              }, 100);
          }
      );
      
      return () => {
          keyboardDidShowListener.remove();
          keyboardDidHideListener.remove();
      };
  }
}, []);
const formatMessagesForOpenAI = (messages) => {
    return messages.map((msg) => ({
      role: msg.isUser ? "user" : "assistant",
      content: msg.text,
    }));
  };
  
    const sendMessage = async () => {
        if (inputText.trim() === "") return;
    
        const userMessage = {
            id: Date.now().toString(),
            text: inputText,
            isUser: true,
        };
    
        const updatedMessages = [...messages, userMessage];
        setMessages(updatedMessages);
        setInputText("");
    
        scrollToBottom();
    
        const typingMessage = {
            id: "typing-indicator",
            text: "Sedang berpikir...",
            isUser: false,
            isTyping: true,
        };
        setMessages((prev) => [...prev, typingMessage]);
    
        try {
            if (!apiKey) throw new Error("API key tidak tersedia.");
    
            const formattedMessages = formatMessagesForOpenAI(updatedMessages);
    
            const fileContent = await fetchFileContent();
    
            const response = await openai.chat.completions.create({
                model: "gpt-4o-mini",
                messages: [
                    {
                        role: "system",
                        content: `
                        Anda adalah asisten AI bernama Cak J untuk aplikasi Dinsos Mobile.
                        Tugas Anda adalah membantu menjawab pertanyaan pengguna seputar layanan Dinas Sosial.
                        Gunakan daftar FAQ berikut ini sebagai satu-satunya sumber informasi.

                        Pahami makna pertanyaan pengguna. Lakukan pencocokan semantik — tidak harus kata-kata persis sama.
                        Jika Anda menemukan pertanyaan yang relevan dalam FAQ, jawab dengan jawaban dari FAQ.
                        Jika tidak ada yang relevan, jawab sesuai dengan informasi yang ada di google untuk membantu kamu.
                        jawab pertanyaan dengan respon yang asik dan tidak kaku setelah menjawab faq respon dengan bertanya kembali apa yang bida dibantu"

                        FAQ:

                        ${fileContent}
                        `,
                    },
                    ...formattedMessages,
                ],
                temperature: 0.3,
            });
    
            const botResponse = {
                id: Date.now().toString() + "-bot",
                text: response.choices[0].message.content,
                isUser: false,
            };
    
            setMessages((prev) => [
                ...prev.filter((msg) => msg.id !== "typing-indicator"),
                botResponse,
            ]);
    
            scrollToBottom();
        } catch (error) {
            console.error("Error:", error);
            const errorMessage = {
                id: Date.now().toString() + "-error",
                text: "Maaf, terjadi kesalahan saat menghubungi server.",
                isUser: false,
                isError: true,
            };
    
            setMessages((prev) => [
                ...prev.filter((msg) => msg.id !== "typing-indicator"),
                errorMessage,
            ]);
        }
    };    

    const dismissKeyboard = () => Keyboard.dismiss();

    const renderItem = ({ item }) => (
        <View
            style={[
                styles.messageBubble,
                item.isUser ? styles.userBubble : styles.botBubble,
                item.isError && styles.errorBubble,
            ]}>
            {!item.isUser && (
                <View style={styles.avatarContainer}>
                    <Image
                        source={require("../../../assets/images/cakji.png")}
                        style={styles.avatar}
                    />
                </View>
            )}
            <View
                style={[
                    styles.messageContent,
                    item.isUser ? styles.userContent : styles.botContent,
                ]}>
                {item.isTyping ? (
                    <View
                        style={{ flexDirection: "row", alignItems: "center" }}>
                        <Text
                            style={{
                                fontStyle: "italic",
                                color: "#999",
                                marginRight: 8,
                            }}>
                            Sedang berpikir...
                        </Text>
                        <LottieView
                            source={require("../../../assets/images/typing.json")}
                            autoPlay
                            loop
                            style={{ width: 30, height: 30 }}
                        />
                    </View>
                ) : (
                    <Text
                        style={item.isUser ? styles.userText : styles.botText}>
                        {item.text}
                    </Text>
                )}
            </View>
        </View>
    );

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.header}>
                <View style={styles.avatarContainer}>
                    <Image
                        source={require("../../../assets/images/cakji.png")}
                        style={styles.avatar}
                    />
                </View>
                <Text style={styles.headerText}>Tanya JSC</Text>
            </View>

            {Platform.OS === 'ios' ? (
                <KeyboardAvoidingView
                    behavior="padding"
                    style={{ flex: 1 }}
                    keyboardVerticalOffset={0}
                >
                    <View style={styles.container}>
                        <StatusBar style="light" />
                        <FlatList
                            ref={flatListRef}
                            data={messages}
                            renderItem={renderItem}
                            keyExtractor={(item) => item.id}
                            style={styles.messageList}
                            contentContainerStyle={{
                                ...styles.messageListContent,
                                paddingBottom: 70,  // Tambahkan padding extra
                            }}
                            onContentSizeChange={() => scrollToBottom()}
                            onLayout={() => scrollToBottom()}
                            keyboardShouldPersistTaps="handled"
                            scrollEnabled={true}
                            automaticallyAdjustContentInsets={false}
                            removeClippedSubviews={false}
                        />

                        <View style={styles.inputWrapper}>
                            <View style={styles.inputContainer}>
                                <TextInput
                                    style={styles.input}
                                    value={inputText}
                                    onChangeText={setInputText}
                                    placeholder="Ketik pesan..."
                                    placeholderTextColor="#999"
                                    multiline
                                    maxHeight={100}
                                    onFocus={scrollToBottom}
                                />
                                {isLoading ? (
                                    <ActivityIndicator
                                        size="small"
                                        color="#0084ff"
                                        style={styles.sendButton}
                                    />
                                ) : (
                                    <TouchableOpacity
                                        style={[
                                            styles.sendButton,
                                            inputText.trim() === "" &&
                                                styles.sendButtonDisabled,
                                        ]}
                                        onPress={sendMessage}
                                        disabled={inputText.trim() === ""}>
                                        <Ionicons
                                            name="send"
                                            size={20}
                                            color="white"
                                        />
                                    </TouchableOpacity>
                                )}
                            </View>
                        </View>
                    </View>
                </KeyboardAvoidingView>
            ) : (
                <TouchableWithoutFeedback onPress={dismissKeyboard}>
                    <View style={{ flex: 1 }}>
                        <View style={styles.container}>
                            <StatusBar style="light" />
                            <FlatList
                                ref={flatListRef}
                                data={messages}
                                renderItem={renderItem}
                                keyExtractor={(item) => item.id}
                                style={styles.messageList}
                                contentContainerStyle={{
                                    ...styles.messageListContent,
                                    paddingBottom: 70,
                                }}
                                onContentSizeChange={() => scrollToBottom()}
                                onLayout={() => scrollToBottom()}
                                keyboardShouldPersistTaps="handled"
                                scrollEnabled={true}
                                removeClippedSubviews={false}
                            />

                            <View style={styles.inputWrapper}>
                                <View style={styles.inputContainer}>
                                    <TextInput
                                        style={styles.input}
                                        value={inputText}
                                        onChangeText={setInputText}
                                        placeholder="Ketik pesan..."
                                        placeholderTextColor="#999"
                                        multiline
                                        maxHeight={100}
                                        onFocus={scrollToBottom}
                                    />
                                    {isLoading ? (
                                        <ActivityIndicator
                                            size="small"
                                            color="#0084ff"
                                            style={styles.sendButton}
                                        />
                                    ) : (
                                        <TouchableOpacity
                                            style={[
                                                styles.sendButton,
                                                inputText.trim() === "" &&
                                                    styles.sendButtonDisabled,
                                            ]}
                                            onPress={sendMessage}
                                            disabled={inputText.trim() === ""}>
                                            <Ionicons
                                                name="send"
                                                size={20}
                                                color="white"
                                            />
                                        </TouchableOpacity>
                                    )}
                                </View>
                            </View>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            )}
        </SafeAreaView>
    );
};

export default ChatAI;