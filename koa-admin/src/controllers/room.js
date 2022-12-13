const Rooms = require('../models/room')
const Areas = require('../models/area')
const Equips = require('../models/equip')

class RoomCtl {
  async addRoom (ctx) {
    const { roomName, areaId, roomImg } = ctx.request.body
    const area = await Areas.findById(areaId).populate('rooms')

    if (!area.rooms.some(item => item.roomName === roomName)) {
      const res = await Rooms.create({
        roomName,
        areaName: area.areaName,
        areaId,
        roomImg,
        isMounted: false,
        x: 0,
        y: 0
      })
      area.rooms.push(res._id)
      await area.save()
      ctx.body = {
        code: 200,
        message: '新增房间成功'
      }
    } else {
      ctx.body = {
        code: 400,
        message: '所选区域已存在同名房间'
      }
    }
  }

  async roomList (ctx) {
    const { pageSize = 10, pageNum = 1 } = ctx.request.body
    const perPage = Math.max(pageSize, 1)
    const pageIndex = Math.max(pageNum, 1)
    const roomList = await Rooms.find().limit(perPage).skip((pageIndex - 1) * perPage)
    const total = await Rooms.count()
    ctx.body = {
      code: 200,
      message: '查询成功',
      data: roomList,
      total
    }
  }

  async getAllRoomList (ctx) {
    const roomList = await Rooms.find()
    ctx.body = {
      code: 200,
      message: '查询成功',
      data: roomList,
    }
  }

  async getEquipByRoom (ctx) {
    const { roomId } = ctx.request.body
    const equipList = await Equips.find({ room: roomId })
    ctx.body = {
      code: 200,
      list: equipList,
      message: '查询成功'
    }
  }

  async updateRoom (ctx) {
    const { roomId, roomName, updateAreaId, rawAreaId, roomImg } = ctx.request.body
    const area = await Areas.findOne({ _id: updateAreaId, roomName }).populate('rooms')
    if (!area.rooms.some(item => item.roomName === roomName)) {
      await Rooms.updateOne({ roomName }, { areaName: area.areaName, roomImg })
      area.rooms.push(roomId)
      await area.save()
      const rawArea = await Areas.findById(rawAreaId).populate('rooms')
      rawArea.rooms.splice(rawArea.rooms.map(item => item._id.toString()).indexOf(roomId), 1)
      await rawArea.save()
      ctx.body = {
        code: 200,
        message: '房间更新成功'
      }
    } else {
      ctx.body = {
        code: 400,
        message: '房间更新失败'
      }
    }

  }

  async deleteRoom (ctx) {
    const { roomId, areaId } = ctx.request.body

    const res = await Rooms.deleteOne({ _id: roomId })

    const area = await Areas.findById(areaId)

    if (area && res.deletedCount === 1) {
      area.rooms.splice(area.rooms.map(item => item.toString()).indexOf(roomId), 1)

      await area.save()

      ctx.body = {
        code: 200,
        message: '删除房间成功'
      }
    } else {
      ctx.body = {
        code: 400,
        message: '删除房间失败'
      }
    }

  }


}


module.exports = new RoomCtl()