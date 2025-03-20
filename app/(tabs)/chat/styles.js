import { StyleSheet, Platform } from 'react-native';


export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#33A9FF',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    // paddingVertical: 16,
    paddingTop: Platform.OS === 'ios' ? 50 : 30,
    paddingBottom: Platform.OS === 'ios' ? 20 : 20,
  },
  backButton: {
    marginRight: 10,
  },
  headerText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  messageList: {
    flex: 1,
  },
  messageListContent: {
    padding: 10,
    paddingBottom: 20,
  },
  messageBubble: {
    flexDirection: 'row',
    marginVertical: 5,
    maxWidth: '90%',
  },
  avatarContainer: {
    width: 30,
    height: 30,
    marginRight: 8,
    alignSelf: 'flex-end',
    marginBottom: 5,
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  messageContent: {
    padding: 12,
    borderRadius: 20,
  },
  userContent: {
    backgroundColor: '#0084ff',
    borderBottomRightRadius: 5,
  },
  botContent: {
    backgroundColor: '#e5e5e5',
    borderBottomLeftRadius: 5,
  },
  userBubble: {
    alignSelf: 'flex-end',
    marginLeft: '10%',
  },
  botBubble: {
    alignSelf: 'flex-start',
    marginRight: '10%',
  },
  errorBubble: {
    backgroundColor: '#ffdddd',
  },
  userText: {
    color: 'white',
  },
  botText: {
    color: '#333',
  },
  inputWrapper: {
    borderTopWidth: 1,
    borderTopColor: '#e5e5e5',
    backgroundColor: 'white',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'flex-end',
  },
  input: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    padding: 10,
    paddingTop: 10,
    paddingRight: 40,
    maxHeight: 100,
    minHeight: 40,
  },
  sendButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0084ff',
    height: 40,
    width: 40,
    borderRadius: 20,
    position: 'absolute',
    right: 15,
    bottom: 12,
  },
  sendButtonDisabled: {
    backgroundColor: '#ccc',
  },
});