const express = require("express");
const { isLoggedIn, isNotLoggedIn } = require("../middlewares");
const {renderProfile, renderJoin, renderMain, renderHashtag} = require('../controllers/page');
const router = express.Router();

router.use((req, res, next) => {
  res.locals.user = req.user;
  res.locals.followerCount = req.user?.Followers?.length || 0;
  res.locals.followingCount = req.user?.Followings?.length || 0;
  res.locals.followingIdList = req.user?.Followings?.map(f=>f.id)||[]; // 팔로워 아이디 리스트에 게시글 작성자의 아이디가 존재 하지 않으면 팔로우 버튼을 보여주기 위해 삽입
  next();
});

router.get("/profile", isLoggedIn, renderProfile);

router.get("/join", isNotLoggedIn, renderJoin);

router.get("/", renderMain);

router.get('/hashtag', renderHashtag)

module.exports = router;
