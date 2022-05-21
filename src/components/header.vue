<template>
  <div class="header">
    <span class="route-name">{{ currentRoute }}</span>
    <div class="row horizontal h_end">
      <!-- <span>變更密碼</span>
      <span>登出</span> -->
      <el-button type="danger" plain>
        <i-ep-edit />
        Logout
      </el-button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, computed } from 'vue'
import { useRoute } from 'vue-router'

export default defineComponent({
  name: 'Header',
  setup() {
    const route = useRoute()
    const state = reactive({
      routeName: ''
    })
    const currentRoute = computed(() => route.name)
    return {
      state,
      currentRoute
    }
  }
})
</script>
