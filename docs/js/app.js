!function(e){var t={};function n(o){if(t[o])return t[o].exports;var s=t[o]={i:o,l:!1,exports:{}};return e[o].call(s.exports,s,s.exports,n),s.l=!0,s.exports}n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:o})},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="/",n(n.s=0)}([function(e,t,n){e.exports=n(1)},function(e,t,n){"use strict";var o,s=n(2),i=(o=s)&&o.__esModule?o:{default:o};window.Toasteo=new i.default},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o,s=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),i=n(3),a=(o=i)&&o.__esModule?o:{default:o};var r=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e);var n={container:"toast-container",default:"toast",closing:"toast--closing",creating:"toast--creating",success:"toast--success",error:"toast--error",warning:"toast--warning",info:"toast--info"},o={prependTo:document.body.childNodes[0],duration:4e3,animateOnRemoving:!0,animationRemovingDuration:400,animateOnCreation:!0,closeOnClick:!0,classes:n},s=n;for(var i in t&&t.classes&&(s=t.classes),n)i in s||(s[i]=n[i]);if(t)for(var i in o)i in t||(t[i]=o[i]);else t=o;this.options=t,this.options.classes=s,this.toasts=[]}return s(e,[{key:"create",value:function(e,t,n){this.container=this.createContainer();var o=new a.default(e,t,this.getToastClass(t)),s=(this.toasts.length,o.element.className);return this.options.animateOnCreation&&(o.element.className=o.element.className+" "+this.options.classes.creating),this.container.prepend(o.element),this.handleCreationAnimation(o,s),this.handleClick(o),this.handleDuration(o),this.toasts.push(o),o}},{key:"getToastClass",value:function(e){var t=this.options.classes.default;return e&&(t+=" "+this.options.classes[e]),t}},{key:"handleCreationAnimation",value:function(e,t){this.options.animateOnCreation&&setTimeout(function(){e.element.className=t},100)}},{key:"handleClick",value:function(e){this.options.closeOnClick&&e.element.addEventListener("click",function(){this.closeOrRemoveToast(e)}.bind(this,e))}},{key:"handleDuration",value:function(e){var t=this;this.options.duration>0&&(e.timeout=setTimeout(function(){t.closeOrRemoveToast(e)},this.options.duration))}},{key:"closeOrRemoveToast",value:function(e){if(this.options.animateOnRemoving)return this.closeToast(e);this.removeToast(e)}},{key:"closeToast",value:function(e){clearTimeout(e.timeout),e.close(this.options.classes.closing,this.options.animationRemovingDuration),this.toasts.splice(this.findToastIndex(e),1)}},{key:"removeToast",value:function(e){clearTimeout(e.timeout),e.remove(),this.toasts.splice(this.findToastIndex(e),1)}},{key:"findToastIndex",value:function(e){for(var t=this.toasts.length-1;t>=0;t--)if(e.instance==this.toasts[t].instance)return t;return null}},{key:"createContainer",value:function(){var e=document.querySelector("."+this.options.classes.container);return e||((e=document.createElement("div")).className=this.options.classes.container,document.body.insertBefore(e,this.options.prependTo),e)}},{key:"success",value:function(e,t){return this.create(e,"success",t)}},{key:"error",value:function(e,t){return this.create(e,"error",t)}},{key:"warning",value:function(e,t){return this.create(e,"warning",t)}},{key:"info",value:function(e,t){return this.create(e,"info",t)}},{key:"close",value:function(){for(var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,t=this.toasts.length-1;t>=0;t--)null===e||this.toasts[t].type!=e?null==e&&this.closeToast(this.toasts[t]):this.closeToast(this.toasts[t])}},{key:"remove",value:function(){for(var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,t=this.toasts.length-1;t>=0;t--)null===e||this.toasts[t].type!=e?null==e&&this.removeToast(this.toasts[t]):this.removeToast(this.toasts[t])}}]),e}();t.default=r},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}();var s=function(){function e(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,o=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"";!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.instance=Math.random().toString(36),this.element=null,this.timeout=null,this.create(t,n,o)}return o(e,[{key:"create",value:function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"";return this.type=t,this.element=document.createElement("div"),this.element.innerHTML=e,n&&(this.element.className=n),this}},{key:"insert",value:function(e){document.body.insertBefore(this.element,e)}},{key:"close",value:function(e,t){var n=this;return new Promise(function(o,s){n.element.className+=" "+e,setTimeout(function(){n.removeElement(),o()},t)})}},{key:"removeElement",value:function(){this.element.parentNode.removeChild(this.element),this.element=null}},{key:"remove",value:function(){var e=this;return new Promise(function(t,n){e.removeElement(),t()})}}]),e}();t.default=s}]);