const express = require("express");
const {
  getMyPosts,
  searchByHashtag,
  renderMain,
  getFollowing,
  getFollower,
} = require("../controllers");

const router = express.Router();

router.get("/myposts", getMyPosts);
router.get("/search/:hashtag", searchByHashtag);
router.get("/", renderMain);
router.get("/following", getFollowing);
router.get("/follower", getFollower);
// router.get('/test',test);

module.exports = router;
