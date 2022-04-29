import { request } from '@/service/request'

/* 取得登入OTP碼 */
export const getOtp = (params) =>
  request({
    url: '/member/otp',
    method: 'get',
    headers: { 'Content-Type': 'text/plain' },
    params
  })

/* 登入 */
