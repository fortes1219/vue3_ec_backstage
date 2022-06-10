import{m as a}from"./element-plus.b146bdb7.js";const e=async(e,s,t)=>{const o=await e(s);200===o.data.Code?t(o):a({message:`API ERROR!! (${o.data.Code})`,type:"error"})};export{e as c};
