import { AxiosPromise } from 'axios'

export const callApi = async (api: (data: any) => AxiosPromise<any>, jwt: any, cb: (res: any) => void) => {
  const res = await api(jwt)
  if (res.data.Code === 200) {
    console.log('### call api: ', res.data.Data)
    cb(res)
  } else {
    ElMessage({
      message: `API ERROR!! (${res.data.Code})`,
      type: 'error'
    })
  }
}
