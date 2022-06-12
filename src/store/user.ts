import { defineStore } from 'pinia'

export const userModules = defineStore('user', {
  state: () => ({
    userStatus: {
      id: null,
      account: '',
      username: '',
      token: ''
    },
    userPermissions: {}
  }),
  getters: {},
  actions: {
    setUserStatus(obj) {
      console.log('### user store: ', obj)
      this.userStatus.id = obj.id
      this.userStatus.account = obj.account
      this.userStatus.username = obj.username
      this.userStatus.token = obj.token
      localStorage.setItem(
        'userInfo',
        JSON.stringify({ id: obj.id, account: obj.account, username: obj.username, token: obj.token })
      )
    },
    setUserPermissions(obj) {
      this.userPermissions = JSON.parse(JSON.stringify(obj))
      localStorage.setItem('userPermissions', JSON.stringify(obj))
      console.log('### user store permissions: ', this.userPermissions)
    },
    async logOut() {
      this.userStatus = {
        id: null,
        account: '',
        username: '',
        token: ''
      }
      await localStorage.removeItem('userInfo')
      await localStorage.removeItem('userPermissions')
    }
  }
})
