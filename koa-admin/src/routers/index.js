const fs = require('fs')
const { resolve } = require('path')

const useRouter = (app) => {
  const fileList = fs.readdirSync(resolve(__dirname, './modules'))
  fileList.forEach(file => {
    const router = require('./modules/' + file)
    app.use(router.routes())
  })
}

module.exports = useRouter