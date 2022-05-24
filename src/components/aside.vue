<template>
  <div class="aside">
    <div class="logo">No Code No Life</div>
    <nav>
      <ul class="menu">
        <li v-for="(item, i) in state.routes" :key="i" @click="handleRouteChange(item.name as string)">
          <div class="flx horizontal v_center">
            <el-icon>
              <component :is="state.iconSets[i]"></component>
            </el-icon>
            {{ item.meta?.name }}
          </div>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { reactive, onMounted } from 'vue'
import { useRouter, RouteRecordRaw, RouteRecordName } from 'vue-router'

type asideState = {
  routes: RouteRecordRaw[] | undefined
  iconSets: string[]
}

export default defineComponent({
  name: 'Aside',
  setup() {
    const router = useRouter()
    const state: asideState = reactive({
      routes: [],
      iconSets: ['PieChart', 'List', 'ShoppingCartFull', 'UserFilled', 'Tools']
    })
    const cureentRoutes = computed(() => router.options.routes)
    const pool = onMounted(() => {
      state.routes = cureentRoutes.value.find((el) => el.name === 'Home')?.children
      console.log(state.routes)
    })
    const handleRouteChange = (path: RouteRecordName) => {
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
