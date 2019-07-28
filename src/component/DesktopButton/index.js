import React from 'react';
import PropTypes from 'prop-types'
import './index.modul.css';

class DesktopButton extends React.Component {
    constructor() {
        super();
        this.state = { isShow: false };
        this.savePrompt = null;
    }

    handleNativeEvent = (e)=>{
        e.preventDefault();
        this.setState({
          isShow: true
        });
        this.savePrompt = e;
        return false;
    }

    componentDidMount = ()=>{
        window.addEventListener("beforeinstallprompt",this.handleNativeEvent);
    }

    componentWillUnmount = ()=>{
        this.savePrompt = null;
        window.remoteEventListener("beforeinstallprompt",this.handleNativeEvent);
    }

    handleClick = ()=>{
        if (this.savePrompt) {
            let { handleClick } = this.props;
            if (handleClick) {
                handleClick();
            }
            this.savePrompt.prompt();
        }
    }

    render() {
        let { isShow } = this.state;
        return (<div className="desktop-button" style={{display:isShow ? "block" : "none"}}>
            <div className="desktop-button-icon" onClick={this.handleClick}/> 
        </div>);
    }
}

DesktopButton.propTypes = {
    handleClick: PropTypes.func.isRequired
};

DesktopButton.defaultProps = {
    handleClick:()=>{}
};

export default DesktopButton;
