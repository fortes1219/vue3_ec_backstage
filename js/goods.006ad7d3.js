var e=Object.defineProperty,a=Object.getOwnPropertySymbols,o=Object.prototype.hasOwnProperty,l=Object.prototype.propertyIsEnumerable,s=(a,o,l)=>o in a?e(a,o,{enumerable:!0,configurable:!0,writable:!0,value:l}):a[o]=l,t=(e,t)=>{for(var d in t||(t={}))o.call(t,d)&&s(e,d,t[d]);if(a)for(var d of a(t))l.call(t,d)&&s(e,d,t[d]);return e};import{m as d,n,E as r,p as i,z as c,d as p,u as m,g as u,i as g,f as y,A as f,r as h,s as I,h as w,I as _}from"./element-plus.74f8f849.js";import{_ as v}from"./index.78dce0d3.js";import{f as C,o as D,h as b,I as S,b2 as G,r as P,a5 as k,p as x,y as V,a4 as T,j as F,Z as U,X as z,W as N,U as O,aj as A,ak as R,$ as L,T as j,R as $,aL as M}from"./vendor.121ac726.js";import{b as B,c as E,r as K,d as J,e as W,f as X,h as Z,i as q,j as H,k as Q}from"./api.62e6ff95.js";const Y=C({name:"SearchField"}),ee={class:"search-field"};var ae=v(Y,[["render",function(e,a,o,l,s,t){return D(),b("div",ee,[S(e.$slots,"default")])}]]);const oe=G("goods",{state:()=>({typeList:[]}),getters:{},actions:{async getAllGoodsType(){const e=await B({});200===e.data.Code?this.typeList=e.data.Data:d({message:`API ERROR!! (${e.data.Code})`,type:"error"})}}}),le=async(e,a,o)=>{const l=await e(a);200===l.data.Code?o(l):d({message:`API ERROR!! (${l.data.Code})`,type:"error"})},se=C({name:"Goods",components:{},setup(){const e=oe(),a=P(),o=k({searchParams:{goodsTypeSelected:0,goodsName:"",currentPage:1,pageSize:20},tableData:[],typeList:[],editMode:"add",imgFile:null,imgFileName:"",imgIdent:"",goodsImg:{}}),l=k({ID:null,Show:!0,GoodsTypeID:1,Name:"",SpecsAllowance:0,GoodsSpecs:[],UnitPrice:0,ImagesIdnet:"",Description:""}),s=P(!1),r=P(!1),i=P(""),c=P("");let p=t({},o.searchParams);const m=()=>{e.getAllGoodsType()},u=e=>JSON.parse(JSON.stringify(e)),g=x((()=>{const a=u(e.typeList);return a.unshift({ID:0,Name:"全部",Alias:""}),{origin:u(e.typeList),mix:a}})),y=(e=!0,a=!0)=>{const l=e?o.searchParams:p,s={Page:l.currentPage,Limit:l.pageSize,GoodsName:l.goodsName,GoodsType:l.goodsTypeSelected};a||(s.Page=1,o.searchParams.currentPage=1),le(J,s,(e=>{o.tableData=e.data.Data,p=t({},l),o.tableData.forEach((e=>{o.goodsImg[e.ImagesIdnet]=[],I(e.ImagesIdnet)}))}))},f=x((()=>{let e="";return{add:()=>{e="新增商品"},edit:()=>{e="編輯商品"}}[o.editMode](),e})),h=()=>{l.ID=null,l.Show=!0,l.GoodsTypeID=1,l.Name="",l.SpecsAllowance=0,l.GoodsSpecs=[],l.UnitPrice=0,l.ImagesIdnet="",l.Description=""},I=async e=>{le(H,{Ident:e},(a=>{o.goodsImg[e]=a.data.Data}))},w=x((()=>t({},o.goodsImg))),_=V((async()=>{await m(),await y(!0,!1)}));return{state:o,goodsForm:l,goodsFormRef:a,newTypeName:i,newSpecName:c,parseObj:u,dialogGoods:s,dialogGoodsType:r,onPageChange:e=>{o.searchParams.currentPage=e,y(!1,!0)},onPageSizeChange:e=>{o.searchParams.pageSize=e,o.searchParams.currentPage=1,y(!1,!0)},openGoodsDialog:(e,a)=>{({add:()=>{o.editMode="add",h()},edit:()=>{o.editMode="edit";const e=u(a);Object.keys(l).forEach((a=>{l[a]=e[a]})),l.GoodsSpecs=l.GoodsSpecs.filter((e=>""!==e.Specs))}})[e](),s.value=!0},detectGoodsDialogMode:f,goodsTypeList:g,oldParams:p,handleSearch:y,getGoodsImg:I,handleUpdateGoods:(e=!1)=>{const a=u(l);e&&delete a.ID,a.SpecsAllowance=1*a.SpecsAllowance,a.UnitPrice=1*a.UnitPrice,le(e?W:X,a,(async()=>{await y(!1,!1),s.value=!1,d({type:"success",message:"已成功更新商品內容!"})}))},handleRemoveGoods:e=>{const a=`確定要刪除${e.Name}(ID: ${e.ID})?`,o=t({},e);n.confirm(a,"提示訊息",{confirmButtonText:"OK",cancelButtonText:"Cancel",type:"warning"}).then((()=>{le(Z,{ID:o.ID},(async()=>{await y(!1,!1),d({type:"success",message:"已成功刪除商品!"})}))})).catch((()=>{d({type:"info",message:"已取消"})}))},openGoodsType:()=>{o.typeList=g.value.origin,r.value=!0},addNewGoodsType:()=>{le(E,{Name:i.value},(async()=>{await m(),o.typeList=g.value.origin}))},addGoodsSpecs:()=>{l.GoodsSpecs.push({Specs:""})},removeGoodsSpecs:(e,a)=>{const o=l.GoodsSpecs.indexOf(e);o===a&&l.GoodsSpecs.splice(o,1)},handleUpdateGoodsType:()=>{const e=g.value.origin.filter((e=>e.ID>1)),a=u(e);le(q,{List:a},(async e=>{await m(),d({type:"success",message:"已成功更新商品分類!"}),o.typeList=g.value.origin}))},deleteGoodsType:e=>{const a=`確定要刪除${e.Name}(ID: ${e.ID})?`;n.confirm(a,"提示訊息",{confirmButtonText:"OK",cancelButtonText:"Cancel",type:"warning"}).then((()=>{le(K,{ID:e.ID},(async e=>{await m(),d({type:"success",message:"已成功刪除商品分類!"})}))})).catch((()=>{d({type:"info",message:"已取消"})}))},spacTagChange:e=>{},resetForm:e=>{e&&e.resetFields()},resetGoodsForm:h,selectFile:async e=>{const a=e.target.files[0],l=a.size/1024;if(o.imgFile=a,o.imgFileName=a.name,l>250)return d({message:"檔案不可大於 250KB",type:"error"}),void(o.imgFileName="檔案不可大於 250KB，請重新選擇圖片")},getcurrentImgs:w,handleUpload:()=>{const e=u(localStorage.getItem("userInfo")).token,a=new FormData;a.append("Ident",l.ImagesIdnet),a.append("Img",o.imgFile);const s={method:"POST",headers:{token:e},body:a};if(null===o.imgFile)return void d({type:"error",message:"未選擇檔案"});o.goodsImg.hasOwnProperty(l.ImagesIdnet)||(o.goodsImg[l.ImagesIdnet]=[]);fetch("https://nocodenolife.net/fortes//admin/image/c",s).then((e=>e.json())).then((e=>{o.goodsImg[l.ImagesIdnet].push(e.Data),d({type:"success",message:"已成功上傳圖片"})})).catch((()=>{d({type:"error",message:"API錯誤"})}))},handleRemoveImg:e=>{const a=`確定要刪除【${e.Ident}】這張圖片嗎？(ID: ${e.ID})?`;n.confirm(a,"提示訊息",{confirmButtonText:"OK",cancelButtonText:"Cancel",type:"warning"}).then((()=>{const a={id:e.ID};le(Q,a,(async()=>{await Q(a),await I(e.Ident),d({type:"success",message:"已成功刪除圖片!"})}))})).catch((()=>{d({type:"info",message:"已取消"})}))},init:_}}}),te={class:"flx vertical grow flex_1","data-inset":"1rem"},de={class:"flx horizontal v_center space_between"},ne={class:"flx horizontal v_center"},re={class:"flx horizontal v_center_end"},ie=R("重置"),ce=R("搜尋"),pe={class:"flx horizontal v_center space_between"},me={class:"grid col-2"},ue=R(" 分類管理 "),ge=R(" 新增商品 "),ye={class:"row vertical grow flex_1"},fe=["src","alt"],he={class:"row horizontal v_center"},Ie=R(" 編輯商品 "),we=R(" 刪除 "),_e=F("hr",null,null,-1),ve={class:"flx horizontal v_center","data-space-bottom":"1rem"},Ce={class:"grid col-1","data-space-right":"0.5rem"},De=R("新增"),be={key:1},Se=R(" 刪除 "),Ge={class:"dialog-footer"},Pe=R("Cancel"),ke=R("Confirm"),xe=F("hr",null,null,-1),Ve=R("是"),Te=R("否"),Fe={class:"w-200px"},Ue={class:"flx horizontal v_center"},ze=F("span",{class:"sp_right"},"可選",-1),Ne={class:"w-50px sp_right"},Oe=F("span",{class:"sp_right"},"種",-1),Ae=R(" 新增規格 "),Re={class:"flx horizontal wrap","data-space-vertical":"1rem"},Le=["onUpdate:modelValue","onInput"],je={class:"w-80px"},$e={class:"flx horizontal v_center sp_bottom"},Me={class:"upload-customize"},Be={class:"upload-btn"},Ee=R(" 選擇圖片 "),Ke={class:"upload-file-name sp_left"},Je={class:"flx horizontal v_center"},We={class:"w-150px sp_right"},Xe=R("上傳圖片"),Ze={class:"goods-img-preview"},qe={class:"img-container"},He=["src"],Qe={class:"flx horizontal v_center flex_1"},Ye={class:"sp_left sp_right"},ea={class:"dialog-footer"},aa=R("Cancel"),oa=R(" Reset "),la=R(" Confirm ");var sa=v(se,[["render",function(e,a,o,l,s,t){const d=_,n=m,v=u,C=g,S=r,G=y,P=ae,k=i,x=f,V=c,B=p,E=h,K=I,J=T("Close"),W=w,X=T("PictureFilled");return D(),b(O,null,[F("div",te,[U(P,null,{default:z((()=>[U(G,{"label-width":"100px",style:{width:"100%"}},{default:z((()=>[F("div",de,[F("div",ne,[U(v,{label:"商品分類:"},{default:z((()=>[U(n,{modelValue:e.state.searchParams.goodsTypeSelected,"onUpdate:modelValue":a[0]||(a[0]=a=>e.state.searchParams.goodsTypeSelected=a)},{default:z((()=>[(D(!0),b(O,null,A(e.goodsTypeList.mix,((e,a)=>(D(),N(d,{key:a,label:e.Name,value:e.ID},null,8,["label","value"])))),128))])),_:1},8,["modelValue"])])),_:1}),U(v,{label:"商品名稱:"},{default:z((()=>[U(C,{modelValue:e.state.searchParams.goodsName,"onUpdate:modelValue":a[1]||(a[1]=a=>e.state.searchParams.goodsName=a),type:"text",placeholder:"請輸入商品名稱"},null,8,["modelValue"])])),_:1})]),F("div",re,[U(S,{class:"reset",plain:""},{default:z((()=>[ie])),_:1}),U(S,{class:"search",plain:"",icon:"Search",onClick:a[2]||(a[2]=a=>e.handleSearch(!0,!1))},{default:z((()=>[ce])),_:1})])])])),_:1})])),_:1}),F("div",pe,[U(k,{currentPage:e.state.searchParams.currentPage,"onUpdate:currentPage":a[3]||(a[3]=a=>e.state.searchParams.currentPage=a),"page-size":e.state.searchParams.pageSize,"onUpdate:page-size":a[4]||(a[4]=a=>e.state.searchParams.pageSize=a),"page-sizes":[20,50,100],small:!1,background:!0,layout:"sizes, prev, pager, next",total:0,"data-space-vertical":"1rem",onSizeChange:e.onPageSizeChange,onCurrentChange:e.onPageChange},null,8,["currentPage","page-size","onSizeChange","onCurrentChange"]),F("div",me,[U(S,{type:"primary",size:"small",round:"",class:"dark",icon:"Collection",onClick:e.openGoodsType},{default:z((()=>[ue])),_:1},8,["onClick"]),U(S,{type:"primary",size:"small",round:"",class:"dark",icon:"CirclePlus",onClick:a[5]||(a[5]=a=>e.openGoodsDialog("add"))},{default:z((()=>[ge])),_:1})])]),F("div",ye,[U(V,{data:e.state.tableData,"default-sort":{prop:"ID",order:"descending"},style:{width:"100%",height:"100%"}},{default:z((()=>[U(x,{label:"ID",prop:"ID",sortable:"",align:"center",width:"100"}),U(x,{label:"商品名稱",prop:"Name",align:"center"}),U(x,{label:"商品分類",prop:"GoodsType.Name",align:"center"}),U(x,{label:"商品圖片",prop:"ImagesIdnet",align:"center",width:"120"},{default:z((a=>{var o;return[F("img",{src:null==(o=e.getcurrentImgs[a.row.ImagesIdnet][0])?void 0:o.Url,alt:a.row.Name},null,8,fe)]})),_:1}),U(x,{label:"前台顯示",prop:"Show",align:"center",width:"120"},{default:z((e=>[R(L(e.row.Show?"是":"否"),1)])),_:1}),U(x,{label:"操作",align:"center",width:"200"},{default:z((a=>[F("div",he,[U(S,{type:"primary",size:"small",round:"",class:"dark",icon:"Edit",onClick:o=>e.openGoodsDialog("edit",a.row)},{default:z((()=>[Ie])),_:2},1032,["onClick"]),U(S,{type:"primary",size:"small",round:"",class:"remove",icon:"Delete",onClick:o=>e.handleRemoveGoods(a.row)},{default:z((()=>[we])),_:2},1032,["onClick"])])])),_:1})])),_:1},8,["data"])])]),U(B,{modelValue:e.dialogGoodsType,"onUpdate:modelValue":a[8]||(a[8]=a=>e.dialogGoodsType=a),width:"570px",title:"分類管理"},{footer:z((()=>[F("span",Ge,[U(S,{plain:"",class:"cancel",onClick:a[7]||(a[7]=a=>e.dialogGoodsType=!1)},{default:z((()=>[Pe])),_:1}),U(S,{type:"primary",class:"confirm",onClick:e.handleUpdateGoodsType},{default:z((()=>[ke])),_:1},8,["onClick"])])])),default:z((()=>[_e,F("div",ve,[F("div",Ce,[U(C,{modelValue:e.newTypeName,"onUpdate:modelValue":a[6]||(a[6]=a=>e.newTypeName=a),type:"text",placeholder:"分類名稱"},null,8,["modelValue"])]),U(S,{type:"primary",class:"deep_dark",icon:"CirclePlus",onClick:e.addNewGoodsType},{default:z((()=>[De])),_:1},8,["onClick"])]),U(V,{data:e.goodsTypeList.origin,height:"300px",style:{width:"100%"},"default-sort":{prop:"ID",order:"descending"}},{default:z((()=>[U(x,{label:"ID",prop:"ID",sortable:"",align:"center",width:"100"}),U(x,{label:"分類名稱",prop:"Name",align:"center"},{default:z((e=>[e.row.ID>1?(D(),N(C,{key:0,modelValue:e.row.Name,"onUpdate:modelValue":a=>e.row.Name=a,type:"text"},null,8,["modelValue","onUpdate:modelValue"])):(D(),b("p",be,L(e.row.Name),1))])),_:1}),U(x,{label:"分類別名",align:"center"},{default:z((e=>[e.row.ID>1?(D(),N(C,{key:0,modelValue:e.row.Alias,"onUpdate:modelValue":a=>e.row.Alias=a,type:"text"},null,8,["modelValue","onUpdate:modelValue"])):j("",!0)])),_:1}),U(x,{label:"操作",align:"center",width:"200"},{default:z((a=>[a.row.ID>1?(D(),N(S,{key:0,type:"primary",size:"small",round:"",class:"remove",icon:"Delete",onClick:o=>e.deleteGoodsType(a.row)},{default:z((()=>[Se])),_:2},1032,["onClick"])):j("",!0)])),_:1})])),_:1},8,["data"])])),_:1},8,["modelValue"]),(D(),N(B,{key:`dialog-${e.state.editMode}`,modelValue:e.dialogGoods,"onUpdate:modelValue":a[19]||(a[19]=a=>e.dialogGoods=a),width:"600px","close-on-click-modal":!1,title:e.detectGoodsDialogMode,onClose:e.resetGoodsForm},{footer:z((()=>[F("span",ea,[U(S,{plain:"",class:"cancel",onClick:a[17]||(a[17]=a=>e.dialogGoods=!1)},{default:z((()=>[aa])),_:1}),"edit"!==e.state.editMode?(D(),N(S,{key:0,plain:"",class:"cancel",onClick:e.resetGoodsForm},{default:z((()=>[oa])),_:1},8,["onClick"])):j("",!0),U(S,{type:"primary",class:"confirm",onClick:a[18]||(a[18]=a=>e.handleUpdateGoods("edit"!==e.state.editMode))},{default:z((()=>[la])),_:1})])])),default:z((()=>[xe,U(G,{ref:"goodsFormRef",model:e.goodsForm,"label-width":"80px"},{default:z((()=>[U(v,{label:"前台顯示:",prop:"Show"},{default:z((()=>[U(K,{modelValue:e.goodsForm.Show,"onUpdate:modelValue":a[9]||(a[9]=a=>e.goodsForm.Show=a),size:"small"},{default:z((()=>[U(E,{label:!0},{default:z((()=>[Ve])),_:1}),U(E,{label:!1},{default:z((()=>[Te])),_:1})])),_:1},8,["modelValue"])])),_:1}),U(v,{label:"分類:",prop:"GoodsTypeID"},{default:z((()=>[U(n,{modelValue:e.goodsForm.GoodsTypeID,"onUpdate:modelValue":a[10]||(a[10]=a=>e.goodsForm.GoodsTypeID=a)},{default:z((()=>[(D(!0),b(O,null,A(e.goodsTypeList.origin,((e,a)=>(D(),N(d,{key:a,label:e.Name,value:e.ID},null,8,["label","value"])))),128))])),_:1},8,["modelValue"])])),_:1}),U(v,{label:"名稱:",prop:"Name"},{default:z((()=>[F("div",Fe,[U(C,{modelValue:e.goodsForm.Name,"onUpdate:modelValue":a[11]||(a[11]=a=>e.goodsForm.Name=a),type:"text",class:"col-1-4",placeholder:"商品名稱"},null,8,["modelValue"])])])),_:1}),U(v,{label:"商品規格:",prop:"SpecsAllowance"},{default:z((()=>[F("div",Ue,[ze,F("div",Ne,[U(C,{modelValue:e.goodsForm.SpecsAllowance,"onUpdate:modelValue":a[12]||(a[12]=a=>e.goodsForm.SpecsAllowance=a),type:"text"},null,8,["modelValue"])]),Oe,U(S,{type:"primary",round:"",class:"deep_dark",icon:"CirclePlus",onClick:e.addGoodsSpecs},{default:z((()=>[Ae])),_:1},8,["onClick"])]),F("div",Re,[(D(!0),b(O,null,A(e.goodsForm.GoodsSpecs,((a,o)=>(D(),b("span",{key:o,class:"spec_tag"},[U(W,{onClick:l=>e.removeGoodsSpecs(a,o)},{default:z((()=>[U(J)])),_:2},1032,["onClick"]),F("span",null,L(a.Specs),1),$(F("input",{"onUpdate:modelValue":e=>a.Specs=e,type:"text",placeholder:"商品規格",onInput:a=>e.spacTagChange(o)},null,40,Le),[[M,a.Specs]])])))),128))])])),_:1}),U(v,{label:"金額:",prop:"UnitPrice"},{default:z((()=>[F("div",je,[U(C,{modelValue:e.goodsForm.UnitPrice,"onUpdate:modelValue":a[13]||(a[13]=a=>e.goodsForm.UnitPrice=a),type:"text",class:"col-1-3",placeholder:"商品單價"},null,8,["modelValue"])])])),_:1}),U(v,{label:"圖片上傳:",prop:"ImagesIdnet"},{default:z((()=>[F("div",$e,[F("label",Me,[F("span",Be,[U(W,null,{default:z((()=>[U(X)])),_:1}),Ee]),F("input",{type:"file",onChange:a[14]||(a[14]=a=>e.selectFile(a))},null,32)]),F("span",Ke,"選擇圖檔: "+L(e.state.imgFileName),1)]),F("div",Je,[F("div",We,[U(C,{modelValue:e.goodsForm.ImagesIdnet,"onUpdate:modelValue":a[15]||(a[15]=a=>e.goodsForm.ImagesIdnet=a),type:"text",placeholder:"圖片別名(Ident)"},null,8,["modelValue"])]),U(S,{type:"primary",class:"deep_dark",icon:"UploadFilled",onClick:e.handleUpload},{default:z((()=>[Xe])),_:1},8,["onClick"])]),F("div",Ze,[(D(!0),b(O,null,A(e.getcurrentImgs[e.goodsForm.ImagesIdnet],((a,o)=>(D(),b("div",{key:o,class:"img-preview__items"},[F("div",qe,[F("img",{src:a.Url},null,8,He)]),F("div",Qe,[F("p",Ye,"ID: "+L(a.ID),1),F("p",null,"Ident: "+L(a.Ident),1)]),U(W,{onClick:o=>e.handleRemoveImg(a)},{default:z((()=>[U(J)])),_:2},1032,["onClick"])])))),128))])])),_:1}),U(v,{label:"商品說明:",prop:"Description"},{default:z((()=>[U(C,{modelValue:e.goodsForm.Description,"onUpdate:modelValue":a[16]||(a[16]=a=>e.goodsForm.Description=a),type:"textarea",autosize:{minRows:2,maxRows:5},placeholder:"商品說明"},null,8,["modelValue"])])),_:1})])),_:1},8,["model"])])),_:1},8,["modelValue","title","onClose"]))],64)}]]);export{sa as default};
