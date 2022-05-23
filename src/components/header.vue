<template>
  <div class="header">
    <span class="route-name">{{ currentRoute }}</span>
    <div class="row horizontal v_center_end">
      <span class="user-status" data-space-right="1rem">
        <i-ep-avatar />
        {{ userInfo.username }}
      </span>
      <el-button class="action" plain>
        <i-ep-lock />
        變更密碼
      </el-button>
      <el-button class="logout" plain>
        <i-ep-key />
        登出
      </el-button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, computed } from 'vue'
import { useRoute } from 'vue-router'
import { userModules } from '@/store/user'

export default defineComponent({
  name: 'Header',
  setup() {
    const route = useRoute()
    const userStore = userModules()
    const userInfo = computed(() => userStore.$state.userStatus)
    const state = reactive({
      routeName: ''
    })
    const currentRoute = computed(() => route.name)
    return {
      state,
      currentRoute,
      userInfo
    }
  }
})
</script>
