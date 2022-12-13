const Router = require('koa-router')
const { uploadImg } = require('../../controllers/upload')
const jwt = require('koa-jwt')

const { secret } = require('../../config')

const auth = jwt({ secret })

const router = new Router()

router.post('/uploadImg', uploadImg)

module.exports = router