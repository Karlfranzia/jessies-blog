const router = require('express').Router();
const { Comment, Post } = require('../../models/');



router.get('/posts', async (req, res) => {
    try {
      // Fetch posts from the database or another data source
      const posts = await Post.findAll();
  
      // Render the Handlebars view with the posts data
      res.render('homepage', { posts }); // Render 'homepage' view with 'posts' data
    } catch (error) {
      // Handle error
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });

  // POST route for submitting a post
router.post('/posts', async (req, res) => {

    try {
        const newPost = await Post.create({
            title: req.body.title,
            content: req.body.content,
          });
        res.status(200).json(newPost)
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

  router.delete('/comments/:id', (req, res) => {
    const commentId = req.params.id; // Get comment ID from URL params
    console.log(commentId)
    // Find comment by ID in database (assuming you have a Comment model)
    Comment.findByPk(commentId)
      .then(comment => {
        if (!comment) {
          // If comment not found, send error response
          return res.status(404).json({ error: 'Comment not found' });
        }
  
        // Delete comment from database
        comment.destroy()
          .then(() => {
            // Send success response
            res.status(200).json({ message: 'Comment deleted successfully' });
          })
          .catch(err => {
            // Send error response
            res.status(500).json({ error: 'Failed to delete comment' });
          });
      })
      .catch(err => {
        // Send error response
        res.status(500).json({ error: 'Failed to find comment' });
      });
  });

router.get('/comments', async (req, res) => {
    const commentData = await Comment.findAll().catch((err) => { 
        res.json(err);
      });
      // We use map() to iterate over dishData and then add .get({ plain: true }) each object to serialize it. 
      const comments = commentData.map((comment) => comment.get({ plain: true }));
      // We render the template, 'all', passing in dishes, a new array of serialized objects.
      res.json(comments)
});

router.post('/comments', async (req, res) => {
    try {
        const newComment = await Comment.create({
            content: req.body.content,
            postId: req.body.postId,
          });
        res.status(200).json(newComment)
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});



module.exports = router;