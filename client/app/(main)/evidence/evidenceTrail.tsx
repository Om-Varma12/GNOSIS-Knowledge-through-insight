import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Linking,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useChatStore } from "@/store/chatStore";
import { IMAGE_BASE_PATH } from "@/config/constants";

type TabType = "text" | "image" | "video";

export default function EvidenceTrail() {
  const data = useChatStore((s) => s.selectedEvidence);
  const [activeTab, setActiveTab] = useState<TabType>("text");

  if (!data) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={{ color: "#fff" }}>
          No evidence data available.
        </Text>
      </SafeAreaView>
    );
  }

  const verdict = data.final_verdict;
  const confidence = Math.round(data.confidence_score);

  const textEvidence = Object.values(data.evidence || {});
  const images: string[] = data.images || [];
  const videoUrl: string | null = data.video_url || null;


  const getYoutubeThumbnail = (url: string) => {
    try {
      const cleaned = url.split("?")[0];

      const patterns = [
        /youtu\.be\/([^\/]+)/,
        /youtube\.com\/watch\?v=([^&]+)/,
        /youtube\.com\/embed\/([^\/]+)/,
        /youtube\.com\/shorts\/([^\/]+)/,
      ];

      for (const pattern of patterns) {
        const match = cleaned.match(pattern);
        if (match && match[1]) {
          return `https://img.youtube.com/vi/${match[1]}/hqdefault.jpg`;
        }
      }

      return null;
    } catch {
      return null;
    }
  };



  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* ───────────── Header ───────────── */}
        <Text style={styles.claim}>Claim Analysis</Text>

        {/* Verdict */}
        <View style={styles.verdictRow}>
          <Text style={styles.verdictLabel}>Verdict</Text>
          <Text
            style={[
              styles.verdictValue,
              verdict === "fake"
                ? styles.fake
                : verdict === "real"
                  ? styles.real
                  : styles.uncertain,
            ]}
          >
            {verdict.toUpperCase()}
          </Text>
        </View>

        {/* Confidence */}
        <View style={styles.confidenceBlock}>
          <Text style={styles.confidenceText}>
            Confidence: {confidence}%
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

        {/* Summary */}
        <Text style={styles.sectionTitle}>Summary</Text>
        <Text style={styles.summary}>{data.summary}</Text>

        {/* ───────────── Tabs ───────────── */}
        <View style={styles.tabRow}>
          <Pressable
            onPress={() => setActiveTab("text")}
            style={[
              styles.tabButton,
              activeTab === "text" && styles.tabActive,
            ]}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "text" && styles.tabTextActive,
              ]}
            >
              Text
            </Text>
          </Pressable>

          <Pressable
            onPress={() => setActiveTab("image")}
            style={[
              styles.tabButton,
              activeTab === "image" && styles.tabActive,
            ]}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "image" && styles.tabTextActive,
              ]}
            >
              Images
            </Text>
          </Pressable>

          <Pressable
            onPress={() => setActiveTab("video")}
            style={[
              styles.tabButton,
              activeTab === "video" && styles.tabActive,
            ]}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "video" && styles.tabTextActive,
              ]}
            >
              Video
            </Text>
          </Pressable>
        </View>

        {/* ───────────── TEXT EVIDENCE ───────────── */}
        {activeTab === "text" && (
          <>
            {textEvidence.length === 0 ? (
              <Text style={styles.empty}>No text evidence.</Text>
            ) : (
              textEvidence.map((ev: any, idx: number) => (
                <View key={idx} style={styles.evidenceCard}>
                  <Text style={styles.evidenceTitle}>
                    {ev.evidenceTitle}
                  </Text>
                  <Text style={styles.evidenceSnippet}>
                    {ev.summary}
                  </Text>
                  {ev.url?.startsWith("http") && (
                    <Pressable onPress={() => Linking.openURL(ev.url)}>
                      <Text style={styles.link}>Open source</Text>
                    </Pressable>
                  )}
                </View>
              ))
            )}
          </>
        )}

        {/* ───────────── IMAGE EVIDENCE ───────────── */}
        {activeTab === "image" && (
          images.length === 0 ? (
            <Text style={styles.empty}>No image evidence.</Text>
          ) : (
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {images.map((imgName: string, idx: number) => {
                  const imageUrl =
                    `${IMAGE_BASE_PATH}${imgName}.png`;

                  return (
                    <Image
                      key={idx}
                      source={{ uri: imageUrl }}
                      style={styles.image}
                      resizeMode="cover"
                    />
                  );
                })}
            </ScrollView>
          )
        )}

        {/* ───────────── VIDEO EVIDENCE ───────────── */}
        {activeTab === "video" && (
          videoUrl ? (() => {
            const thumbnail = getYoutubeThumbnail(videoUrl);

            if (!thumbnail) {
              return (
                <Text style={styles.empty}>
                  Invalid video source.
                </Text>
              );
            }

            return (
              <Pressable
                style={styles.videoThumbnailCard}
                onPress={() => Linking.openURL(videoUrl)}
              >
                <Image
                  source={{ uri: thumbnail }}
                  style={styles.videoThumbnail}
                />

                {/* Play overlay */}
                <View style={styles.playOverlay}>
                  <Text style={styles.playIcon}>▶</Text>
                </View>
              </Pressable>
            );
          })() : (
            <Text style={styles.empty}>No video evidence.</Text>
          )
        )}


      </ScrollView>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#000",
    marginBottom: 70
  },

  claim: {
    fontSize: 20,
    fontWeight: "600",
    color: "#fff",
    marginBottom: 16,
  },

  verdictRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },

  verdictLabel: {
    color: "#aaa",
    fontSize: 14,
  },

  verdictValue: {
    fontSize: 14,
    fontWeight: "600",
  },

  fake: { color: "#ef4444" },
  real: { color: "#22c55e" },
  uncertain: { color: "#eab308" },

  confidenceBlock: {
    marginBottom: 20,
  },

  confidenceText: {
    color: "#bbb",
    fontSize: 13,
    marginBottom: 6,
  },

  progressTrack: {
    height: 6,
    backgroundColor: "#333",
    borderRadius: 3,
  },

  progressFill: {
    height: "100%",
    backgroundColor: "#22c55e",
  },

  sectionTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginTop: 20,
    marginBottom: 8,
  },

  summary: {
    color: "#ddd",
    fontSize: 14,
    lineHeight: 20,
  },

  tabRow: {
    flexDirection: "row",
    backgroundColor: "#111",
    borderRadius: 12,
    padding: 4,
    marginTop: 20,
    marginBottom: 12,
  },

  tabButton: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 10,
    alignItems: "center",
  },

  tabActive: {
    backgroundColor: "#1f2937",
  },

  tabText: {
    color: "#9ca3af",
    fontSize: 14,
  },

  tabTextActive: {
    color: "#fff",
    fontWeight: "600",
  },

  empty: {
    color: "#888",
    fontSize: 13,
    marginTop: 12,
  },

  evidenceCard: {
    marginTop: 12,
    padding: 14,
    borderRadius: 12,
    backgroundColor: "#1c1c1c",
  },

  evidenceTitle: {
    color: "#fff",
    fontWeight: "500",
    marginBottom: 6,
  },

  evidenceSnippet: {
    color: "#ccc",
    fontSize: 13,
    lineHeight: 18,
  },

  link: {
    marginTop: 8,
    color: "#4ade80",
    fontSize: 13,
  },

  image: {
    width: 180,
    height: 120,
    borderRadius: 10,
    marginRight: 12,
  },

  videoCard: {
    marginTop: 12,
    padding: 14,
    borderRadius: 12,
    backgroundColor: "#1c1c1c",
    alignItems: "center",
  },

  videoText: {
    color: "#4ade80",
    fontSize: 14,
    fontWeight: "500",
  },

  videoThumbnailCard: {
    marginTop: 12,
    borderRadius: 14,
    overflow: "hidden",
    backgroundColor: "#111",
    borderWidth: 1,
    borderColor: "#333",
  },

  videoThumbnail: {
    width: "100%",
    height: 200,
  },

  playOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.35)",
  },

  playIcon: {
    fontSize: 48,
    color: "#ffffff",
    fontWeight: "bold",
  },

});
