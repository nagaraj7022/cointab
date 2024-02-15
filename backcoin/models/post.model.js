const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  userId: mongoose.Types.ObjectId,
  title: String,
  body: String,
});

const PostModel = mongoose.model('Post', postSchema);

module.exports={PostModel}
