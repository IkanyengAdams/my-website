import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Chatbot.css';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]); // Start with empty array to avoid preloaded duplicates
  const [userMessage, setUserMessage] = useState('');
  const [showPrevious, setShowPrevious] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId] = useState(Date.now().toString());
  const messagesEndRef = useRef(null);
  const [initialMessageSent, setInitialMessageSent] = useState(false); // Ensure single initial message

  // Auto-scroll to the bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  useEffect(() => {
    // Send initial message only once when the component mounts
    if (!initialMessageSent) {
      console.log('Sending initial message...');
      fetchChatResponse('');
      setInitialMessageSent(true);
    }
  }, [initialMessageSent]); // Depend only on initialMessageSent to avoid re-runs

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
      console.log('API Response:', data); // Debug API response

      if (response.ok) {
        // Check if the response is a duplicate by comparing with the last message
        const lastMessage = messages[messages.length - 1];
        const isDuplicate = lastMessage && lastMessage.text === data.text && lastMessage.sender === 'bot';
        if (!isDuplicate) {
          const botResponse = {
            id: messages.length + 1,
            text: data.text,
            sender: 'bot',
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            avatar: '/lociware_logo2.png',
            buttons: data.buttons || [],
          };
          setMessages((prevMessages) => [...prevMessages, botResponse]);
        } else {
          console.log('Duplicate bot message detected, skipping...');
        }
      } else {
        throw new Error(data.error || 'Failed to get response');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage = {
        id: messages.length + 1,
        text: 'Sorry, I couldn’t process your request. Please try again later.',
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
    // Check for duplicate text to avoid redundant messages
    const lastMessage = messages[messages.length - 1];
    if (!lastMessage || lastMessage.text !== userMessage) {
      setMessages((prevMessages) => [...prevMessages, newUserMessage]);
      setUserMessage('');
      await fetchChatResponse(userMessage);
    } else {
      console.log('Duplicate user message detected, skipping...');
    }
  };

  const handleButtonClick = async (value) => {
    const buttonMessage = {
      id: messages.length + 1,
      text: value,
      sender: 'user',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    // Check for duplicate button value
    const lastMessage = messages[messages.length - 1];
    if (!lastMessage || lastMessage.text !== value) {
      setMessages((prevMessages) => [...prevMessages, buttonMessage]);
      await fetchChatResponse(value);
    } else {
      console.log('Duplicate button message detected, skipping...');
    }
  };

  const handlePreviousMessages = () => setShowPrevious(!showPrevious);

  const previousMessages = [
    { id: 3, text: 'Hi there, would you like to take a closer look at our services?', sender: 'bot', time: '5+', avatar: '/lociware_logo2.png' },
    { id: 4, text: 'No, thanks.', sender: 'user', time: '5+' },
  ];

  // Animation variants
  const messageVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
  };

  const buttonVariants = {
    hover: { scale: 1.05, transition: { duration: 0.3 } },
    tap: { scale: 0.95 },
  };

  return (
    <div className="chatbot-container">
      {/* Chatbot Toggle Button */}
      <motion.button
        className="chat-toggle"
        onClick={toggleChat}
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
        }}
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
      >
        <i className="fas fa-comments"></i>
      </motion.button>

      {/* Chat Window */}
      <motion.div
        className={`chat-window ${isOpen ? 'open' : ''}`}
        initial={{ opacity: 0, x: 300 }}
        animate={{ opacity: isOpen ? 1 : 0, x: isOpen ? 0 : 300 }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
      >
        <div className="chat-header">
          <motion.button
            className="close-btn"
            onClick={toggleChat}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <i className="fas fa-times"></i>
          </motion.button>
          <img src="/lociware_logo2.png" alt="Bot Avatar" className="avatar" />
          <div className="header-text">
            <h3>Hi there</h3>
            <p>We typically reply within a few minutes.</p>
          </div>
          <motion.button
            className="options-btn"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <i className="fas fa-ellipsis-v"></i>
          </motion.button>
        </div>

        <div className="chat-messages">
          {showPrevious && (
            <AnimatePresence>
              {previousMessages.map((message) => (
                <motion.div
                  key={message.id}
                  className={`message ${message.sender === 'bot' ? 'bot' : 'user'}`}
                  variants={messageVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <div className="message-wrapper">
                    {message.sender === 'bot' && (
                      <img src="/lociware_logo2.png" alt="Bot Avatar" className="message-avatar" />
                    )}
                    <div className="message-content">
                      <div className="message-text">{message.text}</div>
                      <div className="message-time">{message.time}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          )}
          <AnimatePresence>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                className={`message ${message.sender === 'bot' ? 'bot' : 'user'}`}
                variants={messageVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <div className="message-wrapper">
                  {message.sender === 'bot' && (
                    <img src="/lociware_logo2.png" alt="Bot Avatar" className="message-avatar" />
                  )}
                  <div className="message-content">
                    <div className="message-text">{message.text}</div>
                    <div className="message-time">{message.time}</div>
                    {message.buttons && message.buttons.length > 0 && (
                      <div className="message-buttons">
                        {message.buttons.map((button, index) => (
                          <motion.button
                            key={index}
                            onClick={() => handleButtonClick(button.value)}
                            className="chat-button"
                            variants={buttonVariants}
                            whileHover="hover"
                            whileTap="tap"
                          >
                            {button.text}
                          </motion.button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          {isLoading && (
            <motion.div
              className="message bot"
              variants={messageVariants}
              initial="hidden"
              animate="visible"
            >
              <div className="message-wrapper">
                <img src="/lociware_logo2.png" alt="Bot Avatar" className="message-avatar" />
                <div className="message-content">
                  <div className="message-text">Typing...</div>
                </div>
              </div>
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <motion.button
          className="previous-messages"
          onClick={handlePreviousMessages}
          whileHover={{ scale: 1.05, backgroundColor: '#eee' }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <i className="fas fa-history"></i> {showPrevious ? 'Hide Previous Messages' : 'Previous Messages'}
        </motion.button>

        <form className="chat-input" onSubmit={handleSendMessage}>
          <input
            type="text"
            placeholder="Enter your message..."
            value={userMessage}
            onChange={(e) => setUserMessage(e.target.value)}
            className="message-input"
            disabled={isLoading}
          />
          <motion.button
            type="submit"
            className="send-btn"
            disabled={isLoading}
            whileHover={{ scale: 1.1, color: '#45a049' }}
            whileTap={{ scale: 0.9 }}
          >
            <i className="fas fa-paper-plane"></i>
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default Chatbot;