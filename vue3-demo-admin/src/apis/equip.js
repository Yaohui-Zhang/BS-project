import request from '@/utils/request.js'

export const getEquipListApi = data => {
  return request({
    url: '/equipList',
    method: 'post',
    data
  })
}

export const createEquipApi = data => {
  return request({
    url: '/addEquip',
    method: 'post',
    data
  })
}

export const deleteEquipApi = data => {
  return request({
    url: '/deleteEquip',
    method: 'post',
    data
  })
}

export const updateEquipApi = data => {
  return request({
    url: '/updateEquip',
    method: 'post',
    data
  })
}

export const mountedEquipApi = data => {
  return request({
    url: '/mountedEquip',
    method: 'post',
    data
  })
}

export const unMountedEquipApi = () => {
  return request({
    url: '/unMountedEquip',
    method: 'post'
  })
}

export const moveEquipApi = data => {
  return request({
    url: '/moveEquip',
    method: 'post',
    data
  })
}
