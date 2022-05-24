<template>
  <div class="flx vertical grow" data-inset="1rem">
    <img :src="state.img" />
    <!-- <el-button type="primary" @click="getCurrentOverview">Dashboard Test</el-button>
    <br /> -->
    <div class="flx horizontal space_between" data-space-vertical="1rem">
      <label class="upload-customize">
        <span>選擇圖片</span>
        <input type="file" @change="selectFile($event)" />
      </label>
      <el-input v-model="state.ident" type="text" placeholder="圖片別名(Ident)" />
      <el-button type="primary" @click="handleUpload">上傳圖片</el-button>
    </div>
    <span>{{ state.fileName }}</span>
    <el-button type="primary" @click="getImgApi">GET IMG</el-button>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { getOverview, getImg } from '@/service/api'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'Dashboard',
  setup() {
    const state = reactive({
      img: 'src/assets/img/img_dummy.svg',
      ident: '',
      file: null,
      fileName: ''
    })

    const router = useRouter()

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

    const selectFile = async (event) => {
      const file = event.target.files[0]
      const fileSize = file.size / 1024
      state.file = file
      state.fileName = file.name
      console.log('###upload info: ', (file.size / 1024).toFixed(2), 'kb', state.file)
      if (fileSize > 200) {
        ElMessage({
          message: '檔案不可大於 200KB',
          type: 'error'
        })
        return
      }
    }

    const handleUpload = () => {
      const token: string = JSON.parse(localStorage.getItem('userInfo') as string).token
      const formData: FormData = new FormData()
      formData.append('Ident', state.ident)
      formData.append('Img', state.file!)
      const options: RequestInit = {
        method: 'POST',
        headers: {
          token: token
        },
        body: formData
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
      console.log(res.data, router.options.routes)
    }

    return {
      state,
      getCurrentOverview,
      selectFile,
      handleUpload,
      getImgApi
    }
  }
})
</script>
