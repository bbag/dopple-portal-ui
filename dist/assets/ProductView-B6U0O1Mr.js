import{d as u,af as d,o as s,c as o,a as r,F as m,r as _,b as n,u as c,w as l,e as w,t as f,ae as h,R as $,ag as g}from"./index-CygWWM6N.js";const x={class:"h-full grid grid-rows-[auto_minmax(0,_1fr)]"},b={class:"bg-white border-b flex align-end px-4"},k=u({__name:"ProductView",setup(v){const{name:e,workspace:t}=d().params,i=[{name:"Overview",path:`/w/${t}/products/${e}`},{name:"Hotspots",path:`/w/${t}/products/${e}/hotspots`},{name:"Cameras",path:`/w/${t}/products/${e}/cameras`},{name:"Environment",path:`/w/${t}/products/${e}/environment`},{name:"Configuration",path:`/w/${t}/products/${e}/configuration`}];return(V,C)=>(s(),o("div",x,[r("ul",b,[(s(),o(m,null,_(i,({name:a,path:p})=>r("li",{key:a},[n(c(h),{to:p,class:"tab-link text-sm"},{default:l(()=>[w(f(a),1)]),_:2},1032,["to"])])),64))]),n(c($))]))}}),B=g(k,[["__scopeId","data-v-c10e709a"]]);export{B as default};