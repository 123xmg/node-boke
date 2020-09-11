// 1.引入mongoose模块
const mongoose = require('mongoose');

// 2.创建文章集合规则
const commentSchema = new mongoose.Schema({

    aid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Article',
    },
    uid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    time: {
        type: Date,
    },
    content: {
        type: String
    }
});

// 3.根据规则创建集合
const Comment = mongoose.model('Comment', commentSchema);

// 4.将集合做为模块成员进行导出
module.exports = {
    Comment
}