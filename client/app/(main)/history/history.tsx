import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Animated,
  Dimensions,
} from 'react-native';
import { useEffect, useRef } from 'react';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SIDEBAR_WIDTH = SCREEN_WIDTH * 0.8;

type Props = {
  visible: boolean;
  onClose: () => void;
};

export default function HistorySidebar({ visible, onClose }: Props) {
  const translateX = useRef(new Animated.Value(-SIDEBAR_WIDTH)).current;
  const backdropOpacity = useRef(new Animated.Value(0)).current;

useEffect(() => {
  translateX.stopAnimation();
  backdropOpacity.stopAnimation();

  translateX.setValue(visible ? -SIDEBAR_WIDTH : 0);
  backdropOpacity.setValue(visible ? 0 : 1);

  Animated.parallel([
    Animated.timing(translateX, {
      toValue: visible ? 0 : -SIDEBAR_WIDTH,
      duration: 240,
      useNativeDriver: true,
    }),
    Animated.timing(backdropOpacity, {
      toValue: visible ? 1 : 0,
      duration: 200,
      useNativeDriver: true,
    }),
  ]).start();
}, [visible]);


  if (!visible) return null;

  return (
    <View style={styles.overlay}>
      {/* Backdrop */}
      <Pressable style={StyleSheet.absoluteFill} onPress={onClose}>
        <Animated.View
          style={[
            styles.backdrop,
            { opacity: backdropOpacity },
          ]}
        />
      </Pressable>

      {/* Sidebar */}
      <Animated.View
        style={[
          styles.sidebar,
          { transform: [{ translateX }] },
        ]}
      >
        <Text style={styles.title}>History</Text>

        <View style={styles.item}>
          <Text style={styles.itemText}>Diabetes cure claim</Text>
        </View>
        <View style={styles.item}>
          <Text style={styles.itemText}>Crypto investment message</Text>
        </View>
      </Animated.View>
    </View>
  );
}


const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 999,
  },

  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.35)',
  },

  sidebar: {
    position: 'absolute',
    left: 0, 
    top: 0,
    bottom: 0,
    width: SIDEBAR_WIDTH,
    backgroundColor: '#2c2c2c',
    paddingTop: 48,
    paddingHorizontal: 16,
    elevation: 25,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },

  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 16,
  },

  item: {
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderColor: '#3a3a3a',
  },

  itemText: {
    color: '#ffffff',
    fontSize: 14,
  },
});
