const Users = require('../models/users')
const jsonwebtoken = require('jsonwebtoken')
const { secret } = require('../config.js')

class UserCtl {
  async register (ctx) {
    ctx.verifyParams({
      username: { type: 'string', require: true },
      password: { type: 'string', require: true },
      phoneNum: { type: 'string', require: true }
    })
    const { username, password, phoneNum } = ctx.request.body
    try {
      const existUser = await Users.findOne({ username })
      if (existUser) {
        ctx.body = {
          code: 400,
          message: '用户名已存在'
        }
        return
      }
      const res = await Users.create({
        username,
        password,
        phoneNum
      })
      ctx.body = {
        code: 200,
        message: '注册成功',
        res
      }
    } catch (error) {
      ctx.body = {
        code: 400,
        message: '注册失败'
      }
    }
  }

  async login (ctx) {
    ctx.verifyParams({
      username: { type: 'string', require: true },
      password: { type: 'string', require: true }
    })
    const { username, password } = ctx.request.body
    const existUser = await Users.findOne({ username, password })
    if (existUser) {
      const { _id, username } = existUser
      const token = jsonwebtoken.sign({
        _id,
        username
      }, secret, { expiresIn: '1d' })
      ctx.body = {
        code: 200,
        token,
        message: '登录成功'
      }
    } else {
      ctx.body = {
        code: 400,
        message: '用户名或密码错误'
      }
    }
  }

}


module.exports = new UserCtl


