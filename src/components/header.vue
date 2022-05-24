<template>
  <div class="header">
    <h1 class="route-name">{{ currentRoute }}</h1>
    <div class="flx horizontal v_center_end">
      <span class="user-status" data-space-right="1rem">
        <el-icon>
          <Avatar />
        </el-icon>
        {{ userInfo.username }}
      </span>
      <el-button class="action" icon="Lock" plain> 變更密碼 </el-button>
      <el-button class="logout" plain icon="MagicStick" @click="handleLogOut"> 登出 </el-button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { userModules } from '@/store/user'

export default defineComponent({
  name: 'Header',
  setup() {
    const route = useRoute()
    const router = useRouter()
    const userStore = userModules()
    const userInfo = computed(() => userStore.$state.userStatus)
    const state = reactive({
      routeName: ''
    })
    const currentRoute = computed(() => route.meta.name)
    const handleLogOut = () => {
      const title = '提示訊息'
      const msg = '確定登出?'
      ElMessageBox.confirm(msg, title, {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        type: 'warning'
      })
        .then(() => {
          userStore.logOut()
          router.push({ name: 'Login' })
          ElMessage({
            type: 'success',
            message: '已成功登出!'
          })
        })
        .catch(() => {
          ElMessage({
            type: 'info',
            message: '已取消'
          })
        })
    }
    return {
      state,
      currentRoute,
      userInfo,
      handleLogOut
    }
  }
})
</script>
