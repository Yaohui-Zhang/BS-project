import { usernameReg, passwordReg, phoneReg } from '@/utils/verify.js'

export const checkUsername = (rule, value, callback) => {
  if (!value) callback(new Error('用户名不能为空'))
  if (!usernameReg.test(value)) {
    callback(new Error('用户名必须为5-12位字母/数字/中文'))
  } else {
    callback()
  }
}

export const checkPassword = (rule, value, callback) => {
  if (!value) callback(new Error('密码不能为空'))
  if (!passwordReg.test(value)) {
    callback(new Error('密码必须为6-12为数字和字母组合'))
  } else {
    callback()
  }
}

export const checkPhoneNum = (rule, value, callback) => {
  if (!value) callback(new Error('手机号不能为空'))
  if (!phoneReg.test(value)) {
    callback(new Error('手机号格式错误'))
  } else {
    callback()
  }
}
