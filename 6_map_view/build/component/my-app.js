/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t=window.ShadowRoot&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,e=Symbol(),s=new Map;class i{constructor(t,s){if(this._$cssResult$=!0,s!==e)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t}get styleSheet(){let e=s.get(this.cssText);return t&&void 0===e&&(s.set(this.cssText,e=new CSSStyleSheet),e.replaceSync(this.cssText)),e}toString(){return this.cssText}}const n=(t,...s)=>{const n=1===t.length?t[0]:s.reduce(((e,s,i)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+t[i+1]),t[0]);return new i(n,e)},o=t?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let s="";for(const e of t.cssRules)s+=e.cssText;return(t=>new i("string"==typeof t?t:t+"",e))(s)})(t):t
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */;var r;const a=window.reactiveElementPolyfillSupport,l={toAttribute(t,e){switch(e){case Boolean:t=t?"":null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let s=t;switch(e){case Boolean:s=null!==t;break;case Number:s=null===t?null:Number(t);break;case Object:case Array:try{s=JSON.parse(t)}catch(t){s=null}}return s}},c=(t,e)=>e!==t&&(e==e||t==t),h={attribute:!0,type:String,converter:l,reflect:!1,hasChanged:c};class d extends HTMLElement{constructor(){super(),this._$Et=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Ei=null,this.o()}static addInitializer(t){var e;null!==(e=this.l)&&void 0!==e||(this.l=[]),this.l.push(t)}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach(((e,s)=>{const i=this._$Eh(s,e);void 0!==i&&(this._$Eu.set(i,s),t.push(i))})),t}static createProperty(t,e=h){if(e.state&&(e.attribute=!1),this.finalize(),this.elementProperties.set(t,e),!e.noAccessor&&!this.prototype.hasOwnProperty(t)){const s="symbol"==typeof t?Symbol():"__"+t,i=this.getPropertyDescriptor(t,s,e);void 0!==i&&Object.defineProperty(this.prototype,t,i)}}static getPropertyDescriptor(t,e,s){return{get(){return this[e]},set(i){const n=this[t];this[e]=i,this.requestUpdate(t,n,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||h}static finalize(){if(this.hasOwnProperty("finalized"))return!1;this.finalized=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),this.elementProperties=new Map(t.elementProperties),this._$Eu=new Map,this.hasOwnProperty("properties")){const t=this.properties,e=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const s of e)this.createProperty(s,t[s])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const s=new Set(t.flat(1/0).reverse());for(const t of s)e.unshift(o(t))}else void 0!==t&&e.push(o(t));return e}static _$Eh(t,e){const s=e.attribute;return!1===s?void 0:"string"==typeof s?s:"string"==typeof t?t.toLowerCase():void 0}o(){var t;this._$Ev=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$Ep(),this.requestUpdate(),null===(t=this.constructor.l)||void 0===t||t.forEach((t=>t(this)))}addController(t){var e,s;(null!==(e=this._$Em)&&void 0!==e?e:this._$Em=[]).push(t),void 0!==this.renderRoot&&this.isConnected&&(null===(s=t.hostConnected)||void 0===s||s.call(t))}removeController(t){var e;null===(e=this._$Em)||void 0===e||e.splice(this._$Em.indexOf(t)>>>0,1)}_$Ep(){this.constructor.elementProperties.forEach(((t,e)=>{this.hasOwnProperty(e)&&(this._$Et.set(e,this[e]),delete this[e])}))}createRenderRoot(){var e;const s=null!==(e=this.shadowRoot)&&void 0!==e?e:this.attachShadow(this.constructor.shadowRootOptions);return((e,s)=>{t?e.adoptedStyleSheets=s.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet)):s.forEach((t=>{const s=document.createElement("style"),i=window.litNonce;void 0!==i&&s.setAttribute("nonce",i),s.textContent=t.cssText,e.appendChild(s)}))})(s,this.constructor.elementStyles),s}connectedCallback(){var t;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(t=this._$Em)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostConnected)||void 0===e?void 0:e.call(t)}))}enableUpdating(t){}disconnectedCallback(){var t;null===(t=this._$Em)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostDisconnected)||void 0===e?void 0:e.call(t)}))}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$Eg(t,e,s=h){var i,n;const o=this.constructor._$Eh(t,s);if(void 0!==o&&!0===s.reflect){const r=(null!==(n=null===(i=s.converter)||void 0===i?void 0:i.toAttribute)&&void 0!==n?n:l.toAttribute)(e,s.type);this._$Ei=t,null==r?this.removeAttribute(o):this.setAttribute(o,r),this._$Ei=null}}_$AK(t,e){var s,i,n;const o=this.constructor,r=o._$Eu.get(t);if(void 0!==r&&this._$Ei!==r){const t=o.getPropertyOptions(r),a=t.converter,c=null!==(n=null!==(i=null===(s=a)||void 0===s?void 0:s.fromAttribute)&&void 0!==i?i:"function"==typeof a?a:null)&&void 0!==n?n:l.fromAttribute;this._$Ei=r,this[r]=c(e,t.type),this._$Ei=null}}requestUpdate(t,e,s){let i=!0;void 0!==t&&(((s=s||this.constructor.getPropertyOptions(t)).hasChanged||c)(this[t],e)?(this._$AL.has(t)||this._$AL.set(t,e),!0===s.reflect&&this._$Ei!==t&&(void 0===this._$ES&&(this._$ES=new Map),this._$ES.set(t,s))):i=!1),!this.isUpdatePending&&i&&(this._$Ev=this._$EC())}async _$EC(){this.isUpdatePending=!0;try{await this._$Ev}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this._$Et&&(this._$Et.forEach(((t,e)=>this[e]=t)),this._$Et=void 0);let e=!1;const s=this._$AL;try{e=this.shouldUpdate(s),e?(this.willUpdate(s),null===(t=this._$Em)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostUpdate)||void 0===e?void 0:e.call(t)})),this.update(s)):this._$EU()}catch(t){throw e=!1,this._$EU(),t}e&&this._$AE(s)}willUpdate(t){}_$AE(t){var e;null===(e=this._$Em)||void 0===e||e.forEach((t=>{var e;return null===(e=t.hostUpdated)||void 0===e?void 0:e.call(t)})),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EU(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$Ev}shouldUpdate(t){return!0}update(t){void 0!==this._$ES&&(this._$ES.forEach(((t,e)=>this._$Eg(e,this[e],t))),this._$ES=void 0),this._$EU()}updated(t){}firstUpdated(t){}}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var p;d.finalized=!0,d.elementProperties=new Map,d.elementStyles=[],d.shadowRootOptions={mode:"open"},null==a||a({ReactiveElement:d}),(null!==(r=globalThis.reactiveElementVersions)&&void 0!==r?r:globalThis.reactiveElementVersions=[]).push("1.0.1");const u=globalThis.trustedTypes,m=u?u.createPolicy("lit-html",{createHTML:t=>t}):void 0,g=`lit$${(Math.random()+"").slice(9)}$`,y="?"+g,v=`<${y}>`,$=document,b=(t="")=>$.createComment(t),f=t=>null===t||"object"!=typeof t&&"function"!=typeof t,_=Array.isArray,S=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,A=/-->/g,k=/>/g,w=/>|[ 	\n\r](?:([^\s"'>=/]+)([ 	\n\r]*=[ 	\n\r]*(?:[^ 	\n\r"'`<>=]|("|')|))|$)/g,E=/'/g,C=/"/g,T=/^(?:script|style|textarea)$/i,U=(t=>(e,...s)=>({_$litType$:t,strings:e,values:s}))(1),x=Symbol.for("lit-noChange"),O=Symbol.for("lit-nothing"),M=new WeakMap,P=$.createTreeWalker($,129,null,!1),N=(t,e)=>{const s=t.length-1,i=[];let n,o=2===e?"<svg>":"",r=S;for(let e=0;e<s;e++){const s=t[e];let a,l,c=-1,h=0;for(;h<s.length&&(r.lastIndex=h,l=r.exec(s),null!==l);)h=r.lastIndex,r===S?"!--"===l[1]?r=A:void 0!==l[1]?r=k:void 0!==l[2]?(T.test(l[2])&&(n=RegExp("</"+l[2],"g")),r=w):void 0!==l[3]&&(r=w):r===w?">"===l[0]?(r=null!=n?n:S,c=-1):void 0===l[1]?c=-2:(c=r.lastIndex-l[2].length,a=l[1],r=void 0===l[3]?w:'"'===l[3]?C:E):r===C||r===E?r=w:r===A||r===k?r=S:(r=w,n=void 0);const d=r===w&&t[e+1].startsWith("/>")?" ":"";o+=r===S?s+v:c>=0?(i.push(a),s.slice(0,c)+"$lit$"+s.slice(c)+g+d):s+g+(-2===c?(i.push(void 0),e):d)}const a=o+(t[s]||"<?>")+(2===e?"</svg>":"");return[void 0!==m?m.createHTML(a):a,i]};class I{constructor({strings:t,_$litType$:e},s){let i;this.parts=[];let n=0,o=0;const r=t.length-1,a=this.parts,[l,c]=N(t,e);if(this.el=I.createElement(l,s),P.currentNode=this.el.content,2===e){const t=this.el.content,e=t.firstChild;e.remove(),t.append(...e.childNodes)}for(;null!==(i=P.nextNode())&&a.length<r;){if(1===i.nodeType){if(i.hasAttributes()){const t=[];for(const e of i.getAttributeNames())if(e.endsWith("$lit$")||e.startsWith(g)){const s=c[o++];if(t.push(e),void 0!==s){const t=i.getAttribute(s.toLowerCase()+"$lit$").split(g),e=/([.?@])?(.*)/.exec(s);a.push({type:1,index:n,name:e[2],strings:t,ctor:"."===e[1]?B:"?"===e[1]?D:"@"===e[1]?z:H})}else a.push({type:6,index:n})}for(const e of t)i.removeAttribute(e)}if(T.test(i.tagName)){const t=i.textContent.split(g),e=t.length-1;if(e>0){i.textContent=u?u.emptyScript:"";for(let s=0;s<e;s++)i.append(t[s],b()),P.nextNode(),a.push({type:2,index:++n});i.append(t[e],b())}}}else if(8===i.nodeType)if(i.data===y)a.push({type:2,index:n});else{let t=-1;for(;-1!==(t=i.data.indexOf(g,t+1));)a.push({type:7,index:n}),t+=g.length-1}n++}}static createElement(t,e){const s=$.createElement("template");return s.innerHTML=t,s}}function L(t,e,s=t,i){var n,o,r,a;if(e===x)return e;let l=void 0!==i?null===(n=s._$Cl)||void 0===n?void 0:n[i]:s._$Cu;const c=f(e)?void 0:e._$litDirective$;return(null==l?void 0:l.constructor)!==c&&(null===(o=null==l?void 0:l._$AO)||void 0===o||o.call(l,!1),void 0===c?l=void 0:(l=new c(t),l._$AT(t,s,i)),void 0!==i?(null!==(r=(a=s)._$Cl)&&void 0!==r?r:a._$Cl=[])[i]=l:s._$Cu=l),void 0!==l&&(e=L(t,l._$AS(t,e.values),l,i)),e}class R{constructor(t,e){this.v=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}p(t){var e;const{el:{content:s},parts:i}=this._$AD,n=(null!==(e=null==t?void 0:t.creationScope)&&void 0!==e?e:$).importNode(s,!0);P.currentNode=n;let o=P.nextNode(),r=0,a=0,l=i[0];for(;void 0!==l;){if(r===l.index){let e;2===l.type?e=new j(o,o.nextSibling,this,t):1===l.type?e=new l.ctor(o,l.name,l.strings,this,t):6===l.type&&(e=new G(o,this,t)),this.v.push(e),l=i[++a]}r!==(null==l?void 0:l.index)&&(o=P.nextNode(),r++)}return n}m(t){let e=0;for(const s of this.v)void 0!==s&&(void 0!==s.strings?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}}class j{constructor(t,e,s,i){var n;this.type=2,this._$AH=O,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=i,this._$Cg=null===(n=null==i?void 0:i.isConnected)||void 0===n||n}get _$AU(){var t,e;return null!==(e=null===(t=this._$AM)||void 0===t?void 0:t._$AU)&&void 0!==e?e:this._$Cg}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=L(this,t,e),f(t)?t===O||null==t||""===t?(this._$AH!==O&&this._$AR(),this._$AH=O):t!==this._$AH&&t!==x&&this.$(t):void 0!==t._$litType$?this.T(t):void 0!==t.nodeType?this.S(t):(t=>{var e;return _(t)||"function"==typeof(null===(e=t)||void 0===e?void 0:e[Symbol.iterator])})(t)?this.M(t):this.$(t)}A(t,e=this._$AB){return this._$AA.parentNode.insertBefore(t,e)}S(t){this._$AH!==t&&(this._$AR(),this._$AH=this.A(t))}$(t){this._$AH!==O&&f(this._$AH)?this._$AA.nextSibling.data=t:this.S($.createTextNode(t)),this._$AH=t}T(t){var e;const{values:s,_$litType$:i}=t,n="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=I.createElement(i.h,this.options)),i);if((null===(e=this._$AH)||void 0===e?void 0:e._$AD)===n)this._$AH.m(s);else{const t=new R(n,this),e=t.p(this.options);t.m(s),this.S(e),this._$AH=t}}_$AC(t){let e=M.get(t.strings);return void 0===e&&M.set(t.strings,e=new I(t)),e}M(t){_(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let s,i=0;for(const n of t)i===e.length?e.push(s=new j(this.A(b()),this.A(b()),this,this.options)):s=e[i],s._$AI(n),i++;i<e.length&&(this._$AR(s&&s._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){var s;for(null===(s=this._$AP)||void 0===s||s.call(this,!1,!0,e);t&&t!==this._$AB;){const e=t.nextSibling;t.remove(),t=e}}setConnected(t){var e;void 0===this._$AM&&(this._$Cg=t,null===(e=this._$AP)||void 0===e||e.call(this,t))}}class H{constructor(t,e,s,i,n){this.type=1,this._$AH=O,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=n,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=O}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,e=this,s,i){const n=this.strings;let o=!1;if(void 0===n)t=L(this,t,e,0),o=!f(t)||t!==this._$AH&&t!==x,o&&(this._$AH=t);else{const i=t;let r,a;for(t=n[0],r=0;r<n.length-1;r++)a=L(this,i[s+r],e,r),a===x&&(a=this._$AH[r]),o||(o=!f(a)||a!==this._$AH[r]),a===O?t=O:t!==O&&(t+=(null!=a?a:"")+n[r+1]),this._$AH[r]=a}o&&!i&&this.k(t)}k(t){t===O?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=t?t:"")}}class B extends H{constructor(){super(...arguments),this.type=3}k(t){this.element[this.name]=t===O?void 0:t}}class D extends H{constructor(){super(...arguments),this.type=4}k(t){t&&t!==O?this.element.setAttribute(this.name,""):this.element.removeAttribute(this.name)}}class z extends H{constructor(t,e,s,i,n){super(t,e,s,i,n),this.type=5}_$AI(t,e=this){var s;if((t=null!==(s=L(this,t,e,0))&&void 0!==s?s:O)===x)return;const i=this._$AH,n=t===O&&i!==O||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,o=t!==O&&(i===O||n);n&&this.element.removeEventListener(this.name,this,i),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e,s;"function"==typeof this._$AH?this._$AH.call(null!==(s=null===(e=this.options)||void 0===e?void 0:e.host)&&void 0!==s?s:this.element,t):this._$AH.handleEvent(t)}}class G{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){L(this,t)}}const W=window.litHtmlPolyfillSupport;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var V,K;null==W||W(I,j),(null!==(p=globalThis.litHtmlVersions)&&void 0!==p?p:globalThis.litHtmlVersions=[]).push("2.0.1");class F extends d{constructor(){super(...arguments),this.renderOptions={host:this},this._$Dt=void 0}createRenderRoot(){var t,e;const s=super.createRenderRoot();return null!==(t=(e=this.renderOptions).renderBefore)&&void 0!==t||(e.renderBefore=s.firstChild),s}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Dt=((t,e,s)=>{var i,n;const o=null!==(i=null==s?void 0:s.renderBefore)&&void 0!==i?i:e;let r=o._$litPart$;if(void 0===r){const t=null!==(n=null==s?void 0:s.renderBefore)&&void 0!==n?n:null;o._$litPart$=r=new j(e.insertBefore(b(),t),t,void 0,null!=s?s:{})}return r._$AI(t),r})(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),null===(t=this._$Dt)||void 0===t||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),null===(t=this._$Dt)||void 0===t||t.setConnected(!1)}render(){return x}}F.finalized=!0,F._$litElement$=!0,null===(V=globalThis.litElementHydrateSupport)||void 0===V||V.call(globalThis,{LitElement:F});const J=globalThis.litElementPolyfillSupport;null==J||J({LitElement:F}),(null!==(K=globalThis.litElementVersions)&&void 0!==K?K:globalThis.litElementVersions=[]).push("3.0.1"),
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
console.warn("The main 'lit-element' module entrypoint is deprecated. Please update your imports to use the 'lit' package: 'lit' and 'lit/decorators.ts' or import from 'lit-element/lit-element.ts'. See https://lit.dev/msg/deprecated-import-path for more information.");var X=function t(e,s){if(e===s)return!0;if(e&&s&&"object"==typeof e&&"object"==typeof s){if(e.constructor!==s.constructor)return!1;var i,n,o;if(Array.isArray(e)){if((i=e.length)!=s.length)return!1;for(n=i;0!=n--;)if(!t(e[n],s[n]))return!1;return!0}if(e.constructor===RegExp)return e.source===s.source&&e.flags===s.flags;if(e.valueOf!==Object.prototype.valueOf)return e.valueOf()===s.valueOf();if(e.toString!==Object.prototype.toString)return e.toString()===s.toString();if((i=(o=Object.keys(e)).length)!==Object.keys(s).length)return!1;for(n=i;0!=n--;)if(!Object.prototype.hasOwnProperty.call(s,o[n]))return!1;for(n=i;0!=n--;){var r=o[n];if(!t(e[r],s[r]))return!1}return!0}return e!=e&&s!=s};class Y{constructor({apiKey:t,channel:e,client:s,id:i="__googleMapsScriptId",libraries:n=[],language:o,region:r,version:a,mapIds:l,nonce:c,retries:h=3,url:d="https://maps.googleapis.com/maps/api/js"}){if(this.CALLBACK="__googleMapsCallback",this.callbacks=[],this.done=!1,this.loading=!1,this.errors=[],this.version=a,this.apiKey=t,this.channel=e,this.client=s,this.id=i||"__googleMapsScriptId",this.libraries=n,this.language=o,this.region=r,this.mapIds=l,this.nonce=c,this.retries=h,this.url=d,Y.instance){if(!X(this.options,Y.instance.options))throw new Error(`Loader must not be called again with different options. ${JSON.stringify(this.options)} !== ${JSON.stringify(Y.instance.options)}`);return Y.instance}Y.instance=this}get options(){return{version:this.version,apiKey:this.apiKey,channel:this.channel,client:this.client,id:this.id,libraries:this.libraries,language:this.language,region:this.region,mapIds:this.mapIds,nonce:this.nonce,url:this.url}}get failed(){return this.done&&!this.loading&&this.errors.length>=this.retries+1}createUrl(){let t=this.url;return t+=`?callback=${this.CALLBACK}`,this.apiKey&&(t+=`&key=${this.apiKey}`),this.channel&&(t+=`&channel=${this.channel}`),this.client&&(t+=`&client=${this.client}`),this.libraries.length>0&&(t+=`&libraries=${this.libraries.join(",")}`),this.language&&(t+=`&language=${this.language}`),this.region&&(t+=`&region=${this.region}`),this.version&&(t+=`&v=${this.version}`),this.mapIds&&(t+=`&map_ids=${this.mapIds.join(",")}`),t}load(){return this.loadPromise()}loadPromise(){return new Promise(((t,e)=>{this.loadCallback((s=>{s?e(s.error):t(window.google)}))}))}loadCallback(t){this.callbacks.push(t),this.execute()}setScript(){if(document.getElementById(this.id))return void this.callback();const t=this.createUrl(),e=document.createElement("script");e.id=this.id,e.type="text/javascript",e.src=t,e.onerror=this.loadErrorCallback.bind(this),e.defer=!0,e.async=!0,this.nonce&&(e.nonce=this.nonce),document.head.appendChild(e)}deleteScript(){const t=document.getElementById(this.id);t&&t.remove()}reset(){this.deleteScript(),this.done=!1,this.loading=!1,this.errors=[],this.onerrorEvent=null}resetIfRetryingFailed(){this.failed&&this.reset()}loadErrorCallback(t){if(this.errors.push(t),this.errors.length<=this.retries){const t=this.errors.length*Math.pow(2,this.errors.length);console.log(`Failed to load Google Maps script, retrying in ${t} ms.`),setTimeout((()=>{this.deleteScript(),this.setScript()}),t)}else this.onerrorEvent=t,this.callback()}setCallback(){window.__googleMapsCallback=this.callback.bind(this)}callback(){this.done=!0,this.loading=!1,this.callbacks.forEach((t=>{t(this.onerrorEvent)})),this.callbacks=[]}execute(){if(this.resetIfRetryingFailed(),this.done)this.callback();else{if(window.google&&window.google.maps&&window.google.maps.version)return console.warn("Google Maps already loaded outside @googlemaps/js-api-loader.This may result in undesirable behavior as options and script parameters may not match."),void this.callback();this.loading||(this.loading=!0,this.setCallback(),this.setScript())}}}class q extends CustomEvent{constructor(t,e,s){super(t,e),this.data=s}}customElements.define("my-clock-element",class extends F{static get properties(){return{time:{type:String}}}static get styles(){return n`
      .time-text {
        font-weight: bold;
        font-size: 10px;
        font-family: monospace;
      }
    `}constructor(){super(),this.time="00:00:00"}setTime(t){this.time=t}render(){return U`
      <p class="time-text">ETA: ${this.time}</p>
      `}firstUpdated(){this.dispatchEvent(new q("place-clock",{detail:{message:"place clock event is launched"},bubbles:!0,composed:!0},{id:this.id,element:this}))}});customElements.define("my-map",class extends F{static get properties(){return{lat:{type:Number},long:{type:Number},playbackSpeed:{type:Number}}}static get styles(){return n`
      #map {
        height: 75vh;
        width: 100%;
      }
    `}constructor(){super(),this.lat=23.49471008,this.long=87.31699141,this.playbackSpeed=1,this.markers={},this.infoWindows={},this.polyLines={},this.clocks={},this.map=null,this.loader=new Y({version:"quarterly",apiKey:"AIzaSyDptyH9LN_vlCclvIyoY3Xw7NhyF4IwOTc",libraries:["geometry"]}),this.google=null,this.iconMap={BUS:"component/assets/bus_stop.png",BUS_SKIP:"component/assets/bus_stop_grey.png",SIG:"component/assets/signal.png",TUR:"component/assets/turn.png",CONG:"component/assets/congestion.png",ADH:"component/assets/adhoc_congestion.png",SIG_CONG:"component/assets/sig_cong.png",TUR_CONG:"component/assets/tur_cong.png",TUR_SIG:"component/assets/tur_sig.png",TUR_SIG_CONG:"component/assets/tur_sig_cong.png",VEH:"component/assets/bus.png"},this.busMarker=null,this.circle=null}mapTitle(t){return{BUS:"Bus Stop",BUS_SKIP:"Skipped Bus Stop",SIG:"Signal",TUR:"Turn",CONG:"Congestion",ADH:"Adhoc",SIG_CONG:"Signal + Congestion",TUR_CONG:"Turn + Congestion",TUR_SIG:"Turn + Signal",TUR_SIG_CONG:"Turn + Signal + Congestion"}[t]}connectedCallback(){super.connectedCallback(),this.addEventListener("place-marker",this.placeMarker),this.addEventListener("place-clock",this.placeClock),this.addEventListener("place-polyline",this.placePolyLine)}disconnectedCallback(){this.removeEventListener("place-marker",this.placeMarker),this.removeEventListener("place-clock",this.placeClock),this.removeEventListener("place-polyline",this.placePolyLine),super.disconnectedCallback()}render(){return U` <div id="map"></div> `}firstUpdated(){let t=this.shadowRoot.querySelector("#map");this.loader.load().then((e=>{this.google=e,this.map=new this.google.maps.Map(t,{center:new this.google.maps.LatLng(this.lat,this.long),zoom:16,mapId:"a93109cb01ed65b0",mapTypeId:this.google.maps.MapTypeId.ROADMAP}),this.plot()}))}placeMarker(t){this.markers[t.data.name]=t.data}placeClock(t){this.clocks[t.data.id]=t.data.element}placePolyLine(t){this.polyLines[t.data.name]=t.data}plot(){Object.keys(this.markers).forEach(((t,e)=>{let s=this.markers[t];this.markers[t]=new this.google.maps.Marker({title:"Bus Stop",map:this.map,position:new this.google.maps.LatLng(s.lat,s.long),icon:new this.google.maps.MarkerImage(s.icon)}),this.markers[t].eta=s.eta,this.infoWindows[t]=new this.google.maps.InfoWindow({content:this.clocks[t],position:new this.google.maps.LatLng(s.lat,s.long)}),this.markers[t].addListener("click",(()=>{this.infoWindows[t].open({map:this.map,shouldFocus:!1})}))})),Object.keys(this.polyLines).forEach((t=>{let e=this.polyLines[t].points;this.polyLines[t]=new this.google.maps.Polyline({path:[],geodesic:!0,strokeColor:"#6ca8bd",strokeOpacity:.7,strokeWeight:4,editable:!1,map:this.map}),this.busMarker=new this.google.maps.Marker({title:"Bus",map:this.map,icon:new this.google.maps.MarkerImage(this.iconMap.VEH)}),this.circle=new this.google.maps.Circle({strokeColor:"#6ca8bd",strokeOpacity:.7,strokeWeight:2,fillColor:"#6ca8bd",fillOpacity:.2,map:this.map,radius:30});let s=[],i=0;e.forEach(((t,e)=>{s.push(i),i+=t.duration})),e.forEach(((e,i)=>{setTimeout((()=>{let s=new this.google.maps.LatLng(e.lat,e.long);if(this.polyLines[t].getPath().push(s),this.circle.setCenter(s),this.busMarker.setPosition(s),this.map.panTo(s),"BUS"===e.type){let t=e.id;e.skip&&(this.markers[t].setIcon(this.iconMap.BUS_SKIP),this.markers[t].setTitle(this.mapTitle("BUS_SKIP"))),this.infoWindows[t].close();let s=parseInt(t.split("BS")[1]);Object.keys(this.infoWindows).forEach(((e,i)=>{if(i>=s)try{this.clocks[e].setTime(this.markers[t].eta[parseInt(i)])}catch(t){}}));let i=parseInt(t.split("BS")[1])+1;i<28&&this.infoWindows[`BS${i}`].open({map:this.map,shouldFocus:!1})}else"TRAIL"!==e.type&&"BUS"!==e.type&&(this.markers[t]=new this.google.maps.Marker({map:this.map,title:this.mapTitle(e.type),position:{lat:e.lat,lng:e.long},icon:new this.google.maps.MarkerImage(this.iconMap[e.type])}))}),s[i]*parseInt(1e3/this.playbackSpeed))}))}))}});customElements.define("my-marker",class extends F{static get properties(){return{name:{type:String},lat:{type:Number},long:{type:Number},eta:{type:Array},type:{type:String}}}constructor(){super(),this.lat=23.52,this.long=87.31,this.type="BUS",this.name=`${this.lat}_${this.long}`,this.eta=["test"],this.iconMap={BUS:"component/assets/bus_stop.png",SIG:"component/assets/signal.png",TUR:"component/assets/turn.png",CONG:"component/assets/congestion.png",ADH:"component/assets/adhoc_congestion.png"}}mapTypeToIcon(t){return this.iconMap[t]}firstUpdated(){this.dispatchEvent(new q("place-marker",{detail:{message:"place marker event is launched"},bubbles:!0,composed:!0},{name:this.name,lat:this.lat,long:this.long,eta:this.eta,icon:this.mapTypeToIcon(this.type)}))}render(){return O}});customElements.define("my-polyline",class extends F{static get properties(){return{name:{type:String},points:{type:Array}}}constructor(){super(),this.name="PolyLine",this.points=[{lat:23.49471008,long:87.31699141,type:"BUS"},{lat:23.49320866,long:87.31643745,type:"BUS"}]}shouldUpdate(t){return!0}updated(){this.dispatchEvent(new q("place-polyline",{detail:{message:"place ployline event is launched"},bubbles:!0,composed:!0},{name:this.name,points:this.points}))}render(){return O}});customElements.define("my-dashboard",class extends F{static get properties(){return{playbackSpeed:{type:Number},gt_data:{type:Array},polyline_data:{type:Array}}}constructor(){super(),this.gt_data=null,this.polyline_data=null,this.playbackSpeed=1}render(){return U`
      <div>
        <my-map .playbackSpeed=${this.playbackSpeed}>
          ${this.gt_data.map(((t,e)=>U`<my-marker
                name=${t.id}
                lat=${t.lat}
                long=${t.long}
                .eta=${t.ETA}
                type="BUS"
              ></my-marker>
              <my-clock-element id="${t.id}"></my-clock-element>`))}

          <my-polyline name="route" .points=${this.polyline_data}></my-polyline>
        </my-map>
      </div>
    `}});customElements.define("my-player",class extends F{static get properties(){return{playbackSpeed:{type:Number},gt_data:{type:Array},polyline_data:{type:Array},content:{type:Boolean}}}static get styles(){return n`
      .no-padding {
        padding: 12px 0 12px 0px;
      }

      .no-margin {
        margin: 0;
      }

      .bg-lightgray {
        background-color: lightgray;
      }

      .text {
        font-family: monospace;
        font-weight: bold;
        font-size: 16px;
      }

      .form-check-input:checked {
        background-color: #565555;
        border-color: #565555;
      }

      .back-btn {
        max-width:50%;
      }
    `}constructor(){super(),this.gt_data=null,this.polyline_data=null,this.playbackSpeed=50,this.content=!0,this.speedControlSettings={"1x":1,"2x":20,"5x":50,"10x":100,"20x":200}}renderDashboard(){return U`${this.gt_data&&this.polyline_data?U`<my-dashboard
          playbackSpeed=${this.playbackSpeed}
          .gt_data=${this.gt_data}
          .polyline_data=${this.polyline_data}
        ></my-dashboard>`:U`<my-dashboard
          playbackSpeed=${this.playbackSpeed}
        ></my-dashboard>`}`}render(){return U` <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"
        rel="stylesheet"
        integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC"
        crossorigin="anonymous"
      />
      <script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM"
        crossorigin="anonymous"
      ></script>
      <div class="no-padding no-margin bg-lightgray text">
        <nav class="nav">
          <a class="ms-3 mt-2" href=""><img class="back-btn" src="component/assets/previous.png"/></a>
          <div class="mt-3 ms-3">
            ${Object.keys(this.speedControlSettings).map(((t,e)=>2===e?U`<div class="form-check form-check-inline">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="inlineRadioOptions"
                      id="inlineRadio${e}"
                      value="${this.speedControlSettings[t]}"
                      checked
                      @click=${this.setPlaybackSpeed}
                    />
                    <label class="form-check-label" for="inlineRadio${e}"
                      >${t}</label
                    >
                  </div>`:U`<div class="form-check form-check-inline">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="inlineRadioOptions"
                      id="inlineRadio${e}"
                      value="${this.speedControlSettings[t]}"
                      @click=${this.setPlaybackSpeed}
                    />
                    <label class="form-check-label" for="inlineRadio${e}"
                      >${t}</label
                    >
                  </div>`))}
          </div>

          <button
            type="button"
            class="btn btn-dark ms-auto me-3"
            @click=${this.reload}
          >
            Update
          </button>
        </nav>
      </div>
      ${this.content?this.renderDashboard():O}`}setPlaybackSpeed(t){this.playbackSpeed=t.target.value,console.log("playbackspeed",this.playbackSpeed)}reload(){this.content=!1,this.requestUpdate(),this.updateComplete.then((()=>{this.content=!0}))}});customElements.define("my-app",class extends F{static get properties(){return{dirStructure:{type:Object},selectedTrail:{type:String},playerData:{type:Object}}}constructor(){super(),this.dirStructure=null,this.selectedTrail=null,this.playerData=null}static get styles(){return n``}render(){return U`<link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"
        rel="stylesheet"
        integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC"
        crossorigin="anonymous"
      />
      <script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM"
        crossorigin="anonymous"
      ></script>

      <div class="container">
        <div class="row justify-content-center">
          ${this.playerData?this.renderPlayer():this.renderTrailOptionForm()}
        </div>
        <!-- row end -->
      </div>
      <!-- contianer end -->`}legendTemplate(){return U`
      <div class="row justify-content-center fst-italic mt-2">
        <div class="col text-center">
          <img src="component/assets/bus_stop.png" /><span class="ms-1 me-4">Bus-Stop</span>
          <img src="component/assets/bus_stop_grey.png" /><span class="ms-1 me-4"
            >Skipped Bus-Stop</span
          >
          <img src="component/assets/signal.png" /><span class="ms-1 me-4">Signal</span>
          <img src="component/assets/turn.png" /><span class="ms-1 me-4">Turn</span>
          <img src="component/assets/adhoc_congestion.png" /><span class="ms-1 me-4">Ad-hoc</span>
          <img src="component/assets/congestion.png" /><span class="ms-1 me-4">Congestion</span>
        </div>
      </div>
    `}renderPlayer(){return U`<div class="col" style="width: 70%">
        <div class="card shadow rounded-3">
          <div class="card-body p-0">
            <div class="row justify-content-center">
              <my-player
                .gt_data=${this.playerData.gt}
                .polyline_data=${this.playerData.route}
                content="true"
                .playbackSpeed="5"
              ></my-player>
            </div>
            <!-- card body row end -->
          </div>
          <!-- card body end -->
        </div>
        <!-- card end -->

        <div class="row m-3">
          <div class="row justify-content-center">${this.legendTemplate()}</div>
          <!-- row justify end -->
        </div>
        <!-- row m-3 end -->
      </div>
      <!-- col end -->`}renderTrailOptionForm(){return U`<div class="col-6 mt-5">
        <div class="card shadow rounded-3">
          <div class="card-body">
            <h4 class="card-title">Choose a trail to continue:</h4>
            <div class="row justify-content-center">
              <div style="width:max-content">
                ${this.dirStructure?Object.keys(this.dirStructure).map(((t,e)=>U`<div class="form-check">
                        ${0==e?U`<input
                                class="form-check-input"
                                type="radio"
                                name="trailOptions"
                                id="trailOption${e}"
                                value="${this.dirStructure[t]}"
                                checked
                                @click=${this.setTrail}
                              />
                              <label
                                class="form-check-label"
                                for="trailOption${e}"
                                >${t.replace("_"," ")}</label
                              >`:U`<input
                                class="form-check-input"
                                type="radio"
                                name="trailOptions"
                                id="trailOption${e}"
                                value="${this.dirStructure[t]}"
                                @click=${this.setTrail}
                              />
                              <label
                                class="form-check-label"
                                for="trailOption${e}"
                                >${t.replace("_"," ")}</label
                              >`}
                      </div>`)):O}

                <button
                  type="button"
                  class="btn btn-dark ms-auto me-3"
                  @click=${this.submitTrail}
                >
                  Submit
                </button>
              </div>
              <!-- input form end -->
            </div>
            <!-- card row end -->
          </div>
          <!-- card body end -->
        </div>
        <!-- card end -->
      </div>
      <!-- col end -->`}setTrail(t){this.selectedTrail=t.target.value}submitTrail(){fetch(this.selectedTrail).then((t=>{if(console.log(t),200===t.status)return t.json();console.error(t.status,t.statusText)})).then((t=>{console.log(t),this.playerData=t})).catch((t=>{console.log(t)}))}firstUpdated(){fetch("./component/assets/structure.json").then((t=>{if(200===t.status)return console.log(200===t.status),t.json()})).then((t=>{this.dirStructure=t,this.selectedTrail=Object.values(t)[0]})).catch((()=>console.log("error")))}});
