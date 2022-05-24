import { defineStore } from 'pinia'

export const userModules = defineStore('user', {
  state: () => ({
    userStatus: {
      account: '',
      username: '',
      token: ''
    }
  }),
  getters: {},
  actions: {
    setUserStatus(obj) {
      this.userStatus.account = obj.account
      this.userStatus.username = obj.username
      this.userStatus.token = obj.token
      localStorage.setItem(
        'userInfo',
        JSON.stringify({ account: obj.account, username: obj.username, token: obj.token })
      )
    },
    async logOut() {
      this.userStatus = {
        account: '',
        username: '',
        token: ''
      }
      await localStorage.removeItem('userInfo')
    }
  }
})
