<template>
  <div class="search-field"><slot /></div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
export default defineComponent({
  name: 'SearchField',
  setup() {
    const state = reactive({})
    return {
      state
    }
  }
})
</script>
