const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
//处理时间
const dateformat = require('dateformat');
const template = require('art-template');
const morgan = require('morgan');

const config = require('config');
/* 
//获取系统环境变量
if (process.env.NODE_ENV == 'development') {
    //开发环境
    //在开发环境中，将客户端发送到服务器端的请求信息打印到控制台中
    // app.use(morgan('dev'))

} else {
    //生产环境

};
 */
const app = express();
//引入数据库
require('./model/connect');
app.use(bodyParser.urlencoded({ extends: false }));
//session设置
app.use(session({
    resave: false, //添加 resave 选项
    saveUninitialized: false, //添加 saveUninitialized 选项 用户没有登录，不存储cookie
    secret: 'secret key', // 建议使用 128 个字符的随机字符串
    cookie: { maxAge: 24 * 60 * 60 * 1000 }
    //  secret: 'secret key' 
}));
//引入静态文件
app.use(express.static(path.join(__dirname, 'public')));
//告诉express框架模板所在的位置
app.set('views', path.join(__dirname, 'views'));
//如果没写后缀，添加默认后缀
app.set('view engine', 'art');
//当渲染art使用的模板引擎
app.engine('art', require('express-art-template'));

//向模板中导入控制时间的变量
template.defaults.imports.dateFormat = dateformat;
//路由匹配相对路径
const home = require('./route/home');
const admin = require('./route/admin');
//拦截请求  放入单独中间件文件
app.use('/admin', require('./middleware/loginGuard'));
app.use('/home', home);
app.use('/admin', admin);
//错误处理，因为错误界面的参数是不固定的，所以用数组方式存储，用join方式拼接
app.use((err, req, res, next) => {
    //将字符串转换为对象
    console.log(err);
    
    console.log("--------");
    const result = JSON.parse(err);
    console.log(result);
    console.log("--------");
    let params = [];
    for (let res in result) {
        params.push(res + "=" + result[res]);
    }
    res.redirect(`${result.path}?${params.join('&')}`);
})
app.listen(8888);
console.log('服务器已开启');