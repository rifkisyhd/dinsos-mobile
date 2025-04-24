// styles.js
import { StyleSheet, Platform } from 'react-native';
import Constants from 'expo-constants';

export const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingTop: Constants.statusBarHeight + 16,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  backButton: {
    padding: 8,
    marginRight: 12,
  },
  backText: {
    fontSize: 24,
    color: '#33A9FF',
  },
  title: {
    flex: 1,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 12,
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
