import { StyleSheet, Dimensions, StatusBar, Platform } from 'react-native';

const { width } = Dimensions.get('window');
const cardWidth = (width - 40) / 2; // Two cards per row with spacing

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e6f0f5',
    // backgroundColor: '#5A859C',
  },
  header: {
    position: 'absolute',
    top:0,
    left: 0,
    right: 0,
    // paddingTop: StatusBar.currentHeight + 50,
     paddingTop: Platform.OS === "android" ? StatusBar.currentHeight + 20 : 60,
    zIndex: 100,
    height: 100,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#d4e5ef',
  },
  // header: {
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   padding: 15,
  //   backgroundColor: '#d4e5ef',
  // },
  backButton: {
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  scrollView: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : 20,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 10,
    justifyContent: 'space-between',
    marginTop: 70,
  },
  card: {
    width: cardWidth,
    height: 90,
    // backgroundColor: '#4e9cd6',
    backgroundColor: '#1D6187',
    borderRadius: 10,
    marginBottom: 20,
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardContent: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  icon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  cardTitle: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },
  menuButton: {
    alignSelf: 'flex-start',
  },
});

export default styles;