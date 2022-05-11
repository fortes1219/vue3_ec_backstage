<template>
  <div id="login_form" class="row vertical grow center">
    <el-form label-width="80px">
      <el-form-item label="帳號:">
        <el-input v-model="state.form.username" type="text" placeholder="Username" />
      </el-form-item>
      <el-form-item label="密碼:">
        <el-input v-model="state.form.password" type="password" placeholder="Password" />
      </el-form-item>
      <el-form-item label="OTP:">
        <div class="row horizontal v_center">
          <el-input v-model="state.form.otp" type="text" placeholder="OTP" />
          <div class="otp_number" @click="getOtpNumbers">{{ state.currentOtp }}</div>
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
import { useRouter } from 'vue-router'
import { reactive, onMounted } from 'vue'
import { getOtp, userLogin } from '@/service/api'

import { userModules } from '@/store/user'

interface LoginForm {
  title: string
  form: {
    username: string
    password: string
    otp: number | string
  }
  currentOtp: number | string
  token: string
}

export default defineComponent({
  name: 'Login',
  components: {},
  setup() {
    const userStore = userModules()
    const router = useRouter()
    const state: LoginForm = reactive({
      title: 'Admin Login',
      form: {
        username: '',
        password: '',
        otp: ''
      },
      currentOtp: '',
      token: ''
    })

    const getOtpNumbers = async () => {
      const res = await getOtp('')
      if (res.data.Code === 200) {
        state.currentOtp = res.data.Data.OTP
        console.log('###res: ', state.currentOtp)
      } else {
        ElMessage({
          message: `OTP API ERROR!! (${res.data.Code})`,
          type: 'error'
        })
      }
    }

    const handleLogin = async () => {
      const jwt: LoginForm['form'] = {
        username: state.form.username,
        password: state.form.password,
        otp: state.form.otp
      }
      const res = await userLogin(jwt)
      if (res.data.Code === 200) {
        state.token = res.data.Data.Token
        await userStore.setToken({
          username: res.data.Data.Info.Account,
          token: res.data.Data.Token
        })
        await router.push({ name: 'home' })
      }
    }

    const init = onMounted(async () => {
      await getOtpNumbers()
    })

    return {
      state,
      getOtpNumbers,
      handleLogin,
      init
    }
  }
})
</script>
