import React, {Component} from 'react';
import Four404 from './404.png'
import './Error.css';
import {Link} from 'react-router-dom'
class Error extends Component {


    render() {
        //组件渲染
        return (
            <div className="error">
                <section>
                    <img src={Four404} alt="背景404"/>
                    <Link to="/">返回首页</Link>
                </section>

            </div>
        );
    }
}


export default Error;
