const bcrypt = require('bcrypt');
const { User, validDateUser } = require('../../model/user');
module.exports = async(req, res, next) => {
    //标识，表示访问的是用户管理界面
    req.app.locals.currentLink = 'user';
    try {
        //检验传过来的参数
        await validDateUser(req.body);
    } catch (error) {
        //用户信息填写错误
        // error.message
        //重定向到用户添加界面
        // res.redirect(`/admin/user-edit?message=${error.message}`)
        //将错误的信息以及跳转的路径以字符串的形式传递给app.err 并中止运行

        return next(JSON.stringify({ path: '/admin/user-edit', message: error.message }));
    }
    const result = await User.findOne({ email: req.body.email });
    //如果邮箱已经存在
    if (result) {
        // return res.redirect(`/admin/user-edit?message=邮箱已占用`)
        return next(JSON.stringify({ path: '/admin/user-edit', message: '邮箱已占用' }));
    }
    //对密码进行加密处理
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(req.body.password, salt);
    req.body.password = password;

    //添加用户
    await User.create(req.body);
    //重定向到user界面
    res.redirect('/admin/user');
}