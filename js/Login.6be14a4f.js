import{m as a,E as t}from"./element-plus.74f8f849.js";import{f as e,b0 as s,a5 as o,y as n,o as r,h as l,j as i,R as m,aL as d,$ as p,Z as c,X as u,ak as f}from"./vendor.121ac726.js";import{g,u as v}from"./api.62e6ff95.js";import{u as w}from"./user.87c72425.js";import{_}from"./index.4c26c608.js";const b=e({name:"Login",components:{},setup(){const t=w(),e=s(),r=o({title:"Admin Login",form:{username:"",password:"",otp:""},currentOtp:"",token:""}),l=async()=>{const t=await g("");200===t.data.Code?r.currentOtp=t.data.Data.OTP:a({message:`OTP API ERROR!! (${t.data.Code})`,type:"error"})},i=n((async()=>{await l()}));return{state:r,getOtpNumbers:l,handleLogin:async()=>{const a={username:r.form.username,password:r.form.password,otp:r.form.otp},s=await v(a);200===s.data.Code&&(r.token=s.data.Data.Token,await t.setUserStatus({account:s.data.Data.Info.Account,username:s.data.Data.Info.Name,token:s.data.Data.Token}),await e.push({name:"Home"}))},init:i}}}),k={id:"login",class:"flx vertical grow center"},h={class:"login-block"},O={class:"login-block-form"},y=i("h1",null,"Admin Backoffice",-1),x=i("br",null,null,-1),j={class:"input__inner","data-space-bottom":"1rem"},C={class:"input__inner","data-space-bottom":"1rem"},L={class:"input__inner","data-space-bottom":"1rem"},D={class:"flx horizontal v_center"},P={class:"flx horizontal h_end"},T=f("Login");var U=_(b,[["render",function(a,e,s,o,n,f){const g=t;return r(),l("div",k,[i("div",h,[i("div",O,[y,x,i("div",j,[m(i("input",{"onUpdate:modelValue":e[0]||(e[0]=t=>a.state.form.username=t),type:"text",placeholder:"Username"},null,512),[[d,a.state.form.username]])]),i("div",C,[m(i("input",{"onUpdate:modelValue":e[1]||(e[1]=t=>a.state.form.password=t),type:"password",placeholder:"Password"},null,512),[[d,a.state.form.password]])]),i("div",L,[i("div",D,[m(i("input",{"onUpdate:modelValue":e[2]||(e[2]=t=>a.state.form.otp=t),type:"text",placeholder:"OTP"},null,512),[[d,a.state.form.otp]]),i("div",{class:"otp_number",onClick:e[3]||(e[3]=(...t)=>a.getOtpNumbers&&a.getOtpNumbers(...t))},p(a.state.currentOtp),1)])]),i("div",P,[c(g,{class:"btn__signin",onClick:a.handleLogin},{default:u((()=>[T])),_:1},8,["onClick"])])])])])}]]);export{U as default};
