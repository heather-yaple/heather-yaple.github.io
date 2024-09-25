const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB (replace <dbURI> with your MongoDB connection string)
mongoose.connect('<dbURI>', { useNewUrlParser: true, useUnifiedTopology: true });
// About Schema
const aboutSchema = new mongoose.Schema({
    title: String,
    description: String,
    image: String,
  });
  
  const About = mongoose.model('About', aboutSchema);
  
  // Get About Info
app.get('/api/about', async (req, res) => {
    const aboutInfo = await About.findOne(); // Assuming there's only one entry
    res.json(aboutInfo);
  });
  
// Portfolio Schema
const portfolioSchema = new mongoose.Schema({
    title: String,
    description: String,
    image: String,
    link: String,
  });
  
  const PortfolioItem = mongoose.model('PortfolioItem', portfolioSchema);

  // Get Portfolio Items
app.get('/api/portfolio', async (req, res) => {
    const items = await PortfolioItem.find();
    res.json(items);
  });

  
// Define a Blog Post schema
const blogPostSchema = new mongoose.Schema({
  title: String,
  summary: String,
  content: String,
  date: { type: Date, default: Date.now },
});

const BlogPost = mongoose.model('BlogPost', blogPostSchema);

// Get all blog posts
app.get('/api/posts', async (req, res) => {
  const posts = await BlogPost.find();
  res.json(posts);
});

// Create a new blog post
app.post('/api/posts', async (req, res) => {
  const newPost = new BlogPost(req.body);
  await newPost.save();
  res.json(newPost);
});

// Contact Schema
const contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    message: String,
  });
  
  const ContactMessage = mongoose.model('ContactMessage', contactSchema);

  // Handle Contact Form Submission
app.post('/api/contact', async (req, res) => {
    const newMessage = new ContactMessage(req.body);
    await newMessage.save();
    res.status(201).json(newMessage); // Respond with the created message
  });

  
// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
