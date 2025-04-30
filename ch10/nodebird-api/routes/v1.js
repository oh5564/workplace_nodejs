const express = require('express');

const {verifyToken, deprecated} = require('../middlewares');
const {createToken, tokenTest, getMyPosts, getPostsByHashtag} = require('../controllers/v1');

const router = express.Router();

router.use(deprecated);
// post /v1/token
router.post('/token', createToken);

// post /v1/test
router.get('/test', verifyToken, tokenTest);

// get /v1/posts/my
router.get('/posts/my', verifyToken, getMyPosts);

// get /v1/posts/hashtag/:title
router.get('/posts/hashtag/:title', verifyToken, getPostsByHashtag);

module.exports = router;