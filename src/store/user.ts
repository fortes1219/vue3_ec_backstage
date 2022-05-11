import { defineStore } from 'pinia'

export const userModules = defineStore('user', {
  state: () => ({
    userStatus: {
      username: '',
      token: ''
    }
  }),
  getters: {},
  actions: {
    setToken(obj) {
      this.userStatus.username = obj.username
      this.userStatus.token = obj.token
      localStorage.setItem('userInfo', JSON.stringify({ username: obj.username, token: obj.token }))
    }
  }
})
