import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import URI from 'urijs';
import ImgCord from '../component/ImgCord';
import ToolButton from '../component/ToolButton';
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
        if (bgColor) {
            let colorIndex = COLORS.findIndex((item)=>{
                return item.color === bgColor;
            })
            if(colorIndex > -1){
                this.word = COLORS[colorIndex].keywords || this.word;
            }
        }
        this.baseURL = "/api/sogou-api";
        this.pageNumber = 48;
        this.currentPage = 0;
        this.timer = null;//定时器
        this.allImgDatas = [];//所有的图片信息
        this.minContainerNumber = 10;//最小容量
        this.maxCacheNumber = 20;//最大缓存容量
        this.cacheImgDatas = [];//需要删除掉的图片信息
        this.clientWidth = 980;//浏览器的宽度
        this.hiddenNamesObj = this.getHiddenName();
    }
    getURL = (obj={})=>{
        return URI(this.baseURL).query({
            mode: 1,
            xml_len: obj.pageNumber,
            start: obj.currentPage,
            query: obj.word,
        }).toString();
    }
    fetchData = ()=>{
        axios(this.getURL({word:this.word,pageNumber:this.pageNumber,currentPage:this.currentPage})).then(res => {
          var newImgDatas = res.data.data.items||[];
          if (newImgDatas.length === 0) {
              this.currentPage = 0;
          } else {
              this.currentPage += newImgDatas.length;
          }
          //只是把图片信息放在所有信息容器里面
          this.allImgDatas = this.allImgDatas.concat(newImgDatas);
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

    resetKeywords(keywords){
        this.allImgDatas = [];
        this.currentPage = 0;
        this.word = keywords;
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
                if (this.allImgDatas.length <= this.minContainerNumber) {
                    this.fetchData();
                }
                if (this.allImgDatas.length > 0) {
                    let currentImg = this.allImgDatas.splice(0,1)[0];
                    let imgWidth = Math.min(Number(currentImg.thumbWidth||currentImg.width),this.clientWidth * 35 / 100);
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

    handleSelectColor = (item)=>{
        if (this.state.bgColor !== item.color) {
            this.setState(old=>{
                old.bgColor = item.color;
                return old;
            },()=>{
                //重新设置关键字
                this.resetKeywords(item.keywords)
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
                {this.state.imgDatas.map((item)=>{
                    let src = item.thumbUrl || item.picUrl;
                    if (!src) {
                        return null;
                    }
                    let top = item.thumbHeight || item.height;
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
