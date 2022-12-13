import request from '@/utils/request.js'

export const userLogin = data => {
  return request({
    url: '/login',
    method: 'post',
    data
  })
}

export const userRegister = data => {
  return request({
    url: '/register',
    method: 'post',
    data
  })
}
