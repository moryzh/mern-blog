const express = require('express');
const Post = require('../models/Post');
const router = express.Router();

// CREATE a new post
router.post('/create', async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

// READ an existing post
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
})

// UPDATE an existing post
router.put('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.username === req.body.username) {
      try {
        const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, {new: true});
        res.status(200).json(updatedPost);
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("Can only edit your own posts...");
    }
  } catch (err) {
    res.status(404).json("Post not found...");
  }
});

// DELETE an existing post
router.delete('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.username === req.body.username) {
      try {
        const result = await Post.findByIdAndDelete(req.params.id);
        res.status(200).json(result);
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("Can only delete your own posts...");
    }
  } catch (err) {
    res.status(404).json("Post not found...");
  }
});

// READ existing posts that match any part of the queries
router.get('/', async (req, res) => {
  const username = req.query.username;
  const catname = req.query.cat;
  try {
    let posts;
    if (username || catname) {
      if (username) posts = await Post.find({username});
      if (catname) {
        posts = await Post.find({
          categories: {$in: [catname]}
        });
      }
    } else {
      posts = await Post.find();
    }
    
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
})

module.exports = router;