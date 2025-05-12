const { Post, Hashtag } = require("../models");

exports.afterUploadImage = (req, res) => {
  console.log(req.file);
  const originalUrl = req.file.location;
  const url = originalUrl.replace(/\/original\//, '/thumb/');
  res.json({ url: req.file.location});
};

exports.uploadPost = async (req, res, next) => {
  try {

    const post = await Post.create({
      content: req.body.content,
      img: req.body.url,
      UserId: req.user.id,
    });
    const hashtags = req.body.content.match(/#[^\s#]*/g);
    if (hashtags) {
      const result = await Promise.all(
        hashtags.map((tag) => {
          return Hashtag.findOrCreate({
            where: { title: tag.slice(1).toLowerCase() },
          });
        })
      );
      await post.addHashtags(result.map((r) => r[0])); // [[모델,bool], [모델,bool]]로 들어오는거 모델만 받기
    }
    res.redirect("/");
  } catch (err) {
    console.error(err);
    next(err);
  }
};
