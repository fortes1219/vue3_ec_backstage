<template>
  <div class="flx vertical grow flex_1" data-inset="1rem">
    <div class="flx horizontal v_center">
      <h2 class="title" data-space-right="1rem">總營業額:</h2>
      <h2 class="title">575,343</h2>
    </div>
    <br />
    <el-form>
      <el-form-item label="統計期間:">
        <div class="flx horizontal v_center">
          <div class="grid col-2 gap-10">
            <el-date-picker
              v-model="date"
              type="daterange"
              range-separator="到"
              start-placeholder="起始日期"
              end-placeholder="結尾日期"
              value-format="YYYY-MM-DD"
              @change="testConsole"
            />
            <el-button class="search" @click="getCurrentOverview">送出</el-button>
          </div>
        </div>
      </el-form-item>
    </el-form>

    <br />
    <h2 class="title">各項商品銷售總數</h2>
    <br />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { getOverview } from '@/service/api'
import { ElMessage } from 'element-plus'

export default defineComponent({
  name: 'Dashboard',
  setup() {
    const state = reactive({})
    const date = ref([])

    const getCurrentOverview = async () => {
      const jwt = {
        After: date.value[0],
        Berfo: date.value[1]
        // After: 0,
        // Berfo: 1
      }
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

    const testConsole = (evt) => {
      console.log(evt, date.value)
    }

    return {
      state,
      date,
      getCurrentOverview,
      testConsole
    }
  }
})
</script>
