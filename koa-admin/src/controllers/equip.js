const Equips = require('../models/equip')
const jsonwebtoken = require('jsonwebtoken')
const { secret } = require('../config.js')

class VisualCtl {
  async equipList (ctx) {
    const { pageSize = 10, pageNum = 1 } = ctx.request.body
    const perPage = Math.max(pageSize, 1)
    const pageIndex = Math.max(pageNum, 1)
    const list = await Equips.find().limit(perPage).skip((pageIndex - 1) * perPage)
    const total = await Equips.count()
    ctx.body = {
      code: 200,
      message: '查询成功',
      data: list,
      total
    }
  }

  async addEquip (ctx) {
    const { equipName, equipType, equipDesc, room } = ctx.request.body
    const equip = await Equips.findOne({
      equipName,
      equipType,
      room
    })
    if (!equip) {
      let equipAttrs = []
      switch (equipType) {
        case 1:
          equipAttrs = [
            {
              name: '开关',
              status: false
            }
          ]
          break;
        case 2:
          equipAttrs = [
            {
              name: '状态',
              status: false
            },
          ]
          break;
        case 3:
          equipAttrs = [
            {
              name: '传感器开关',
              status: false
            },
            {
              name: '温度主动上报',
              status: false
            },
            {
              name: '湿度主动上报',
              status: false
            }
          ]
          break;
        case 4:
          equipAttrs = [
            {
              name: '开关状态',
              status: false
            },
            {
              name: '开关门状态主动上报',
              status: false
            },
            {
              name: '摄像头状态',
              status: false
            },
            {
              name: '摄像头主动报警',
              status: false
            }
          ]
          break;
        default:
          break;
      }
      await Equips.create({
        equipName,
        equipType,
        equipDesc,
        equipAttrs,
        room
      })
      ctx.body = {
        code: 200,
        message: '新增设备成功'
      }
    } else {
      ctx.body = {
        code: 400,
        message: '该房间已存在重复设备'
      }
    }

  }

  async deleteEquip (ctx) {
    const { equipName, equipType } = ctx.request.body
    let existEquip = await Equips.findOne({ equipName, equipType })
    if (existEquip) {
      await Equips.deleteOne({ equipName, equipType })
      ctx.body = {
        code: 200,
        message: '删除设备成功'
      }
    } else {
      ctx.body = {
        code: 400,
        message: '删除失败'
      }
    }
  }

  async updateEquip (ctx) {
    const { _id, attrsName, attrStatus } = ctx.request.body
    const equip = await Equips.findById(_id)
    if (equip) {
      let index = equip.equipAttrs.map(item => item.name).indexOf(attrsName)
      equip.equipAttrs.splice(index, 1)
      equip.equipAttrs.splice(index, 0, {
        name: attrsName,
        status: attrStatus
      })
      await equip.save()
      ctx.body = {
        code: 200,
        message: '设备状态更新成功'
      }
    } else {
      ctx.body = {
        code: 400,
        message: '设备状态更新失败'
      }
    }
  }

  async mountedEquip (ctx) {
    const { equipId, x, y } = ctx.request.body
    const equip = await Equips.findById(equipId)
    equip.isMounted = true
    equip.x = x
    equip.y = y

    await equip.save()
    ctx.body = {
      code: 200,
      message: "挂载设备成功"
    }
  }

  async unMountedEquip (ctx) {
    // const { equipId } = ctx.request.body
    const equipList = await Equips.find()
    equipList.forEach(async item => {
      item.isMounted = false
      item.x = 0
      item.y = 0
      await item.save()
    })
    // await equipList.save()
    ctx.body = {
      code: 200,
      message: "卸载设备成功"
    }
  }

  async moveEquip (ctx) {
    const { x, y, equipId } = ctx.request.body
    const equip = await Equips.findById(equipId)
    equip.x = x
    equip.y = y
    await equip.save()
    ctx.body = {
      code: 200,
      message: "移动设备成功"
    }
  }

}


module.exports = new VisualCtl


