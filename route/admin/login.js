//登录
const { User } = require("../../model/user");
const bcrypt = require("bcrypt");

module.exports = async (req, res) => {
  const { email, password } = req.body;
  // if (email.trim().length == 0 || password.trim().length == 0) return res.status(400).send('<h4>邮件密码不能为空</h4>'); //中止运行。return
  if (email.trim().length == 0 || password.trim().length == 0)
    return res.status(400).render("admin/error", { msg: "邮件密码不能为空" }); //中止运行。return
  let user = await User.findOne({ email }); //根据邮箱在数据库中查询用户信息

  if (user) {
    //与加密密码比对('明文密码', '加密密码');
    const isValid = await bcrypt.compare(password, user.password);
    // 用户存在
    if (isValid) {
      //登录成功
      //将用户名存储在请求对象中
      req.session.username = user.username;
      req.session.role = user.role;
      //如果你需要在一些相同的模板中使用公共数据。可以把数据保存到app.locals这个对象里面。
      req.app.locals.userInfo = user;
      // res.send('登录成功' + req.session.username);
      if (user.role == "admin") {
        res.redirect("/admin/user");
      } else {
        res.redirect("/home/");
      }
    } else {
      res.status(400).render("admin/error", { msg: "邮箱或密码错误" });
    }
  } else {
    // 用户不存在
    res.status(400).render("admin/error", { msg: "用户不存在" });
  }
};
