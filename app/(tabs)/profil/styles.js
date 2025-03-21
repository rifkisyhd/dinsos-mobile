import { StyleSheet, Platform } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    backgroundColor: '#0066cc',
    alignItems: 'center',
    elevation: 4,
  paddingVertical: Platform.OS === 'ios' ? 20 : 45,
    paddingBottom: Platform.OS === 'ios' ? 20 : 25,
  },
  headerTitle: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  scrollView: {
    flex: 1,
  },
  card: {
    margin: 16,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 16,
    elevation: 2,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  logo: {
    width: '100%',
    height: 150,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0066cc',
    marginBottom: 8,
  },
  sectionContent: {
    fontSize: 14,
    lineHeight: 22,
    color: '#333333',
  },
  listContainer: {
    marginTop: 8,
  },
  listItem: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  listNumber: {
    fontSize: 14,
    color: '#333333',
    width: 20,
  },
  listText: {
    fontSize: 14,
    color: '#333333',
    flex: 1,
    lineHeight: 22,
  },
  
  // New styles for expandable sections
  departmentSection: {
    marginBottom: 24,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    paddingTop: 16,
  },
  departmentTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 12,
  },
  toggleSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: 12,
    borderRadius: 6,
    marginBottom: 8,
  },
  toggleText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#0066cc',
  },
  toggleIcon: {
    fontSize: 14,
    color: '#0066cc',
  },
  expandedContent: {
    backgroundColor: '#f9f9f9',
    padding: 12,
    borderRadius: 6,
    marginBottom: 12,
  },
});