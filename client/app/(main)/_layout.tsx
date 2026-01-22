import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Slot } from 'expo-router';
import Octicons from '@expo/vector-icons/Octicons';
import { useState } from 'react';
import { useChatStore } from '@/store/chatStore';
import HistorySidebar from './history/history';
import api from "@/app/api/api";


export default function MainLayout() {

  const [input, setInput] = useState('');
  const [showHistory, setShowHistory] = useState(false);
  const addMessage = useChatStore((s) => s.addMessage);

  const HandleSendPress = async () => {
    if (!input.trim()) return;

    const userMessage = input;

    // Add user message immediately
    addMessage({
      id: Date.now().toString(),
      role: "user",
      text: userMessage,
    });

    setInput("");

    try {
      const response = await api.post("/chat", {
        message: userMessage,
      });

      addMessage({
        id: (Date.now() + 1).toString(),
        role: "ai",
        text: response.data.reply,
      });

    } catch (error) {
      addMessage({
        id: (Date.now() + 1).toString(),
        role: "ai",
        text: "Something went wrong. Please try again.",
      });
    }
  };

  return (
     <SafeAreaView style={styles.container}>

      {/* Top Bar */}
      <View style={styles.topContainer}>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => setShowHistory(true)}
        >
          <Octicons name="history" size={22} color="white" />
        </TouchableOpacity>
      </View>
       <HistorySidebar
        visible={showHistory}
        onClose={() => setShowHistory(false)}
      />

        <Slot />

      {/* Bottom Input Bar */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity style={styles.iconButton}>
          <Octicons name="plus" size={22} color="white" />
        </TouchableOpacity>

        <TextInput
          placeholder="Ask GNOSIS"
          placeholderTextColor="#9a9a9a"
          onChangeText={setInput}
          value={input}
          style={styles.input}
          multiline
        />

        <TouchableOpacity style={styles.sendButton} onPress={HandleSendPress} >
          <Octicons name="arrow-up" size={18} color="black" />
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    position: 'relative',
  },

  /* Top */
  topContainer: {
    position: 'absolute',
    top: 16,
    left: 16,
    zIndex: 10,
  },

  iconButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#2c2c2c',
    justifyContent: 'center',
    alignItems: 'center',
  },

  bottomContainer: {
    position: 'absolute',
    bottom: 30,
    left: 16,
    right: 16,
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 8,
  },

  input: {
    flex: 1,
    minHeight: 44,
    maxHeight: 120,
    backgroundColor: '#1c1c1c',
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 15,
    color: '#ffffff',
    lineHeight: 20,
  },

  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
