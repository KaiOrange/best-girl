import React from 'react';
import ReactDOM from 'react-dom';

class Modal extends React.Component {
    constructor(props) {
        super(props);
        this.el = document.createElement('div');
    }
  
    componentDidMount() {
        this.modalRoot = document.body;
        this.modalRoot.appendChild(this.el);
    }
  
    componentWillUnmount() {
        this.modalRoot.removeChild(this.el);
    }
  
    render() {
        return ReactDOM.createPortal(
            this.props.children,
            this.el,
        );
    }
}

export default Modal;