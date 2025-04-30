const axios = require("axios");

const URL = process.env.API_URL;
axios.defaults.headers.origin = process.env.ORIGIN; // orign 헤더 추가

const request = async (req, api) => {
  try {
    if (!req.session.jwt) {
      // 세션에 토큰이 없으면 토큰 발급 시도
      const tokenResult = await axios.post(`${URL}/token`, {
        clientSecret: process.env.CLIENT_SECRET,
      });
      req.session.jwt=tokenResult.data.token; // 세션에 토큰 저장
    }
    return await axios.get(`${URL}${api}`, {
      headers: { authorization: req.session.jwt },
    }); // API 요청
  } catch (err) {
    if (err.response?.status === 419) {
      // 토큰 만료시 토큰 재발급 받기
      delete req.session.jwt;
      return request(req, api);
    } // 419 외의 다른 에러면
    throw err;
  }
};

exports.getMyPosts = async (req, res, next) => {
  try {
    const result = await request(req, "/posts/my");
    res.json(result.data);
  } catch (err) {
    console.error(err);
    next(err);
  }
};

exports.searchByHashtag = async (req, res, next) => {
  try {
    const result = await request(
      req,
      `/posts/hashtag/${encodeURIComponent(req.params.hashtag)}`,
    );
    res.json(result.data);
  } catch (err) {
    if (err.code) {
      console.error(err);
      next(err);
    }
  }
};

exports.getFollowing = async (req,res,next) => {
  try {
    const result = await request(req, '/following');
    res.json(result.data);
  } catch(err) {
    if(err.code) {
      console.error(err);
      next(err);
    }
  }
}

exports.getFollower = async(req,res,next) => {
  try {
    const result = await request(req, '/follower');
    res.json(result.data);
  } catch(err) {
    if(err.code) {
      console.error(err);
      next(err);
    }
  }
}

exports.test = async (req, res, next) => { // 토큰 테스트 라우터
  try {
    if (!req.session.jwt) { // 세션에 토큰이 없으면 토큰 발급 시도
      const tokenResult = await axios.post('http://localhost:8002/v1/token', {
        clientSecret: process.env.CLIENT_SECRET,
      });
      if (tokenResult.data?.code === 200) { // 토큰 발급 성공
        req.session.jwt = tokenResult.data.token; // 세션에 토큰 저장
      } else { // 토큰 발급 실패
        return res.json(tokenResult.data); // 발급 실패 사유 응답
      }
    }
    // 발급받은 토큰 테스트
    const result = await axios.get('http://localhost:8002/v1/test', {
      headers: { authorization: req.session.jwt },
    });
    return res.json(result.data);
  } catch (error) {
    console.error(error);
    if (error.response?.status === 419) { // 토큰 만료 시
      return res.json(error.response.data);
    }
    return next(error);
  }
};

exports.renderMain = (req,res) => {
  res.render('main', {key: process.env.CLIENT_SECRET});
};