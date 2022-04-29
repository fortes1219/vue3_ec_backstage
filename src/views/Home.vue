<template>
  <div class="row vertical center grow">
    <img alt="Vue logo" src="../assets/logo.png" />
    <span>{{ state.title }}</span>
    <el-button @click="setToken">SET TOKEN</el-button>
    <el-button @click="getApi">GET API</el-button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { reactive } from 'vue'
import { getOtp } from '@/service/api'
// import { ElMessage } from 'element-plus'
/* 解構的話才需要用這個
import { storeToRefs } from 'pinia'
*/
import { userModules } from '@/store/user'

export default defineComponent({
  name: 'HomeView',
  components: {},
  setup() {
    const userStore = userModules()
    const state = reactive({
      title: 'HOME View'
    })

    const setToken = () => {
      userStore.setToken('SLKDJKLS')
      console.log('### store user: ', userStore.userStatus, import.meta.env.VITE_BASE_API)
    }

    const getApi = async () => {
      const data = ''
      const res = await getOtp(data)
      console.log('###res: ', res)
    }

    return {
      state,
      setToken,
      getApi
    }
  }
})
</script>
