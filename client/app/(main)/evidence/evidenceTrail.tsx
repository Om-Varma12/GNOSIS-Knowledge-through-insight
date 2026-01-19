import { View, Text, StyleSheet, FlatList, Pressable, ScrollView } from 'react-native';
import { EvidenceTrailData } from '@/type/evidence';
import RelatedMisinformation from '../track/relatedInfo';
import { SafeAreaView } from 'react-native-safe-area-context';

const MOCK_DATA: EvidenceTrailData = {
  claim: 'Drinking cow urine cures cancer',
  verdict: 'false',
  confidence: 0.92,
  summary:
    'This claim has no scientific backing. Multiple medical authorities have debunked it.',
  evidence: [
    {
      id: '1',
      title: 'WHO Medical Advisory',
      snippet:
        'There is no clinical evidence supporting the use of cow urine for cancer treatment.',
    },
    {
      id: '2',
      title: 'ICMR Statement',
      snippet:
        'Alternative therapies without trials can be harmful and misleading.',
    },
  ],
};

export default function EvidenceTrail() {
  const data = MOCK_DATA; 

  return (
        <SafeAreaView   style={{padding:20}}  >
          {/* Claim */}
          <Text style={styles.claim}>{data.claim}</Text>

          {/* Verdict */}
          <View style={styles.verdictRow}>
            <Text style={styles.verdictLabel}>Verdict</Text>
            <Text style={styles.verdictValue}>{data.verdict.toUpperCase()}</Text>
          </View>

          {/* Confidence */}
          <View style={styles.confidenceBlock}>
            <Text style={styles.confidenceText}>
              Confidence: {Math.round(data.confidence * 100)}%
            </Text>
            <View style={styles.progressTrack}>
              <View
                style={[
                  styles.progressFill,
                  { width: `${data.confidence * 100}%` },
                ]}
              />
            </View>
          </View>

          {/* Summary */}
          <Text style={styles.sectionTitle}>Summary</Text>
          <Text style={styles.summary}>{data.summary}</Text>

          {/* Evidence Header */}
          <Text style={styles.sectionTitle}>Evidence</Text>

          <View style={{ marginTop: 32 }}>
              <RelatedMisinformation />
          </View>
        </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#000',
  },

  claim: {
    fontSize: 20,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 16,
  },

  verdictRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },

  verdictLabel: {
    color: '#aaa',
    fontSize: 14,
  },

  verdictValue: {
    color: '#ef4444',
    fontWeight: '600',
  },

  confidenceBlock: {
    marginBottom: 20,
  },

  confidenceText: {
    color: '#bbb',
    fontSize: 13,
    marginBottom: 6,
  },

  progressTrack: {
    height: 6,
    backgroundColor: '#333',
    borderRadius: 3,
    overflow: 'hidden',
  },

  progressFill: {
    height: '100%',
    backgroundColor: '#22c55e',
  },

  sectionTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginTop: 20,
    marginBottom: 8,
  },

  summary: {
    color: '#ddd',
    fontSize: 14,
    lineHeight: 20,
  },

  evidenceCard: {
    marginTop: 12,
    padding: 14,
    borderRadius: 12,
    backgroundColor: '#1c1c1c',
  },

  evidenceTitle: {
    color: '#fff',
    fontWeight: '500',
    marginBottom: 6,
  },

  evidenceSnippet: {
    color: '#ccc',
    fontSize: 13,
    lineHeight: 18,
  },

  link: {
    marginTop: 8,
    color: '#4ade80',
    fontSize: 13,
  },
});
