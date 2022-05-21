<template>
  <div id="login" class="row vertical grow center">
    <div class="login-block">
      <div class="login-block-form">
        <h1>Admin Backoffice</h1>
        <br />
        <div class="input__inner" data-space-bottom="1rem">
          <input v-model="state.form.username" type="text" placeholder="Username" />
        </div>
        <div class="input__inner" data-space-bottom="1rem">
          <input v-model="state.form.password" type="password" placeholder="Password" />
        </div>
        <div class="input__inner" data-space-bottom="1rem">
          <div class="row horizontal v_center">
            <input v-model="state.form.otp" type="text" placeholder="OTP" />
            <div class="otp_number" @click="getOtpNumbers">{{ state.currentOtp }}</div>
          </div>
        </div>
        <div class="row horizontal h_end">
          <el-button class="btn__signin" @click="handleLogin">Login</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import { reactive, onMounted } from 'vue'
import { getOtp, userLogin } from '@/service/api'

import { userModules } from '@/store/user'

type LoginForm = {
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
        await router.push({ name: 'Home' })
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
