const jwt = require("jsonwebtoken");
const { Domain, User, Post, Hashtag } = require("../models");

exports.createToken = async (req, res) => {
  const { clientSecret } = req.body;
  try {
    const domain = await Domain.findOne({
      where: { clientSecret },
      include: {
        model: User,
        attribute: ["nick", "id"],
      },
    });
    if (!domain) {
      return res.status(401).json({
        code: 401,
        message: "등록되지 않은 도메인입니다. 먼저 도메인을 등록하세요",
      });
    }
    const token = jwt.sign(
      {
        id: domain.User.id,
        nick: domain.User.nick,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "30m", // 30분
        issuer: "nodebird",
      }
    );
    return res.json({
      code: 200,
      message: "토큰이 발급되었습니다.",
      token,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      code: 500,
      message: "서버 에러",
    });
  }
};

exports.tokenTest = (req, res) => {
  res.json(res.locals.decoded);
};

exports.getMyPosts = (req, res) => {
  Post.findAll({ where: { userId: res.locals.decoded.id } })
    .then((posts) => {
      console.log(posts);
      res.json({
        code: 200,
        payload: posts,
      });
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({
        code: 500,
        message: "서버 에러",
      });
    });
};

exports.getPostsByHashtag = async (req, res) => {
  try {
    const hashtag = await Hashtag.findOne({
      where: { title: req.params.title },
    });
    if (!hashtag) {
      return res.statur(404).json({
        code: 404,
        message: "검색 결과가 없습니다",
      });
    }
    const posts = await hashtag.getPosts();
    return res.json({
      code: 200,
      payload: posts,
    });
  } catch (err) {
    console.error(err);
    return res.statur(500).json({
      code: 500,
      message: "서버 에러",
    });
  }
};

exports.getFollowing = async (req,res) => {
  try {
    const user = await User.findOne({
      where : {id: res.locals.decoded.id}, // JWT에서 디코딩된 사용자 id
      include: {
        model:User,
        as: 'Followings', // 팔로잉 관계 (User 모델의 별칭) 내가 팔로잉한사람
        attribute: ['id','nick'],
      },
    });
    if(!user) {
      return res.status(404).json({
        code: 404,
        message: '사용자를 찾을 수 없습니다.',
      });
    }
    return res.json({
      code:200,
      payload: user.Followings, // 팔로잉 목록 반환
    });
  } catch(err) {
    console.error(err);
    return res.status(500).json({
      code: 500,
      message:'서버 에러',
    });
  }
};

exports.getFollower = async (req,res) => {
  try {
    const user = await User.findOne({
      where : {id: res.locals.decoded.id}, // JWT에서 디코딩된 사용자 id
      include: {
        model:User,
        as: 'Followers', // 나를 팔로우한 사람
        attribute: ['id','nick'],
      },
    });
    if(!user) {
      return res.status(404).json({
        code: 404,
        message: '사용자를 찾을 수 없습니다.',
      });
    }
    return res.json({
      code:200,
      payload: user.Followers, // 팔로워 목록 반환
    });
  } catch(err) {
    console.error(err);
    return res.status(500).json({
      code: 500,
      message:'서버 에러',
    });
  }

}
