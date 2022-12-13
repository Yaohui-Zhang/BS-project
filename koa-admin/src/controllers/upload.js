const path = require('path')

class UploadCtl {
  async uploadImg (ctx) {
    console.log(123);
    const file = ctx.request.files.file
    const basename = path.basename(file.filepath)
    ctx.body = {
      code: 200,
      data: {
        path: `${ctx.origin}/uploads/${basename}`
      },
      message: '上传图片成功'
    }
  }



}

module.exports = new UploadCtl()