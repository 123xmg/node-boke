const express = require("express");

const admin = express.Router();
//渲染登陆界面
admin.get("/login", require("./admin/loginPage"));
//实现登录功能
admin.post("/login", require("./admin/login"));
//渲染用户界面
admin.get("/user", require("./admin/userPage"));
//退出界面
admin.get("/loginout", require("./admin/loginoutPage"));
//增加用户
admin.get("/user-edit", require("./admin/userEdit"));
//实现添加功能
admin.post("/user-edit", require("./admin/user-edit-fn"));
//修改
admin.post("/user-modify", require("./admin/user-modify"));
//退出登录
admin.get("/delete", require("./admin/delete"));
//文章列表路由
admin.get("/article", require("./admin/article"));

//文章编辑路由
admin.get("/article-edit", require("./admin/article-edit"));
//文章添加路由
admin.post("/article-add", require("./admin/article-add"));
// 删除文章
admin.get("/article-delete", require("./admin/article-delete"));

module.exports = admin;
