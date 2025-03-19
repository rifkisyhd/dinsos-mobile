import { StyleSheet, Platform } from 'react-native';

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#39b4ff',
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 16,
      paddingVertical: 16,
      marginTop: Platform.OS === 'ios' ? 0 : 16,
    },
    backButton: {
      marginRight: 16, 
    },
   
    headerTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: 'white',
    },
    sectionContainer: {
      marginTop: 16,
      paddingHorizontal: 16,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: 'white',
      marginBottom: 12,
    },
    programCard: {
      backgroundColor: 'white',
      borderRadius: 12,
      padding: 16,
      marginBottom: 16,
    },
    programsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
    },
    programItem: {
      alignItems: 'center',
      width: '33%',
    },
    iconContainer: {
      width: 50,
      height: 50,
      borderRadius: 25,
      backgroundColor: '#f0f0f0',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 8,
    },
    icon: {
      width: 30,
      height: 30,
    },
    programName: {
      textAlign: 'center',
      fontSize: 12,
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