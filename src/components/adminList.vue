<template>
  <div class="flx vertical grow flex_1" data-inset="1rem">
    <div class="flx horizontal v_center">
      <el-button type="primary" class="deep_dark" round icon="Plus">新增管理員</el-button>
    </div>
    <div class="flx horizontal wrap sp_top">
      <AdminCard v-for="(item, i) in state.tableData" :key="i" :data="item">
        <div v-if="item.ID !== 1" class="flx horizontal v_center_end">
          <el-button type="primary" round class="deep_dark" icon="Edit" size="small" @click="test">
            權限設定
          </el-button>
          <el-button type="primary" round class="remove" icon="Delete" size="small"> 刪除 </el-button>
        </div>
        <p v-else class="notice">root角色不可修改</p>
      </AdminCard>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, computed, onMounted, Ref } from 'vue'
import { callApi } from '@/utils/callApi'
import type { FormInstance } from 'element-plus'
import {
  getAdminMembers,
  addAdminMembers,
  updateAdminMembers,
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
      tableData: []
    })

    const getAdminList = () => {
      callApi(getAdminMembers, {}, (res) => {
        state.tableData = res.data.Data
        console.log(state.tableData)
      })
    }

    const test = () => {
      console.log(userStore.$state.userStatus)
    }

    const init = onMounted(async () => {
      await getAdminList()
    })

    return {
      state,
      init,
      test,
      getAdminList
    }
  }
})
</script>
