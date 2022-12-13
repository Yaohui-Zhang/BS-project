const { connectStr } = require('./config.js')
const mongoose = require('mongoose')

mongoose.connect(connectStr)
  .then(res => {
    console.log('数据库连接成功~');
  })
  .catch(err => {
    console.log(err);
  })