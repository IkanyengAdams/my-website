import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './Chatbot.css';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "Hi there 👋", sender: 'bot', time: 'Just now', avatar: '/avatar.jpg' }, // Replace with your avatar image path in public folder
    { id: 2, text: "We typically reply within a few minutes.", sender: 'bot', time: 'Just now' },
  ]);
  const [userMessage, setUserMessage] = useState('');
  const [showPrevious, setShowPrevious] = useState(false);

  const toggleChat = () => setIsOpen(!isOpen);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!userMessage.trim()) return;

    // Add user message
    setMessages([...messages, { id: messages.length + 1, text: userMessage, sender: 'user', time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]);

    // Simulate bot response (for demo, you can replace with API call later)
    setTimeout(() => {
      setMessages(prevMessages => [
        ...prevMessages,
        { 
          id: prevMessages.length + 1, 
          text: "All right! If you need anything, let us know. We’re certain there’s a lot you could be doing better to take your business to the next level. 😊", 
          sender: 'bot', 
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), 
          avatar: '/avatar.jpg' 
        }
      ]);
    }, 1000); // Simulate a 1-second delay for bot response

    setUserMessage('');
  };

  const handlePreviousMessages = () => setShowPrevious(!showPrevious);

  // Simulate a previous message for demo
  const previousMessages = [
    { id: 3, text: "Hi there, would you like to take a closer look at our services? 👀", sender: 'bot', time: '5+', avatar: '/avatar.jpg' },
    { id: 4, text: "No, thanks.", sender: 'user', time: '5+' },
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
        💬 Chat with us
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
          <img src="/avatar.jpg" alt="Bot Avatar" className="avatar" /> {/* Replace with your avatar image path in public folder */}
          <div className="header-text">
            <h3>Hi there 👋</h3>
            <p>We typically reply within a few minutes.</p>
          </div>
          <button className="options-btn">⋮</button>
        </div>

        <div className="chat-messages">
          {showPrevious && previousMessages.map(message => (
            <motion.div 
              key={message.id}
              className={`message ${message.sender === 'bot' ? 'bot' : 'user'}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {message.sender === 'bot' && <img src="/avatar.jpg" alt="Bot Avatar" className="message-avatar" />}
              <div className="message-content">
                <p>{message.text}</p>
                <span className="message-time">{message.time}</span>
              </div>
            </motion.div>
          ))}
          {messages.map(message => (
            <motion.div 
              key={message.id}
              className={`message ${message.sender === 'bot' ? 'bot' : 'user'}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {message.sender === 'bot' && <img src="/avatar.jpg" alt="Bot Avatar" className="message-avatar" />}
              <div className="message-content">
                <p>{message.text}</p>
                <span className="message-time">{message.time}</span>
              </div>
            </motion.div>
          ))}
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
          />
          <button type="submit" className="send-btn">😊</button>
        </form>
        <p className="powered-by">POWERED BY Tidio</p>
      </motion.div>
    </div>
  );
};

export default Chatbot;