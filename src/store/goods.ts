import { defineStore } from 'pinia'
import { getGoodsType } from '@/service/api'

type goodsModules = {
  typeList: { ID: number; Name: string; Alias: string }[]
}

export const goodsModules = defineStore('goods', {
  state: (): goodsModules => ({
    typeList: []
  }),
  getters: {},
  actions: {
    async getAllGoodsType() {
      const res = await getGoodsType({})
      if (res.data.Code === 200) {
        this.typeList = res.data.Data
        console.log('###goods store: ', this.typeList)
      } else {
        ElMessage({
          message: `API ERROR!! (${res.data.Code})`,
          type: 'error'
        })
      }
    }
  }
})
