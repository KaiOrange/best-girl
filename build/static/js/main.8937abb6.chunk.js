(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{17:function(e,t,n){e.exports=n(37)},22:function(e,t,n){},28:function(e,t,n){},31:function(e,t,n){},33:function(e,t,n){},35:function(e,t,n){},37:function(e,t,n){"use strict";n.r(t);var o=n(0),a=n.n(o),i=n(7),r=n.n(i),l=(n(22),n(1)),s=n(2),c=n(4),d=n(3),u=n(5),m=n(6),h=n(14),f=n.n(h),g=(n(28),n(15)),b=n.n(g),v=n(16),w=(n(31),function(e){function t(){var e;return Object(l.a)(this,t),(e=Object(c.a)(this,Object(d.a)(t).call(this))).state={someKey:"someValue"},e}return Object(u.a)(t,e),Object(s.a)(t,[{key:"componentDidMount",value:function(){this.setState({someKey:"otherValue"})}},{key:"render",value:function(){var e=this.props,t=e.alt,n=e.className,o=Object(v.a)(e,["alt","className"]);return a.a.createElement("img",Object.assign({className:"img-cord "+n,alt:t},o))}}]),t}(a.a.Component));w.defaultProps={className:""};var p=w,y=(n(33),function(e){function t(){var e;return Object(l.a)(this,t),(e=Object(c.a)(this,Object(d.a)(t).call(this))).handleToggleColors=function(){e.setState({isShowColors:!e.state.isShowColors})},e.state={isShowColors:!1},e}return Object(u.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){var e=this.props,t=e.colors,n=e.handleSelectColor,o=this.state.isShowColors;return a.a.createElement("div",{className:"tool-button"},a.a.createElement("div",{className:"tool-button-colors",style:{width:o?1.5*t.length+"rem":"0",opacity:o?"1":"0"}},t.map(function(e){return a.a.createElement("div",{key:e.color,className:"tool-button-color",style:{background:e.color},title:e.title,onClick:function(){n(e)}})})),a.a.createElement("div",{className:"tool-button-icon",onClick:this.handleToggleColors}))}}]),t}(a.a.Component));y.defaultProps={colors:[],handleSelectColor:function(){}};var C=y,k=function(e){function t(e){var n;return Object(l.a)(this,t),(n=Object(c.a)(this,Object(d.a)(t).call(this,e))).el=document.createElement("div"),n}return Object(u.a)(t,e),Object(s.a)(t,[{key:"componentDidMount",value:function(){this.modalRoot=document.body,this.modalRoot.appendChild(this.el)}},{key:"componentWillUnmount",value:function(){this.modalRoot.removeChild(this.el)}},{key:"render",value:function(){return r.a.createPortal(this.props.children,this.el)}}]),t}(a.a.Component),D=(n(35),function(e){function t(){var e;return Object(l.a)(this,t),(e=Object(c.a)(this,Object(d.a)(t).call(this))).warpBGBlur=function(e){var t=document.querySelector(".App-header");e?t.classList.add("blur"):t.classList.remove("blur")},e.state={},e}return Object(u.a)(t,e),Object(s.a)(t,[{key:"componentDidMount",value:function(){var e=this.props.isShow;this.warpBGBlur(e)}},{key:"componentWillReceiveProps",value:function(e){e.isShow!==this.props.isShow&&this.warpBGBlur(e.isShow)}},{key:"render",value:function(){var e=this.props,t=e.isShow,n=e.onClose,o=e.imgInfo;return o=o||{},a.a.createElement(k,null,a.a.createElement("div",{style:{display:t?"block":"none"}},a.a.createElement("div",{className:"modal-backdrop"},a.a.createElement("div",{className:"modal-img",onClick:function(e){e.preventDefault()}},a.a.createElement("img",{src:o.thumbUrl,alt:"\u56fe\u7247\u52a0\u8f7d\u5931\u8d25",title:o.title}),a.a.createElement("div",{className:"modal-close-btn",onClick:n})))))}}]),t}(a.a.Component));D.defaultProps={isShow:!1,onClose:function(){},imgInfo:{}};var O=D,j=n(8),S=function(e){function t(e){var n;Object(l.a)(this,t),(n=Object(c.a)(this,Object(d.a)(t).call(this,e))).getURL=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return b()(n.baseURL).query({query:e.word,mode:1,start:e.currentPage,reqType:"ajax",reqFrom:"result",tn:0}).toString()},n.fetchData=function(){f()(n.getURL({word:n.word,pageNumber:n.pageNumber,currentPage:n.currentPage}),{},function(e,t){var o=t.items||[];0===o.length?n.currentPage=0:n.currentPage+=o.length,n.allImgDatas=n.allImgDatas.concat(o)})},n.setClientWidth=function(){n.clientWidth=document.body.clientWidth},n.setDocumentIsHidden=function(){n.setState({isDocumentHidden:document[n.hiddenNamesObj.hidden]})},n.initConsoleKeywords=function(){var e=Object(m.a)(Object(m.a)(n));console.log('\u795d\u8d3a\u4f60\u559c\u63d0\u5f69\u86cb~\n\u4f60\u53ef\u4ee5\u5728\u8fd9\u91cc\u8bbe\u7f6e\u641c\u7d22\u56fe\u7247\u7684\u5173\u952e\u5b57\uff0c\u53e3\u4ee4\u5982\u4e0b\uff1a\nkeywords="\u7f8e\u5973"'),Object.defineProperty(window,"keywords",{get:function(){return e.word},set:function(t){"string"!==typeof t?console.warn("\u522b\u5ffd\u60a0\u6211\uff0c\u5173\u952e\u5b57\u5fc5\u987b\u662f\u5b57\u7b26\u4e32\uff01~~~~(>_<)~~~~ "):t?(console.info("\u5173\u952e\u5b57\u8bbe\u7f6e\u6210\u529f! O(\u2229_\u2229)O\u54c8\u54c8~"),e.resetKeywords.call(e,t)):console.warn("\u81f3\u5c11\u5199\u51e0\u4e2a\u5173\u952e\u5b57\u5427\uff01(\uff5e o \uff5e)~zZ")}})},n.handleDeleteImg=function(e){n.cacheImgDatas.push(e)},n.handleSelectColor=function(e){n.state.bgColor!==e.color&&n.setState(function(t){return t.bgColor=e.color,t},function(){n.resetKeywords(e.keywords),window.localStorage.setItem("bgColor",e.color)})},n.handleImgClick=function(e){n.setState({isShow:!0,imgInfo:e})},n.handleModalClose=function(){n.setState({isShow:!1})};var o=window.localStorage.getItem("bgColor");if(n.state={imgDatas:[],bgColor:o,isShow:!1,imgInfo:null,isDocumentHidden:!1},n.word="\u7f8e\u5973",o){var a=j.findIndex(function(e){return e.color===o});a>-1&&(n.word=j[a].keywords||n.word)}return n.baseURL="https://pic.sogou.com/pics",n.pageNumber=50,n.currentPage=0,n.timer=null,n.allImgDatas=[],n.minContainerNumber=10,n.maxCacheNumber=20,n.cacheImgDatas=[],n.clientWidth=980,n.hiddenNamesObj=n.getHiddenName(),n}return Object(u.a)(t,e),Object(s.a)(t,[{key:"componentDidMount",value:function(){document.addEventListener(this.hiddenNamesObj.visibilityChange,this.setDocumentIsHidden),this.setClientWidth(),this.fetchData(),this.startTimeTic(),window.addEventListener("resize",this.setClientWidth),this.initConsoleKeywords()}},{key:"componentWillUnmount",value:function(){document.removeEventListener(this.hiddenNamesObj.visibilityChange,this.setDocumentIsHidden),clearInterval(this.timer),window.removeEventListener("resize",this.setClientWidth)}},{key:"resetKeywords",value:function(e){this.allImgDatas=[],this.currentPage=0,this.word=e}},{key:"getHiddenName",value:function(){var e,t;return"undefined"!==typeof document.hidden?(e="hidden",t="visibilitychange"):"undefined"!==typeof document.mozHidden?(e="mozHidden",t="mozvisibilitychange"):"undefined"!==typeof document.msHidden?(e="msHidden",t="msvisibilitychange"):"undefined"!==typeof document.webkitHidden&&(e="webkitHidden",t="webkitvisibilitychange"),{hidden:e,visibilityChange:t}}},{key:"startTimeTic",value:function(){var e=this;this.timer=setInterval(function(){e.state.isDocumentHidden||e.setState(function(t){if(e.allImgDatas.length<=e.minContainerNumber&&e.fetchData(),e.allImgDatas.length>0){var n=e.allImgDatas.splice(0,1)[0],o=Math.min(Number(n.thumb_width||n.width),35*e.clientWidth/100);n.left=Math.random()*(e.clientWidth-o),n.delayTime=1*Math.random(),n.durationTime=5*Math.random()+3,t.imgDatas.push(n)}return e.cacheImgDatas.length>e.maxCacheNumber&&(t.imgDatas=t.imgDatas.filter(function(t){return!~e.cacheImgDatas.indexOf(t)}),e.cacheImgDatas=[]),t})},1e3)}},{key:"render",value:function(){var e=this,t=this.state,n=t.bgColor,o=t.isShow,i=t.imgInfo,r=t.isDocumentHidden?"paused":"running";return a.a.createElement("div",{className:"App",style:{backgroundColor:n}},a.a.createElement("header",{className:"App-header"},a.a.createElement("div",{className:"center"},a.a.createElement("div",{className:"dialogue-text hinge",style:{animationDelay:".8s"}},"\u4e00\u5927\u6ce2\u7f8e\u5973\u6b63\u5728\u9760\u8fd1")),a.a.createElement(C,{handleSelectColor:this.handleSelectColor,colors:j}),this.state.imgDatas.map(function(t){var n=t.thumbUrl||t.pic_url;if(!n)return null;var o=t.thumb_height||t.height;return a.a.createElement(p,{key:n,src:n,alt:t.alt,title:t.title,style:{top:-o,left:t.left+"px",animationDelay:t.delayTime+"s",animationDuration:t.durationTime+"s",animationPlayState:r},onAnimationEnd:e.handleDeleteImg.bind(e,t),onClick:e.handleImgClick.bind(e,t)})})),a.a.createElement(O,{isShow:o,imgInfo:i,onClose:this.handleModalClose}))}}]),t}(o.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));r.a.render(a.a.createElement(S,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})},8:function(e){e.exports=[{color:"#282c34",title:"\u9ed1\u591c",keywords:"\u7f8e\u5973 \u5973\u795e"},{color:"#aaa",title:"\u767d\u663c",keywords:"\u7f8e\u5973 \u6587\u827a"},{color:"#c1e6f7",title:"\u6de1\u84dd\u4e4b\u5149",keywords:"\u7f8e\u5973 \u98ce\u60c5"},{color:"#ffc9c9",title:"\u7c89\u7ea2\u8bf1\u60d1",keywords:"\u7f8e\u5973 \u53ef\u7231"},{color:"#f7a374",title:"\u6d3b\u529b\u6a59\u8272",keywords:"\u7f8e\u5973 \u751c\u7f8e"},{color:"antiquewhite",title:"\u51b7\u8273\u9ea6\u8272",keywords:"\u7f8e\u5973 \u6027\u611f"},{color:"#C7EDCC",title:"\u6e05\u7eaf\u4e4b\u7eff",keywords:"\u7f8e\u5973 \u6e05\u7eaf"}]}},[[17,2,1]]]);
//# sourceMappingURL=main.8937abb6.chunk.js.map