const express = require('express');
const postRouter = express.Router();
const axios = require('axios');
const { PostModel } = require('../models/post.model');

// Route to fetch posts for a specific user from the external API
postRouter.get('/:userId', async (req, res) => {
  const userId = req.params.userId;
  try {
    const response = await axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
    const posts = response.data;
    res.json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
});

// Route to add posts for a specific user to the database
postRouter.post('/:userId', async (req, res) => {
  const userId = req.params.userId;
  const postData = req.body;
  try {
    const newPosts = await PostModel.create(postData);
    res.status(201).json(newPosts);
  } catch (error) {
    console.error('Error adding posts:', error);
    res.status(500).json({ error: 'Failed to add posts' });
  }
});

module.exports = {postRouter};
