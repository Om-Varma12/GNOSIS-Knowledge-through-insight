import { View, Text, StyleSheet, FlatList } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';

export type RelatedVariant = {
  id: string;
  title: string;
  description: string;
};

const DATA: RelatedVariant[] = [
  {
    id: '1',
    title: 'Financial conspiracy variant',
    description:
      'Emerged from same source, added claims about pharmaceutical profits',
  },
  {
    id: '2',
    title: 'Political manipulation variant',
    description:
      'Same structure, different context – tied to election misinformation',
  },
];

export default function RelatedMisinformation() {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Related Misinformation</Text>

      <FlatList
        data={DATA}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.iconWrapper}>
              <View style={styles.iconCircle}>
              <Entypo name="info-with-circle" size={24} color="#f97316" />
              </View>
            </View>

            <View style={styles.textContainer}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.description}>{item.description}</Text>
            </View>
          </View>
        )}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
      />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    marginTop: 24,
  },

  sectionTitle: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },

  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 18,
    borderWidth: 1,
    backgroundColor: '#0b0b0b',
  },

  iconWrapper: {
    marginRight: 14,
  },

  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#1c1208',
    alignItems: 'center',
    justifyContent: 'center',
  },

  textContainer: {
    flex: 1,
  },

  title: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },

  description: {
    color: '#b3b3b3',
    fontSize: 13,
    lineHeight: 18,
  },
});
