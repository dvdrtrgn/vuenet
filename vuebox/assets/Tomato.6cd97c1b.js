import{_ as m,o as n,c as o,a as t,w as f,v,t as d,e as r,F as T,b as a,p as w,f as x,g as y,n as A,r as g}from"./index.f4ff051a.js";const B={props:{hint:{type:Number}},data(){return{massA:99,massB:1}},emits:["pubMass"],updated(){this.hint>3&&(this.massA=49)},methods:{calcA(){return this.calcTotal(this.massA)},calcB(){return this.calcTotal(this.massB)},calcTotal(e){return`${(e/this.mass*100).toFixed(2)}%`}},computed:{ratio(){return this.massB/this.massA},mass(){return this.$emit("pubMass",this.massA),0+this.massB+this.massA}}},h=e=>(w("data-v-535efe8c"),e=e(),x(),e),S={key:0,class:"flex"},$=a("Water mass "),z=h(()=>t("br",null,null,-1)),F=h(()=>t("br",null,null,-1)),M=a(" gram(s) "),I=h(()=>t("br",null,null,-1)),V={key:0,class:"hint"},N=a(" Vitamins, etc "),G=h(()=>t("br",null,null,-1)),P=h(()=>t("br",null,null,-1)),R=a(" gram(s) "),L=h(()=>t("br",null,null,-1)),H={key:0,class:"hint"},Z={key:1,class:"hint"};function D(e,i,c,p,s,l){return n(),o(T,null,[c.hint<4?(n(),o("div",S,[t("label",null,[$,z,f(t("input",{id:"Guess",class:"big",type:"number","onUpdate:modelValue":i[0]||(i[0]=_=>s.massA=_),max:"99",min:"1"},null,512),[[v,s.massA,void 0,{number:!0}]]),F,M,I,c.hint>2?(n(),o("span",V,d(l.calcA()),1)):r("",!0)]),t("label",null,[N,G,f(t("input",{class:"big","onUpdate:modelValue":i[1]||(i[1]=_=>s.massB=_),disabled:""},null,512),[[v,s.massB,void 0,{number:!0}]]),P,R,L,c.hint>1?(n(),o("span",H,d(l.calcB()),1)):r("",!0)])])):r("",!0),c.hint>0?(n(),o("div",Z,"Total mass = "+d(l.mass)+"g",1)):r("",!0)],64)}var E=m(B,[["render",D],["__scopeId","data-v-535efe8c"]]);const b=3.7,u=120,O={name:"TomatoSvg",props:{reveal:{type:[Number,String],default:99}},data(){return{maskTop:u}},updated(){this.setPercent(this.reveal)},methods:{setPercent(e){let i=100-e;this.maskTop=i*b+u}},computed:{percent(){let e=this.maskTop-u;return 100-e/b}}},U={viewBox:"0 0 500 500",xmlns:"http://www.w3.org/2000/svg"},j={id:"clip-0"},W=["y"],q=t("rect",{height:"500",width:"500",id:"Border",style:{"fill-rule":"evenodd",fill:"rgba(0, 0, 255, 0)"}},null,-1),J=t("path",{id:"Red",style:{fill:"rgb(209, 55, 45)","clip-path":"url('#clip-0')"},d:`M 322.772 121.697
C 295.347 134.264 207.606 125.464 176.371 121.222
C 137.227 117.874 92.815 141.607 57.247 172.229
C 24.38 200.456 11.589 247.133 15.299 296.195
C 20.836 369.443 70.484 433.863 136.044 466.303
C 177.309 486.721 289.651 505.793 372.43 464.152
C 429.7 435.343 484.206 372.962 487.523 301.392
C 489.849 251.205 472.979 191.709 431.636 158.091
C 399.354 131.84 351.194 116.773 322.772 121.697 Z`,class:"st0"},null,-1),K=t("path",{id:"RedLine",style:{fill:"none",stroke:"rgb(209, 55, 45)","stroke-width":"5px",transform:"matrix(1, 0, 0, 1, 0, -1)"},d:`M 322.772 121.697
C 295.347 134.264 207.606 125.464 176.371 121.222
C 137.227 117.874 92.815 141.607 57.247 172.229
C 24.38 200.456 11.589 247.133 15.299 296.195
C 20.836 369.443 70.484 433.863 136.044 466.303
C 177.309 486.721 289.651 505.793 372.43 464.152
C 429.7 435.343 484.206 372.962 487.523 301.392
C 489.849 251.205 472.979 191.709 431.636 158.091
C 399.354 131.84 351.194 116.773 322.772 121.697 Z`,class:"st0"},null,-1),Q=t("path",{id:"Green",style:{fill:"rgb(75, 160, 66)"},d:`M 127.181 92.553
C 136.578 91.118 146.59 91.647 157.051 93.763
C 170.312 96.483 184.315 101.849 198.956 109.406
C 201.311 110.727 204.2 110.652 206.278 108.876
C 209.09 106.458 209.377 101.924 206.841 98.75
C 197.433 86.81 188.936 90.197 186.707 77.729
C 184.924 67.754 185.806 57.59 189.978 47.426
C 198.082 48.674 206.036 53.472 213.501 60.689
C 224.747 71.457 237.055 71.546 245.719 88.586
C 246.697 90.551 248.421 92.025 250.542 92.629
C 254.267 93.649 257.874 91.345 258.502 87.491
C 261.48 70.299 265.094 71.344 273.593 60.765
C 280.076 52.717 288.248 47.086 298.045 44.857
C 301.76 53.472 303.45 63.182 303.537 73.384 L 303.543 73.46
C 303.669 87.817 302.736 87.265 297.86 102.113
C 297.049 104.531 297.555 107.328 299.37 109.519
C 301.974 112.617 306.301 113.108 309.072 110.614
C 316.909 103.436 326.585 98.297 338.289 95.766
C 347.849 93.687 358.753 93.272 371.097 94.783
C 369.394 108.8 332.091 126.451 319.114 128.353
C 300.08 135.873 277.274 130.85 255.05 130.057
C 234.799 129.339 215.871 135.04 198.063 130.356
C 180.203 127.479 132.332 107.453 127.181 92.553 Z`,class:"st1"},null,-1);function X(e,i,c,p,s,l){return n(),o("svg",U,[t("defs",null,[t("clipPath",j,[t("rect",{x:"0",y:s.maskTop,width:"500",height:"500"},null,8,W)])]),q,J,K,Q])}var Y=m(O,[["render",X]]);const tt={name:"Tomato",components:{TomatoCalc:E,TomatoSvg:Y},data(){return{accepted:!1,fill:0,hint:0,size:150}},methods:{finish(){this.fill=49,this.hint=4},setFill(e){this.fill=e},tryAnswer(){this.hint++}},computed:{isCorrect(){let e=this.fill===49;return e&&this.finish(),e},hintText(){let e="Check";return this.hint===1&&(e="Hint (2)"),this.hint===2&&(e="Last hint (1)"),this.hint===3&&(e="Answer"),e}}},et=t("h1",null,"Take a fresh 100g tomato...",-1),st={key:0},nt=a("It\u2019s approximately "),ot=t("span",{class:"red"},"99%",-1),it=a("\xA0water!"),lt=[nt,ot,it],rt={for:"Guess"},at={key:0,id:"Right",class:"red"},ct=a("HALF"),ht=t("br",null,null,-1),_t=a("IS RIGHT"),dt=[ct,ht,_t],ut={id:"Challenge"},mt={key:0},pt={key:1},Ct={key:2},ft={key:0},vt=a(" Adjust water to "),yt=t("span",{class:"red"},"98%",-1),gt=a(" of the total\xA0mass: "),bt=[vt,yt,gt];function Tt(e,i,c,p,s,l){const _=g("TomatoSvg"),k=g("TomatoCalc");return n(),o(T,null,[et,s.accepted?r("",!0):(n(),o("h2",st,lt)),t("div",{style:A(`height: ${s.size*1.2}px`)},[t("label",rt,[y(_,{width:s.size,height:s.size,reveal:s.fill},null,8,["width","height","reveal"])]),l.isCorrect?(n(),o("h3",at,dt)):r("",!0)],4),t("div",ut,[!s.accepted||l.isCorrect?(n(),o("p",mt,"Guess the mass, when dehydrated to 98% water:")):r("",!0),s.accepted?r("",!0):(n(),o("div",pt,[t("button",{onClick:i[0]||(i[0]=C=>s.accepted=!0)},"Accept Challenge")])),s.accepted?(n(),o("div",Ct,[l.isCorrect?r("",!0):(n(),o("h3",ft,bt)),y(k,{onPubMass:l.setFill,hint:s.hint},null,8,["onPubMass","hint"]),l.isCorrect?r("",!0):(n(),o("button",{key:1,onClick:i[1]||(i[1]=(...C)=>l.tryAnswer&&l.tryAnswer(...C))},d(l.hintText),1))])):r("",!0)])],64)}var wt=m(tt,[["render",Tt]]);export{wt as default};
