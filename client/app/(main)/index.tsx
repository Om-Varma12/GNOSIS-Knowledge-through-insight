import { View, Text, FlatList, StyleSheet } from "react-native";
import { useChatStore } from "@/store/chatStore";
import UserMessage from "@/components/ui/messageStyle/userMessage";
import AIMessage from "@/components/ui/messageStyle/AIMessage";

export default function ChatContent() {
  const messages = useChatStore((state) => state.messages);

  if (messages.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.welcomeTitle}>
          Welcome to GNOSIS
        </Text>
        <Text style={styles.welcomeSubtitle}>
          Ask a claim and I’ll analyze its credibility using evidence.
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      data={messages}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.list}
      showsVerticalScrollIndicator={false}
      renderItem={({ item }) => {
        if (item.role === "user") {
          return <UserMessage text={item.text ?? ""} />;
        }

        return (
          <AIMessage
            text={item.text ?? ""}
            loading={item.loading}
            data={item.data}
            confidence={item.data?.confidence_score}
          />
        );
      }}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    padding: 16,
    paddingBottom: 120,
  },

  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
    backgroundColor: "#000",
  },

  welcomeTitle: {
    color: "#ffffff",
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 8,
  },

  welcomeSubtitle: {
    color: "#9ca3af",
    fontSize: 14,
    textAlign: "center",
    lineHeight: 20,
  },
});
