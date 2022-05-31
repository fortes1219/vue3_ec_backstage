type goodsStateType = {
  searchParams: {
    goodsTypeSelected: number | string
    goodsName: string
    currentPage: number
    pageSize: number
  }
  tableData: any[]
  typeList: { ID: number; Name: string; Alias?: string }[]
}

type goodsFormType = {
  show: boolean
  duration: Date
  goodsType: number
  goodsName: string
  price: number | string
  imagesident: string
  description: string
}

type goodsDialogType = {
  ID: number
  Date?: Date
  Name: string
  Show: boolean
  SpecAllow: number
  Price: number
  GoodsType: { ID: number; Name: string }
  TypeID: number
  Spec: { ID: number; Specs: string }
  ImageIdent: string
  Description: string
}
