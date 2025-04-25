// styles.js
import { StyleSheet, Platform } from 'react-native';
import Constants from 'expo-constants';

export const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  description: {
    fontSize: 15,
    lineHeight: 22,
    color: '#444',
  },

  errorContainer: {
    marginTop: 50,
  }
});
