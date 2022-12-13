const Router = require('koa-router')
const { addRoom, roomList, updateRoom, deleteRoom, getAllRoomList, getEquipByRoom } = require('../../controllers/room')
const jwt = require('koa-jwt')

const { secret } = require('../../config')

const auth = jwt({ secret })

const router = new Router()

router.post('/addRoom', auth, addRoom)
router.post('/roomList', auth, roomList)
router.post('/updateRoom', auth, updateRoom)
router.post('/deleteRoom', auth, deleteRoom)
router.post('/getAllRoomList', auth, getAllRoomList)
router.post('/getEquipByRoom', auth, getEquipByRoom)





module.exports = router