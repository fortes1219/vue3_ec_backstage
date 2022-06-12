<template>
  <div class="flx vertical grow flex_1" data-inset="1rem">
    <div class="flx horizontal v_center">
      <el-button type="primary" :disabled="!enable.add" class="deep_dark" round icon="Plus">新增管理員</el-button>
    </div>
    <div class="flx horizontal wrap sp_top">
      <AdminCard v-for="(item, i) in state.tableData" :key="i" :data="item">
        <div v-if="item.ID !== 1" class="flx horizontal v_center_end">
          <el-button
            type="primary"
            :disabled="!enable.edit"
            round
            class="deep_dark"
            icon="Edit"
            size="small"
            @click="openPermissions(item)"
          >
            權限設定
          </el-button>
          <el-button
            type="primary"
            :disabled="!enable.delete"
            round
            class="remove"
            icon="Delete"
            size="small"
            @click="createPermissionsList"
          >
            刪除
          </el-button>
        </div>
        <p v-else class="notice">root角色不可修改</p>
      </AdminCard>
    </div>
  </div>
  <el-dialog v-model="dialogPermissions" width="570px" title="管理權限設定">
    <el-form label-width="100px">
      <el-form-item label="管理帳號:">
        <p>{{ `${state.adminForm.account} (ID: ${state.adminForm.id})` }}</p>
      </el-form-item>
      <el-form-item label="權限設定:">
        <div class="flx vertical">
          <h2 class="permissions-title">Dashboard</h2>
          <div class="flx wrap horizontal sp_bottom">
            <div v-for="(item, i) in state.permissions.home" :key="i" class="sp_right">
              <el-checkbox v-model="item.value">{{ listName[item.name] }}</el-checkbox>
            </div>
          </div>
          <h2 class="permissions-title">訂單管理</h2>
          <div class="flx wrap horizontal sp_bottom">
            <div v-for="(item, i) in state.permissions.order" :key="i" class="sp_right">
              <el-checkbox v-model="item.value">{{ listName[item.name] }}</el-checkbox>
            </div>
          </div>
          <h2 class="permissions-title">商品管理</h2>
          <div class="flx wrap horizontal sp_bottom">
            <div v-for="(item, i) in state.permissions.goods" :key="i" class="sp_right">
              <el-checkbox v-model="item.value">{{ listName[item.name] }}</el-checkbox>
            </div>
          </div>
          <h2 class="permissions-title">會員管理</h2>
          <div class="flx wrap horizontal sp_bottom">
            <div v-for="(item, i) in state.permissions.member" :key="i" class="sp_right">
              <el-checkbox v-model="item.value">{{ listName[item.name] }}</el-checkbox>
            </div>
          </div>
          <h2 class="permissions-title">管理員列表</h2>
          <div class="flx wrap horizontal sp_bottom">
            <div v-for="(item, i) in state.permissions.admin" :key="i" class="sp_right">
              <el-checkbox v-model="item.value">{{ listName[item.name] }}</el-checkbox>
            </div>
          </div>
        </div>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button plain class="cancel" @click="dialogPermissions = false">Cancel</el-button>
        <el-button type="primary" class="confirm" @click="handleUpdatePermissions">Confirm</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, computed, onMounted, Ref } from 'vue'
import { callApi } from '@/utils/callApi'
import type { FormInstance } from 'element-plus'
import { PermissionsName } from '@/service/permissions'
import {
  getAdminMembers,
  addAdminMembers,
  removeAdminMembers,
  getAdminPermissions,
  updateAdminPermissions
} from '@/service/api'
import AdminCard from '@/components/card.vue'
import { userModules } from '@/store/user'

export default defineComponent({
  name: 'AdminList',
  components: {
    AdminCard
  },
  setup() {
    const userStore = userModules()
    const state: adminListStateType = reactive({
      tableData: [],
      adminForm: {
        id: null,
        account: '',
        username: '',
        email: '',
        phone: '',
        password: '',
        checkPassword: ''
      },
      permissions: {
        home: [],
        order: [],
        goods: [],
        member: [],
        admin: []
      }
    })
    const listName = PermissionsName
    const dialogPermissions: Ref<boolean> = ref(false)
    const openPermissions = async (obj) => {
      console.log('###open: ', obj.ID)
      await createPermissionsList(obj)
      state.adminForm.id = obj.ID
      state.adminForm.account = obj.Account
      state.adminForm.username = obj.Name
      state.adminForm.email = obj.Email
      state.adminForm.phone = obj.Phone
      dialogPermissions.value = true
    }

    const getAdminList = () => {
      callApi(getAdminMembers, {}, (res) => {
        state.tableData = res.data.Data
        console.log(state.tableData)
      })
    }

    const userInfo = computed(() => userStore.$state.userStatus)
    const userPermissions = computed(() => userStore.$state.userPermissions)

    /* 開啟權限設定時，製作一份顯示權限UI的清單物件 */
    const createPermissionsList = async (obj) => {
      const jwt = { MemberID: obj.ID }
      let currentPermissions = {}
      // 戳API取回該ID的權限表
      await callApi(getAdminPermissions, jwt, (res) => {
        currentPermissions = res.data.Data.Permission
        console.log(res.data.Data)
      })

      // 製作成v-for渲染需要的Array
      const arr: { name: string; value: boolean }[] = []
      Object.keys(currentPermissions).forEach((el) => {
        arr.push({ name: el, value: currentPermissions[el].Activity })
      })
      const pool = Object.keys(state.permissions)
      for (let i in pool) {
        state.permissions[pool[i]] = []
        // 將物件KEY前綴做索引分辨要丟到新物件的哪個KEY中
        const regex = new RegExp(`^${pool[i]}`)
        arr.forEach((item) => {
          if (regex.test(item.name)) {
            state.permissions[pool[i]].push(item)
          }
        })
      }
      console.log(state.permissions)
    }

    const handleUpdatePermissions = async () => {
      const obj = {}
      const pool = Object.keys(state.permissions)
      for (let i in pool) {
        state.permissions[pool[i]].forEach((el) => {
          obj[el.name] = { Activity: el.value }
        })
      }
      const jwt = {
        MemberID: state.adminForm.id,
        MemberPermission: { ...obj }
      }
      await callApi(updateAdminPermissions, jwt, (res) => {
        ElMessage({
          type: 'success',
          message: '已成功更新管理權限!'
        })
        console.log(res.data.Data)
      })
      // 更新後再撈取一次權限列表，連同Store也一併更新
      await callApi(getAdminPermissions, { MemberID: state.adminForm.id }, (res) => {
        userStore.setUserPermissions(res.data.Data.Permission)
      })
    }

    const enable = computed(() => {
      const permissions = JSON.parse(localStorage.getItem('userPermissions') as string)
      return {
        add: permissions.admin_manage_add.Activity,
        edit: permissions.admin_manage_edit.Activity,
        delete: permissions.admin_manage_del.Activity
      }
    })

    const init = onMounted(async () => {
      await getAdminList()
    })

    return {
      state,
      init,
      listName,
      getAdminList,
      userInfo,
      userPermissions,
      enable,
      createPermissionsList,
      openPermissions,
      handleUpdatePermissions,
      dialogPermissions
    }
  }
})
</script>
