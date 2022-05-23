import { request } from '@/service/request'

const token = !localStorage.getItem('userInfo') ? '' : JSON.parse(localStorage.getItem('userInfo') as string).token

/* 取得登入OTP碼 */
export const getOtp = (params) =>
  request({
    url: '/admin/otp',
    method: 'get',
    headers: { 'Content-Type': 'text/plain' },
    params
  })

/* 登入 */
export const userLogin = (params) =>
  request({
    url: '/admin/login',
    method: 'post',
    headers: { 'Content-Type': 'text/plain' },
    params
  })

/* Dashboard overview */
export const getOverview = (params) =>
  request({
    url: '/admin/dashboard',
    method: 'post',
    headers: { 'Content-Type': 'text/plain', token: token },
    params
  })

/* get img */
export const getImg = (params) =>
  request({
    url: '/admin/image/r',
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      token: token
    },
    params
  })
