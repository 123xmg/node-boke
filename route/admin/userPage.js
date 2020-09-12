const { User } = require('../../model/user');
module.exports = async(req, res) => {
    //标识，表示访问的是用户管理界面
    req.app.locals.currentLink = 'user';
    //接收客户端传过来的当前页的参数
    let page = req.query.page || 1;
    //每一页显示的数据条数
    let pageSize = 8;
    //查询用户数据的总数
    let count = await User.countDocuments({});
    //显示总页码
    let total = Math.ceil(count / pageSize);
    //页码开始的位置
    let start = (page - 1) * pageSize;
    //将用户信息导入
    const user = await User.find({}).limit(pageSize).skip(start);
    // res.send(user);
    //将用户信息渲染到界面
    res.render('admin/user', {
        user: user,
        page: page,
        total: total
    });
};