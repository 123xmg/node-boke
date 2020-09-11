const { Article } = require("../../model/article");
const { Comment } = require("../../model/comment");
module.exports = async (req, res) => {
  // return res.send(artcile);
  let id = req.query.id;
  // console.log(id);
  const article = await Article.findOne({ _id: id }).populate("author");
  const comment = await Comment.find({ aid: id }).populate("uid");
  res.render("home/article.art", {
    article: article,
    comment: comment,
  });
};
