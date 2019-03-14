import React, { Component } from 'react';
import './CourseIntroduction.less'
import Mathematics from './数学设备.png';
import wuli from './物理与天文学.png';
import shengwu from './生物制药.png';
import Calculus from './微积分.png';
import Economics from './经济指数.png';
import Historys from './历史.png';
import Chemistry from './化学.png';
import business from './商业决策.png'
class CourseIntroduction extends Component{
  render(){
    return(
      <section className="micoapm_four">
        <div className="four_title">
          <p>{this.props.troductionTitle}</p>
          <p>{this.props.troductionTitleTwo}</p>
          <span>{this.props.troductionCont}</span>
        </div>
        <div className="four_con">
          <ul>
            <li>
              <img src={Mathematics} alt="" />
              <p>数学</p>
              <span>Mathematics</span>
            </li>
            <li>
              <img src={wuli} alt="" />
              <p>物理</p>
              <span>Physics</span>
            </li>
            <li>
              <img src={shengwu} alt="" />
              <p>生物</p>
              <span>Biology</span>
            </li>
            <li>
              <img src={Calculus} alt="" />
              <p>微积分</p>
              <span>Calculus</span>
            </li>
            <li>
              <img src={Economics} alt="" />
              <p>经济</p>
              <span>Economics</span>
            </li>
            <li>
              <img src={Historys} alt="" />
              <p>历史</p>
              <span>History</span>
            </li>
            <li>
              <img src={Chemistry} alt="" />
              <p>化学</p>
              <span>Chemistry</span>
            </li>
            <li>
              <img src={business} alt="" />
              <p>商业管理</p>
              <span>Business Management</span>
            </li>
            <li>
              <p>......</p>
            </li>
          </ul>
        </div>
        <p>
          <i></i>
          <span>菠萝在线特长科目</span>
          <i></i>
        </p>
      </section>
    )
  }
}

export default CourseIntroduction;