const jwt = require("jsonwebtoken");
const rateLimit = require("express-rate-limit");
const cors = require("cors");
const { Domain } = require("../models");

exports.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(403).send("로그인 필요");
  }
};

exports.isNotLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    next();
  } else {
    const message = encodeURIComponent("로그인한 상태입니다.");
    res.redirect(`/?error=${message}`);
  }
};

exports.verifyToken = (req, res, next) => {
  try {
    res.locals.decoded = jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    return next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      // 유효기간 초과
      return res.status(419).json({
        code: 419,
        message: "토큰이 만료되었습니다",
      });
    }
    return res.status(401).json({
      code: 401,
      message: "유효하지 않은 토큰입니다",
    });
  }
};

// exports.apiLimiter = rateLimit({
//   windowMs: 60 * 1000, // 1분
//   max: 10,
//   handler(req, res) {
//     res.status(this.statusCode).json({
//       code: this.statusCode, // 기본값 428
//       message: "1분에 열 번만 요청할 수 있습니다.",
//     });
//   },
// });

// 미리 rateLimit 미들웨어 생성
const freeLimiter = rateLimit({
  windowMs: 60 * 1000, // 1분
  max: 10, // free 사용자는 1분에 10번 요청 가능
  handler(req, res) {
    res.status(429).json({
      code: 429,
      message: "1분에 10번만 요청할 수 있습니다.",
    });
  },
});

const premiumLimiter = rateLimit({
  windowMs: 60 * 1000, // 1분
  max: 20, // premium 사용자는 1분에 20번 요청 가능
  handler(req, res) {
    res.status(429).json({
      code: 429,
      message: "1분에 20번만 요청할 수 있습니다.",
    });
  },
});

exports.apiLimiter = async (req, res, next) => {
  try {
    // 요청의 origin에서 도메인 정보를 가져옴
    const origin = req.get("origin");
    if (!origin) {
      return res.status(400).json({
        code: 400,
        message: "요청에 origin 헤더가 없습니다.",
      });
    }

    // Domain 테이블에서 도메인 조회
    const domain = await Domain.findOne({
      where: { host: new URL(origin).host },
    });

    if (!domain) {
      return res.status(403).json({
        code: 403,
        message: "등록되지 않은 도메인입니다.",
      });
    }

    // domain.type에 따라 적절한 limiter 실행
    if (domain.type === "premium") {
      return premiumLimiter(req, res, next); // premium 제한 적용
    } else {
      return freeLimiter(req, res, next); // free 제한 적용
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      code: 500,
      message: "서버 에러",
    });
  }
};

exports.deprecated = (req, res) => {
  res.status(410).json({
    code: 410,
    message: "새로운 버전이 나왔습니다. 새로운 버전을 사용하세요.",
  });
};

exports.corsWhenDomainMatches = async (req, res, next) => {
  const domain = await Domain.findOne({
    where: { host: new URL(req.get("origin")).host },
  });
  if (domain) {
    cors({
      origin: req.get("origin"),
      credentials: true,
    })(req, res, next);
  } else {
    next();
  }
};
