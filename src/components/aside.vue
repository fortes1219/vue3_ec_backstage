<template>
  <div class="aside">
    <div class="logo">No Code No Life</div>
    <nav>
      <ul class="menu">
        <li v-for="(item, i) in state.routes" :key="i" @click="handleRouteChange(item.name)">
          <div class="flx horizontal v_center">
            <el-icon>
              <component :is="setIcons(item.name)"></component>
            </el-icon>
            {{ item.meta?.name }}
          </div>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted, computed } from 'vue'
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
    const setIcons = (name: string) => {
      const iconSets = {
        Dashboard: 'PieChart',
        Order: 'List',
        Goods: 'ShoppingCartFull',
        Member: 'UserFilled',
        AdminList: 'Tools'
      }
      return iconSets[name]
    }

    const pool = onMounted(() => {
      const routes = cureentRoutes.value.find((el) => el.name === 'Home')?.children
      const permissions = JSON.parse(localStorage.getItem('userPermissions') as string)
      const list = Object.keys(permissions).filter((el) => permissions[el].Activity === true)
      state.routes = routes?.filter((el: RouteRecordRaw) => list.includes(el.meta?.permissionId as string))
      console.log(state.routes)
    })

    const handleRouteChange = (path) => {
      router.push({ name: path })
    }
    return {
      state,
      pool,
      handleRouteChange,
      setIcons
    }
  }
})
</script>
