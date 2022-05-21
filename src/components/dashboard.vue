<template>
  <div class="row vertical grow flex_1" data-inset="1rem"></div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { getOverview } from '@/service/api'
import { ElMessage } from 'element-plus'

export default defineComponent({
  name: 'Dashboard',
  setup() {
    const state = reactive({
      img: 'src/assets/img/img_dummy.svg',
      ident: '',
      file: null,
      fileName: ''
    })

    const getCurrentOverview = async () => {
      const jwt = {}
      const res = await getOverview(jwt)
      if (res.data.Code === 200) {
        console.log('###res: ', res.data)
      } else {
        ElMessage({
          message: `API ERROR!! (${res.data.Code})`,
          type: 'error'
        })
      }
    }

    return {
      state,
      getCurrentOverview
    }
  }
})
</script>
