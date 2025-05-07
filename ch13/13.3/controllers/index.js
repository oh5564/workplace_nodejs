const { Op } = require("sequelize");
const { Good, Auction, User, sequelize } = require("../models");
const schedule = require("node-schedule");

exports.renderMain = async (req, res, next) => {
  try {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1); // 어제 시간
    const goods = await Good.findAll({
      where: { SoldId: null, createdAt: { [Op.gte]: yesterday } }, // >=
    });
    res.render("main", {
      title: "NodeAuction",
      goods,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

exports.renderJoin = (req, res) => {
  res.render("join", {
    title: "회원가입 - NodeAuction",
  });
};

exports.renderGood = (req, res) => {
  res.render("good", { title: "상품 등록 - NodeAuction" });
};

exports.createGood = async (req, res, next) => {
  try {
    const { name, price } = req.body;
    const good = await Good.create({
      OwnerId: req.user.id,
      name,
      img: req.file.filename,
      price,
    });
    const end = new Date();
    end.setDate(end.getDate + 1); // 하루 뒤
    const job = schedule.scheduleJob(end, async () => { // 하루뒤 입찰완료되게 스케줄링
      const success = await Auction.findOne({
        where: { GoodId: good.id }, // 등록된 경매물품의 id로 auctions 테이블의 정보를 가져옴
        order: [["bid", "DESC"]], // bid를 내림차순으로, findOne이기 때문에 bid가 가장 높은 정보만 가져옴
      });
      await good.setSold(success.UserId); // goods 테이블의 낙찰자 id에 넣어줌
      await User.update(
        {
          money: sequelize.literal(`money-${success.bid}`), // 낙찰자의 보유재산 차감
        },
        {
          where: { id: success.UserId },
        }
      );
    });
    job.on("error", (err) => {
      console.error("스케줄링 에러", err);
    });
    job.on("success", () => {
      console.log("스케줄링 성공");
    });
    res.redirect("/");
  } catch (error) {
    console.error(error);
    next(error);
  }
};

exports.renderAuction = async (req, res, next) => {
  try {
    const [good, auction] = await Promise.all([
      // Promise.all을 사용하여 Good과 Auction 데이터를 동시에 가져옴
      Good.findOne({
        where: { id: req.params.id }, //요청된 상품 ID로 상품 정보를 가져옴
        include: {
          model: User,
          as: "Owner",
        }, //  상품의 소유자 정보를 User 테이블에서 가져옴
      }),
      Auction.findAll({
        where: { GoodId: req.params.id }, // 요청된 상품 ID로 경매 정보를 가져옴
        include: { model: User }, //입찰한 사용자 정보를 User 테이블에서 가져옴
        order: [["bid", "ASC"]], // 입찰 금액(bid)을 오름차순으로 정렬
      }),
    ]);
    res.render("auction", {
      title: `${good.name} - NodeAuction`,
      good,
      auction,
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

exports.bid = async (req, res, next) => {
  try {
    const { bid, msg } = req.body; // 클라이언트에서 입력받은 입찰 금액(bid)과 메시지(msg)
    const good = await Good.findOne({
      where: { id: req.params.id }, // 요청된 상품 id로 상품 정보를 가져옴
      include: { model: Auction }, // 상품과 연관된 입찰(Auction) 데이터를 가져옴
      order: [[{ model: Auction }, "bid", "DESC"]], //입찰 금액(bid)을 기준으로 내림차순 정렬
    });

    if (!good) {
      return res.status(404).send("해당 상품은 존재하지 않습니다.");
    }

    // 입찰 금액이 시작 가격보다 낮거나 같은 경우
    if (good.price >= bid) {
      return res.status(403).send("시작 가격보다 높게 입찰해야 합니다.");
    }

    // 경매가 종료된 경우 (상품 등록 후 24시간이 지난 경우)
    if (new Date(good.createdAt).valueOf() + 24 * 60 * 60 * 1000 < new Date()) {
      return res.status(403).send("경매가 이미 종료되었습니다.");
    }

    // 이전 입찰 금액보다 낮거나 같은 경우
    if (good.Auctions[0]?.bid >= bid) {
      // 가장 높은 입찰 금액(good.Auction[0]?.bid)과 비교
      return res.status(403).send("이전 입찰가보다 높아야 합니다.");
    }

    // 새로운 입찰 내역 생성
    const result = await Auction.create({
      bid,
      msg,
      UserId: req.user.id,
      GoodId: req.params.id,
    });
    // 실시간으로 입찰 내역 전송
    req.app.get("io").to(req.params.id).emit("bid", {
      bid: result.bid,
      msg: result.msg,
      nick: req.user.nick,
    });
    return res.send("ok");
  } catch (err) {
    console.error(err);
    return next(err);
  }
};
