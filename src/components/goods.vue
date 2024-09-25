<template>
  <div class="flx vertical grow flex_1" data-inset="1rem">
    <SearchField>
      <el-form label-width="100px" style="width: 100%">
        <div class="flx horizontal v_center space_between">
          <div class="flx horizontal v_center">
            <el-form-item label="商品分類:">
              <el-select v-model="state.searchParams.goodsTypeSelected">
                <el-option v-for="(item, i) in goodsTypeList.mix" :key="i" :label="item.Name" :value="item.ID" />
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
      <el-table
        :data="state.tableData"
        :default-sort="{ prop: 'ID', order: 'descending' }"
        style="width: 100%; height: 100%"
      >
        <el-table-column label="ID" prop="ID" sortable align="center" width="100"></el-table-column>
        <el-table-column label="商品名稱" prop="Name" align="center"></el-table-column>
        <el-table-column label="商品分類" prop="GoodsType.Name" align="center"></el-table-column>
        <el-table-column label="商品圖片" prop="ImagesIdnet" align="center" width="120">
          <template #default="scope">
            <img :src="getcurrentImgs[scope.row.ImagesIdnet][0]?.Url" :alt="scope.row.Name" />
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
              <el-button
                type="primary"
                size="small"
                round
                class="remove"
                icon="Delete"
                @click="handleRemoveGoods(scope.row)"
              >
                刪除
              </el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>

  <!--分類管理-->
  <el-dialog v-model="dialogGoodsType" width="570px" title="分類管理">
    <hr />
    <div class="flx horizontal v_center" data-space-bottom="1rem">
      <div class="grid col-1" data-space-right="0.5rem">
        <el-input v-model="newTypeName" type="text" placeholder="分類名稱" />
      </div>
      <el-button type="primary" class="deep_dark" icon="CirclePlus" @click="addNewGoodsType">新增</el-button>
    </div>
    <el-table
      :data="goodsTypeList.origin"
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
        <el-button plain class="cancel" @click="dialogGoodsType = false">Cancel</el-button>
        <el-button type="primary" class="confirm" @click="handleUpdateGoodsType">Confirm</el-button>
      </span>
    </template>
  </el-dialog>

  <!--商品管理-->
  <el-dialog
    :key="`dialog-${state.editMode}`"
    v-model="dialogGoods"
    width="600px"
    :close-on-click-modal="false"
    :title="detectGoodsDialogMode"
    @close="resetGoodsForm"
  >
    <hr />
    <el-form ref="goodsFormRef" :model="goodsForm" label-width="80px">
      <el-form-item label="前台顯示:" prop="Show">
        <el-radio-group v-model="goodsForm.Show" size="small">
          <el-radio-button :label="true">是</el-radio-button>
          <el-radio-button :label="false">否</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <!-- <el-form-item label="新品期間:"></el-form-item> -->
      <el-form-item label="分類:" prop="GoodsTypeID">
        <el-select v-model="goodsForm.GoodsTypeID">
          <el-option v-for="(item, i) in goodsTypeList.origin" :key="i" :label="item.Name" :value="item.ID" />
        </el-select>
      </el-form-item>
      <el-form-item label="名稱:" prop="Name">
        <div class="w-200px">
          <el-input v-model="goodsForm.Name" type="text" class="col-1-4" placeholder="商品名稱" />
        </div>
      </el-form-item>
      <el-form-item label="商品規格:" prop="SpecsAllowance">
        <div class="flx horizontal v_center">
          <span class="sp_right">可選</span>
          <div class="w-50px sp_right">
            <el-input v-model="goodsForm.SpecsAllowance" type="text" />
          </div>
          <span class="sp_right">種</span>
          <el-button type="primary" round class="deep_dark" icon="CirclePlus" @click="addGoodsSpecs">
            新增規格
          </el-button>
        </div>
        <div class="flx horizontal wrap" data-space-vertical="1rem">
          <span v-for="(item, i) in goodsForm.GoodsSpecs" :key="i" class="spec_tag">
            <el-icon @click="removeGoodsSpecs(item, i)">
              <Close />
            </el-icon>
            <span>{{ item.Specs }}</span>
            <input v-model="item.Specs" type="text" placeholder="商品規格" @input="spacTagChange(i)" />
          </span>
        </div>
      </el-form-item>
      <el-form-item label="金額:" prop="UnitPrice">
        <div class="w-80px">
          <el-input v-model="goodsForm.UnitPrice" type="text" class="col-1-3" placeholder="商品單價" />
        </div>
      </el-form-item>
      <el-form-item label="圖片上傳:" prop="ImagesIdnet">
        <div class="flx horizontal v_center sp_bottom">
          <label class="upload-customize">
            <span class="upload-btn">
              <el-icon><PictureFilled /></el-icon>
              選擇圖片
            </span>
            <input type="file" @change="selectFile($event)" />
          </label>
          <span class="upload-file-name sp_left">選擇圖檔: {{ state.imgFileName }}</span>
        </div>
        <div class="flx horizontal v_center">
          <div class="w-150px sp_right">
            <el-input v-model="goodsForm.ImagesIdnet" type="text" placeholder="圖片別名(Ident)" />
          </div>
          <el-button type="primary" class="deep_dark" icon="UploadFilled" @click="handleUpload">上傳圖片</el-button>
        </div>
        <div class="goods-img-preview">
          <div v-for="(item, i) in getcurrentImgs[goodsForm.ImagesIdnet]" :key="i" class="img-preview__items">
            <div class="img-container">
              <img :src="item.Url" />
            </div>
            <div class="flx horizontal v_center flex_1">
              <p class="sp_left sp_right">ID: {{ item.ID }}</p>
              <p>Ident: {{ item.Ident }}</p>
            </div>
            <el-icon @click="handleRemoveImg(item)">
              <Close />
            </el-icon>
          </div>
        </div>
      </el-form-item>
      <el-form-item label="商品說明:" prop="Description">
        <el-input
          v-model="goodsForm.Description"
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 5 }"
          placeholder="商品說明"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button plain class="cancel" @click="dialogGoods = false">Cancel</el-button>
        <el-button v-if="state.editMode !== 'edit'" plain class="cancel" @click="resetGoodsForm"> Reset </el-button>
        <el-button type="primary" class="confirm" @click="handleUpdateGoods(state.editMode !== 'edit' ? true : false)">
          Confirm
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, inject, computed, onMounted, Ref } from 'vue'
import { goodsModules } from '@/store/goods'
import { callApi } from '@/utils/callApi'
import {
  getImg,
  addGoods,
  addGoodsType,
  getGoodsList,
  updateGoods,
  removeGoodsSpec,
  removeGoods,
  removeGoodsType,
  updateGoodsType,
  removeImg
} from '@/service/api'
import type { FormInstance } from 'element-plus'

