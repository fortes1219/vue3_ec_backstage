import{m as a}from"./element-plus.f1c40bb6.js";const e=async(e,s,t)=>{const o=await e(s);200===o.data.Code?t(o):a({message:`API ERROR!! (${o.data.Code})`,type:"error"})};export{e as c};
