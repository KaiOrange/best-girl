import React from 'react';
import Modal from '../Modal';
import PropTypes from 'prop-types'
import './index.modul.css';

class ImageModal extends React.Component {
    constructor() {
        super();
        this.state = { };
    }

    componentDidMount() {
        let {isShow} = this.props;
        this.warpBGBlur(isShow);
    }

    warpBGBlur = (isShow)=>{
        let appHeader = document.querySelector(".App-header");
        if (isShow) {
            appHeader.classList.add("blur");
        } else {
            appHeader.classList.remove("blur");
        }
    }

    componentWillReceiveProps(nextProps) {
        this.warpBGBlur(nextProps.isShow);
    }

    render() {
        let {isShow,onClose,imgInfo} = this.props;
        imgInfo = imgInfo || {};
        return (<Modal >
            <div style={{display:isShow?"block":"none"}}>
                <div className="modal-backdrop">
                    <div className="modal-img" onClick={(e)=>{e.preventDefault()}}>
                        <img src={imgInfo.thumbUrl} alt="图片加载失败" title={imgInfo.title}></img>
                        <div className="modal-close-btn" onClick={onClose}/>
                    </div>
                </div>
            </div>
        </Modal>);
    }
}

ImageModal.defaultProps = {
    isShow:false,
    onClose:()=>{},
    imgInfo:{}
};

ImageModal.propTypes = {
    isShow:PropTypes.bool.isRequired,
    onClose:PropTypes.func.isRequired,
};

export default ImageModal;
