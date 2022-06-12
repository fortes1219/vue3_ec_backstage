type goodsStateType = {
  searchParams: {
    goodsTypeSelected: number | string
    goodsName: string
    currentPage: number
    pageSize: number
  }
  tableData: any[]
  typeList: { ID: number; Name: string; Alias?: string }[]
  editMode: 'add' | 'edit'
  imgFile: File | null
  imgFileName: string
  imgIdent: string
  goodsImg: any
}

type goodsImgs = { ID: number; Ident: string; Url: string }[]

type goodsFormType = {
  ID?: number | null
  Show: boolean
  Duration?: Date
  GoodsTypeID: number | undefined
  Name: string
  SpecsAllowance: number
  GoodsSpecs: { Specs: string }[]
  UnitPrice: number | string
  ImagesIdnet: string
  Description: string
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
