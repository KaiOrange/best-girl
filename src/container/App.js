import React, { Component } from 'react';
import jsonp from 'jsonp';
import './App.css';
import URI from 'urijs';
import ImgCord from '../component/ImgCord';
import ToolButton from '../component/ToolButton';
import DesktopButton from '../component/DesktopButton';
import ImageModal from '../component/ImageModal';
import COLORS from './colors.json';

class App extends Component {
    constructor(props) {
        super(props);
        let bgColor = window.localStorage.getItem("bgColor");
        this.state = {
            imgDatas: [],
            bgColor:bgColor,
            isShow:false,
            imgInfo:null,
            isDocumentHidden:false//文档是否隐藏
        };
        this.word = "美女";
        this.colorIndex = 0;
        if (bgColor) {
            let colorIndex = COLORS.findIndex((item)=>{
                return item.color === bgColor;
            })
            if(colorIndex > -1){
                this.colorIndex = colorIndex;
                this.word = COLORS[colorIndex].keywords || this.word;
            }
        }
        this.baseURL = "https://pic.sogou.com/pics";
        this.pageNumber = 20;
        // 每种颜色对应一个当前页面 +1是因为最后一个是菜单模式
        this.currentPages = new Array(COLORS.length + 1).fill(0);
        this.timer = null;//定时器
        // 所有的图片信息
        // 每种颜色对应一个数组 +1是因为最后一个是菜单模式
        this.allImgDatas = new Array(COLORS.length + 1).fill([]);
        this.minContainerNumber = 5;//最小容量
        this.maxCacheNumber = 10;//最大缓存容量
        this.maxQueueNumber = this.maxCacheNumber + 5;//最大队列容量
        this.cacheImgDatas = [];//需要删除掉的图片信息
        this.clientWidth = 980;//浏览器的宽度
        this.hiddenNamesObj = this.getHiddenName();
    }
    getURL = (obj={})=>{
        return URI(this.baseURL).query({
            query:obj.word,
            mode:1,
            start:obj.currentPage,
            reqType:"ajax",
            reqFrom:"result",
            tn:0,
        }).toString();
    }
    fetchData = ()=>{
        jsonp(this.getURL({
                word:this.word,
                pageNumber:this.pageNumber,
                currentPage:this.currentPages[this.colorIndex]
            }), {},(err, data)=>{
                var newImgDatas = data.items||[];
                if (newImgDatas.length === 0) {
                    this.currentPages[this.colorIndex] = 0;
                } else {
                    this.currentPages[this.colorIndex] += newImgDatas.length;
                }
                //只是把图片信息放在所有信息容器里面
                this.allImgDatas[this.colorIndex] = this.allImgDatas[this.colorIndex].concat(newImgDatas)
        });
    }

    setClientWidth = ()=>{
        this.clientWidth = document.body.clientWidth;
    }

    setDocumentIsHidden = ()=>{
        this.setState({
            isDocumentHidden:document[this.hiddenNamesObj.hidden]
        });
    }
    
    componentDidMount() {
        document.addEventListener(this.hiddenNamesObj.visibilityChange, this.setDocumentIsHidden);
        this.setClientWidth();
        //首先进来请求一下数据
        this.fetchData();
        //然后设置定时器
        this.startTimeTic();
        window.addEventListener("resize",this.setClientWidth);
        this.initConsoleKeywords()
    }

    componentWillUnmount() {
        document.removeEventListener(this.hiddenNamesObj.visibilityChange, this.setDocumentIsHidden);
        clearInterval(this.timer);
        window.removeEventListener("resize",this.setClientWidth);
    }

    initConsoleKeywords=()=>{
        let that = this;
        console.log("祝贺你喜提彩蛋~\n你可以在这里设置搜索图片的关键字，口令如下：\nkeywords=\"美女\"");
        Object.defineProperty(window,"keywords",{
            get:function (){
                return that.word;    
            },
            set:function (value){
                if (typeof value !== "string") {
                    console.warn("别忽悠我，关键字必须是字符串！~~~~(>_<)~~~~ ")
                } else if(!value){
                    console.warn("至少写几个关键字吧！(～ o ～)~zZ")
                } else {
                    console.info("关键字设置成功! O(∩_∩)O哈哈~")
                    that.resetKeywords.call(that,value)
                }
            }
        });
    }

