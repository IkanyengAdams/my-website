const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const nodemailer = require('nodemailer');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// In-memory session storage for chatbot (replace with database for production)
const sessions = {};

// Rate limiting
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 10, // 10 requests per minute per IP
  message: 'Too many requests from this IP, please try again later.',
});
app.use('/api/send-email', limiter);

// Configure Gemini API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

// Chatbot endpoint with structured flow
app.post('/api/chat', async (req, res) => {
  const { message, sessionId } = req.body;
  let session = sessions[sessionId] || { step: 'greeting', data: {} };

  try {
    let response = { text: '', buttons: [] };

    switch (session.step) {
      case 'greeting':
        response.text = 'Hi there 👋 We typically reply within a few minutes.';
        response.buttons = [
          { text: 'Yes, please!', value: 'yes' },
          { text: 'No, thanks.', value: 'no' },
        ];
        session.step = 'initial_question';
        break;

      case 'initial_question':
        if (message === 'yes') {
          response.text = 'Great! In that case, let’s get your contact information. Please provide us with your name?';
          session.step = 'ask_name';
        } else if (message === 'no') {
          response.text = 'Okay, feel free to reach out if you need assistance later! 😊';
          session.step = 'end';
        }
        break;

      case 'ask_name':
        session.data.name = message;
        response.text = `Few more things! What is your phone number, ${session.data.name}? 😊`;
        session.step = 'ask_phone';
        break;

      case 'ask_phone':
        session.data.phone = message;
        response.text = `Great! Please provide us with your email address, ${session.data.name}? 😊`;
        session.step = 'ask_email';
        break;

      case 'ask_email':
        session.data.email = message;
        response.text = `Great! Let’s find out how we can help you, ${session.data.name}. 😊 Please mention the service(s) you require, or click the options listed:`;
        response.buttons = [
          { text: '1. General Inquiry', value: 'general_inquiry' },
          { text: '2. Booking Request', value: 'booking_request' },
          { text: '3. Support', value: 'support' },
        ];
        session.step = 'ask_service';
        break;

      case 'ask_service':
        session.data.service = message;
        response.text = `Thank you, ${session.data.name}! We’ve received your details:\n- Name: ${session.data.name}\n- Phone: ${session.data.phone}\n- Email: ${session.data.email}\n- Service: ${message}. We’ll get back to you soon! 😊`;
        session.step = 'end';
        // Optional: Send email to info@lociware.co.za
        const mailOptions = {
          from: '"Lociware Info" <info@lociware.co.za>',
          to: 'info@lociware.co.za',
          replyTo: 'info@lociware.co.za',
          subject: `New Chat Submission from ${session.data.name}`,
          text: `
            Name: ${session.data.name}
            Phone: ${session.data.phone}
            Email: ${session.data.email}
            Service: ${message}
          `,
          html: `
            <h3>New Chat Submission</h3>
            <p><strong>Name:</strong> ${session.data.name}</p>
            <p><strong>Phone:</strong> ${session.data.phone}</p>
            <p><strong>Email:</strong> ${session.data.email}</p>
            <p><strong>Service:</strong> ${message}</p>
          `,
        };
        await transporter.sendMail(mailOptions);
        break;

      case 'end':
        response.text = 'If you need more help, feel free to start again! 😊';
        break;

      default:
        response.text = 'Sorry, I didn’t understand. How can I assist you?';
        response.buttons = [
          { text: 'Yes, please!', value: 'yes' },
          { text: 'No, thanks.', value: 'no' },
        ];
        session.step = 'initial_question';
    }

    sessions[sessionId] = session;
    res.json(response);
  } catch (error) {
    console.error('Error generating response:', error);
    res.status(500).json({ error: 'Failed to generate response' });
  }
});

// Configure Nodemailer with your Gmail
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // Your personal Gmail (e.g., your-personal@gmail.com)
    pass: process.env.EMAIL_PASS, // Your Gmail app password
  },
});

// CAPTCHA endpoint
app.get('/api/captcha', (req, res) => {
  const num1 = Math.floor(Math.random() * 10) + 1;
  const num2 = Math.floor(Math.random() * 10) + 1;
  res.json({ num1, num2, id: Date.now() });
});

// Email endpoint
app.post('/api/send-email', async (req, res) => {
  const { name, email, phone, option, message, captchaAnswer, captchaId } = req.body;

  try {
    const { num1, num2 } = JSON.parse(Buffer.from(captchaId, 'base64').toString());
    if (parseInt(captchaAnswer) !== num1 + num2) {
      return res.status(400).json({ error: 'Invalid CAPTCHA' });
    }

    const mailOptions = {
      from: '"Lociware Info" <info@lociware.co.za>',
      to: 'info@lociware.co.za',
      replyTo: 'info@lociware.co.za',
      subject: `New Contact Form Submission: ${option}`,
      text: `
        Name: ${name}
        Email: ${email}
        Phone: ${phone}
        Option: ${option}
        Message: ${message}
      `,
      html: `
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Option:</strong> ${option}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Failed to send email' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});