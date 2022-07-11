import{h as $,_ as m,o as p,c as h,a as n,w as a,i as L,b as r,t as l,v as f,p as U,f as V,r as _,g as c,F as g,n as M,u as P}from"./index.abfd9591.js";class b{constructor(t){this["."]={raw:t||1},console.log(this)}get eff(){return this["."].raw}set eff(t){this["."].raw=t}get efi(){return 1/this.eff}set efi(t){this.eff=1/t}get ef100(){return this.efi*100}set ef100(t){this.efi=100/t}valueOf(){return Number(this.eff)}toString(){return this.valueOf().toFixed(2)}}var z=$({A1:new b(25),A2:new b(35),B1:new b(8),B2:new b(10),distance:1400,price:"3.50",fuelUsed(e){return this.distance*e.efi},costAt(e){return this.fuelUsed(e)*this.price},fuelReduction(e,t){return this.fuelUsed(e)-this.fuelUsed(t)},moneySaved(e,t){return this.costAt(t)-this.costAt(e)},calc_eff_inc(e,t){return t/e*100-100},a_fpd_imp(){return A(this.A1,this.A2)},b_fpd_imp(){return A(this.B1,this.B2)},ab_pct_diff(){return j(this.a_fpd_imp(),this.b_fpd_imp())},ab_pct_diff_abs(){return Math.abs(this.ab_pct_diff())}});function A(e,t){return(1/e-1/t)*100}function N(...e){return e.reduce((t,i)=>t+i,0)/e.length}function j(e,t){let i=t-e,o=N(e,t);return Math.round(i/o*100)||0}function D(e,t,i){if(typeof t!="string")throw"bad prop name";Object.defineProperty(i,t,{get(){return e[t]},set(o){e[t]=o}})}function F(e,...t){const i={_plucking:t};return t.forEach(o=>D(e,o,i)),i}function E(){const t=F({foo:!1,bar:null},"foo");t.foo,t.foo=!0}E();const Z={props:["fromParent"],data(){let e=this.fromParent.split(",");return F(this.$parent,...e)},mounted(){console.log(this.fromParent)}},I=r(" Metric ");function O(e,t,i,o,C,s){return p(),h("table",null,[n("tr",null,[n("th",null,[I,a(n("input",{type:"checkbox","onUpdate:modelValue":t[0]||(t[0]=u=>e.metric=u)},null,512),[[L,e.metric]])]),n("td",null,[r(" Distance ("+l(e.keys.unitD)+") ",1),a(n("input",{class:"number",type:"number","onUpdate:modelValue":t[1]||(t[1]=u=>e.distance=u)},null,512),[[f,e.distance,void 0,{number:!0}]])]),n("td",null,[r(" Price per ("+l(e.keys.unitF)+") $ ",1),a(n("input",{class:"number",type:"number","onUpdate:modelValue":t[2]||(t[2]=u=>e.price=u)},null,512),[[f,e.price,void 0,{number:!0}]])])])])}var T=m(Z,[["render",O]]);const G={props:["id"],computed:{cid(){return"Car_"+this.id}}},R=e=>(U("data-v-1122fbe6"),e=e(),V(),e),W={class:"car_svg",viewBox:"0 0 260 120",xmlns:"http://www.w3.org/2000/svg"},q=["id"],H=R(()=>n("path",{d:`M 98.5 9.5 L 52.7 12 L 50.9 12 L 37.6 24.7
C 10.8 49.8 8.5 52.2 7.8 54.2
C 7.5 55.2 7.5 57.8 7.6 62.7
C 8 72.9 9 86 9.4 87.7
C 10.1 90.4 10.9 90.7 17.3 90.5 L 20.5 90.5 L 21.5 86
C 23 79.5 24.3 77 27.8 73
C 33 67.3 36.8 65.3 43.8 64.9
C 50.098 64.088 56.407 66.315 60.8 70.9
C 64.6 74.6 68.6 81.3 68.6 84.2
C 68.6 88 68.4 88 115.9 85.2
C 138.702 83.9 161.502 82.567 184.3 81.2
C 184.8 81.2 185.1 80.4 186 76.7
C 187.5 69.9 188.7 67.7 193 63.1
C 198.4 57.3 202 55.8 210.1 55.7
C 213.4 55.7 215.3 55.9 216.7 56.4
C 224.565 59.588 230.56 66.171 233 74.3
C 233.4 76 234 77.6 234.4 77.9
C 235 78.3 236.2 78.4 239.6 78.3
C 244.9 78.1 246.6 77.5 247.3 75.5
C 248.3 72.5 247.2 50.3 245.9 49
C 244.9 47.9 233.6 46.3 187.5 40.6 L 177.6 39.4 L 160.6 23.1
C 151.3 14.1 143.4 6.9 143.2 6.9 L 98.5 9.5 Z M 153 23.1
C 158.1 27.8 164 33.4 166.1 35.6
C 169.6 39.2 170 39.8 170 41.1
C 170 43.1 169.3 43.8 166.8 44.5
C 163.2 45.4 149.4 46.4 125.7 47.5 L 111.3 48.1
C 104.7 48.4 103.8 48.2 103.3 46.5
C 102.3 43.5 101.1 21.6 101.6 19.3
C 101.9 18.2 102.2 17.8 103.3 17.4
C 104.6 17 112.9 16.4 133.3 15.1
C 138.2 14.8 142.6 14.6 143.1 14.7
C 143.5 14.7 147.9 18.4 153.1 23.1 Z M 95.3 18.3
C 95.9 19.1 96.3 23.9 96.9 35.5
C 97.4 47.3 97.3 48.3 95.3 48.7
C 93.3 49.2 83.6 49.8 62.9 50.8 L 43.5 51.8 L 41.9 50.1
C 41 49.2 40.1 47.8 39.9 47.1
C 39.1 44.4 40.1 43 52.9 27.9 L 60 19.4 L 62.5 19.2
C 63.9 19 68.9 18.8 73.7 18.5 L 84.4 17.9
C 90.9 17.6 94.9 17.7 95.3 18.3 Z M 41.5 72
C 33.2 73.7 27.4 82.1 28 91.4
C 28.3 97.7 32.5 104.2 37.7 106.9
C 44.5 110.4 51.9 108.9 57.7 102.9
C 62 98.4 63 95 62.2 87.4
C 61.7 82.6 60.7 80.3 58 77.4
C 53.879 72.753 47.572 70.689 41.5 72 Z M 205.9 63
C 202.6 63.7 198.9 65.7 196.9 67.7
C 194.2 70.7 191.9 77.6 192.3 82.2
C 192.9 89.5 198.9 97.5 204.7 98.9
C 205.7 99.1 208.2 99.3 210.1 99.3
C 214.4 99.3 216.8 98.5 219.9 95.9
C 225.6 91.2 227.7 85.5 226.6 77.6
C 225.547 67.459 215.822 60.553 205.9 62.9 Z`},null,-1)),J=[H];function K(e,t,i,o,C,s){return p(),h("svg",W,[n("g",{id:s.cid},J,8,q)])}var k=m(G,[["render",K],["__scopeId","data-v-1122fbe6"]]);const Q={components:{CarSvg:k}},X=n("hr",null,null,-1),Y=n("h3",null,"Small improvements to low efficiencies can pay off!",-1);function x(e,t,i,o,C,s){const u=_("CarSvg");return p(),h(g,null,[X,Y,c(u)],64)}var ee=m(Q,[["render",x]]);const v={name:"CarsSvg",components:{CarSvg:k},props:["diff"],data(){return{blue:"steelblue"}},methods:{},computed:{size(){return this.diff/-400+1},cssVars(){return`--size: ${this.diff/-400+1.2};`}}},y=()=>{P(e=>({"5efc9883":e.size,"5ef4e8dc":e.blue}))},B=v.setup;v.setup=B?(e,t)=>(y(),B(e,t)):y;const ne=v,te={viewBox:"0 0 500 120"};function le(e,t,i,o,C,s){const u=_("CarSvg");return p(),h("div",{id:"ABwrap",style:M(s.cssVars)},[(p(),h("svg",te,[c(u,{id:`${i.diff>0?"A1":"B1"}`},null,8,["id"]),c(u,{id:`${i.diff>0?"B1":"A1"}`},null,8,["id"])]))],4)}var se=m(ne,[["render",le]]);const re={name:"Cars",components:{CarsABsvg:se,CarSettings:T,CarFooter:ee},setup(){return z},data(){return{metric:!1}},computed:{keys(){return{dpf:this.metric?"km/L":"MPG",fpd:this.metric?"L/km":"Gal/mi",unitF:this.metric?"Ltr":"Gal",unitD:this.metric?"km":"mile"}},winner(){return this.ab_pct_diff()?this.ab_pct_diff()>0?"B":"A":""}},watch:{"A1.eff":function(e,t){this.A1.eff=e<this.A2?e:t},"B1.eff":function(e,t){this.B1.eff=e<this.B2?e:t},"A2.eff":function(e,t){this.A2.eff=e>this.A1?e:t},"B2.eff":function(e,t){this.B2.eff=e>this.B1?e:t}}},ie=n("h1",null,"Compare Efficiencies",-1),ue=n("h2",null,"Adjust distance and price\xA0settings:",-1),oe=n("h3",null,"Compare two drivers who upgrade their\xA0cars...",-1),de=n("td",null,[n("pre",null,`  bill
  v.
  sarah
        `)],-1),ae={colspan:"2"},fe=n("tr",null,[n("th",null,"Scores:"),n("th",null,"Bill"),n("th",null,"Sarah")],-1),ce=n("th",null,[r(" Old car rating:"),n("br"),n("small",null,[r("Fuel/distance:"),n("br"),r(" Consumption:")])],-1),pe=n("br",null,null,-1),he=n("br",null,null,-1),_e=n("th",null,[r(" New car rating:"),n("br"),n("small",null,[r("Fuel/distance:"),n("br"),r(" Consumption:")])],-1),me=n("br",null,null,-1),Ce=n("br",null,null,-1),be=n("th",null,"Savings",-1),ve=n("th",null,[r("Efficiency"),n("br"),r("increase")],-1),Ae=n("br",null,null,-1),ye=n("br",null,null,-1),Be=n("br",null,null,-1),ge=r("improvement"),Fe=n("br",null,null,-1),ke=n("br",null,null,-1),we=r(" Who saves? "),Se=n("br",null,null,-1),$e={colspan:"2"},Le=n("br",null,null,-1),Ue=n("small",null,"(relative fuel reduction)",-1),Ve=r(),Me=n("br",null,null,-1);function Pe(e,t,i,o,C,s){const u=_("CarSettings"),w=_("CarsABsvg"),S=_("CarFooter");return p(),h(g,null,[ie,ue,oe,n("p",null,"Bill needs over 66 "+l(s.keys.dpf)+" to match what Sarah saves at 10 "+l(s.keys.dpf)+".",1),c(u,{fromParent:"distance,price,metric,keys"}),n("table",null,[n("tr",null,[de,n("td",ae,[c(w,{diff:e.ab_pct_diff()},null,8,["diff"])])]),fe,n("tr",null,[ce,n("td",null,[a(n("input",{class:"number",type:"number","onUpdate:modelValue":t[0]||(t[0]=d=>e.A1.eff=d),disabled:""},null,512),[[f,e.A1.eff,void 0,{number:!0}]]),r(" "+l(s.keys.dpf)+" ",1),pe,n("h6",null,l(e.A1.efi.toFixed(3))+" "+l(s.keys.fpd),1),n("i",null,l(e.fuelUsed(e.A1).toFixed(1))+" "+l(s.keys.unitF),1),n("small",null," ($"+l(e.costAt(e.A1).toFixed(2))+") ",1)]),n("td",null,[a(n("input",{class:"number",type:"number","onUpdate:modelValue":t[1]||(t[1]=d=>e.B1.eff=d),disabled:""},null,512),[[f,e.B1.eff,void 0,{number:!0}]]),r(" "+l(s.keys.dpf)+" ",1),he,n("h6",null,l(e.B1.efi.toFixed(3))+" "+l(s.keys.fpd),1),n("i",null,l(e.fuelUsed(e.B1).toFixed(1))+" "+l(s.keys.unitF),1),n("small",null," ($"+l(e.costAt(e.B1).toFixed(2))+") ",1)])]),n("tr",null,[_e,n("td",null,[a(n("input",{class:"number",type:"number","onUpdate:modelValue":t[2]||(t[2]=d=>e.A2.eff=d)},null,512),[[f,e.A2.eff,void 0,{number:!0}]]),r(" "+l(s.keys.dpf)+" ",1),me,n("h6",null,l(e.A2.efi.toFixed(3))+" "+l(s.keys.fpd),1),n("i",null,l(e.fuelUsed(e.A2).toFixed(2))+" "+l(s.keys.unitF),1),n("small",null," ($"+l(e.costAt(e.A2).toFixed(2))+") ",1)]),n("td",null,[a(n("input",{class:"number",type:"number","onUpdate:modelValue":t[3]||(t[3]=d=>e.B2.eff=d)},null,512),[[f,e.B2.eff,void 0,{number:!0}]]),r(" "+l(s.keys.dpf)+" ",1),Ce,n("h6",null,l(e.B2.efi.toFixed(3))+" "+l(s.keys.fpd),1),n("i",null,l(e.fuelUsed(e.B2).toFixed(2))+" "+l(s.keys.unitF),1),n("small",null," ($"+l(e.costAt(e.B2).toFixed(2))+") ",1)])]),n("tr",null,[be,n("td",null,[n("i",null,l(e.fuelReduction(e.A1,e.A2).toFixed(2))+" "+l(s.keys.unitF),1),n("small",null," ($"+l(e.moneySaved(e.A2,e.A1).toFixed(2))+") ",1)]),n("td",null,[n("i",null,l(e.fuelReduction(e.B1,e.B2).toFixed(2))+" "+l(s.keys.unitF),1),n("small",null," ($"+l(e.moneySaved(e.B2,e.B1).toFixed(2))+") ",1)])]),n("tr",null,[ve,n("td",null,[n("span",null,l(e.calc_eff_inc(e.A1,e.A2).toFixed(0))+"%",1),Ae,n("small",null,"("+l(e.A2.eff)+" / "+l(e.A1.eff)+")",1)]),n("td",null,[n("span",null,l(e.calc_eff_inc(e.B1,e.B2).toFixed(0))+"%",1),ye,n("small",null,"("+l(e.B2.eff)+" / "+l(e.B1.eff)+")",1)])]),n("tr",null,[n("th",null,[r(l(s.keys.fpd),1),Be,ge]),n("td",null,[n("span",null,l(e.a_fpd_imp().toFixed(2))+"%",1),Fe,n("small",null,"(1/"+l(e.A1.eff)+" \u2013 1/"+l(e.A2.eff)+")",1)]),n("td",null,[n("span",null,l(e.b_fpd_imp().toFixed(2))+"%",1),ke,n("small",null,"(1/"+l(e.B1.eff)+" \u2013 1/"+l(e.B2.eff)+")",1)])]),n("tr",null,[n("th",null,[we,Se,r(" "+l(s.winner?s.winner+" wins!":"Tie"),1)]),n("td",$e,[r(l(e.ab_pct_diff_abs().toFixed(0))+"% improvement difference ",1),Le,Ue,Ve,Me,n("small",null,l(s.keys.fpd)+" difference [B-A] divided by average [(A+B)/2]",1)])])]),c(S)],64)}var Ne=m(re,[["render",Pe]]);export{Ne as default};
