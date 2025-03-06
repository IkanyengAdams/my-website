const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const nodemailer = require('nodemailer');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Rate limiting middleware (e.g., 10 requests per IP per minute)
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 10, // Limit each IP to 10 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
});
app.use('/api/send-email', limiter); // Apply to email endpoint only

// Configure Gemini API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

// Endpoint to handle chatbot queries
app.post('/api/chat', async (req, res) => {
  const { message } = req.body;
  try {
    const result = await model.generateContent(message);
    const response = await result.response;
    res.json({ reply: response.text() });
  } catch (error) {
    console.error('Error generating response:', error);
    res.status(500).json({ error: 'Failed to generate response' });
  }
});

// Configure Nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Endpoint to generate CAPTCHA
app.get('/api/captcha', (req, res) => {
  const num1 = Math.floor(Math.random() * 10) + 1;
  const num2 = Math.floor(Math.random() * 10) + 1;
  res.json({ num1, num2, id: Date.now() });
});

// Endpoint to handle contact form email
app.post('/api/send-email', async (req, res) => {
  const { name, email, phone, option, message, captchaAnswer, captchaId } = req.body;

  try {
    const { num1, num2 } = JSON.parse(Buffer.from(captchaId, 'base64').toString());
    if (parseInt(captchaAnswer) !== num1 + num2) {
      return res.status(400).json({ error: 'Invalid CAPTCHA' });
    }

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'ikanyengadams2@gmail.com',
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