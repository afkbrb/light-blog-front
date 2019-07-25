'use strict'
module.exports = {
  NODE_ENV: '"production"',
  BASE_URL: '"http://localhost/api"', // 接口地址
  UPLOAD_URL: '"http://localhost/api/upload"', // 文件上传地址
  CIPHER: '"your_cipher"', // 密钥，需要和后台一致
  ADMIN_URL: '"http://localhost:8081"', // 后台管理系统地址
  ABOUT_ID: 1 // 《关于本博客》对应的文章id，因为这篇文章在后台是当作普通文章储存的，所以“About”页面需要指定id
}
