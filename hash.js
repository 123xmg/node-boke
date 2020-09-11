const bcrypt = require('bcrypt');
async function run() {
    const salt = await bcrypt.genSalt(10);
    //对密码加密
    // let isEqual = await bcrypt.compare('明文密码', '加密密码');
    const isEqual = await bcrypt.hash('1234', salt);
    console.log(isEqual);

}
run();