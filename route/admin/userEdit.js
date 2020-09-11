const { User } = require('../../model/user');
module.exports = async(req, res) => {
    //获得地址栏中的参数
    const { message, id } = req.query;
    //如果传递id是修改操作
    if (id) {
        let user = await User.findOne({ _id: id });
        //渲染修改界面
        res.render('admin/user-edit.art', {
            message: message,
            user: user,
            link: '/admin/user-modify?id=' + id,
            btn: '修改'
        });
    } else {
        res.render('admin/user-edit.art', {
            message: message,
            link: '/admin/user-edit',
            btn: '添加'
        });
    }

}