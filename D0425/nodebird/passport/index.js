const passport = require('passport');
const local = require('./localStrategy');
const kakao = require('./kakaoStrategy');
const User = require('../models/user');

module.exports = () =>{
    passport.serializeUser((user, done)=>{ // 로그인시 실행 되며, req.session 객체에 어떤 데이터를 저장할지 정하는 메서드
        done(null, user.id);// 첫번째 - 에러 발생시 사용, 두번째 - 저장하고 싶은 데이터 
    });

    passport.deserializeUser((id, done)=> { // 매 요청시 실행 passport.session 미들웨어가 이 메서드를 호출 
        User.findOne({where: {id}})
        .then(user=>done(null,user)) // req.user에 로그인한 사용자 정보 저장
        .catch(err=>done(err));
    });

    local();
    kakao();
}