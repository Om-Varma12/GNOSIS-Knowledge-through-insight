// import { SpreadNode } from "@/type/evidence";
// import { View, Text, StyleSheet, FlatList } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import RelatedMisinformation from "./relatedInfo";

// const DATA: SpreadNode[] = [
//   {
//     id: "1",
//     date: "March 2020",
//     platform: "Health Blog",
//     reach: "Original Source",
//     content: "Initial claim about immunity boosting technique",
//     type: "origin",
//   },
//   {
//     id: "2",
//     date: "April 2020",
//     platform: "Social Media",
//     reach: "50K shares",
//     content: "Same claim, shared widely during pandemic",
//     type: "spread",
//   },
//   {
//     id: "3",
//     date: "May 2020",
//     platform: "YouTube",
//     reach: "200K views",
//     content: "Video format with added urgency language",
//     type: "spread",
//   },
//   {
//     id: "4",
//     date: "June 2020",
//     platform: "Email Chain",
//     reach: "Unknown",
//     content: "Modified version claiming government suppression",
//     type: "variant",
//   },
// ];

// /* ---------------- HEADER (NOT default) ---------------- */

// function Header() {
//   return (
//     <View>
//       <Text style={styles.title}>Track</Text>
//       <Text style={styles.subtitle}>How this information spread</Text>

//       <View style={styles.summaryCard}>
//         <Text style={styles.summaryTitle}>Spread Analysis</Text>
//         <Text style={styles.summaryText}>
//           This claim originated in early 2020 and evolved across platforms,
//           gaining variants with added conspiracy framing.
//         </Text>

//         <View style={styles.metrics}>
//           <Metric label="Platforms" value="6" />
//           <Metric label="Duration" value="7mo" />
//           <Metric label="Est. Reach" value="265K+" />
//         </View>
//       </View>

//       <Text style={styles.sectionTitle}>Propagation Timeline</Text>
//     </View>
//   );
// }

// /* ---------------- METRIC ---------------- */

// function Metric({ label, value }: { label: string; value: string }) {
//   return (
//     <View style={styles.metric}>
//       <Text style={styles.metricValue}>{value}</Text>
//       <Text style={styles.metricLabel}>{label}</Text>
//     </View>
//   );
// }

// /* ---------------- TIMELINE NODE ---------------- */

// function TimelineNode({
//   node,
//   isLast,
// }: {
//   node: SpreadNode;
//   isLast: boolean;
// }) {
//   const isOrigin = node.type === "origin";
//   const isVariant = node.type === "variant";

//   return (
//     <View style={styles.row}>
//       <View style={styles.timelineCol}>
//         <View
//           style={[
//             styles.dot,
//             isOrigin && styles.originDot,
//             isVariant && styles.variantDot,
//           ]}
//         />
//         {!isLast && <View style={styles.line} />}
//       </View>

//       <View style={styles.card}>
//         <Text style={styles.date}>{node.date}</Text>

//         <View style={styles.cardHeader}>
//           <Text style={styles.platform}>{node.platform}</Text>
//           <View
//             style={[
//               styles.badge,
//               isOrigin
//                 ? styles.originBadge
//                 : isVariant
//                   ? styles.variantBadge
//                   : styles.spreadBadge,
//             ]}
//           >
//             <Text style={styles.badgeText}>{node.reach}</Text>
//           </View>
//         </View>

//         <Text style={styles.content}>{node.content}</Text>

//         {(isOrigin || isVariant) && (
//           <Text style={styles.note}>
//             {isOrigin ? "🔴 Origin Point" : "⚠️ Modified Variant"}
//           </Text>
//         )}
//       </View>
//     </View>
//   );
// }

// /* ---------------- ROUTE (ONLY default export) ---------------- */

// export default function EvidenceTrail() {
//   return (
//     <SafeAreaView style={styles.safe}>
//       <FlatList
//         data={DATA}
//         keyExtractor={(item) => item.id}
//         contentContainerStyle={styles.container}
//         ListHeaderComponent={<Header />}
//         renderItem={({ item, index }) => (
//           <TimelineNode node={item} isLast={index === DATA.length - 1} />
//         )}
//         ListFooterComponent={
//           <View style={{ marginTop: 32 }}>
//             <RelatedMisinformation />
//           </View>
//         }
//       />
//     </SafeAreaView>
//   );
// }

// /* ---------------- STYLES ---------------- */

// const styles = StyleSheet.create({
//   safe: {
//     flex: 1,
//     backgroundColor: "#000",
//   },
//   container: {
//     padding: 16,
//   },
//   title: {
//     color: "#fff",
//     fontSize: 20,
//     fontWeight: "600",
//   },
//   subtitle: {
//     color: "#aaa",
//     fontSize: 13,
//     marginBottom: 16,
//   },
//   summaryCard: {
//     backgroundColor: "#1c1c1c",
//     borderRadius: 16,
//     padding: 16,
//     marginBottom: 24,
//   },
//   summaryTitle: {
//     color: "#fff",
//     fontWeight: "600",
//     marginBottom: 6,
//   },
//   summaryText: {
//     color: "#bbb",
//     fontSize: 14,
//     lineHeight: 20,
//   },
//   metrics: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     borderTopColor: "#333",
//     borderTopWidth: 1,
//     paddingTop: 15,
//     marginTop: 16,
//   },
//   metric: {
//     alignItems: "center",
//     flex: 1,
//   },
//   metricValue: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "600",
//   },
//   metricLabel: {
//     color: "#888",
//     fontSize: 12,
//     marginTop: 4,
//   },
//   sectionTitle: {
//     color: "#fff",
//     fontSize: 18,
//     fontWeight: "600",
//     marginBottom: 16,
//   },
//   row: {
//     flexDirection: "row",
//     marginBottom: 28,
//   },
//   timelineCol: {
//     width: 32,
//     alignItems: "center",
//   },
//   dot: {
//     width: 14,
//     height: 14,
//     borderRadius: 7,
//     backgroundColor: "#888",
//     zIndex: 2,
//   },
//   originDot: {
//     backgroundColor: "#ef4444",
//   },
//   variantDot: {
//     backgroundColor: "#f59e0b",
//   },
//   line: {
//     width: 2,
//     flex: 1,
//     backgroundColor: "#444",
//     marginTop: 4,
//   },
//   card: {
//     flex: 1,
//     backgroundColor: "#1c1c1c",
//     borderRadius: 14,
//     padding: 14,
//     marginLeft: 8,
//   },
//   date: {
//     color: "#aaa",
//     fontSize: 12,
//     marginBottom: 4,
//   },
//   cardHeader: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginBottom: 8,
//   },
//   platform: {
//     color: "#fff",
//     fontWeight: "600",
//   },
//   badge: {
//     paddingHorizontal: 10,
//     paddingVertical: 4,
//     borderRadius: 999,
//   },
//   originBadge: {
//     backgroundColor: "#3f1d1d",
//   },
//   spreadBadge: {
//     backgroundColor: "#1e3a8a",
//   },
//   variantBadge: {
//     backgroundColor: "#3a2a1c",
//   },
//   badgeText: {
//     color: "#fff",
//     fontSize: 12,
//   },
//   content: {
//     color: "#ccc",
//     fontSize: 14,
//     lineHeight: 20,
//   },
//   note: {
//     color: "#aaa",
//     fontSize: 12,
//     marginTop: 10,
//   },
// });
