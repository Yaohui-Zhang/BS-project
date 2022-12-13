const Router = require('koa-router')

const { equipList, addEquip, deleteEquip, updateEquip, mountedEquip, moveEquip, unMountedEquip } = require('../../controllers/equip.js')

const router = new Router()

router.post('/equipList', equipList)

router.post('/addEquip', addEquip)

router.post('/deleteEquip', deleteEquip)

router.post('/updateEquip', updateEquip)

router.post('/mountedEquip', mountedEquip)

router.post('/moveEquip', moveEquip)

router.post('/unMountedEquip', unMountedEquip)






module.exports = router