<template>
  <div id="login_form" class="row vertical grow center">
    <el-form label-width="80px">
      <el-form-item label="帳號:">
        <el-input v-model="state.username" type="text" placeholder="Username" />
      </el-form-item>
      <el-form-item label="密碼:">
        <el-input v-model="state.password" type="password" placeholder="Password" />
      </el-form-item>
      <el-form-item label="OTP:">
        <div class="row horizontal v_center">
          <el-input v-model="state.otp" type="text" placeholder="OTP" />
          <div class="otp_number" @click="getOtpNumbers">{{ state.otp }}</div>
        </div>
      </el-form-item>
      <div class="row horizontal h_end">
        <el-button type="primary" @click="handleLogin">Login</el-button>
      </div>
    </el-form>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { reactive, onMounted } from 'vue'
import { getOtp } from '@/service/api'

import { userModules } from '@/store/user'

export default defineComponent({
  name: 'Login',
  components: {},
  setup() {
    const userStore = userModules()
    const state = reactive({
      title: 'Admin Login',
      username: '',
      password: '',
      otp: '',
      token: ''
    })

    const setToken = () => {
      userStore.setToken('SLKDJKLS')
      console.log('### store user: ', userStore.userStatus)
    }

    const getOtpNumbers = async () => {
      const res = await getOtp('')
      if (res.data.Code === 200) {
        state.otp = res.data.Data.OTP
        console.log('###res: ', state.otp)
      } else {
        ElMessage({
          message: `OTP API ERROR!! (${res.data.Code})`,
          type: 'error'
        })
      }
    }

    const handleLogin = () => {}
    const init = onMounted(async () => {
      await getOtpNumbers()
    })

    return {
      state,
      setToken,
      getOtpNumbers,
      handleLogin,
      init
    }
  }
})
</script>
