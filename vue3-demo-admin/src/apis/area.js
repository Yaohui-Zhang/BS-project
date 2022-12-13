import request from '@/utils/request.js'

export const getAreaListApi = (data) => {
  return request({
    url: '/areaList',
    method: 'post',
    data: {
      pageNum: data.pageNum
    }
  })
}

export const getAllAreaListApi = () => {
  return request({
    url: '/getAllAreaList',
    method: 'post'
  })
}

export const createAreaApi = data => {
  return request({
    url: '/createArea',
    method: 'post',
    data
  })
}

export const deleteAreaApi = data => {
  return request({
    url: '/deleteArea',
    method: 'post',
    data
  })
}

export const updateAreaApi = data => {
  return request({
    url: '/updateArea',
    method: 'post',
    data
  })
}
