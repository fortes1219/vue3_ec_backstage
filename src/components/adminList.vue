<template>
  <div class="flx vertical grow flex_1" data-inset="1rem">Admin List</div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { getOverview } from '@/service/api'
import { ElMessage } from 'element-plus'

export default defineComponent({
  name: 'AdminList',
  setup() {
    const state = reactive({
      searchParams: {}
    })

    return {
      state
    }
  }
})
</script>