    resetKeywords(keywords,colorIndex){
        if (typeof colorIndex === "undefined") {
            // 彩蛋模式 重新从第0页开始查询
            this.colorIndex = this.allImgDatas.length - 1;
            this.currentPages[this.colorIndex] = 0;
            this.allImgDatas[this.colorIndex] = [];
        } else {
            this.colorIndex = colorIndex;
        }
        
        this.word = keywords;
        this.setState(old=>{
            old.imgDatas = old.imgDatas.filter((item)=>{
                return !~this.cacheImgDatas.indexOf(item);
            })
            this.cacheImgDatas = [];
        })
    }

    getHiddenName(){
        var hidden, visibilityChange;
        if (typeof document.hidden !== "undefined") {
            hidden = "hidden";
            visibilityChange = "visibilitychange";
        } else if (typeof document.mozHidden !== "undefined") {
            hidden = "mozHidden";
            visibilityChange = "mozvisibilitychange";
        } else if (typeof document.msHidden !== "undefined") {
            hidden = "msHidden";
            visibilityChange = "msvisibilitychange";
        } else if (typeof document.webkitHidden !== "undefined") {
            hidden = "webkitHidden";
            visibilityChange = "webkitvisibilitychange";
        }
        return {
            hidden,
            visibilityChange
        }
    }

    startTimeTic(){
        this.timer = setInterval(() => {
            if (this.state.isDocumentHidden) {//如果界面隐藏了 那么直接跳过
                return ;
            }
            this.setState((old)=>{
                if (this.allImgDatas[this.colorIndex].length <= this.minContainerNumber) {
                    this.fetchData();
                }
                if (this.allImgDatas[this.colorIndex].length > 0 && old.imgDatas.length <= this.maxQueueNumber) {
                    let currentImg = this.allImgDatas[this.colorIndex].splice(0,1)[0];
                    let imgWidth = Math.min(Number(currentImg.thumb_width||currentImg.width),this.clientWidth * 35 / 100);
                    currentImg.left = Math.random() * (this.clientWidth - imgWidth);
                    currentImg.delayTime = Math.random() * 1;
                    currentImg.durationTime = Math.random() * 5 + 3;
                    old.imgDatas.push(currentImg);//每次拿最前面的一个
                }
                //清空缓存数据
                if (this.cacheImgDatas.length > this.maxCacheNumber) {
                    old.imgDatas = old.imgDatas.filter((item)=>{
                        return !~this.cacheImgDatas.indexOf(item);
                    })
                    this.cacheImgDatas = [];
                }
                return old;
            })
        }, 1000);
    }

    handleDeleteImg = (item)=>{
        //放入要删除的缓存中
        this.cacheImgDatas.push(item)
    }

    handleSelectColor = (item,index)=>{
        if (this.state.bgColor !== item.color) {
            this.setState(old=>{
                old.bgColor = item.color;
                return old;
            },()=>{
                //重新设置关键字
                this.resetKeywords(item.keywords,index)
                window.localStorage.setItem("bgColor",item.color)
            });
        }
    }

    handleImgClick = (item)=>{
        this.setState({
            isShow:true,
            imgInfo:item
        });
    }

    handleModalClose = ()=>{
        this.setState({
            isShow:false,
        });
    }

    render() {
        let {bgColor,isShow,imgInfo,isDocumentHidden} = this.state;
        let animationPlayState = isDocumentHidden?"paused":"running";
        return (
        <div className="App" style={{backgroundColor:bgColor}}>
            <header className="App-header" >
                <div className="center">
                    <div className="dialogue-text hinge" style={{animationDelay: ".8s"}}>一大波美女正在靠近</div>
                </div>
                <ToolButton handleSelectColor={this.handleSelectColor} colors={COLORS}/>
                <DesktopButton />
                {this.state.imgDatas.map((item)=>{
                    let src = item.thumbUrl || item.pic_url;
                    if (!src) {
                        return null;
                    }
                    let top = item.height || item.thumb_height;
                    return (
                        <ImgCord 
                            key={src} 
                            src={src} 
                            alt={item.alt} 
                            title={item.title} 
                            style={{
                                top:-top,
                                left:item.left+"px",
                                animationDelay: item.delayTime+"s",
                                animationDuration:item.durationTime+"s",
                                animationPlayState:animationPlayState
                            }}
                            onAnimationEnd={this.handleDeleteImg.bind(this,item)}
                            onClick={this.handleImgClick.bind(this,item)}
                            />
                    )
                })}
            </header>
            <ImageModal isShow={isShow} imgInfo={imgInfo} onClose={this.handleModalClose}/>
        </div>
        );
    }
}

export default App;
