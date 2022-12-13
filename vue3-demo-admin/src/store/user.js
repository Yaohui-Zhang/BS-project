import { defineStore } from 'pinia'
import { setItem, getItem } from '@/utils/storage'
export const useUserStore = defineStore('user', {
  state: () => {
    return {
      token: getItem('loginToken') || ''
    }
  },
  actions: {
    setToken (payload) {
      setItem('loginToken', payload)
      this.token = payload
    }
  }
})
