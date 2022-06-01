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
import { defineComponent } from 'vue'
import { reactive, onMounted } from 'vue'
import Aside from '@/components/aside.vue'
import Header from '@/components/header.vue'
import { userModules } from '@/store/user'

export default defineComponent({
  name: 'Home',
  components: { Aside, Header },
  setup() {
    const userStore = userModules()
    const state = reactive({
      title: 'HOME View'
    })
    const init = onMounted(async () => {
      const userStorage = JSON.parse(localStorage.getItem('userInfo') as string)
      await userStore.setUserStatus(userStorage)
    })
    return {
      state,
      init
    }
  }
})
</script>
