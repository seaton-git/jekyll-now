webpackJsonp([13],[,,,,,,,,,function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});n(35);window.CGI={}},function(e,t){window.Util={setDocumentTitle:function(e){if(document.title=e,/ip(hone|od|ad)/i.test(navigator.userAgent)){var t=document.createElement("iframe");t.src="",t.style.display="none",t.onload=function(){setTimeout(function(){t.remove()},9)},document.body.appendChild(t)}}}},function(e,t,n){"use strict";var a=n(3),i=n(45);a.a.use(i.a),t.a=new i.a({routes:[{path:"/home",name:"Home",title:"为MaryKay用户而设计",component:function(e){n.e(3).then(function(){var t=[n(58)];e.apply(null,t)}.bind(this)).catch(n.oe)}},{path:"/color",name:"ColorCustom",title:"颜色",component:function(e){n.e(10).then(function(){var t=[n(51)];e.apply(null,t)}.bind(this)).catch(n.oe)}},{path:"/font",name:"FontCustom",title:"字体",component:function(e){n.e(5).then(function(){var t=[n(56)];e.apply(null,t)}.bind(this)).catch(n.oe)}},{path:"/icon",name:"IconCustom",title:"图标",component:function(e){n.e(2).then(function(){var t=[n(59)];e.apply(null,t)}.bind(this)).catch(n.oe)}},{path:"/image",name:"ImageCustom",title:"图片",component:function(e){n.e(1).then(function(){var t=[n(60)];e.apply(null,t)}.bind(this)).catch(n.oe)}},{path:"/components",name:"Components",title:"Components",hasChild:!0,component:function(e){n.e(9).then(function(){var t=[n(52)];e.apply(null,t)}.bind(this)).catch(n.oe)},children:[{path:"navigation",name:"Navigation",title:"Navigation 导航",component:function(e){n.e(0).then(function(){var t=[n(61)];e.apply(null,t)}.bind(this)).catch(n.oe)}},{path:"dataEntry",name:"DataEntry",title:"Data Entry 数据录入",component:function(e){n.e(7).then(function(){var t=[n(54)];e.apply(null,t)}.bind(this)).catch(n.oe)}},{path:"dataDisplay",name:"DataDisplay",title:"Data Display 数据展示",component:function(e){n.e(8).then(function(){var t=[n(53)];e.apply(null,t)}.bind(this)).catch(n.oe)}},{path:"feedback",name:"Feedback",title:"Feedback 操作反馈",component:function(e){n.e(6).then(function(){var t=[n(55)];e.apply(null,t)}.bind(this)).catch(n.oe)}},{path:"actionSheet",name:"ActionSheet",title:"ActionSheet 操作面板",component:function(e){n.e(11).then(function(){var t=[n(50)];e.apply(null,t)}.bind(this)).catch(n.oe)}},{path:"headImage",name:"HeadImage",title:"头像",component:function(e){n.e(4).then(function(){var t=[n(57)];e.apply(null,t)}.bind(this)).catch(n.oe)}}]},{path:"*",redirect:"/home"}]})},function(e,t){},function(e,t,n){var a=n(1)(n(32),n(43),null,null);e.exports=a.exports},,,,,,,,,,,,,,,,,,,function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=n(41),i=n.n(a),o=n(40),c=n.n(o);t.default={name:"app",components:{LeftMenu:i.a,HeaderCustom:c.a}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={name:"header-custom",data:function(){return{headerStyle:{}}},methods:{},mounted:function(){},created:function(){}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={name:"left-menu",data:function(){return{routerList:this.$router.options.routes,menuSelected:this.$router.options.routes[0].name,subMenuSelected:"",leftMenuStyle:{}}},methods:{updateContainer:function(e,t){if(e.hasChild){if(this.subMenuSelected===e.name)return void(this.subMenuSelected="");this.subMenuSelected=e.name}else this.menuSelected=e.name,t?this.$router.replace({path:t.path+"/"+e.path}):this.$router.replace({path:e.path})}},mounted:function(){var e=document.querySelector(".-m-header").clientHeight;window.onscroll=function(){var t=document.body.scrollTop;this.leftMenuStyle=t-e>0?{top:0}:{top:e-t+"px"}}.bind(this)},created:function(){}}},function(e,t,n){"use strict";var a=n(14),i=n.n(a);i.a.defaults.baseURL="",i.a.defaults.headers.post["Content-Type"]="application/x-www-form-urlencoded"},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=n(3),i=n(12),o=(n.n(i),n(13)),c=n.n(o),u=n(11);n(9),n(10),a.a.config.productionTip=!1,new a.a({el:"#content",router:u.a,template:"<App/>",components:{App:c.a}})},function(e,t){},function(e,t){},,function(e,t,n){n(38);var a=n(1)(n(33),n(44),null,null);e.exports=a.exports},function(e,t,n){n(37);var a=n(1)(n(34),n(42),null,null);e.exports=a.exports},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"-m-left-menu",style:e.leftMenuStyle},e._l(e.routerList,function(t){return n("div",[t.hasChild?e._e():n("div",{staticClass:"menu",class:t.hasChild||t.name!==e.menuSelected?"":"menu-selected",on:{click:function(n){e.updateContainer(t)}}},[n("span",[e._v(e._s(t.title))])]),e._v(" "),t.hasChild?n("div",[n("div",{staticClass:"menu relative",on:{click:function(n){e.updateContainer(t)}}},[n("span",[e._v(e._s(t.title))]),e._v(" "),n("label",{staticClass:"submenu-arrow",class:e.subMenuSelected===t.name?"submenu-open":""})]),e._v(" "),n("div",{class:e.subMenuSelected===t.name?"submenu-open":"hidden"},e._l(t.children,function(a){return a.hasChild?e._e():n("div",{staticClass:"menu child-menu",class:a.hasChild||a.name!==e.menuSelected?"":"menu-selected",on:{click:function(n){e.updateContainer(a,t)}}},[n("span",[e._v(e._s(a.title))])])}))]):e._e()])}))},staticRenderFns:[]}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"page-wrapper"},[n("header-custom"),e._v(" "),n("div",{staticClass:"main-wrapper"},[n("left-menu"),e._v(" "),n("div",{staticClass:"right-container container"},[n("router-view")],1)],1)],1)},staticRenderFns:[]}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement;e._self._c;return e._m(0)},staticRenderFns:[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"-m-header"},[n("strong",{staticClass:"title"},[e._v("Intouch玫琳凯之窗")]),n("span",{staticClass:"subtitle"},[e._v(" | 设计指引")])])}]}}],[36]);