<template>
  <div id="login" class="flx vertical grow center">
    <div class="login-block">
      <div class="login-block-form">
        <h1>Admin Backoffice</h1>
        <br />
        <div class="input__inner" data-space-bottom="1rem">
          <input v-model="state.form.account" type="text" placeholder="Username" />
        </div>
        <div class="input__inner" data-space-bottom="1rem">
          <input v-model="state.form.password" type="password" placeholder="Password" />
        </div>
        <div class="input__inner" data-space-bottom="1rem">
          <div class="flx horizontal v_center">
            <input v-model="state.form.otp" type="text" placeholder="OTP" />
            <div class="otp_number" @click="getOtpNumbers">{{ state.currentOtp }}</div>
          </div>
        </div>
        <div class="flx horizontal h_end">
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
import { ElMessage } from 'element-plus'
import { userModules } from '@/store/user'
import { callApi } from '@/utils/callApi'
import { getAdminPermissions } from '@/service/api'

type LoginForm = {
  title: string
  form: {
    account: string
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
        account: '',
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
      } else {
        ElMessage({
          message: `OTP API ERROR!! (${res.data.Code})`,
          type: 'error'
        })
      }
    }

    /* 取得當前管理員的權限列表後，更新userStore的權限列表 */
    const getPermissions = async () => {
      const uid = userStore.$state.userStatus.id
      const jwt = { MemberID: uid }
      await callApi(getAdminPermissions, jwt, (res) => {
        userStore.setUserPermissions(res.data.Data.Permission)
      })
    }

    const handleRouterChange = async () => {
      await getPermissions()
      await router.push({ name: 'Home' })
    }

    const handleLogin = async () => {
      const jwt = {
        Account: state.form.account,
        Password: state.form.password,
        OTP: state.form.otp
      }
      await callApi(userLogin, jwt, async (res) => {
        state.token = res.data.Data.Token
        await userStore.setUserStatus({
          id: res.data.Data.Info.ID,
          account: res.data.Data.Info.Account,
          username: res.data.Data.Info.Name,
          token: res.data.Data.Token
        })
      })
      await handleRouterChange()
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
