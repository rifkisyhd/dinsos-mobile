import { StyleSheet, Platform, StatusBar } from 'react-native';


export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: 100,
    zIndex: 1000,
    backgroundColor: '#33A9FF',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    // paddingVertical: 16,
    paddingTop: Platform.OS === 'ios' ? 30 : 25,
    paddingBottom: Platform.OS === 'ios' ? 20 : 20,
  },
  backButton: {
    marginRight: 10,
  },
  headerText: {
    color: 'white',
    fontSize: 18,
    marginTop: 20,
    fontWeight: 'bold',
  },
  messageList: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? 60 : 100,
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
 // Style untuk typing bubble
 typingBubble: {
  flexDirection: 'row',
  alignSelf: 'flex-start',
  backgroundColor: '#e5e5e5',
  borderRadius: 20,
  padding: 12,
  marginVertical: 5,
  marginLeft: '10%',
},
typingText: {
  fontSize: 16,
  color: '#777',
  marginRight: 5,
},

});