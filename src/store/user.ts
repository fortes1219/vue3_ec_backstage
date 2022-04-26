import { defineStore } from "pinia";

export const userModules = defineStore("user", {
  state: () => ({
    userStatus: {
      username: '',
      token: '',
    },
  }),
  getters: {

  },
  actions: {
    setToken(token) {
      this.userStatus.token = token
    }
  },
});
