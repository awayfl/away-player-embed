var AWAYFL=function(t){"use strict";var e="DecompressionStream"in self,n=function(t){return 67===t[0]&&87===t[1]&&83===t[2]},r=function(t){return new DataView(t.buffer).getUint32(4,!0)};function i(t,i){void 0===t&&(t=""),void 0===i&&(i=function(t){return t});var o,s=0,a=[];return i&&i(0),fetch(t).then((function(t){return s=+t.headers.get("Content-Length"),(o=t.body.getReader()).read()})).then((function(t){var c=t.value;console.debug("[Loader] Header:",String.fromCharCode.apply(null,c.slice(0,3).reverse()));var h,u=0;if(e&&n(c)){var l=r(c),d=c.slice(0,8);d[0]=70,console.debug("[Loader] SWC size:",r(c)),(h=function(t,n){if(void 0===n&&(n=8),!e)throw"Your browser not support DecompressionStream =(";var r,i=new self.DecompressionStream("deflate"),o=i.writable.getWriter(),s=i.readable.getReader(),a=new Uint8Array(t),c=!1,h=!1;function u(){s.read().then((function e(i){var o=i.done,c=i.value;return c&&(a.set(c,n),n+=c.length),o||n>=t?(h=!0,r&&r(),void console.debug("[Loader] Decoder closed:",n)):s.read().then(e)}))}return{get buffer(){return a},write:function(t){o.ready.then((function(){o.write(t),c||(c=!0,u())}))},readAll:function(){return h?Promise.resolve(a):new Promise((function(t){r=function(){t(a)}}))}}}(l,8)).buffer.set(d),h.write(c.slice(8))}else a.push(c);return u+=c.length,i&&i(Math.min(1,u/s)),o.read().then((function t(e){if(e.done){if(h)return h.readAll();var n=new Uint8Array(u),r=0;return a.forEach((function(t){n.set(t,r),r+=t.length})),n}var c=e.value;return u+=c.length,i&&i(u/s),h?h.write(c):a.push(c),o.read().then(t)}))}))}function o(t,n){void 0===n&&(n=function(t){return t});var r=t.path.indexOf(".js")>-1;if(!r&&e)return i(t.path,n).then((function(e){return Object.assign(t,{data:e.buffer,type:"swf"})}));var o=new XMLHttpRequest;return o.addEventListener("progress",(function(e){var r=e.total||+o.getResponseHeader("content-length")||t.size||0;r?(console.log("XHR",e.loaded,r),n(Math.min(1,e.loaded/r))):n(1)})),o.open("GET",t.path,!0),o.responseType=r?"text":"arraybuffer",new Promise((function(e,i){o.addEventListener("error",i),o.addEventListener("load",(function(){if(n(1),r){var i=new Blob([o.response],{type:"text/javascript"});s(URL.createObjectURL(i)).then((function(){return e(void 0)}))}else e({meta:t.meta||{},name:t.name,path:t.path,resourceType:t.resourceType,data:o.response,type:r?"js":"swf"})})),o.send()}))}function s(t,e){var n=document.querySelector("head"),r=document.createElement("script");return new Promise((function(i,o){Object.assign(r,{type:"text/javascript",async:!0,src:"string"==typeof t?t:t.path,onload:function(){e&&e(1),i(r)},onerror:o}),n.appendChild(r)}))}var a,c,h,u=function(){function t(e,n,r){void 0===r&&(r=1),this.callback=e,this.weight=r,this.id=t.ID++,this.value=0,this._childs=[],this._report=this._report.bind(this),this.childs=n}return Object.defineProperty(t.prototype,"childs",{get:function(){return this._childs},set:function(t){for(var e=0,n=this._childs;e<n.length;e++){var r=n[e];r.callback===this._report&&(r.callback=null)}if(this._childs.length=0,t){for(var i=0,o=t;i<o.length;i++){var s=o[i];if(s===this)throw"Reporter loop";s.callback=this._report}this._childs=t.slice()}},enumerable:!1,configurable:!0}),t.prototype._report=function(t){if(0===this._childs.length)this.value=t*this.weight;else{var e=0,n=0;this._childs.forEach((function(t){e+=t.weight||1,n+=t.value||0})),this.value=n/e}this.callback&&this.callback(this.value)},Object.defineProperty(t.prototype,"report",{get:function(){return this._report},enumerable:!1,configurable:!0}),t.ID=0,t}(),l=function(){function t(t){this.config=t}return t.prototype.run=function(t,e,n,r){void 0===n&&(n=function(t){}),void 0===r&&(r=!1);var i,a=t.length,c=e.length,h=t.concat(e),l=Array.from({length:a+c},(function(){return new u}));return this.progress=new u(n,l),i=r?(i=e.map((function(t,e){return o(t,l[e].report)}))).concat(t.map((function(t,e){return s(t,l[e+c].report)}))):h.map((function(t,e){return o(t,l[e].report)})),Promise.all(i).then((function(t){return t.filter((function(t){return t&&"swf"===t.type}))}))},t}(),d=function(t,e){return"string"!=typeof t?+t:t.includes("%")?parseFloat(t)/100*e:parseFloat(t)},p=function(){function t(t,e){void 0===t&&(t=document),this.root=t,this.config=e,this.onUpdate=this.onUpdate.bind(this),this.onProgress=this.onProgress.bind(this),window.addEventListener("resize",this.onUpdate)}return t.prototype.build=function(){this.splash=this.root.querySelector("#splash__image"),this.prRoot=this.root.querySelector("#progress__root"),this.prLine=this.root.querySelector("#progress__line")},t.prototype.init=function(){if(this.build(),this.splash){var t=this.config;Object.assign(this.splash.style,{backgroundImage:"url(".concat(t.splash,")"),visibility:"visible"});var e=t.progress;e.rect=e.rect||[.1,.9,.8,.01],Object.assign(this.prRoot.style,{background:e.back,left:"".concat(100*e.rect[0],"%"),top:"".concat(100*e.rect[1],"%"),width:"".concat(100*e.rect[2],"%"),height:"".concat(100*e.rect[3],"%")}),Object.assign(this.prLine.style,{background:e.line}),this.onUpdate()}},t.prototype.onProgress=function(t){if(this.prLine)if("tb"===this.config.progress.direction)Object.assign(this.prLine.style,{height:"".concat(100*t,"%"),width:"100%"});else Object.assign(this.prLine.style,{height:"100%",width:"".concat(100*t,"%")})},t.prototype.onUpdate=function(){if(this.splash){var t=this.config,e=d(t.x,window.innerWidth)||0,n=d(t.y,window.innerHeight)||0,r=d(t.w,window.innerWidth)||window.innerWidth,i=d(t.h,window.innerHeight)||window.innerHeight,o=Math.min(i/t.height,r/t.width),s=Math.ceil(t.width*o),a=Math.ceil(t.height*o),c=e+(r-s)/2,h=n+(i-a)/2;Object.assign(this.splash.style,{width:"".concat(s,"px"),height:"".concat(a,"px"),left:"".concat(c,"px"),top:"".concat(h,"px")})}},t.prototype.ready=function(){this.splash&&(this.config.start&&(this.splash.style.background="url(".concat(this.config.start,")")),Object.assign(this.prRoot.style,{visibility:"hidden",opacity:0}))},t.prototype.hide=function(t){var e=this;if(void 0===t&&(t=!1),this.splash){Object.assign(this.prRoot.style,{visibility:"hidden",opacity:0}),Object.assign(this.splash.style,{visibility:"hidden",opacity:0});var n=new Promise((function(t){return setTimeout(t,500)}));return t?n.then((function(){return e.dispose()})):n}},t.prototype.dispose=function(){this.splash&&(window.removeEventListener("resize",this.onUpdate),this.splash.remove(),this.prRoot.remove(),this.splash=null)},t}(),f=function(){function t(t,e){this.loader=t,this.config=e}return t.prototype.runGame=function(t){void 0===t&&(t=function(t){return t});var e=this.config,n=e.binary=(Array.isArray(e.binary)?e.binary:[e.binary]).map((function(t){return"string"==typeof t?{path:t}:t})),r=e.runtime=(Array.isArray(e.runtime)?e.runtime:[e.runtime]).map((function(t){return"string"==typeof t?{path:t,type:"js"}:t})),i=new u(null,null,4),o=new u((function(t){console.log("AVM Load",t)}),null,e.progressParserWeigth?e.progressParserWeigth:.001);return this.progress=new u(t,[i,o]),Object.assign(window,{updatePokiProgressBar:o.report}),this.loader.run(r,n,i.report,e.debug).then((function(t){return e.files=t,e}))},t}(),g={init:function(t){c=new l(t),a=new f(c,t),(h=new p(document,t)).init(),window.setStageDimensions=function(e,n,r,i){t.x=e,t.y=n,t.w=r,t.h=i,window.AVMPlayerPoki&&window.AVMPlayerPoki.setStageDimensions(e,n,r,i),h.onUpdate()}},runGame:function(t,e){void 0===t&&(t=function(t){return t}),void 0===e&&(e=function(t,e){return 0});var n=a.config,r=function(t){if(n.start){h.ready();window.addEventListener("click",(function(e){if(h.hide(!0),!t)throw"PokiPlayer did not send a callback for starting game";t()}),{once:!0})}else h.hide(!0)};return Object.assign(window,{swfParseComplete:r}),a.runGame((function(e){console.log("progress:",e),h.onProgress(e),t(e)})).then((function(t){e(t,r)}))}};return t.LegacyLoader=g,t.Loader=l,t.ProgressUI=p,t.Reporter=u,t.Runner=f,t}({});
//# sourceMappingURL=loader.js.map
