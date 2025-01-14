const express = require('express');
const router = express.Router();

// get all posts / home feed
router.get('/', (req,res) => {
    const allPosts = Post.get({})
})

module.exports = router;
