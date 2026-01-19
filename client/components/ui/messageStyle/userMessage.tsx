

import { View, Text, StyleSheet } from 'react-native'

export default function ({ text }: { text: string }) {
  return (
    <View style={[styles.message, styles.user]}>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
  }

  const styles = StyleSheet.create({
     message: {
    maxWidth: '90%',
    marginVertical: 8,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 16,
  },

  user: {
    alignSelf: 'flex-end',
    backgroundColor: '#2c2c2c',
  },

    text: {
    color: '#ffffff',
    fontSize: 15,
    lineHeight: 20,
  },

  })