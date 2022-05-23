type importPath = (path: string) => void

export type routesType = {
  path: string
  name: string
  component: importPath
  redirect?: string
  meta?: { requiresAuth: boolean; permissionId: string | number }
}
