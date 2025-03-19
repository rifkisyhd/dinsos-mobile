import { StyleSheet, Platform } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#39b4ff', // Solid blue background
  },
  header: {
    // height: 60,
    // backgroundColor: '#0084ff',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    paddingTop: Platform.OS === 'ios' ? 0 : 30,
  },
  backButton: {
    marginRight: 10,
  },
  headerText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  contactCard: {
    backgroundColor: '#2980b9', // Darker blue card
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  contactHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  contactHeaderTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  contactHeaderSubtitle: {
    fontSize: 14,
    color: 'white',
    opacity: 0.8,
    marginTop: 4,
  },
  logo: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
  },
  contactInfoContainer: {
    marginTop: 8,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  iconContainer: {
    width: 30,
    marginRight: 10,
    alignItems: 'center',
  },
  contactText: {
    fontSize: 14,
    color: 'white',
    flex: 1,
  },
  homeIndicator: Platform.select({
    ios: {
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      height: 34,
      backgroundColor: "#f5f5f5",
    },
    android: {}, // Di Android nggak ada style
  }),
});