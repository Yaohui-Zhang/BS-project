// 校验用户名
export const usernameReg = /[\w\u4e00-\u9fa5]{5,12}/

// 校验密码
export const passwordReg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,12}$/

// 校验手机号
export const phoneReg = /^1[3-9]\d{9}$/
