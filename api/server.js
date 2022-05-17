// import dependencies
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const multer = require('multer');
const path = require('path');

// import models
const User = require('./models/User.js');
const Post = require('./models/Post.js');
const Category = require('./models/Category.js');

// import routes
const authRoute = require('./routes/auth.js');
const userRoute = require('./routes/user.js');
const postRoute = require('./routes/post.js');
const categoryRoute = require('./routes/category.js');

const app = express();

dotenv.config();
app.use(express.json());
app.use(cors());
app.use('/images', express.static(path.join(__dirname, '/images')));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./images");
  }, 
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  }
});

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('connected to db');
    app.listen('3001', () => {
      console.log('listening on port 3001...');
    });
  })
  .catch((err) => {console.log(err)});

// routing
const upload = multer({storage: storage});
app.post('/upload', upload.single("file"), (req, res) => {
  res.status(200).json("file uploaded...");
});

app.use('/auth', authRoute);
app.use('/user', userRoute);
app.use('/post', postRoute);
app.use('/category', categoryRoute);