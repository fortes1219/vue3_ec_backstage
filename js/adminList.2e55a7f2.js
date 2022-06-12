var e=Object.defineProperty,a=Object.getOwnPropertySymbols,s=Object.prototype.hasOwnProperty,l=Object.prototype.propertyIsEnumerable,t=(a,s,l)=>s in a?e(a,s,{enumerable:!0,configurable:!0,writable:!0,value:l}):a[s]=l,i=(e,i)=>{for(var o in i||(i={}))s.call(i,o)&&t(e,o,i[o]);if(a)for(var o of a(i))l.call(i,o)&&t(e,o,i[o]);return e};import{E as o,g as n,J as r,f as d,d as m,m as c}from"./element-plus.f1c40bb6.js";import{c as u}from"./callApi.ff108172.js";import{_ as p,P as f}from"./index.9424a170.js";import{a as v,m as b,n as _}from"./api.8852201a.js";import{f as y,o as h,h as g,j as P,a0 as V,I as k,a5 as w,r as D,p as j,y as x,a4 as U,_ as I,Y as A,V as C,aj as O,X as z,ak as F}from"./vendor.f296c83d.js";import{u as E}from"./user.65536355.js";const N=y({props:{data:{type:Object,default:()=>{}}}}),$={class:"admin-card"},L={class:"admin-card__content"},M={class:"admin-account"},S=P("hr",null,null,-1);const J=y({name:"AdminList",components:{AdminCard:p(N,[["render",function(e,a,s,l,t,i){return h(),g("div",$,[P("div",L,[P("p",null,"管理員ID："+V(e.data.ID),1),P("p",null,V(e.data.Email),1),P("p",M,V(e.data.Name),1),S,k(e.$slots,"default")])])}]])},setup(){const e=E(),a=w({tableData:[],adminForm:{id:null,account:"",username:"",email:"",phone:"",password:"",checkPassword:""},permissions:{home:[],order:[],goods:[],member:[],admin:[]}}),s=f,l=D(!1),t=()=>{u(b,{},(e=>{a.tableData=e.data.Data}))},o=j((()=>e.$state.userStatus)),n=j((()=>e.$state.userPermissions)),r=async e=>{const s={MemberID:e.ID};let l={};await u(v,s,(e=>{l=e.data.Data.Permission}));const t=[];Object.keys(l).forEach((e=>{t.push({name:e,value:l[e].Activity})}));const i=Object.keys(a.permissions);for(let o in i){a.permissions[i[o]]=[];const e=new RegExp(`^${i[o]}`);t.forEach((s=>{e.test(s.name)&&a.permissions[i[o]].push(s)}))}},d=j((()=>{const e=JSON.parse(localStorage.getItem("userPermissions"));return{add:e.admin_manage_add.Activity,edit:e.admin_manage_edit.Activity,delete:e.admin_manage_del.Activity}})),m=x((async()=>{await t()}));return{state:a,init:m,listName:s,getAdminList:t,userInfo:o,userPermissions:n,enable:d,createPermissionsList:r,openPermissions:async e=>{await r(e),a.adminForm.id=e.ID,a.adminForm.account=e.Account,a.adminForm.username=e.Name,a.adminForm.email=e.Email,a.adminForm.phone=e.Phone,l.value=!0},handleUpdatePermissions:async()=>{const s={},l=Object.keys(a.permissions);for(let e in l)a.permissions[l[e]].forEach((e=>{s[e.name]={Activity:e.value}}));const t={MemberID:a.adminForm.id,MemberPermission:i({},s)};await u(_,t,(e=>{c({type:"success",message:"已成功更新管理權限!"})})),await u(v,{MemberID:a.adminForm.id},(a=>{e.setUserPermissions(a.data.Data.Permission)}))},dialogPermissions:l}}}),R={class:"flx vertical grow flex_1","data-inset":"1rem"},X={class:"flx horizontal v_center"},Y=F("新增管理員"),q={class:"flx horizontal wrap sp_top"},B={key:0,class:"flx horizontal v_center_end"},G=F(" 權限設定 "),H=F(" 刪除 "),K={key:1,class:"notice"},Q={class:"flx vertical"},T=P("h2",{class:"permissions-title"},"Dashboard",-1),W={class:"flx wrap horizontal sp_bottom"},Z=P("h2",{class:"permissions-title"},"訂單管理",-1),ee={class:"flx wrap horizontal sp_bottom"},ae=P("h2",{class:"permissions-title"},"商品管理",-1),se={class:"flx wrap horizontal sp_bottom"},le=P("h2",{class:"permissions-title"},"會員管理",-1),te={class:"flx wrap horizontal sp_bottom"},ie=P("h2",{class:"permissions-title"},"管理員列表",-1),oe={class:"flx wrap horizontal sp_bottom"},ne={class:"dialog-footer"},re=F("Cancel"),de=F("Confirm");var me=p(J,[["render",function(e,a,s,l,t,i){const c=o,u=U("AdminCard"),p=n,f=r,v=d,b=m;return h(),g(C,null,[P("div",R,[P("div",X,[I(c,{type:"primary",disabled:!e.enable.add,class:"deep_dark",round:"",icon:"Plus"},{default:A((()=>[Y])),_:1},8,["disabled"])]),P("div",q,[(h(!0),g(C,null,O(e.state.tableData,((a,s)=>(h(),z(u,{key:s,data:a},{default:A((()=>[1!==a.ID?(h(),g("div",B,[I(c,{type:"primary",disabled:!e.enable.edit,round:"",class:"deep_dark",icon:"Edit",size:"small",onClick:s=>e.openPermissions(a)},{default:A((()=>[G])),_:2},1032,["disabled","onClick"]),I(c,{type:"primary",disabled:!e.enable.delete,round:"",class:"remove",icon:"Delete",size:"small",onClick:e.createPermissionsList},{default:A((()=>[H])),_:1},8,["disabled","onClick"])])):(h(),g("p",K,"root角色不可修改"))])),_:2},1032,["data"])))),128))])]),I(b,{modelValue:e.dialogPermissions,"onUpdate:modelValue":a[1]||(a[1]=a=>e.dialogPermissions=a),width:"570px",title:"管理權限設定"},{footer:A((()=>[P("span",ne,[I(c,{plain:"",class:"cancel",onClick:a[0]||(a[0]=a=>e.dialogPermissions=!1)},{default:A((()=>[re])),_:1}),I(c,{type:"primary",class:"confirm",onClick:e.handleUpdatePermissions},{default:A((()=>[de])),_:1},8,["onClick"])])])),default:A((()=>[I(v,{"label-width":"100px"},{default:A((()=>[I(p,{label:"管理帳號:"},{default:A((()=>[P("p",null,V(`${e.state.adminForm.account} (ID: ${e.state.adminForm.id})`),1)])),_:1}),I(p,{label:"權限設定:"},{default:A((()=>[P("div",Q,[T,P("div",W,[(h(!0),g(C,null,O(e.state.permissions.home,((a,s)=>(h(),g("div",{key:s,class:"sp_right"},[I(f,{modelValue:a.value,"onUpdate:modelValue":e=>a.value=e},{default:A((()=>[F(V(e.listName[a.name]),1)])),_:2},1032,["modelValue","onUpdate:modelValue"])])))),128))]),Z,P("div",ee,[(h(!0),g(C,null,O(e.state.permissions.order,((a,s)=>(h(),g("div",{key:s,class:"sp_right"},[I(f,{modelValue:a.value,"onUpdate:modelValue":e=>a.value=e},{default:A((()=>[F(V(e.listName[a.name]),1)])),_:2},1032,["modelValue","onUpdate:modelValue"])])))),128))]),ae,P("div",se,[(h(!0),g(C,null,O(e.state.permissions.goods,((a,s)=>(h(),g("div",{key:s,class:"sp_right"},[I(f,{modelValue:a.value,"onUpdate:modelValue":e=>a.value=e},{default:A((()=>[F(V(e.listName[a.name]),1)])),_:2},1032,["modelValue","onUpdate:modelValue"])])))),128))]),le,P("div",te,[(h(!0),g(C,null,O(e.state.permissions.member,((a,s)=>(h(),g("div",{key:s,class:"sp_right"},[I(f,{modelValue:a.value,"onUpdate:modelValue":e=>a.value=e},{default:A((()=>[F(V(e.listName[a.name]),1)])),_:2},1032,["modelValue","onUpdate:modelValue"])])))),128))]),ie,P("div",oe,[(h(!0),g(C,null,O(e.state.permissions.admin,((a,s)=>(h(),g("div",{key:s,class:"sp_right"},[I(f,{modelValue:a.value,"onUpdate:modelValue":e=>a.value=e},{default:A((()=>[F(V(e.listName[a.name]),1)])),_:2},1032,["modelValue","onUpdate:modelValue"])])))),128))])])])),_:1})])),_:1})])),_:1},8,["modelValue"])],64)}]]);export{me as default};
