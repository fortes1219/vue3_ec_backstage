<template>
  <div class="flx vertical grow flex_1" data-inset="1rem">
    <SearchField>
      <el-form label-width="100px" style="width: 100%">
        <div class="flx horizontal v_center space_between">
          <div class="flx horizontal v_center">
            <el-form-item label="商品分類:">
              <el-select v-model="state.searchParams.goodsTypeSelected">
                <el-option v-for="(item, i) in goodsTypeList" :key="i" :label="item.Name" :value="item.ID" />
              </el-select>
            </el-form-item>
            <el-form-item label="商品名稱:">
              <el-input v-model="state.searchParams.goodsName" type="text" placeholder="請輸入商品名稱" />
            </el-form-item>
          </div>
          <div class="flx horizontal v_center_end">
            <el-button class="reset" plain>重置</el-button>
            <el-button class="search" plain icon="Search" @click="handleSearch(true, false)">搜尋</el-button>
          </div>
        </div>
      </el-form>
    </SearchField>
    <div class="flx horizontal v_center space_between">
      <el-pagination
        v-model:currentPage="state.searchParams.currentPage"
        v-model:page-size="state.searchParams.pageSize"
        :page-sizes="[20, 50, 100]"
        :small="false"
        :background="true"
        layout="sizes, prev, pager, next"
        :total="0"
        data-space-vertical="1rem"
        @size-change="onPageSizeChange"
        @current-change="onPageChange"
      />
      <div class="grid col-2">
        <el-button type="primary" size="small" round class="dark" icon="Collection" @click="openGoodsType">
          分類管理
        </el-button>
        <el-button type="primary" size="small" round class="dark" icon="CirclePlus" @click="openGoodsDialog('add')">
          新增商品
        </el-button>
      </div>
    </div>
    <div class="row vertical grow flex_1">
      <el-table :data="state.tableData" style="width: 100%; height: 100%">
        <el-table-column label="ID" prop="ID" sortable align="center" width="100"></el-table-column>
        <el-table-column label="商品名稱" prop="Name" align="center"></el-table-column>
        <el-table-column label="商品分類" prop="GoodsType.Name" align="center"></el-table-column>
        <el-table-column label="商品圖片" prop="ImagesIdnet" align="center" width="120">
          <template #default="scope">
            <img src="/img/img_dummy.svg" :alt="scope.Name" />
          </template>
        </el-table-column>
        <el-table-column label="前台顯示" prop="Show" align="center" width="120">
          <template #default="scope">
            {{ scope.row.Show ? '是' : '否' }}
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="200">
          <template #default="scope">
            <div class="row horizontal v_center">
              <el-button
                type="primary"
                size="small"
                round
                class="dark"
                icon="Edit"
                @click="openGoodsDialog('edit', scope.row)"
              >
                編輯商品
              </el-button>
              <el-button type="primary" size="small" round class="remove" icon="Delete" @click="removeGoods(scope.row)"
                >刪除</el-button
              >
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
  <el-dialog v-model="dialogGoodsType" width="570px" title="分類管理">
    <hr />
    <div class="flx horizontal v_center" data-space-bottom="1rem">
      <div class="grid col-1" data-space-right="0.5rem">
        <el-input v-model="newTypeName" type="text" placeholder="分類名稱" />
      </div>
      <el-button type="primary" class="deep_dark" icon="CirclePlus" @click="addNewGoodsType">新增</el-button>
    </div>
    <el-table
      :data="goodsTypeList"
      height="300px"
      style="width: 100%"
      :default-sort="{ prop: 'ID', order: 'descending' }"
    >
      <el-table-column label="ID" prop="ID" sortable align="center" width="100"></el-table-column>
      <el-table-column label="分類名稱" prop="Name" align="center">
        <template #default="scope">
          <el-input v-if="scope.row.ID > 1" v-model="scope.row.Name" type="text" />
          <p v-else>{{ scope.row.Name }}</p>
        </template>
      </el-table-column>
      <el-table-column label="分類別名" align="center">
        <template #default="scope">
          <el-input v-if="scope.row.ID > 1" v-model="scope.row.Alias" type="text" />
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="200">
        <template #default="scope">
          <el-button
            v-if="scope.row.ID > 1"
            type="primary"
            size="small"
            round
            class="remove"
            icon="Delete"
            @click="deleteGoodsType(scope.row)"
          >
            刪除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <template #footer>
      <span class="dialog-footer">
        <el-button plain class="cancel" @click="dialogGoods = false">Cancel</el-button>
        <el-button type="primary" class="confirm" @click="handleUpdateGoodsType">Confirm</el-button>
      </span>
    </template>
  </el-dialog>
  <el-dialog v-model="dialogGoods" title="商品管理">
    <template #footer>
      <span class="dialog-footer">
        <el-button plain class="cancel" @click="dialogGoods = false">Cancel</el-button>
        <el-button type="primary" class="confirm" @click="dialogGoods = false">Confirm</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, computed, onMounted } from 'vue'
