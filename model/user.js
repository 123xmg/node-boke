//创建用户集合 ----javabean
const Joi = require('joi');
const mongo = require('mongoose');
const bcrypt = require('bcrypt');
const userSchame = new mongo.Schema({
    username: {
        type: String,
        maxlength: 20,
        minlength: 2
    },
    email: {
        type: String,
        unique: true, //唯一
        require: true //必填
    },
    password: {
        type: String,
        require: true //必填
    },
    //admin超级管理员
    //normal普通用户
    role: {
        type: String,
        require: true //必填
    },
    state: {
        type: Number,
        default: 0 //0启用状态 1 禁用
    }
})
const User = mongo.model('User', userSchame);
//向数据库添加用户时，将密码加密
async function createUser() {
    const salt = await bcrypt.genSalt(10);
    const result = await bcrypt.hash('123456', salt);

    //创建用户
    const user = await User.create({
        username: 'lili',
        email: '123456@163.com',
        password: result,
        role: 'normal',
        state: 0
    });
}
// createUser();

//验证用户信息
const validDateUser = user => {
    const schame = {
        username: Joi.string().alphanum().min(2).max(20).required().error(new Error('用户名格式不符合')),
        email: Joi.string().email().error(new Error('邮箱格式不符合')),
        password: Joi.string().regex(/^[a-zA-z0-9]{2,30}$/).required().error(new Error('密码格式不符合')),
        role: Joi.string().valid('normal', 'admin').required().error(new Error('角色不符合')),
        state: Joi.number().valid(0, 1).required().error(new Error('状态格式不符合'))
    }
    return Joi.validate(user, schame);
}

//将用户集合导出，方便界面的遍历
module.exports = {
    User,
    validDateUser
}