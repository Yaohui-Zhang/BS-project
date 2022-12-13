const Areas = require('../models/area')

class AreaCtl {
  async getAreaList (ctx) {
    const { pageSize = 10, pageNum = 1 } = ctx.request.body
    const perPage = Math.max(pageSize, 1)
    const pageIndex = Math.max(pageNum, 1)
    const areaList = await Areas.find().populate('rooms').limit(perPage).skip((pageIndex - 1) * perPage)
    const total = await Areas.count()
    ctx.body = {
      code: 200,
      message: '查询成功',
      data: areaList,
      total
    }
  }
  async getAllAreaList (ctx) {
    const areaList = await Areas.find().populate('rooms')
    ctx.body = {
      code: 200,
      message: '查询成功',
      data: areaList,
    }
  }

  async createArea (ctx) {
    const { areaName, areaPosition } = ctx.request.body
    let existArea = await Areas.findOne({ areaName })
    if (existArea) {
      ctx.body = {
        code: 400,
        message: '场所已存在'
      }
    } else {
      const res = await Areas.create({
        areaName,
        areaPosition
      })
      ctx.body = {
        code: 200,
        message: '新建场所成功'
      }
    }

  }

  async deleteArea (ctx) {
    const { areaName } = ctx.request.body
    let existArea = await Areas.findOne({ areaName })
    if (existArea) {
      await Areas.deleteOne({ areaName })
      ctx.body = {
        code: 200,
        message: '删除场所成功'
      }
    } else {
      ctx.body = {
        code: 400,
        message: '删除失败'
      }
    }
  }

  async updateArea (ctx) {
    const { areaName, areaPosition } = ctx.request.body
    let existArea = await Areas.findOne({ areaName })
    if (existArea) {
      await Areas.updateOne({ areaName }, { areaPosition })
      ctx.body = {
        code: 200,
        message: '更新场所成功'
      }
    } else {
      ctx.body = {
        code: 400,
        message: '更新场所失败'
      }
    }
  }


}


module.exports = new AreaCtl()