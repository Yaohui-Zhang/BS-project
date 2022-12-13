const Router = require('koa-router')
const { getAreaList, createArea, deleteArea, updateArea, getAllAreaList } = require('../../controllers/area')
const jwt = require('koa-jwt')

const { secret } = require('../../config')

const auth = jwt({ secret })

const router = new Router()

router.post('/areaList', auth, getAreaList)

router.post('/createArea', auth, createArea)

router.post('/deleteArea', auth, deleteArea)

router.post('/updateArea', auth, updateArea)

router.post('/getAllAreaList', auth, getAllAreaList)



module.exports = router