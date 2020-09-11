const { Article } = require("../../model/article");
const pagination = require("mongoose-sex-page");
module.exports = async (req, res) => {
  const page = req.query.page;
  //标识，表示访问的是文章管理界面
  req.app.locals.currentLink = "article";
  let article = await pagination(Article)
    .find()
    .page(page)
    .size(4)
    .display(3)
    .populate("author")
    .exec();
  // console.log("接收上传的文章");
  // console.log(article);
  // res.send(article);
  res.render("admin/article.art", {
    article: article,
  });
};
