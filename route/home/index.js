const { Article } = require('../../model/article');
const pagination = require('mongoose-sex-page');
module.exports = async(req, res) => {
    const page = req.query.page;
    let result = await pagination(Article).find().page(page).size(4).display(3).populate('author').exec();
    // return res.send(result);
    res.render('home/default.art', {
        result: result
    });
}