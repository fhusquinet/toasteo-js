!function(e){var t={};function n(o){if(t[o])return t[o].exports;var i=t[o]={i:o,l:!1,exports:{}};return e[o].call(i.exports,i,i.exports,n),i.l=!0,i.exports}n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:o})},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="/",n(n.s=0)}([function(e,t,n){e.exports=n(1)},function(e,t,n){"use strict";var o,i=n(2),s=(o=i)&&o.__esModule?o:{default:o};window.Toasteo=new s.default},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o,i=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),s=n(3),a=(o=s)&&o.__esModule?o:{default:o};var r=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e);var n={container:"toast-container",default:"toast",closing:"toast--closing",creating:"toast--creating",success:"toast--success",error:"toast--error",warning:"toast--warning",info:"toast--info"},o={prependTo:document.body.childNodes[0],duration:4e3,animateOnRemoving:!0,animationRemovingDuration:400,animateOnCreation:!0,closeOnClick:!0,classes:n},i=n;for(var s in t&&t.classes&&(i=t.classes),n)s in i||(i[s]=n[s]);if(t)for(var s in o)s in t||(t[s]=o[s]);else t=o;this.options=t,this.options.classes=i,this.toasts=[]}return i(e,[{key:"create",value:function(e,t,n){this.container=this.createContainer();var o=new a.default(e,this.getToastClass(t)),i=(this.toasts.length,o.element.className);return this.options.animateOnCreation&&(o.element.className=o.element.className+" "+this.options.classes.creating),this.container.prepend(o.element),this.handleCreationAnimation(o,i),this.handleClick(o),this.handleDuration(o),this.toasts.push(o),o}},{key:"getToastClass",value:function(e){var t=this.options.classes.default;return e&&(t+=" "+this.options.classes[e]),t}},{key:"handleCreationAnimation",value:function(e,t){this.options.animateOnCreation&&setTimeout(function(){e.element.className=t},100)}},{key:"handleClick",value:function(e){this.options.closeOnClick&&e.element.addEventListener("click",function(){this.closeOrRemoveToast(e)}.bind(this,e))}},{key:"handleDuration",value:function(e){var t=this;this.options.duration>0&&(e.timeout=setTimeout(function(){t.closeOrRemoveToast(e)},this.options.duration))}},{key:"closeOrRemoveToast",value:function(e){if(this.options.animateOnRemoving)return this.closeToast(e);this.removeToast(e)}},{key:"closeToast",value:function(e){clearTimeout(e.timeout),e.close(this.options.classes.closing,this.options.animationRemovingDuration),this.toasts.splice(this.findToastIndex(e),1)}},{key:"removeToast",value:function(e){clearTimeout(e.timeout),e.remove(),this.toasts.splice(this.findToastIndex(e),1)}},{key:"findToastIndex",value:function(e){for(var t=this.toasts.length-1;t>=0;t--)if(e.instance==this.toasts[t].instance)return t;return null}},{key:"createContainer",value:function(){var e=document.querySelector("."+this.options.classes.container);return e||((e=document.createElement("div")).className=this.options.classes.container,document.body.insertBefore(e,this.options.prependTo),e)}},{key:"success",value:function(e,t){return this.create(e,"success",t)}},{key:"error",value:function(e,t){return this.create(e,"error",t)}},{key:"warning",value:function(e,t){return this.create(e,"warning",t)}},{key:"info",value:function(e,t){return this.create(e,"info",t)}},{key:"close",value:function(){for(var e=this.toasts.length-1;e>=0;e--)this.closeToast(this.toasts[e])}},{key:"remove",value:function(){for(var e=this.toasts.length-1;e>=0;e--)this.removeToast(this.toasts[e])}}]),e}();t.default=r},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}();var i=function(){function e(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"";!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.instance=Math.random().toString(36),this.element=null,this.timeout=null,this.create(t,n)}return o(e,[{key:"create",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"";return this.element=document.createElement("div"),this.element.innerHTML=e,t&&(this.element.className=t),this}},{key:"insert",value:function(e){document.body.insertBefore(this.element,e)}},{key:"close",value:function(e,t){var n=this;return new Promise(function(o,i){n.element.className+=" "+e,setTimeout(function(){n.removeElement(),o()},t)})}},{key:"removeElement",value:function(){this.element.parentNode.removeChild(this.element),this.element=null}},{key:"remove",value:function(){var e=this;return new Promise(function(t,n){e.removeElement(),t()})}}]),e}();t.default=i}]);