import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useChatStore } from '@/store/chatStore';

export default function ChatContent() {
  const messages = useChatStore((state) => state.messages);

  return (
    <FlatList
      data={messages}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.list}
      renderItem={({ item }) => (
        <View
          style={[
            styles.message,
            item.role === 'user' ? styles.user : styles.ai,
          ]}
        >
          <Text style={styles.text}>{item.text}</Text>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    padding: 16,
  },

  message: {
    maxWidth: '85%',
    marginVertical: 6,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 16,
  },

  user: {
    alignSelf: 'flex-end',
    backgroundColor: '#2c2c2c',
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
});
