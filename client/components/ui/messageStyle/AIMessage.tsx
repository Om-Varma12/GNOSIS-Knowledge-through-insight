import { router } from 'expo-router';
import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function AIMessage({
  text,
  confidence,
  summary,
}: {
  text: string;
  confidence: number;
  summary: string;
}) {


    const ViewEvidence = () =>{
        router.push("/evidence/evidenceTrail")
    }

  return (
    <View style={[styles.message, styles.ai]}>
      {/* Main AI text */}
      <Text style={styles.text}>{text}</Text>

      {/* Confidence */}
      <View style={styles.confidenceBlock}>
        <Text style={styles.confidenceLabel}>
          Confidence: {Math.round(confidence * 100)}%
        </Text>

        <View style={styles.progressTrack}>
          <View
            style={[
              styles.progressFill,
              { width: `${confidence * 100}%` },
            ]}
          />
        </View>
      </View>

      {/* Summary */}
      <Text style={styles.summaryText}>{summary}</Text>

      {/* Evidence Button */}
      <TouchableOpacity style={styles.evidenceButton}
        onPress={ViewEvidence}
      >
        <Text style={styles.evidenceText}>View Evidence</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.evidenceButton}
        onPress={() =>  router.push("/(main)/track/track")}
      >
        <Text style={styles.evidenceText}>View track</Text>
      </TouchableOpacity>
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
})