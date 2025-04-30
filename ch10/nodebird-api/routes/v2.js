const express = require('express');

const {verifyToken, apiLimiter } =require('../middlewares');
const {createToken, tokenTest, getMyPosts, getPostsByHashtag, getFollowing, getFollower} = require('../controllers/v2');

const router = express.Router();

// post /v2/token
router.post('/token', apiLimiter, createToken);

// post /v2/test
router.get('/test', apiLimiter, verifyToken, tokenTest);

//get /v2/posts/my
router.get('/posts/my', apiLimiter, verifyToken, getMyPosts);

//get v2/posts/hashtag/:title
router.get('/posts/hashtag/:title', apiLimiter, verifyToken, getPostsByHashtag);

//get v2/following 내가 팔로우하는 목록 불러오기
router.get('/following', apiLimiter, verifyToken, getFollowing);

// get v2/follower 나를 팔로우하는 목록 불러오기
router.get('/follower', apiLimiter, verifyToken, getFollower );

module.exports = router;