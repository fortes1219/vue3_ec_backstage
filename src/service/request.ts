import axios from 'axios'

export function request(config) {
  const service = axios.create({
    headers: config.headers,
    baseURL: import.meta.env.VITE_BASE_API,
    timeout: 30000,
    // transformRequest: [
    //   (data: any) => {
    //     let ret = ''
    //     const tempData = getJwtData(data)
    //     for (const it in tempData) {
    //       ret += encodeURIComponent(it) + '=' + encodeURIComponent(tempData[it]) + '&'
    //     }
    //     return ret
    //   }
    // ]
    transformRequest: [
      (data = config.params) => {
        const tempData = getJwtData(data)
        return tempData.data
      }
    ]
  })
  function getJwtData(data: any): any {
    for (const objKey in data) {
      if (data.hasOwn(objKey)) {
        const val = data[objKey]
        if (val === '' || val === undefined) {
          delete data[objKey]
        }
      }
    }
    const jwt = encodeURIComponent(btoa(encodeURIComponent(data)))
    return { data: jwt }
  }

  // request攔截
  service.interceptors.request.use(
    (config) => {
      return config
    },
    (error) => {
      console.log(error)
      Promise.reject(error)
    }
  )

  // response攔截
  service.interceptors.response.use(
    (response) => {
      console.log('res', response)
      return response
    },
    (error) => {
      console.log('error', error)
      return Promise.reject(error)
    }
  )
  return service(config)
}
