<template>
  <div class="home">
    <Aside />
    <div class="contents">
      <Header />
      <router-view />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { reactive } from 'vue'
import Aside from '@/components/aside.vue'
import Header from '@/components/header.vue'

export default defineComponent({
  name: 'Home',
  components: { Aside, Header },
  setup() {
    const state = reactive({
      title: 'HOME View'
    })
    return {
      state
    }
  }
})
</script>
