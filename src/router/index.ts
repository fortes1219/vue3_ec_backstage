import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import NProgress from 'nprogress'

NProgress.configure({ showSpinner: false })
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Login',
    component: () => import('../views/Login.vue'),
    meta: {
      requiresAuth: false,
      permissionId: ''
    }
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('../views/Home.vue'),
    redirect: '/home/dashboard',
    meta: {
      requiresAuth: true,
      permissionId: ''
    },
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('../components/dashboard.vue'),
        meta: {
          requiresAuth: true,
          permissionId: ''
        }
      },
      {
        path: 'admin_list',
        name: 'AdminList',
        component: () => import('../components/adminList.vue'),
        meta: {
          requiresAuth: true,
          permissionId: ''
        }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  NProgress.start()
  interface userInfo {
    username: string
    token: string
  }
  const userInfo: userInfo = JSON.parse(localStorage.getItem('userInfo') as string)
  if (to.meta.requiresAuth) {
    if (userInfo && userInfo.token !== '') {
      next()
    } else {
      next('/')
    }
  } else {
    next()
  }
})

router.afterEach(() => {
  NProgress.done()
})

export default router