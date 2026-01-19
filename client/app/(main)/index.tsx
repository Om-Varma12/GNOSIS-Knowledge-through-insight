import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useChatStore } from '@/store/chatStore';
import UserMessage from '@/components/ui/messageStyle/userMessage';
import AIMessage from '@/components/ui/messageStyle/AIMessage';

export default function ChatContent() {
  const messages = useChatStore((state) => state.messages);



  return (
    <FlatList
      data={messages}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.list}
     renderItem={({ item }) =>
        item.role === 'user' ? (
          <UserMessage text={item.text} />
        ) : (
          <AIMessage
            text={item.text}
            confidence={0.82}
            summary="This claim shows multiple red flags based on historical misinformation patterns."
          />
        )
      }
    />
  );
}

const styles = StyleSheet.create({
  list: {
    padding: 16,
    paddingBottom: 120,
  },

 

  ai: {
    alignSelf: 'flex-start',
    backgroundColor: 'transparent',
  },

  text: {
    color: '#ffffff',
    fontSize: 15,
    lineHeight: 20,
  },

  /* Confidence block */
  confidenceBlock: {
    marginTop: 12,
  },

  confidenceLabel: {
    color: '#bbbbbb',
    fontSize: 12,
    marginBottom: 6,
  },

  progressTrack: {
    height: 6,
    backgroundColor: '#333333',
    borderRadius: 3,
    overflow: 'hidden',
  },

  progressFill: {
    height: '100%',
    backgroundColor: '#4ade80',
  },

  /* Summary */
  summaryText: {
    marginTop: 10,
    color: '#dddddd',
    fontSize: 13,
    lineHeight: 18,
  },

  /* Evidence button */
  evidenceButton: {
    marginTop: 12,
    alignSelf: 'flex-start',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#444444',
  },

  evidenceText: {
    color: '#ffffff',
    fontSize: 13,
  },
});
