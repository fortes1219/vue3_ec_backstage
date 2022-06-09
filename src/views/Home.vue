<template>
  <div class="home el-customize">
    <Aside />
    <div class="contents">
      <Header />
      <router-view />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted } from 'vue'
import Aside from '@/components/aside.vue'
import Header from '@/components/header.vue'
import { userModules } from '@/store/user'
import { callApi } from '@/utils/callApi'
import { getAdminPermissions } from '@/service/api'

export default defineComponent({
  name: 'Home',
  components: { Aside, Header },
  setup() {
    const userStore = userModules()
    const state = reactive({
      title: 'HOME View'
    })

    /* 取得當前管理員的權限列表後，更新userStore的權限列表 */
    const getPermissions = async () => {
      const uid = userStore.$state.userStatus.id
      const jwt = { MemberID: uid }
      await callApi(getAdminPermissions, jwt, (res) => {
        userStore.setUserPermissions(res.data.Data.Permission)
      })
    }

    const init = onMounted(async () => {
      const userStorage = JSON.parse(localStorage.getItem('userInfo') as string)
      await userStore.setUserStatus(userStorage)
      await getPermissions()
    })
    return {
      state,
      init
    }
  }
})
</script>
