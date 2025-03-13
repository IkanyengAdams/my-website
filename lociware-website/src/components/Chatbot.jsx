import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import './Chatbot.css';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: 'Hi there 👋', sender: 'bot', time: 'Just now', avatar: '/lociware_logo2.png' },
    { id: 2, text: 'We typically reply within a few minutes.', sender: 'bot', time: 'Just now' },
  ]);
  const [userMessage, setUserMessage] = useState('');
  const [showPrevious, setShowPrevious] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId] = useState(Date.now().toString()); // Unique session ID
  const messagesEndRef = useRef(null); // For auto-scrolling

  // Auto-scroll to the bottom when messages change
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  useEffect(() => {
    // Initial message from bot
    fetchChatResponse('');
  }, [sessionId]);

  const toggleChat = () => setIsOpen(!isOpen);

  const fetchChatResponse = async (message) => {
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, sessionId }),
      });
      const data = await response.json();

      if (response.ok) {
        const botResponse = {
          id: messages.length + 1,
          text: data.text, // Changed from data.reply to data.text
          sender: 'bot',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          avatar: '/lociware_logo2.png',
          buttons: data.buttons || [],
        };
        setMessages((prevMessages) => [...prevMessages, botResponse]);
      } else {
        throw new Error(data.error || 'Failed to get response');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage = {
        id: messages.length + 1,
        text: "Sorry, I couldn’t process your request. Please try again later.",
        sender: 'bot',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        avatar: '/lociware_logo2.png',
      };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!userMessage.trim()) return;

    const newUserMessage = {
      id: messages.length + 1,
      text: userMessage,
      sender: 'user',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages((prevMessages) => [...prevMessages, newUserMessage]);
    setUserMessage('');
    await fetchChatResponse(userMessage);
  };

  const handleButtonClick = async (value) => {
    const buttonMessage = {
      id: messages.length + 1,
      text: value,
      sender: 'user',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages((prevMessages) => [...prevMessages, buttonMessage]);
    await fetchChatResponse(value);
  };

  const handlePreviousMessages = () => setShowPrevious(!showPrevious);

  // Simulate a previous message for demo
  const previousMessages = [
    { id: 3, text: 'Hi there, would you like to take a closer look at our services? 👀', sender: 'bot', time: '5+', avatar: '/lociware_logo2.png' },
    { id: 4, text: 'No, thanks.', sender: 'user', time: '5+' },
  ];

  return (
    <div className="chatbot-container">
      {/* Chatbot Toggle Button */}
      <motion.button
        className="chat-toggle"
        onClick={toggleChat}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        💬
      </motion.button>

      {/* Chat Window */}
      <motion.div
        className={`chat-window ${isOpen ? 'open' : ''}`}
        initial={{ opacity: 0, x: 300 }}
        animate={{ opacity: isOpen ? 1 : 0, x: isOpen ? 0 : 300 }}
        transition={{ duration: 0.5 }}
      >
        <div className="chat-header">
          <button className="close-btn" onClick={toggleChat}>×</button>
          <img src="/lociware_logo2.png" alt="Bot Avatar" className="avatar" />
          <div className="header-text">
            <h3>Hi there 👋</h3>
            <p>We typically reply within a few minutes.</p>
          </div>
          <button className="options-btn">⋮</button>
        </div>

        <div className="chat-messages">
          {showPrevious &&
            previousMessages.map((message) => (
              <motion.div
                key={message.id}
                className={`message ${message.sender === 'bot' ? 'bot' : 'user'}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {message.sender === 'bot' && (
                  <img src="/lociware_logo2.png" alt="Bot Avatar" className="message-avatar" />
                )}
                <div className="message-content">
                  <p>{message.text}</p>
                  <span className="message-time">{message.time}</span>
                </div>
              </motion.div>
            ))}
          {messages.map((message) => (
            <motion.div
              key={message.id}
              className={`message ${message.sender === 'bot' ? 'bot' : 'user'}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {message.sender === 'bot' && (
                <img src="/lociware_logo2.png" alt="Bot Avatar" className="message-avatar" />
              )}
              <div className="message-content">
                <p>{message.text}</p>
                <span className="message-time">{message.time}</span>
                {message.buttons && message.buttons.length > 0 && (
                  <div className="message-buttons">
                    {message.buttons.map((button, index) => (
                      <button
                        key={index}
                        onClick={() => handleButtonClick(button.value)}
                        className="chat-button"
                      >
                        {button.text}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
          {isLoading && (
            <motion.div
              className="message bot"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <img src="/lociware_logo2.png" alt="Bot Avatar" className="message-avatar" />
              <div className="message-content">
                <p>Typing...</p>
              </div>
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <button className="previous-messages" onClick={handlePreviousMessages}>
          {showPrevious ? 'Hide Previous Messages ⏫' : 'Previous Messages ⏬'}
        </button>

        <form className="chat-input" onSubmit={handleSendMessage}>
          <input
            type="text"
            placeholder="Enter your message..."
            value={userMessage}
            onChange={(e) => setUserMessage(e.target.value)}
            className="message-input"
            disabled={isLoading}
          />
          <button type="submit" className="send-btn" disabled={isLoading}>
            ✈️
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default Chatbot;