module.exports = (req, res) => {
    //标识，表示访问的是文章管理界面
    req.app.locals.currentLink = 'article';
    res.render('admin/article-edit');
}