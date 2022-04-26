<template>
  <div class="row vertical center grow">
    <img alt="Vue logo" src="../assets/logo.png" />
    <span>{{ state.title }}</span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { reactive } from 'vue'

export default defineComponent({
  name: 'HomeView',
  components: {
    
  },
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
