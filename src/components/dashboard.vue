<template>
  <div class="row vertical grow" data-inset="1rem">
    <img :src="state.img" />
    <!-- <el-button type="primary" @click="getCurrentOverview">Dashboard Test</el-button>
    <br /> -->
    <div class="row horizontal v_center">
      <input type="file" @change="handleUpload($event)" />
      <el-input v-model="state.ident" type="text" placeholder="圖片別名(Ident)" />
    </div>
    <input type="file" @change="handleUpload($event)" />
    <el-button type="primary" @click="getImgApi">GET IMG</el-button>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { getOverview, getImg } from '@/service/api'
import { ElMessage } from 'element-plus'

export default defineComponent({
  name: 'Dashboard',
  setup() {
    const state = reactive({
      img: '@/assets/img/img_dummy.svg',
      ident: ''
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

    const handleUpload = async (event) => {
      const file = event.target.files[0]
      const token: string = JSON.parse(localStorage.getItem('userInfo') as string).token
      const formdata = new FormData()
      formdata.append('Ident', 'ssrb')
      formdata.append('Img', file)

      const options: RequestInit = {
        method: 'POST',
        headers: {
          token: token
        },
        body: formdata
      }

      fetch('/api' + '/admin/image/c', options)
        .then((res) => res.json())
        .then((res) => {
          console.log(res)
          state.img = res.Data.Url
        })
    }

    const getImgApi = async () => {
      // const jwt = { Ident: name }
      const jwt = {}
      const res = await getImg(jwt)
      console.log(res.data)
    }

    return {
      state,
      getCurrentOverview,
      handleUpload,
      getImgApi
    }
  }
})
</script>
