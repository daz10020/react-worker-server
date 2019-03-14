import React,{Component} from 'react';
import './Logo.less';
import logo2 from './images/logo2.png';
import logoc from './images/logoc.png'
class Logo extends Component{
    constructor(){
        super();
    }
    render(){
        return(
            <section className="logo">
                <img src={logo2} alt="logo" className="logom"/>
                <img src={logoc} alt="logo" className="logoc"/>
            </section>
        )
    }
}
export default Logo;