const passport = require('passport');

const local = require('./localStrategy');
const User = require('../models/user');

module.exports = () => {
    passport.serializeUser((user, done) => {
        done(null,user.id); // 사용자 id를 세션에 저장
    });

    passport.deserializeUser((id,done) => { // 매 요청마다 실행됨
        User.findOne({where: {id}}) // db에서 사용자 조회
        .then(user => done(null,user)) // 조회된 사용자 정보를 req.user에 저장
        .catch(err => done(err));
    });

    local();
};