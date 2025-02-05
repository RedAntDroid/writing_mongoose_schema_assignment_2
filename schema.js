const express = require('express');
const mongoose = require('mongoose');
const BlogPost = require('./schema'); 
const bodyParser = require('body-parser');
const { resolve } = require('path');
const {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost
} = require('./crud');

const app = express();
const port = 3010;

app.use(bodyParser.json());
app.use(express.static('static'));

// Connect to MongoDB
mongoose
  .connect('mongodb://localhost:27017/blog_app', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.error('Connection Error:', err));


app.get('/', (req, res) => {
  res.sendFile(resolve(__dirname, 'pages/index.html'));
});

app.get('/api/posts', getAllPosts);
app.get('/api/posts/:id', getPostById);
app.post('/api/posts', createPost);
app.put('/api/posts/:id', updatePost);
app.delete('/api/posts/:id', deletePost);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});