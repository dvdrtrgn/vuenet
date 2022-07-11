import{j as z,_ as h,o as f,c as _,a as s,p as k,f as S,b as o,t as m,g as p,n as v,w as i,v as a,i as x,F as B,r as g}from"./index.abfd9591.js";const V=z({props:["size","offset"]}),b=e=>(k("data-v-778309f0"),e=e(),S(),e),X={id:"Meta"},Y=["x1","x2"],M=["y1","y2"],U=b(()=>s("text",{x:"-87",y:"-90"},"-100",-1)),T=b(()=>s("text",{x:"-5",y:"-3"},"0",-1)),P=b(()=>s("text",{x:"90",y:"97"},"100",-1));function A(e,t,u,d,n,r){return f(),_("g",X,[s("line",{y1:"0",y2:"0",x1:-e.offset,x2:e.size-e.offset},null,8,Y),s("line",{x1:"0",x2:"0",y1:-e.offset,y2:e.size-e.offset},null,8,M),U,T,P])}var C=h(V,[["render",A],["__scopeId","data-v-778309f0"]]);const D={},I={class:"origin",x:"-1",y:"-1",width:"2",height:"2",style:{fill:"red"}};function N(e,t){return f(),_("rect",I)}var F=h(D,[["render",N]]);function c(e,t,u,d,n,r){return{rotation:Math.atan2(u,d)*(180/Math.PI),scaleX:e,scaleY:d,skewY:t,skewX:u,translateX:n,translateY:r}}c.parse=function(e){return this.apply(0,this.read2dCss(e))};c.read2dCss=function(e){return e=e.slice(7).slice(0,-1),(e||"1, 0, 0, 1, 0, 0").split(", ").map(Number)};c.readTransform=function(e){let t;return typeof e!="string"?t=e:t=document.querySelector(e),t?window.getComputedStyle(t).getPropertyValue("transform"):"{missing}"};window.dematrix=c;const L={components:{DotSvg:F,MetaSvg:C},data(){return{scaleX:.5,scaleY:.5,skewX:0,skewY:0,transX:0,transY:0,size:200,static:100,bias:0,centerTransform:!0,centerBoxes:!1,byPercent:!1}},methods:{placeAt(e){return typeof e=="string"&&(e=parseFloat(e)),(this.centerBoxes?-e/2:0)+(this.byPercent?"%":0)},trannyAll(e,t){let u=` transform: ${e}; `;return` transform-origin: ${t}; `+u}},computed:{tranny(){let e=this.centerTransform?"center":"";return this.trannyAll(this.matrix,e)},matrix(){let e=this;return`matrix(${[e.scaleX,e.skewY,e.skewX,e.scaleY,e.transX,e.transY].join(", ")})`},dematrix(){return c},offset(){return this.size*(this.bias/100)},vbox(){return`${-this.offset} ${-this.offset} ${this.size} ${this.size}`},size1(){return this.static/1+(this.byPercent?"%":0)},size2(){return this.static/2+(this.byPercent?"%":0)}}},j=s("b",null,"very under construction",-1),q=o(" readTransforms"),E=s("br",null,null,-1),G=s("br",null,null,-1),H=["viewBox"],J=["x","y","width","height"],K=["x","y","width","height"],O=o(" scale: "),Q=o(" skew: "),R=o(" trans: "),W=o("center transforms "),Z=o("center internally "),$=o("size by percent "),ee=o(" size bounds: "),te=o(" axis bias: "),se=o("% ");function ne(e,t,u,d,n,r){const y=g("DotSvg"),w=g("MetaSvg");return f(),_(B,null,[j,s("p",null,[q,E,o(" LargeBox "+m(r.dematrix.readTransform("#LargeBox")),1),G,o(" SmallBox "+m(r.dematrix.readTransform("#SmallBox")),1)]),(f(),_("svg",{id:"Bounds",viewBox:r.vbox},[s("g",{id:"LargeBox",style:v(r.tranny)},[s("rect",{x:r.placeAt(r.size1),y:r.placeAt(r.size1),width:r.size1,height:r.size1,style:{fill:"rgba(0, 0, 0, 0.2)"}},null,8,J),p(y)],4),s("g",{id:"SmallBox",style:v(r.tranny)},[s("rect",{class:"main",x:r.placeAt(r.size2),y:r.placeAt(r.size2),width:r.size2,height:r.size2,style:{fill:"rgba(0, 0, 0, 0.4)"}},null,8,K),p(y)],4),p(w,{size:n.size,offset:r.offset},null,8,["size","offset"]),p(y)],8,H)),s("form",null,[s("label",null,[O,i(s("input",{type:"number",step:"0.1","onUpdate:modelValue":t[0]||(t[0]=l=>n.scaleX=l)},null,512),[[a,n.scaleX,void 0,{number:!0}]]),i(s("input",{type:"number",step:"0.1","onUpdate:modelValue":t[1]||(t[1]=l=>n.scaleY=l)},null,512),[[a,n.scaleY,void 0,{number:!0}]]),Q,i(s("input",{type:"number",step:"0.1","onUpdate:modelValue":t[2]||(t[2]=l=>n.skewX=l)},null,512),[[a,n.skewX,void 0,{number:!0}]]),i(s("input",{type:"number",step:"0.1","onUpdate:modelValue":t[3]||(t[3]=l=>n.skewY=l)},null,512),[[a,n.skewY,void 0,{number:!0}]])]),s("label",null,[R,i(s("input",{type:"number",step:"10","onUpdate:modelValue":t[4]||(t[4]=l=>n.transX=l)},null,512),[[a,n.transX,void 0,{number:!0}]]),i(s("input",{type:"number",step:"10","onUpdate:modelValue":t[5]||(t[5]=l=>n.transY=l)},null,512),[[a,n.transY,void 0,{number:!0}]])]),i(s("input",{type:"checkbox","onUpdate:modelValue":t[6]||(t[6]=l=>n.centerTransform=l)},null,512),[[x,n.centerTransform]]),W,i(s("input",{type:"checkbox","onUpdate:modelValue":t[7]||(t[7]=l=>n.centerBoxes=l)},null,512),[[x,n.centerBoxes]]),Z,i(s("input",{type:"checkbox","onUpdate:modelValue":t[8]||(t[8]=l=>n.byPercent=l)},null,512),[[x,n.byPercent]]),$,s("label",null,[ee,i(s("input",{type:"number",step:"10","onUpdate:modelValue":t[9]||(t[9]=l=>n.size=l)},null,512),[[a,n.size,void 0,{number:!0}]])]),s("label",null,[te,i(s("input",{type:"number",step:"10","onUpdate:modelValue":t[10]||(t[10]=l=>n.bias=l)},null,512),[[a,n.bias]]),se])]),s("p",null,m(r.matrix),1),s("pre",null,"dematrix "+m(r.dematrix.parse(r.matrix)),1)],64)}var le=h(L,[["render",ne]]);export{le as default};