import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import logoX from './logoX.png'
import './HomeHeader.css'
import {JudgeIP} from '@function/Function'

class HomeHeader extends Component {
    render() {
        return (
            <div>
                <div className="mapper"/>
                <div className="index-header">
                  <Link to="/"><img src={logoX} alt="logo"/></Link>
                  <nav>
                    <Link to="/" className={this.props.ActiveOne}>首页</Link>
                    <Link to="/onlineclass" className={this.props.ActiveTwo}>1对1在线课堂</Link>
                    <Link to="/course" className={this.props.ActiveThree}>课程优势</Link>
                    <Link to="/seopage/describe" style={{display:"none"}} className={this.props.ActiveFour}>公司简介</Link>
                    <Link to="/404" style={{display:"none"}} className={this.props.ActiveFour}>菠萝在线名师</Link>
                    < Link to="/sdentv" style={{ display: "none" }} className={this.props.ActiveFive}> 学员口碑 </Link>
                    <Link to="/404" style={{display:"none"}} className={this.props.ActiveSix}>联系我们</Link>
                  </nav>
                  {JudgeIP()?<a href="http://192.168.0.254:4000">学生端</a>:<a href="http://study.boluozaixian.com">学生端</a>}

                </div>
            </div>
        );
    }
}

export default HomeHeader;

