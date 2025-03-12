import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const cardWidth = (width - 40) / 2; // Two cards per row with spacing

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e6f0f5',
    // backgroundColor: '#5A859C',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    paddingTop: 25,
    backgroundColor: '#d4e5ef',
    // backgroundColor: '#5A859C',

  },
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
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 10,
    justifyContent: 'space-between',
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