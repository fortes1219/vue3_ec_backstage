export const resetForm = (target: any) => {
  const reset = (obj: any) => {
    Object.keys(obj).map((key) => {
      if (obj[key] === Object(obj[key])) {
        reset(obj[key])
        if (obj[key] instanceof Array) {
          obj[key] = []
        }
        return
      } else {
        // 保留型別
        const element: any = obj[key]
        switch (typeof element) {
          case 'string':
            obj[key] = ''
            break
          case 'number':
            obj[key] = 0
            break
          case 'object':
            obj[key] = element instanceof Array ? [] : {}
            break
          case 'boolean':
            obj[key] = false
            break
          default:
            obj[key] = undefined
            break
        }
      }
    })
  }
  reset(target)
}
