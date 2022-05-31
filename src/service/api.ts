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

/* get img */
export const removeImg = (params) =>
  request({
    url: '/admin/image/d',
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      token: token
    },
    params
  })

/* Get goods list */
export const getGoodsList = (params) =>
  request({
    url: '/admin/goods/r',
    method: 'post',
    headers: { 'Content-Type': 'application/json', token: token },
    params
  })

/* add goods */
export const addGoods = (params) =>
  request({
    url: '/admin/goods/c',
    method: 'post',
    headers: { 'Content-Type': 'application/json', token: token },
    params
  })

/* update goods */
export const updateGoods = (params) =>
  request({
    url: '/admin/goods/u',
    method: 'post',
    headers: { 'Content-Type': 'application/json', token: token },
    params
  })

/* remove goods */
export const removeGoods = (params) =>
  request({
    url: '/admin/goods/d',
    method: 'post',
    headers: { 'Content-Type': 'text/plain', token: token },
    params
  })

/* Get goods type list */
export const getGoodsType = (params) =>
  request({
    url: '/admin/goods/goodstype/r',
    method: 'get',
    headers: { 'Content-Type': 'text/plain', token: token },
    params
  })

/* add goods type */
export const addGoodsType = (params) =>
  request({
    url: '/admin/goods/goodstype/c',
    method: 'post',
    headers: { 'Content-Type': 'text/plain', token: token },
    params
  })

/* update goods type */
export const updateGoodsType = (params) =>
  request({
    url: '/admin/goods/goodstype/u',
    method: 'post',
    headers: { 'Content-Type': 'application/json', token: token },
    params
  })

/* remove goods type */
export const removeGoodsType = (params) =>
  request({
    url: '/admin/goods/goodstype/d',
    method: 'post',
    headers: { 'Content-Type': 'application/json', token: token },
    params
  })
