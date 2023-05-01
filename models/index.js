const User = require('./User');
const Post = require('./post');
const Comment = require('./Comment');



Comment.belongsTo(Post, {
    foreignKey: 'postId', // Foreign key in Comment model
    allowNull: false
  });
  Post.hasMany(Comment, {
    foreignKey: 'postId', // Foreign key in Comment model
  });

module.exports = { User, Post, Comment };
