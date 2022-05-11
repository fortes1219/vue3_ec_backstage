<template>
  <div class="row horizontal grow">
    <div class="row vertical grow">side</div>
    <div class="row vertical grow">
      <router-view />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { reactive } from 'vue'

export default defineComponent({
  name: 'Home',
  components: {},
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
