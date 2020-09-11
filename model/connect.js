const mongo = require('mongoose');
const config = require('config');
mongo.set('useCreateIndex', true);

mongo.connect(`mongodb://${config.get('db.user')}:${config.get('db.pwd')}@${config.get('db.host')}:${config.get('db.port')}/${config.get('db.name')}`, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => { console.log('数据库已连接'); })
    .catch(() => { console.log('数据库连接失败'); })