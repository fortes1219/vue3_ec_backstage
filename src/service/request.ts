import axios from "axios"

export function request(config) {
  const service = axios.create({
    headers: config.headers,
    baseURL: 'https://nocodenolife.net/fortes/',
    timeout: 30000,
    transformRequest: [(data:any) => {
      let ec = getJwtData(data)
      return ec
    }]
  })
  function getJwtData(data: any): any {
    for (const objKey in data) {
      if (data.hasOwnProperty(objKey)) {
        const val = data[objKey]
        if (val === '' || val === undefined) { delete data[objKey] }
      }
    }
    const jwt = encodeURIComponent(btoa(encodeURIComponent(JSON.stringify(data))))
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
    (res) => {
      console.log(res)
    },
    (error) => {
      return Promise.reject(error)
    }
  )
  return service(config)
}
