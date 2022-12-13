import request from '@/utils/request.js'

export const getRoomListApi = data => {
  return request({
    method: 'post',
    url: '/roomList',
    data: {
      pageNum: data.pageNum,
      pageSize: 5
    }
  })
}

export const getAllRoomListApi = () => {
  return request({
    method: 'post',
    url: '/getAllRoomList'
  })
}

export const addRoomApi = data => {
  return request({
    method: 'post',
    url: '/addRoom',
    data
  })
}

export const updateRoomApi = data => {
  return request({
    method: 'post',
    url: '/updateRoom',
    data
  })
}

export const deleteRoomApi = data => {
  return request({
    method: 'post',
    url: '/deleteRoom',
    data
  })
}

export const getEquipByRoom = data => {
  return request({
    method: 'post',
    url: '/getEquipByRoom',
    data
  })
}
