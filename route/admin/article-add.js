   // 引入formidable模块
   const formidable = require('formidable');
   const { Article } = require('../../model/article');
   const path = require('path');
   module.exports = (req, res) => {
       // 创建表单解析对象
       const form = new formidable.IncomingForm();
       // 设置文件上传路径
       form.uploadDir = path.join(__dirname, '../', '../', 'public', '/upload');
       // 是否保留表单上传文件的扩展名
       form.keepExtensions = true;

       // 对表单进行解析
       form.parse(req, (err, fildes, files) => {
           //    res.send(fildes.author); //文件的相对路径
           Article.create({
               title: fildes.title,
               author: fildes.author,
               publishDate: fildes.publishDate,
               cover: files.cover.path.split('public')[1],
               content: fildes.content
           });
           res.redirect('/admin/article');
       })

       //    res.render('admin/article');
   }