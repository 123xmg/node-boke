const { Article } = require("../../model/article");
const pagination = require("mongoose-sex-page");
module.exports = async (req, res) => {
  //标识，表示访问的是文章管理界面
  req.app.locals.currentLink = "article";

  //接收客户端传过来的当前页的参数
  let page = req.query.page || 1;
  //每一页显示的数据条数
  let pageSize = 8;
  //查询文章数据的总数
  let count = await Article.countDocuments({});
  //显示总页码
  let total = Math.ceil(count / pageSize);
  /*
  // page 指定当前页
	// size 指定每页显示的数据条数
	// display 指定客户端要显示的页码数量
	// exec 向数据库中发送查询请求
	// 查询所有文章数据
  */
  let article = await pagination(Article)
    .find()
    .page(page)
    .size(pageSize)
    .display(total)
    .populate("author")
    .exec();
  res.render("admin/article.art", {
    article: article,
  });
};
