import React from 'react';
import PropTypes from 'prop-types'
import './index.modul.css';

class ToolButton extends React.Component {
    constructor() {
        super();
        this.state = { isShowColors: false };
    }

    handleToggleColors = ()=>{
        this.setState({
            isShowColors:!this.state.isShowColors
        });
    }

    render() {
        let {colors,handleSelectColor} = this.props;
        let {isShowColors} = this.state;
        return (<div className="tool-button">
            <div className="tool-button-colors" style={{width:isShowColors?(colors.length * 1.5)+"rem":"0",opacity:isShowColors?"1":"0"}}>
                {colors.map((item,index)=>{
                    return <div key={item.color} className="tool-button-color" style={{background:item.color}} title={item.title} onClick={()=>{
                        handleSelectColor(item,index)
                    }}></div>;
                })}
            </div>
            <div className="tool-button-icon" onClick={this.handleToggleColors}/> 
        </div>);
    }
}

ToolButton.propTypes = {
    handleSelectColor:PropTypes.func.isRequired
};

ToolButton.defaultProps = {
    colors:[],
    handleSelectColor:()=>{}
};

export default ToolButton;
