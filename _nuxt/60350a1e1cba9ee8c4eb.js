(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{403:function(t,e,o){var content=o(415);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,o(11).default)("334d32bf",content,!0,{sourceMap:!1})},404:function(t,e,o){var content=o(417);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,o(11).default)("bcb6c50a",content,!0,{sourceMap:!1})},405:function(t,e,o){var content=o(419);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,o(11).default)("932a8f60",content,!0,{sourceMap:!1})},414:function(t,e,o){"use strict";var n=o(403);o.n(n).a},415:function(t,e,o){(e=o(10)(!1)).push([t.i,".header-buttons{display:flex;justify-content:flex-end;align-items:center}.header-buttons .login-button{margin-right:10px}",""]),t.exports=e},416:function(t,e,o){"use strict";var n=o(404);o.n(n).a},417:function(t,e,o){(e=o(10)(!1)).push([t.i,".header-row{justify-content:space-between;padding:10px 25px;background:#fff;min-height:45px}.header-row,.header-row .header-time-lang{display:flex;align-items:center}.header-row-logo{background:#f4f6f5}",""]),t.exports=e},418:function(t,e,o){"use strict";var n=o(405);o.n(n).a},419:function(t,e,o){(e=o(10)(!1)).push([t.i,"html{color:#495060;font-size:14px;word-spacing:1px;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%;-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;box-sizing:border-box}button,html,input{font-family:GothamPro Regular,Source Sans Pro,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif!important}body{background:#f4f6f5}*,:after,:before{box-sizing:border-box;margin:0}.root{max-width:1200px;min-height:70vh;margin:0 auto}",""]),t.exports=e},420:function(t,e,o){"use strict";o.r(e);o(65),o(21),o(20),o(13),o(47);var n=o(23),r={data:function(){return{isAuthorized:!!this.$cookies.get("access_token")}},methods:{registration:function(){this.$router.push({path:this.localePath("/registration")})},login:function(){this.$emit("clickLogin")},logOut:function(){this.$emit("clickLogOut")}}},c=(o(414),o(4)),l=Object(c.a)(r,(function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"header-buttons"},[t.isAuthorized?t._e():o("Button",{staticClass:"login-button",attrs:{color:"success","data-qa":"header-buttons-login"},on:{click:t.login}},[t._v("\n    "+t._s(t.$t("entrance"))+"\n  ")]),t._v(" "),t.isAuthorized?t._e():o("Button",{attrs:{"data-qa":"header-button-registration"},on:{click:t.registration}},[t._v("\n    "+t._s(t.$t("registration"))+"\n  ")]),t._v(" "),t.isAuthorized?o("Button",{on:{click:t.logOut}},[t._v("\n    "+t._s("Выйти")+"\n  ")]):t._e()],1)}),[],!1,null,null,null).exports,f=o(90);function h(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(object);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,o)}return e}function d(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?h(Object(source),!0).forEach((function(e){Object(n.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):h(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}var O={name:"LayoutHeader",components:{HeaderButtons:l},methods:d(d({},Object(f.b)("oidc",["authenticateOidc","signOutOidc"])),{},{login:function(){this.authenticateOidc()},logout:function(){this.$cookies.remove("access_token"),this.signOutOidc()}})},m=(o(416),{name:"LayoutFooter"});function y(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(object);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,o)}return e}var v={name:"DefaultLayout",components:{LayoutHeader:Object(c.a)(O,(function(){var t=this.$createElement,e=this._self._c||t;return e("header",{attrs:{role:"banner"}},[e("div",{staticClass:"header-row header-row-logo"}),this._v(" "),e("HeaderMenu")],1)}),[],!1,null,null,null).exports,LayoutFooter:Object(c.a)(m,(function(){var t=this.$createElement;return(this._self._c||t)("footer",{attrs:{role:"contentinfo"}})}),[],!1,null,null,null).exports},data:function(){return{isAuthorized:!!this.$cookies.get("access_token")}},mounted:function(){this.isAuthorized?this.getOidcUser():this.authenticateOidcSilent()},methods:function(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?y(Object(source),!0).forEach((function(e){Object(n.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):y(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}({},Object(f.b)("oidc",["authenticateOidcSilent","getOidcUser"]))},j=(o(418),Object(c.a)(v,(function(){var t=this.$createElement,e=this._self._c||t;return e("div",[e("LayoutHeader"),this._v(" "),e("main",{attrs:{role:"main"}},[e("nuxt",{staticClass:"root"})],1),this._v(" "),e("LayoutFooter")],1)}),[],!1,null,null,null));e.default=j.exports}}]);