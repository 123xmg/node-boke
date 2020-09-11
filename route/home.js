const express = require('express');
const home = express.Router();
home.get('/', require('./home/index'));
home.get('/article', require('./home/article'));
home.post('/common', require('./home/common'));
home.get('/user-loginout', require('./home/user-loginout'));
module.exports = home;