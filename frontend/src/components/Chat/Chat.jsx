import React, { useState, useEffect } from 'react';
import { chatService, userService } from '../../services/api';
import './Chat.css';

const Chat = () => {
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [messageContent, setMessageContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchUser, setSearchUser] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showSearch, setShowSearch] = useState(false);

  // Fetch user chats
  useEffect(() => {
    fetchChats();
    const interval = setInterval(fetchChats, 5000); // Refresh every 5 seconds
    return () => clearInterval(interval);
  }, []);

  // Fetch messages when chat is selected
  useEffect(() => {
    if (selectedChat) {
      const fetchMessagesNow = async () => {
        try {
          const data = await chatService.getMessages(selectedChat.id);
          setMessages(data);
        } catch (err) {
          setError('Failed to load messages: ' + err.message);
        }
      };
      
      fetchMessagesNow();
      const interval = setInterval(fetchMessagesNow, 2000); // Refresh messages every 2 seconds
      return () => clearInterval(interval);
    }
  }, [selectedChat]);

  const fetchChats = async () => {
    try {
      const data = await chatService.getUserChats();
      setChats(data);
      setLoading(false);
    } catch (err) {
      setError('Failed to load chats: ' + err.message);
      setLoading(false);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();

    if (!messageContent.trim() || !selectedChat) {
      return;
    }

    try {
      const newMessage = await chatService.sendMessage(selectedChat.otherUserId, messageContent);
      setMessages([...messages, newMessage]);
      setMessageContent('');

      // Update the last message in the chat list
      const updatedChats = chats.map(chat =>
        chat.id === selectedChat.id
          ? { ...chat, lastMessage: messageContent, lastMessageTime: new Date() }
          : chat
      );
      setChats(updatedChats);
    } catch (err) {
      setError('Failed to send message: ' + err.message);
    }
  };

  const handleStartNewChat = async (userId, userName) => {
    try {
      await chatService.startChat(userId);
      
      // Refresh chats to get the updated chat with metadata
      const updatedChats = await chatService.getUserChats();
      setChats(updatedChats);
      
      // Find the newly created/existing chat
      const newChat = updatedChats.find(c => c.otherUserId === userId);
      if (newChat) {
        setSelectedChat(newChat);
      }
      
      setShowSearch(false);
      setSearchResults([]);
      setSearchUser('');
    } catch (err) {
      setError('Failed to start chat: ' + err.message);
    }
  };

  const handleSearchUsers = async (query) => {
    setSearchUser(query);
    if (query.trim()) {
      try {
        const results = await userService.searchUsers(query);
        setSearchResults(results);
      } catch (err) {
        setError('Failed to search users: ' + err.message);
      }
    } else {
      setSearchResults([]);
    }
  };

  if (loading) {
    return <div className="chat-container"><div className="loading">Loading chats...</div></div>;
  }

  return (
    <div className="chat-container">
      <div className="chat-list">
        <div className="chat-header">
          <h2>Messages</h2>
          <button
            className="new-chat-btn"
            onClick={() => setShowSearch(!showSearch)}
          >
            + New Chat
          </button>
        </div>

        {showSearch && (
          <div className="search-section">
            <input
              type="text"
              placeholder="Search users..."
              value={searchUser}
              onChange={(e) => handleSearchUsers(e.target.value)}
              className="search-input"
            />
            <div className="search-results">
              {searchResults.map((user) => (
                <div key={user.id} className="search-result-item">
                  <div className="user-info">
                    <h4>{user.username}</h4>
                    <p>{user.bio}</p>
                  </div>
                  <button
                    onClick={() => handleStartNewChat(user.id, user.username)}
                    className="start-chat-btn"
                  >
                    Chat
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="chats-list">
          {chats.length === 0 ? (
            <div className="no-chats">No chats yet. Start a new conversation!</div>
          ) : (
            chats.map((chat) => (
              <div
                key={chat.id}
                className={`chat-item ${selectedChat?.id === chat.id ? 'active' : ''}`}
                onClick={() => setSelectedChat(chat)}
              >
                <div className="chat-item-header">
                  <h4>{chat.otherUserName}</h4>
                  {chat.unreadCount > 0 && (
                    <span className="unread-badge">{chat.unreadCount}</span>
                  )}
                </div>
                <p className="chat-preview">{chat.lastMessage || 'No messages yet'}</p>
                {chat.lastMessageTime && (
                  <small>{new Date(chat.lastMessageTime).toLocaleString()}</small>
                )}
              </div>
            ))
          )}
        </div>
      </div>

      <div className="chat-main">
        {selectedChat ? (
          <>
            <div className="chat-header-top">
              <h3>{selectedChat.otherUserName}</h3>
            </div>

            <div className="messages-container">
              {messages.length === 0 ? (
                <div className="no-messages">No messages yet. Start the conversation!</div>
              ) : (
                messages.map((msg) => {
                  const currentUserId = () => {
                    try {
                      const user = JSON.parse(localStorage.getItem('user') || '{}');
                      return user.id;
                    } catch {
                      return null;
                    }
                  };
                  return (
                    <div
                      key={msg.id}
                      className={`message ${msg.senderId === currentUserId() ? 'sent' : 'received'}`}
                    >
                      <div className="message-content">
                        <p>{msg.content}</p>
                        <small>{new Date(msg.timestamp).toLocaleTimeString()}</small>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            <form onSubmit={handleSendMessage} className="message-input-form">
              <input
                type="text"
                value={messageContent}
                onChange={(e) => setMessageContent(e.target.value)}
                placeholder="Type a message..."
                className="message-input"
              />
              <button type="submit" className="send-btn">Send</button>
            </form>
          </>
        ) : (
          <div className="no-chat-selected">
            <p>Select a chat to start messaging</p>
          </div>
        )}
      </div>

      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default Chat;
