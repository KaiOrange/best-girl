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
        let {alt,...otherProps} = this.props;
        return <img className="img-cord" alt={alt} {...otherProps} />;
    }
}

export default ImgCord;
