const { User } = require('../../model/user');
const bcrypt = require('bcrypt');
module.exports = async(req, res, next) => {
    // res.send('ok');
    //得到用户修改的信息
    const { username, email, password, role, state } = req.body;
    const id = req.query.id;
    // 比对密码，密码正确再进行修改信息
    let user = await User.findOne({ _id: id });
    const isValid = await bcrypt.compare(password, user.password);
    if (isValid) {
        //修改用户信息不能修改密码
        await User.updateOne({ _id: id }, {
            username: username,
            email: email,
            role: role,
            state: state
        });
        res.redirect('/admin/user');

    } else {
        let path = { path: '/admin/user-edit', message: '密码错误，修改失败', id: id };
        next(JSON.stringify(path));
    }


};