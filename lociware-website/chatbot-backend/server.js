import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import './Chatbot.css';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [userMessage, setUserMessage] = useState('');
  const [currentStep, setCurrentStep] = useState('greeting'); // State machine for steps
  const [userData, setUserData] = useState({}); // Store user input
  const messagesEndRef = useRef(null);

  // Auto-scroll to the bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
    // Initial greeting message
    if (messages.length === 0) {
      setMessages([
        {
          id: 1,
          text: 'Hi there 👋 We typically reply within a few minutes. Do you want some assistance?',
          sender: 'bot',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          avatar: '/lociware_logo2.png',
          buttons: [
            { text: 'Yes, please!', value: 'yes' },
            { text: 'No, thanks.', value: 'no' },
          ],
        },
      ]);
    }
  }, [messages.length]);

  const toggleChat = () => setIsOpen(!isOpen);

  const handleSendMessage = (e) => {
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
    handleChatFlow(userMessage);
  };

  const handleButtonClick = (value) => {
    const buttonMessage = {
      id: messages.length + 1,
      text: value,
      sender: 'user',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages((prevMessages) => [...prevMessages, buttonMessage]);
    handleChatFlow(value);
  };

  const handleChatFlow = (input) => {
    let newMessage = { id: messages.length + 1, sender: 'bot', time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), avatar: '/lociware_logo2.png' };
    let buttons = [];

    switch (currentStep) {
      case 'greeting':
        if (input === 'yes' || input.toLowerCase() === 'yes, please!') {
          newMessage.text = 'Great! In that case, let’s get your contact information. Please provide us with your name?';
          setCurrentStep('ask_name');
        } else if (input === 'no' || input.toLowerCase() === 'no, thanks.') {
          newMessage.text = 'Okay, feel free to reach out if you need assistance later! 😊';
          setCurrentStep('end');
        }
        break;

      case 'ask_name':
        userData.name = input;
        newMessage.text = `Few more things! What is your phone number, ${userData.name}? 😊`;
        setCurrentStep('ask_phone');
        break;

      case 'ask_phone':
        userData.phone = input;
        newMessage.text = `Great! Please provide us with your email address, ${userData.name}? 😊`;
        setCurrentStep('ask_email');
        break;

      case 'ask_email':
        userData.email = input;
        newMessage.text = `Great! Let’s find out how we can help you, ${userData.name}. 😊 Please mention the service(s) you require, or click the options listed:`;
        buttons = [
          { text: '1. General Inquiry', value: 'general_inquiry' },
          { text: '2. Booking Request', value: 'booking_request' },
          { text: '3. Support', value: 'support' },
        ];
        setCurrentStep('ask_service');
        break;

      case 'ask_service':
        userData.service = input;
        newMessage.text = `Thank you, ${userData.name}! We’ve received your details:\n- Name: ${userData.name}\n- Phone: ${userData.phone}\n- Email: ${userData.email}\n- Service: ${input}. We’ll get back to you soon! 😊`;
        setCurrentStep('end');
        break;

      case 'end':
        newMessage.text = 'If you need more help, feel free to start again! 😊';
        setCurrentStep('greeting'); // Reset for new conversation
        break;

      default:
        newMessage.text = 'Sorry, I didn’t understand. Do you want some assistance?';
        buttons = [
          { text: 'Yes, please!', value: 'yes' },
          { text: 'No, thanks.', value: 'no' },
        ];
        setCurrentStep('greeting');
    }

    if (buttons.length > 0) newMessage.buttons = buttons;
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setUserData({ ...userData }); // Update userData state
  };

  return (
    <div className="chatbot-container">
      <motion.button
        className="chat-toggle"
        onClick={toggleChat}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        💬
      </motion.button>

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
          <div ref={messagesEndRef} />
        </div>

        <form className="chat-input" onSubmit={handleSendMessage}>
          <input
            type="text"
            placeholder="Enter your message..."
            value={userMessage}
            onChange={(e) => setUserMessage(e.target.value)}
          />
          <button type="submit" className="send-btn">
            ✈️
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default Chatbot;