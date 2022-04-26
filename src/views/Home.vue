<template>
  <div class="row vertical center grow">
    <img alt="Vue logo" src="../assets/logo.png" />
    <span>{{ state.title }}</span>
    <el-button @click="setToken">SET TOKEN</el-button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { reactive } from 'vue'
/* 解構的話才需要用這個
import { storeToRefs } from 'pinia'
*/
import { userModules } from '@/store/user'

export default defineComponent({
  name: 'HomeView',
  components: {
    
  },
  setup() {
    const userStore = userModules()
    const state = reactive({
      title: 'HOME View'
    })
    
    const setToken = () => {
      userStore.setToken('SLKDJKLS')
      console.log('### store user: ', userStore.userStatus)
    }

    return {
      state,
      setToken
    }
  }
})
</script>
