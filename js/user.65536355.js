import{b2 as s}from"./vendor.f296c83d.js";const e=s("user",{state:()=>({userStatus:{id:null,account:"",username:"",token:""},userPermissions:{}}),getters:{},actions:{setUserStatus(s){this.userStatus.id=s.id,this.userStatus.account=s.account,this.userStatus.username=s.username,this.userStatus.token=s.token,localStorage.setItem("userInfo",JSON.stringify({id:s.id,account:s.account,username:s.username,token:s.token}))},setUserPermissions(s){this.userPermissions=JSON.parse(JSON.stringify(s)),localStorage.setItem("userPermissions",JSON.stringify(s))},async logOut(){this.userStatus={id:null,account:"",username:"",token:""},await localStorage.removeItem("userInfo"),await localStorage.removeItem("userPermissions")}}});export{e as u};