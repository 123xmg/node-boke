module.exports = (req, res) => {
    // 删除session，如果删除成功调用回调函数
    req.session.destroy(function() {
        // 清除cookie,里面接收删除cookie的名字
        res.clearCookie('connect.sid');
        res.redirect('/admin/login');
        //清空模板中的用户信息
        req.app.locals.userInfo = null;
    })
}