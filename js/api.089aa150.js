import{b1 as e}from"./vendor.f296c83d.js";function t(t){t.headers.token=localStorage.getItem("userInfo")?JSON.parse(localStorage.getItem("userInfo")).token:"";const a=e.create({headers:t.headers,baseURL:"https://nocodenolife.net/fortes/",timeout:3e4,transformRequest:[(e=t.params)=>o(JSON.stringify(e)).data]}),o=e=>{for(const t in e)if(e.hasOwnProperty(t)){const a=e[t];""!==a&&void 0!==a||delete e[t]}return{data:encodeURIComponent(btoa(encodeURIComponent(e)))}};return a.interceptors.request.use((e=>e),(e=>{Promise.reject(e)})),a.interceptors.response.use((e=>e),(e=>Promise.reject(e))),a(t)}const a=e=>t({url:"/admin/otp",method:"get",headers:{"Content-Type":"text/plain"},params:e}),o=e=>t({url:"/admin/login",method:"post",headers:{"Content-Type":"text/plain"},params:e}),s=e=>t({url:"/admin/dashboard",method:"post",headers:{"Content-Type":"text/plain"},params:e}),n=e=>t({url:"/admin/image/r",method:"post",headers:{"Content-Type":"application/json"},params:e}),r=e=>t({url:"/admin/image/d",method:"post",headers:{"Content-Type":"application/json"},params:e}),p=e=>t({url:"/admin/goods/r",method:"post",headers:{"Content-Type":"application/json"},params:e}),d=e=>t({url:"/admin/goods/c",method:"post",headers:{"Content-Type":"application/json"},params:e}),m=e=>t({url:"/admin/goods/u",method:"post",headers:{"Content-Type":"application/json"},params:e}),i=e=>t({url:"/admin/goods/d",method:"post",headers:{"Content-Type":"text/plain"},params:e}),l=e=>t({url:"/admin/goods/goodstype/r",method:"get",headers:{"Content-Type":"text/plain"},params:e}),h=e=>t({url:"/admin/goods/goodstype/c",method:"post",headers:{"Content-Type":"text/plain"},params:e}),c=e=>t({url:"/admin/goods/goodstype/u",method:"post",headers:{"Content-Type":"application/json"},params:e}),u=e=>t({url:"/admin/goods/goodstype/d",method:"post",headers:{"Content-Type":"application/json"},params:e}),g=e=>t({url:"/admin/member/backstage/r",method:"get",headers:{"Content-Type":"text/plain"},params:e}),y=e=>t({url:"/admin/permission/r",method:"post",headers:{"Content-Type":"application/json"},params:e});export{y as a,s as b,l as c,h as d,p as e,d as f,a as g,m as h,i,c as j,n as k,r as l,g as m,u as r,o as u};
