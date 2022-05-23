export type userInfoType = {
  account: string
  username: string
  token: string
}

export type userApi = {
  Code: number
  Data: {
    Info: {
      ID: number
      Account: string
      Email: string
      Name: string
      OTP: string
      Password: string
      Phone: string
    }
    Token: string
  }
  Msg: string
}
