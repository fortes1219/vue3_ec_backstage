<template>
  <div class="aside">
    <div class="logo">No Code No Life</div>
    <nav>
      <ul class="menu">
        <li @click="handleRouteChange('Home')">
          <div class="row horizontal v_center">
            <i-ep-pieChart />
            Dashboard
          </div>
        </li>
        <li @click="handleRouteChange('AdminList')">
          <div class="row horizontal v_center">
            <i-ep-tools />
            管理員列表
          </div>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { reactive } from 'vue'
import { useRouter, RouteRecordRaw } from 'vue-router'

type asideState = {
  routes: RouteRecordRaw[] | undefined
}

export default defineComponent({
  name: 'Aside',
  setup() {
    const router = useRouter()
    const state: asideState = reactive({
      routes: []
    })
    const cureentRoutes = computed(() => router.options.routes)
    const pool = onMounted(() => {
      state.routes = cureentRoutes.value.find((el) => el.name === 'Home')?.children
      console.log(state.routes)
    })
    const handleRouteChange = (path: string) => {
      router.push({ name: path })
    }
    return {
      state,
      pool,
      handleRouteChange
    }
  }
})
</script>
