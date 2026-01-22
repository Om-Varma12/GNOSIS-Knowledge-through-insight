import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useChatStore } from "@/store/chatStore";

type AIMessageProps = {
  text?: string;
  confidence?: number;
  data?: any;
  loading?: boolean;
};

export default function AIMessage({
  text = "",
  confidence = 0,
  data,
  loading = false,
}: AIMessageProps) {
  const setSelectedEvidence = useChatStore((s) => s.setSelectedEvidence);

  const ViewEvidence = () => {
    if (!data) return;
    setSelectedEvidence(data);
    router.push("/(main)/evidence/evidenceTrail");
  };

  return (
    <View style={[styles.message, styles.ai]}>
      {/* Main text */}
      <Text style={styles.text}>
        {loading ? "⏳ Analyzing claim…" : text}
      </Text>

      {/* Confidence block */}
      {!loading && (
        <View style={styles.confidenceBlock}>
          <Text style={styles.confidenceLabel}>
            Confidence: {Math.round(confidence)}%
          </Text>

          <View style={styles.progressTrack}>
            <View
              style={[
                styles.progressFill,
                { width: `${confidence}%` },
              ]}
            />
          </View>
        </View>
      )}

      {/* Evidence buttons */}
      {!loading && (
        <>
          <TouchableOpacity
            style={styles.evidenceButton}
            onPress={ViewEvidence}
          >
            <Text style={styles.evidenceText}>View Evidence</Text>
          </TouchableOpacity>

        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  message: {
    maxWidth: "90%",
    marginVertical: 8,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 16,
  },
  ai: {
    alignSelf: "flex-start",
    backgroundColor: "transparent",
  },
  text: {
    color: "#ffffff",
    fontSize: 15,
    lineHeight: 20,
  },
  confidenceBlock: {
    marginTop: 12,
  },
  confidenceLabel: {
    color: "#bbbbbb",
    fontSize: 12,
    marginBottom: 6,
  },
  progressTrack: {
    height: 6,
    backgroundColor: "#333333",
    borderRadius: 3,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#4ade80",
  },
  evidenceButton: {
    marginTop: 12,
    alignSelf: "flex-start",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#444444",
  },
  evidenceText: {
    color: "#ffffff",
    fontSize: 13,
  },
});
