import React, { Component } from 'react';
import './HeadBox.less';
import logo from './logo.png';
import phone from './phone.png';


class HeadBox extends Component{
    constructor(){
        super()
    }
    render(){
        return(
            <div className="headBox">
                <img src={logo} alt="" className="logoImg" />
                <img src={phone} alt="" className="callImg" />
                <a href="tel:400-1798-499" className="callInp"></a>
            </div>
        )
    }
} 
export default HeadBox;