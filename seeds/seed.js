const sequelize = require('../config/connection');
const  User  = require('../models/User');
const  Comment  = require('../models/Comment');
const Post = require('../models/post')


const userData = require('./userData.json');
const commentData = require('./commentData.json')
const postData = require('./postData.json')

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  const comments = await Comment.bulkCreate(commentData, {
    individualHooks: true,
    returning: true,
  });

  const posts = await Post.bulkCreate(postData, {
    individualHooks: true,
    returning: true,
  });



  process.exit(0);
};

seedDatabase();
