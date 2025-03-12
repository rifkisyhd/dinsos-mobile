import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#5b8ba6',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    paddingTop: 25,
    backgroundColor: '#5b8ba6',
  },
  backButton: {
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  titleSection: {
    marginBottom: 25,
  },
  mainTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#fff',
    lineHeight: 24,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  reportSection: {
    alignItems: 'center',
    marginBottom: 20,
    zIndex: 2,
  },
  laporButtonContainer: {
    backgroundColor: '#fff',
    padding: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginBottom: 15,
  },
  laporText: {
    color: '#d32027',
    fontWeight: 'bold',
    fontSize: 16,
  },
  webImageContainer: {
    width: '100%',
    height: 150,
    marginBottom: 15,
    borderRadius: 8,
    overflow: 'hidden',
  },
  webImage: {
    width: '100%',
    height: '100%',
  },
  urlContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginBottom: 15,
  },
  urlText: {
    color: '#333',
    fontWeight: 'bold',
  },
  orText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  downloadSection: {
    alignItems: 'center',
    zIndex: 2,
  },
  downloadTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  playStoreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginBottom: 15,
  },
  playStoreIcon: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  playStoreText: {
    color: '#333',
    fontWeight: 'bold',
  },
  appImageContainer: {
    width: '80%',
    height: 200,
  },
  appImage: {
    width: '100%',
    height: '100%',
  },
  redBackgroundTop: {
    position: 'absolute',
    top: 200,
    right: -100,
    width: 300,
    height: 250,
    backgroundColor: '#d32027',
    borderRadius: 150,
    transform: [{ rotate: '-30deg' }],
    zIndex: 1,
  },
  redBackgroundBottom: {
    position: 'absolute',
    bottom: 50,
    left: -100,
    width: 300,
    height: 250,
    backgroundColor: '#d32027',
    borderRadius: 150,
    transform: [{ rotate: '30deg' }],
    zIndex: 1,
  },
});
