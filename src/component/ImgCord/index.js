import React from 'react';
import './index.modul.css';

class ImgCord extends React.Component {
    constructor() {
        super();
        this.state = { someKey: 'someValue' };
    }

    componentDidMount() {
        this.setState({ someKey: 'otherValue' });
    }
    render() {
        let {alt,className,...otherProps} = this.props;
        return <img className={"img-cord " + className} alt={alt} {...otherProps} />;
    }
}

ImgCord.defaultProps = {
    className:""
};

export default ImgCord;
