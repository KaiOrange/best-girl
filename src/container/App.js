import React, { Component } from 'react';
import jsonp from 'jsonp';
import './App.css';
import URI from 'urijs';
import ImgCord from '../component/ImgCord';
import ToolButton from '../component/ToolButton';
import ImageModal from '../component/ImageModal';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imgDatas: [],
            bgColor:window.localStorage.getItem("bgColor"),
            isShow:false,
            imgInfo:null
        };
        this.baseURL = "https://pic.sogou.com/pics";
        this.pageNumber = 50;
        this.currentPage = 0;
        this.word = "美女";
        this.timer = null;//定时器
        this.allImgDatas = [];//所有的图片信息
        this.minContainerNumber = 10;//最小容量
        this.maxCacheNumber = 20;//最大缓存容量
        this.cacheImgDatas = [];//需要删除掉的图片信息
        this.clientWidth = 980;//浏览器的宽度
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
        jsonp(this.getURL({word:this.word,pageNumber:this.pageNumber,currentPage:this.currentPage}), {},(err, data)=>{
            console.log(data)
            var newImgDatas = data.items||[];
            if (newImgDatas.length === 0) {
                this.currentPage = 0;
            } else {
                this.currentPage += newImgDatas.length;
            }
            //只是把图片信息放在所有信息容器里面
            this.allImgDatas = this.allImgDatas.concat(newImgDatas)
        });
    }

    setClientWidth = ()=>{
        this.clientWidth = document.body.clientWidth;
    }
    
    componentDidMount() {
        this.setClientWidth();
        //首先进来请求一下数据
        this.fetchData();
        //然后设置定时器
        this.startTimeTic();
        window.addEventListener("resize",this.setClientWidth);
    }

    componentWillUnmount() {
        clearInterval(this.timer);
        window.removeEventListener("resize",this.setClientWidth);
    }

    startTimeTic(){
        this.timer = setInterval(() => {
            this.setState((old)=>{
                if (this.allImgDatas.length <= this.minContainerNumber) {
                    this.fetchData();
                }
                if (this.allImgDatas.length > 0) {
                    let currentImg = this.allImgDatas.splice(0,1)[0];
                    let imgWidth = Math.min(Number(currentImg.thumb_width||currentImg.width),this.clientWidth * 35 / 100);
                    currentImg.left = Math.random() * (this.clientWidth - imgWidth);
                    currentImg.delayTime = Math.random() * 3;
                    currentImg.durationTime = Math.random() * 5 + 3;
                    old.imgDatas.push(currentImg);//每次拿最前面的一个
                }
                //清空缓存数据
                if (this.cacheImgDatas.length > this.maxCacheNumber) {
                    debugger;
                    old.imgDatas = old.imgDatas.filter((item)=>{
                        return !~this.cacheImgDatas.indexOf(item);
                    })
                    this.cacheImgDatas = [];
                }
                return old;
            })
        }, 1500);
    }

    handleDeleteImg = (item)=>{
        //放入要删除的缓存中
        this.cacheImgDatas.push(item)
    }

    handleSelectColor = (color)=>{
        this.setState({bgColor:color},()=>{
            window.localStorage.setItem("bgColor",color)
        });
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
        let {bgColor,isShow,imgInfo} = this.state;
        return (
        <div className="App" style={{backgroundColor:bgColor}}>
            <header className="App-header" >
                <div className="center">
                    <div className="dialogue-text hinge">一大波美女正在靠近</div>
                </div>
                <ToolButton handleSelectColor={this.handleSelectColor}/>
                {this.state.imgDatas.map((item)=>{
                    let src = item.thumbUrl || item.pic_url;
                    if (!src) {
                        return null;
                    }
                    let top = item.thumb_height || item.height;
                    return (
                        <ImgCord 
                            key={src} 
                            src={src} 
                            alt={item.alt} 
                            title={item.title} 
                            style={{top:-top,left:item.left+"px",animationDelay: item.delayTime+"s",animationDuration:item.durationTime+"s"}}
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
