// TODO: change req.body.userId to req.body.id

const { json } = require('express');
const express = require('express');
const Post = require('../models/Post');
const User = require('../models/User');
const router = express.Router();
const bcrypt = require('bcrypt');

// READ an existing user's info
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const {password, ...others} = user._doc;
    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err);
  }
})

// UPDATE an existing user's info
router.put('/:id', async (req, res) => {
  if (req.body.userId === req.params.id) {
    try {
      await User.findById(req.params.id);
      try {
        if (req.body.password) {
          const salt = await bcrypt.genSalt();
          req.body.password = await bcrypt.hash(req.body.password, salt);
        }
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {new: true});
        res.status(200).json(user);
      } catch (err) {
        res.status(500).json(err);
      }
    } catch (err) {
      res.status(404).json("User not found...");
    }
  } else {
    res.status(401).json("You can only change your own account...");
  }
});

// DELETE an existing user
router.delete('/:id', async (req, res) => {
  if (req.body.userId === req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      try {
        // await Post.deleteMany({username: user.username});
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json(user);
      } catch (err) {
        res.status(500).json(err);
      }
    } catch (err) {
      res.status(404).json("User not found...");
    }
  } else {
    res.status(401).json('Can only delete your own account...');
  }
});

module.exports = router;