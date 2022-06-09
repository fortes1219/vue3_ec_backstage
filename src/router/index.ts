import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import { PermissionType, checkPermissionsId } from '@/service/permissions'
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
      name: 'Home',
      requiresAuth: true,
      permissionId: PermissionType.home_dashboard
    },
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('../components/dashboard.vue'),
        meta: {
          name: 'Dashboard',
          requiresAuth: true,
          permissionId: PermissionType.home_dashboard
        }
      },
      {
        path: 'order',
        name: 'Order',
        component: () => import('../components/order.vue'),
        meta: {
          name: '訂單管理',
          requiresAuth: true,
          permissionId: PermissionType.order_manage_page
        }
      },
      {
        path: 'goods',
        name: 'Goods',
        component: () => import('../components/goods.vue'),
        meta: {
          name: '商品管理',
          requiresAuth: true,
          permissionId: PermissionType.goods_manage_page
        }
      },
      {
        path: 'member',
        name: 'Member',
        component: () => import('../components/member.vue'),
        meta: {
          name: '會員管理',
          requiresAuth: true,
          permissionId: PermissionType.member_manage_page
        }
      },
      {
        path: 'admin_list',
        name: 'AdminList',
        component: () => import('../components/adminList.vue'),
        meta: {
          name: '管理員列表',
          requiresAuth: true,
          permissionId: PermissionType.admin_manage_page
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
  const userInfo = JSON.parse(localStorage.getItem('userInfo') as string)
  const userPermission = JSON.parse(localStorage.getItem('userPermissions') as string)
  if (to.meta.requiresAuth) {
    if (userPermission) {
      console.log(
        checkPermissionsId(userPermission, to.meta.permissionId as PermissionType),
        to.meta.permissionId,
        userPermission
      )
    }
    userInfo && userInfo.token !== '' ? next() : next('/')
  } else {
    next()
  }
})

router.afterEach(() => {
  NProgress.done()
})

export default router