// type goodsTypeArray = Ref<{ ID: number; Name: string }[]>

export default defineComponent({
  name: 'Goods',
  components: {},
  setup() {
    const goodsStore = goodsModules()
    const goodsFormRef = ref<FormInstance>()
    const proxy = inject('vueProxy')
    const state: goodsStateType = reactive({
      searchParams: {
        goodsTypeSelected: 0,
        goodsName: '',
        currentPage: 1,
        pageSize: 20
      },
      tableData: [],
      typeList: [],
      editMode: 'add',
      imgFile: null,
      imgFileName: '',
      imgIdent: '',
      goodsImg: {}
    })
    const goodsForm: goodsFormType = reactive({
      ID: null,
      Show: true,
      GoodsTypeID: 1,
      Name: '',
      SpecsAllowance: 0,
      GoodsSpecs: [],
      UnitPrice: 0,
      ImagesIdnet: '',
      Description: ''
    })
    const dialogGoods: Ref<boolean> = ref(false)
    const dialogGoodsType: Ref<boolean> = ref(false)
    const newTypeName = ref('')
    const newSpecName = ref('')

    let oldParams = { ...state.searchParams }

    const getGoodsTypeList = () => {
      goodsStore.getAllGoodsType()
    }

    const parseObj = (target) => JSON.parse(JSON.stringify(target))

    const goodsTypeList = computed(
      (): { origin: { ID: number; Name: string }[]; mix: { ID: number; Name: string }[] } => {
        const arr = parseObj(goodsStore.typeList)
        arr.unshift({ ID: 0, Name: '全部', Alias: '' })
        return {
          origin: parseObj(goodsStore.typeList),
          mix: arr
        }
      }
    )

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
        state.tableData.forEach((el) => {
          state.goodsImg[el.ImagesIdnet] = []
          getGoodsImg(el.ImagesIdnet)
        })
      })
    }

    /* Pagination Events */

    const onPageChange = (val: number) => {
      state.searchParams.currentPage = val
      handleSearch(false, true)
    }

    const onPageSizeChange = (val: number) => {
      state.searchParams.pageSize = val
      state.searchParams.currentPage = 1
      handleSearch(false, true)
    }

    /* Goods Management */

    const openGoodsDialog = (mode: string, obj?) => {
      const caseObj = {
        add: () => {
          state.editMode = 'add'
          resetGoodsForm()
        },
        edit: () => {
          state.editMode = 'edit'
          const data = parseObj(obj)
          Object.keys(goodsForm).forEach((el) => {
            goodsForm[el] = data[el]
          })
          goodsForm.GoodsSpecs = goodsForm.GoodsSpecs.filter((el) => el.Specs !== '')
          console.log(data, goodsForm)
        }
      }
      caseObj[mode]()
      dialogGoods.value = true
      console.log(dialogGoods.value)
    }

    const handleUpdateGoods = (isNewGoods = false) => {
      const jwt = parseObj(goodsForm)
      if (isNewGoods) delete jwt.ID
      jwt.SpecsAllowance = jwt.SpecsAllowance * 1
      jwt.UnitPrice = jwt.UnitPrice * 1
      console.log(jwt)
      callApi(isNewGoods ? addGoods : updateGoods, jwt, async () => {
        await handleSearch(false, false)
        dialogGoods.value = false
        proxy.$message({
          type: 'success',
          message: '已成功更新商品內容!'
        })
      })
    }

    const detectGoodsDialogMode = computed((): string => {
      let result = ''
      const caseObj = {
        add: () => {
          result = '新增商品'
        },
        edit: () => {
          result = '編輯商品'
        }
      }
      caseObj[state.editMode]()
      return result
    })

    const handleRemoveGoods = (obj) => {
      const title = '提示訊息'
      const msg = `確定要刪除${obj.Name}(ID: ${obj.ID})?`
      const data = { ...obj }
      ElMessageBox.confirm(msg, title, {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        type: 'warning'
      })
        .then(() => {
          callApi(removeGoods, { ID: data.ID }, async () => {
            await handleSearch(false, false)
            proxy.$message({
              type: 'success',
              message: '已成功刪除商品!'
            })
          })
          console.log('###remove goods: ', data.ID)
        })
        .catch(() => {
          proxy.$message({
            type: 'info',
            message: '已取消'
          })
        })
    }

    /* Goods Type Managemaent */

    const openGoodsType = () => {
      state.typeList = goodsTypeList.value.origin
      dialogGoodsType.value = true
    }

    const addNewGoodsType = () => {
      callApi(addGoodsType, { Name: newTypeName.value }, async () => {
        await getGoodsTypeList()
        state.typeList = goodsTypeList.value.origin
      })
    }

    const handleUpdateGoodsType = () => {
      const arr = goodsTypeList.value.origin.filter((el) => el.ID > 1)
      const jwt = parseObj(arr)
      console.log(jwt)
      callApi(updateGoodsType, { List: jwt }, async (res) => {
        await getGoodsTypeList()
        proxy.$message({
          type: 'success',
          message: '已成功更新商品分類!'
        })
        console.log(res)
        state.typeList = goodsTypeList.value.origin
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
            proxy.$message({
              type: 'success',
              message: '已成功刪除商品分類!'
            })
          })
        })
        .catch(() => {
          proxy.$message({
            type: 'info',
            message: '已取消'
          })
        })
    }

    const addGoodsSpecs = () => {
      goodsForm.GoodsSpecs.push({ Specs: '' })
      console.log(goodsForm.GoodsSpecs)
    }

    const spacTagChange = (i) => {
      console.log(i, goodsForm.GoodsSpecs)
    }

    const removeGoodsSpecs = async (val, i: number) => {
      const idx = goodsForm.GoodsSpecs.indexOf(val)
      if (idx === i) goodsForm.GoodsSpecs.splice(idx, 1)
      await callApi(removeGoodsSpec, { ID: val.ID }, () => {
        proxy.$message({
          message: `已移除 ${val.Specs} ID: ${val.ID}`,
          type: 'success'
        })
      })
    }

    /* Reset Form */
    const resetForm = (formEl: FormInstance | undefined) => {
      if (!formEl) return
      formEl.resetFields()
    }

    const resetGoodsForm = () => {
      goodsForm.ID = null
      goodsForm.Show = true
      goodsForm.GoodsTypeID = 1
      goodsForm.Name = ''
      goodsForm.SpecsAllowance = 0
      goodsForm.GoodsSpecs = []
      goodsForm.UnitPrice = 0
      goodsForm.ImagesIdnet = ''
      goodsForm.Description = ''
    }

    /* Image Upload Events */

    const selectFile = async (event) => {
      const file = event.target.files[0]
      const fileSize = file.size / 1024
      state.imgFile = file
      state.imgFileName = file.name
      console.log('###upload info: ', (file.size / 1024).toFixed(2), 'kb', state.imgFile)
      if (fileSize > 250) {
        proxy.$message({
          message: '檔案不可大於 250KB',
          type: 'error'
        })
        state.imgFileName = '檔案不可大於 250KB，請重新選擇圖片'
        return
      }
    }

    const handleUpload = () => {
      const token: string = parseObj(localStorage.getItem('userInfo') as string).token
      const formData: FormData = new FormData()
      formData.append('Ident', goodsForm.ImagesIdnet)
      formData.append('Img', state.imgFile!)
      const options: RequestInit = {
        method: 'POST',
        headers: {
          token: token
        },
        body: formData
      }
      if (state.imgFile === null) {
        proxy.$message({
          type: 'error',
          message: '未選擇檔案'
        })
        return
      }
      if (!state.goodsImg.hasOwnProperty(goodsForm.ImagesIdnet)) {
        state.goodsImg[goodsForm.ImagesIdnet] = []
      }
      const baseUrl = import.meta.env.MODE === 'production' ? import.meta.env.VITE_BASE_API : '/api'
      fetch(baseUrl + '/admin/image/c', options)
        .then((res) => res.json())
        .then((res) => {
          state.goodsImg[goodsForm.ImagesIdnet].push(res.Data)
          console.log(res, state.goodsImg)
          proxy.$message({
            type: 'success',
            message: '已成功上傳圖片'
          })
        })
        .catch(() => {
          proxy.$message({
            type: 'error',
            message: 'API錯誤'
          })
        })
    }

    const getGoodsImg = async (ident: string) => {
      callApi(getImg, { Ident: ident }, (res) => {
        state.goodsImg[ident] = res.data.Data
      })
    }

    const getcurrentImgs = computed(() => {
      const obj = { ...state.goodsImg }
      return obj
    })

    const handleRemoveImg = (obj) => {
      const title = '提示訊息'
      const msg = `確定要刪除【${obj.Ident}】這張圖片嗎？(ID: ${obj.ID})?`
      ElMessageBox.confirm(msg, title, {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        type: 'warning'
      })
        .then(() => {
          const jwt = { id: obj.ID }
          callApi(removeImg, jwt, async () => {
            await removeImg(jwt)
            await getGoodsImg(obj.Ident)
            proxy.$message({
              type: 'success',
              message: '已成功刪除圖片!'
            })
          })
        })
        .catch(() => {
          proxy.$message({
            type: 'info',
            message: '已取消'
          })
        })
    }

    /* initial Settings */

    const init = onMounted(async () => {
      await getGoodsTypeList()
      await handleSearch(true, false)
    })

    return {
      state,
      goodsForm,
      goodsFormRef,
      newTypeName,
      newSpecName,
      parseObj,
      dialogGoods,
      dialogGoodsType,
      onPageChange,
      onPageSizeChange,
      openGoodsDialog,
      detectGoodsDialogMode,
      goodsTypeList,
      oldParams,
      handleSearch,
      getGoodsImg,
      handleUpdateGoods,
      handleRemoveGoods,
      openGoodsType,
      addNewGoodsType,
      addGoodsSpecs,
      removeGoodsSpecs,
      handleUpdateGoodsType,
      deleteGoodsType,
      spacTagChange,
      resetForm,
      resetGoodsForm,
      selectFile,
      getcurrentImgs,
      handleUpload,
      handleRemoveImg,
      init
    }
  }
})
</script>
