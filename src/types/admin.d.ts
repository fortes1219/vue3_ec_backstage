type adminCardType = {
  ID: number
  Account: string
  Password: string
  Name: string
  Email: string
  Phone: string
}

type adminListStateType = {
  tableData: adminCardType[]
  mode: string
  adminForm: {
    id: number | null
    account: string
    username: string
    email: string
    phone: string
    password: string
    checkPassword: string
  }
  permissions: {
    home: { name: string; value: boolean }[]
    order: { name: string; value: boolean }[]
    goods: { name: string; value: boolean }[]
    member: { name: string; value: boolean }[]
    admin: { name: string; value: boolean }[]
  }
}
