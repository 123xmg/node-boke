module.exports = (req, res, next) => {
  //判断是不是登陆界面  如果是登陆状态放行 //不是就从定向登陆界面
  if (req.url != "/login" && !req.session.username) {
    res.redirect("/admin/login");
  } else if (req.session.role == "normal") {
    res.redirect("/home/");
  }
  next();
};
