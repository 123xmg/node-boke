const { Comment } = require('../../model/comment');
module.exports = async(req, res) => {
    // res.send('ok');
    // console.log(req.body);
    const { content, uid, aid } = req.body;

    await Comment.create({
        uid: uid,
        aid: aid,
        content: content,
        time: new Date()
    });
    res.redirect('/home/article?id=' + aid);

}