import { goodsModules } from '@/store/goods'
import { callApi } from '@/utils/callApi'
import {
  getImg,
  // addGoods,
  addGoodsType,
  getGoodsList,
  // updateGoods,
  // updateGoodsType,
  // removeGoods,
  removeGoodsType,
  updateGoodsType
} from '@/service/api'
import SearchField from '@/components/SearchField.vue'

// type goodsTypeArray = Ref<{ ID: number; Name: string }[]>

export default defineComponent({
  name: 'Goods',
  components: {
    SearchField
  },
  setup() {
    const goodsStore = goodsModules()
    const state: goodsStateType = reactive({
      searchParams: {
        goodsTypeSelected: 0,
        goodsName: '',
        currentPage: 1,
        pageSize: 20
      },
      tableData: [],
      typeList: []
    })
    const dialogGoods = ref(false)
    const dialogGoodsType = ref(false)
    const newTypeName = ref('')

    let oldParams = { ...state.searchParams }

    const getGoodsTypeList = () => {
      goodsStore.getAllGoodsType()
    }

    const goodsTypeList = computed((): { ID: number; Name: string }[] => goodsStore.typeList)

    const handleSearch = (useNewParams = true, pageChange = true) => {
      const params = useNewParams ? state.searchParams : oldParams
      const jwt = {
        Page: params.currentPage,
        Limit: params.pageSize,
        GoodsName: params.goodsName,
        GoodsType: params.goodsTypeSelected
      }
      if (!pageChange) {
        jwt.Page = 1
        state.searchParams.currentPage = 1
      }
      callApi(getGoodsList, jwt, (res) => {
        state.tableData = res.data.Data
        oldParams = { ...params }
      })
    }

    const onPageChange = (val: number) => {
      state.searchParams.currentPage = val
      handleSearch(false, true)
    }

    const onPageSizeChange = (val: number) => {
      state.searchParams.pageSize = val
      state.searchParams.currentPage = 1
      handleSearch(false, true)
    }

    const openGoodsDialog = (mode: string, obj?) => {
      const caseObj = {
        add: () => {},
        edit: () => {
          console.log('edit')
        }
      }
      caseObj[mode]()
      dialogGoods.value = true
      console.log(dialogGoods.value)
    }

    const getGoodsImg = (isList = true, ident?: string) => {
      let imgPath = ''
      callApi(getImg, { Ident: ident }, (res) => {
        console.log(res.data.Data)
      })
      return imgPath
    }

    const editGoods = (obj) => {
      console.log(obj)
      dialogGoods.value = true
    }

    const removeGoods = (obj) => {
      console.log('###remove goods: ', obj)
    }

    const openGoodsType = () => {
      state.typeList = goodsTypeList.value
      dialogGoodsType.value = true
    }

    const addNewGoodsType = () => {
      callApi(addGoodsType, { Name: newTypeName.value }, async () => {
        await getGoodsTypeList()
        state.typeList = goodsTypeList.value
      })
    }

    const handleUpdateGoodsType = () => {
      const arr = goodsTypeList.value.filter((el) => el.ID > 1)
      const jwt = JSON.parse(JSON.stringify(arr))
      console.log(jwt)
      callApi(updateGoodsType, { List: jwt }, async (res) => {
        await getGoodsTypeList()
        console.log(res)
        state.typeList = goodsTypeList.value
      })
    }

    const deleteGoodsType = (obj) => {
      const title = '提示訊息'
      const msg = `確定要刪除${obj.Name}(ID: ${obj.ID})?`
      ElMessageBox.confirm(msg, title, {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        type: 'warning'
      })
        .then(() => {
          callApi(removeGoodsType, { ID: obj.ID }, async (res) => {
            console.log('###remove goods type: ', res.data)
            await getGoodsTypeList()
            ElMessage({
              type: 'success',
              message: '已成功刪除商品分類!'
            })
          })
        })
        .catch(() => {
          ElMessage({
            type: 'info',
            message: '已取消'
          })
        })
    }

    const init = onMounted(async () => {
      await getGoodsTypeList()
      await handleSearch(true, false)
    })

    return {
      state,
      newTypeName,
      dialogGoods,
      dialogGoodsType,
      onPageChange,
      onPageSizeChange,
      openGoodsDialog,
      goodsTypeList,
      oldParams,
      handleSearch,
      getGoodsImg,
      editGoods,
      removeGoods,
      openGoodsType,
      addNewGoodsType,
      handleUpdateGoodsType,
      deleteGoodsType,
      init
    }
  }
})
</script>
