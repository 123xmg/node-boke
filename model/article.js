// 1.引入mongoose模块
const mongoose = require("mongoose");

// 2.创建文章集合规则
const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    maxlength: 40,
    minlength: 4,
    required: [true, "请填写文章标题"],
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "请传递作者"],
  },
  publishDate: {
    type: Date,
    default: Date.now,
  },
  cover: {
    type: String,
    default: null,
  },
  content: {
    type: String,
  },
});
// 3.根据规则创建集合
const Article = mongoose.model('Article', articleSchema);
// async function createUser() {
//   //创建文章
//   const user = await Article.create({
//     title: "星星点灯",
//     author: "5f5a3796cc443802a80e51d6",
//     publishDate: "",
//     cover: "",
//     content: "aaaaabbbbcccccdddddd",
//   });
// }
// createUser();
console.log(Article);
// 4.将集合做为模块成员进行导出
module.exports = {
  Article,
};
