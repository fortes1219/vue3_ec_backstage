import{m as e,i as a,E as t}from"./element-plus.f33a3a8b.js";import{a as s,b as l}from"./api.16917173.js";import{f as n,a2 as i,b1 as o,o as r,h as m,j as d,X as p,V as c,Z as u,a9 as g}from"./vendor.4edac398.js";import{_ as f}from"./index.5a6c7c29.js";const y=n({name:"Dashboard",setup(){const a=i({img:"./img/img_dummy.svg",ident:"",file:null,fileName:""});o();return{state:a,getCurrentOverview:async()=>{const a=await s({});200===a.data.Code||e({message:`API ERROR!! (${a.data.Code})`,type:"error"})},selectFile:async t=>{const s=t.target.files[0],l=s.size/1024;a.file=s,a.fileName=s.name,l>200&&e({message:"檔案不可大於 200KB",type:"error"})},handleUpload:()=>{const e=JSON.parse(localStorage.getItem("userInfo")).token,t=new FormData;t.append("Ident",a.ident),t.append("Img",a.file);fetch("/api/admin/image/c",{method:"POST",headers:{token:e},body:t}).then((e=>e.json())).then((e=>{a.img=e.Data.Url}))},getImgApi:async()=>{await l({})}}}}),h={class:"row vertical grow","data-inset":"1rem"},v=["src"],I={class:"row horizontal space_between","data-space-vertical":"1rem"},w={class:"upload-customize"},C=d("span",null,"選擇圖片",-1),b=g("上傳圖片"),j=g("GET IMG");var k=f(y,[["render",function(e,s,l,n,i,o){const g=a,f=t;return r(),m("div",h,[d("img",{src:e.state.img},null,8,v),d("div",I,[d("label",w,[C,d("input",{type:"file",onChange:s[0]||(s[0]=a=>e.selectFile(a))},null,32)]),p(g,{modelValue:e.state.ident,"onUpdate:modelValue":s[1]||(s[1]=a=>e.state.ident=a),type:"text",placeholder:"圖片別名(Ident)"},null,8,["modelValue"]),p(f,{type:"primary",onClick:e.handleUpload},{default:c((()=>[b])),_:1},8,["onClick"])]),d("span",null,u(e.state.fileName),1),p(f,{type:"primary",onClick:e.getImgApi},{default:c((()=>[j])),_:1},8,["onClick"])])}]]);export{k as default};
