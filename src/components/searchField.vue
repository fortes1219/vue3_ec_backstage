<template>
  <div class="search-field"></div>
</template>

<script lang="ts">
import { defineComponent, reactive, prop } from 'vue'
import { getOverview } from '@/service/api'
import { ElMessage } from 'element-plus'

export default defineComponent({
  name: 'SearchField',
  props: {},
  setup(prop, ctx) {
    const state = reactive({
      searchParams: {}
    })

    return {
      state
    }
  }
})
</script>
