(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{15:function(e,t,a){e.exports=a(35)},20:function(e,t,a){},26:function(e,t,a){},29:function(e,t,a){},31:function(e,t,a){},33:function(e,t,a){},35:function(e,t,a){"use strict";a.r(t);var n=a(0),o=a.n(n),l=a(6),i=a.n(l),r=(a(20),a(1)),c=a(2),s=a(4),u=a(3),m=a(5),h=a(12),d=a.n(h),g=(a(26),a(13)),f=a.n(g),b=a(14),p=(a(29),function(e){function t(){var e;return Object(r.a)(this,t),(e=Object(s.a)(this,Object(u.a)(t).call(this))).state={someKey:"someValue"},e}return Object(m.a)(t,e),Object(c.a)(t,[{key:"componentDidMount",value:function(){this.setState({someKey:"otherValue"})}},{key:"render",value:function(){var e=this.props,t=e.alt,a=Object(b.a)(e,["alt"]);return o.a.createElement("img",Object.assign({className:"img-cord",alt:t},a))}}]),t}(o.a.Component)),v=(a(31),function(e){function t(){var e;return Object(r.a)(this,t),(e=Object(s.a)(this,Object(u.a)(t).call(this))).handleToggleColors=function(){e.setState({isShowColors:!e.state.isShowColors})},e.state={isShowColors:!1},e}return Object(m.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){var e=this.props,t=e.colors,a=e.handleSelectColor,n=this.state.isShowColors;return o.a.createElement("div",{className:"tool-button"},o.a.createElement("div",{className:"tool-button-colors",style:{width:n?1.5*t.length+"rem":"0",opacity:n?"1":"0"}},t.map(function(e){return o.a.createElement("div",{key:e.color,className:"tool-button-color",style:{background:e.color},title:e.title,onClick:function(){a(e.color)}})})),o.a.createElement("div",{className:"tool-button-icon",onClick:this.handleToggleColors}))}}]),t}(o.a.Component));v.defaultProps={colors:[{color:"#282c34",title:"\u9ed1\u591c"},{color:"#aaa",title:"\u767d\u663c"},{color:"#c1e6f7",title:"\u6de1\u84dd\u4e4b\u5149"},{color:"#ffc9c9",title:"\u7c89\u7ea2\u8bf1\u60d1"},{color:"#f7a374",title:"\u6d3b\u529b\u6a59\u8272"}],handleSelectColor:function(){}};var C=v,w=function(e){function t(e){var a;return Object(r.a)(this,t),(a=Object(s.a)(this,Object(u.a)(t).call(this,e))).el=document.createElement("div"),a}return Object(m.a)(t,e),Object(c.a)(t,[{key:"componentDidMount",value:function(){this.modalRoot=document.body,this.modalRoot.appendChild(this.el)}},{key:"componentWillUnmount",value:function(){this.modalRoot.removeChild(this.el)}},{key:"render",value:function(){return i.a.createPortal(this.props.children,this.el)}}]),t}(o.a.Component),y=(a(33),function(e){function t(){var e;return Object(r.a)(this,t),(e=Object(s.a)(this,Object(u.a)(t).call(this))).warpBGBlur=function(e){var t=document.querySelector(".App-header");e?t.classList.add("blur"):t.classList.remove("blur")},e.state={},e}return Object(m.a)(t,e),Object(c.a)(t,[{key:"componentDidMount",value:function(){var e=this.props.isShow;this.warpBGBlur(e)}},{key:"componentWillReceiveProps",value:function(e){this.warpBGBlur(e.isShow)}},{key:"render",value:function(){var e=this.props,t=e.isShow,a=e.onClose,n=e.imgInfo;return n=n||{},o.a.createElement(w,null,o.a.createElement("div",{style:{display:t?"block":"none"}},o.a.createElement("div",{className:"modal-backdrop"},o.a.createElement("div",{className:"modal-img",onClick:function(e){e.preventDefault()}},o.a.createElement("img",{src:n.thumbUrl,aLT:"\u56fe\u7247\u52a0\u8f7d\u5931\u8d25",title:n.title}),o.a.createElement("div",{className:"modal-close-btn",onClick:a})))))}}]),t}(o.a.Component));y.defaultProps={isShow:!1,onClose:function(){},imgInfo:{}};var k=y,j=function(e){function t(e){var a;return Object(r.a)(this,t),(a=Object(s.a)(this,Object(u.a)(t).call(this,e))).getURL=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return f()(a.baseURL).query({query:e.word,mode:1,start:e.currentPage,reqType:"ajax",reqFrom:"result",tn:0}).toString()},a.fetchData=function(){d()(a.getURL({word:a.word,pageNumber:a.pageNumber,currentPage:a.currentPage}),{},function(e,t){console.log(t);var n=t.items||[];0===n.length?a.currentPage=0:a.currentPage+=n.length,a.allImgDatas=a.allImgDatas.concat(n)})},a.handleDeleteImg=function(e){a.cacheImgDatas.push(e)},a.handleSelectColor=function(e){a.setState({bgColor:e},function(){window.localStorage.setItem("bgColor",e)})},a.handleImgClick=function(e){a.setState({isShow:!0,imgInfo:e})},a.handleModalClose=function(){a.setState({isShow:!1})},a.state={imgDatas:[],bgColor:window.localStorage.getItem("bgColor"),isShow:!1,imgInfo:null},a.baseURL="https://pic.sogou.com/pics",a.pageNumber=50,a.currentPage=0,a.word="\u7f8e\u5973",a.timer=null,a.allImgDatas=[],a.minContainerNumber=10,a.maxCacheNumber=20,a.cacheImgDatas=[],a}return Object(m.a)(t,e),Object(c.a)(t,[{key:"componentDidMount",value:function(){this.fetchData(),this.startTimeTic()}},{key:"startTimeTic",value:function(){var e=this;this.timer=setInterval(function(){e.setState(function(t){if(e.allImgDatas.length<=e.minContainerNumber&&e.fetchData(),e.allImgDatas.length>0){var a=e.allImgDatas.splice(0,1)[0];a.left=Math.random()*(document.body.clientWidth-Number(a.thumb_width||a.width)),a.delayTime=3*Math.random(),a.durationTime=5*Math.random()+3,t.imgDatas.push(a)}return e.cacheImgDatas.length>e.maxCacheNumber&&(t.imgDatas=t.imgDatas.filter(function(t){return!~e.cacheImgDatas.indexOf(t)}),e.cacheImgDatas=[]),t})},1500)}},{key:"componentWillUnmount",value:function(){clearInterval(this.timer)}},{key:"render",value:function(){var e=this,t=this.state,a=t.bgColor,n=t.isShow,l=t.imgInfo;return o.a.createElement("div",{className:"App",style:{backgroundColor:a}},o.a.createElement("header",{className:"App-header"},o.a.createElement("div",{className:"center"},o.a.createElement("div",{className:"dialogue-text hinge"},"\u4e00\u5927\u6ce2\u7f8e\u5973\u6b63\u5728\u9760\u8fd1")),o.a.createElement(C,{handleSelectColor:this.handleSelectColor}),this.state.imgDatas.map(function(t){var a=t.thumbUrl||t.pic_url;if(!a)return null;var n=t.thumb_height||t.height;return o.a.createElement(p,{key:a,src:a,alt:t.alt,title:t.title,style:{top:-n,left:t.left+"px",animationDelay:t.delayTime+"s",animationDuration:t.durationTime+"s"},onAnimationEnd:e.handleDeleteImg.bind(e,t),onClick:e.handleImgClick.bind(e,t)})})),o.a.createElement(k,{isShow:n,imgInfo:l,onClose:this.handleModalClose}))}}]),t}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(o.a.createElement(j,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[15,2,1]]]);
//# sourceMappingURL=main.91b0bb7f.chunk.js.map