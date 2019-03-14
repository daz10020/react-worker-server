import React, { Component } from 'react';
import './SchoolIntroduce.less';
import jianqiao from './剑桥.png';
import niujin from './牛津.png';
import yelu from './耶鲁大学.png';
import hafu from './哈佛.png';
import pulin from './普林斯顿大学.png';
import lundun from './伦敦政经学院.png';
import diguo from './帝国理工学院.png';
import gelunyabi from './哥伦比亚大学.png'
class SchoolIntroduceAlvel extends Component {
  render() {
    return (
      <section className="school_introduce">
        <p className="sch_note">英国最低录取要求:</p>
        <ul className="sch_schlist">
          <li>
            <div>
              <img src={jianqiao} alt="" />
            </div>
            <div>
              <h2>剑桥大学</h2>
              <span onClick={this.props.CloseBlock} className="schlist_leftss">
                A*AA
                </span>
            </div>
          </li>
          <li>
            <div>
              <img src={niujin} alt="" />
            </div>
            <div>
              <h2>牛津大学</h2>
              <span onClick={this.props.CloseBlock} className="schlist_leftss">
               A*AA
                </span>
            </div>
          </li>
          <li>
            <div>
              <img src={lundun} alt="" />
            </div>
            <div>
              <h2>伦敦政经学院</h2>
              <span onClick={this.props.CloseBlock} className="schlist_leftss">
                A*AA
                </span>
            </div>
          </li>
          <li>
            <div>
              <img src={diguo} alt="" />
            </div>
            <div>
              <h2>帝国理工学院</h2>
              <span onClick={this.props.CloseBlock} className="schlist_leftss">
              A*AA
                </span>
            </div>
          </li>
        </ul>
        <p className="sch_note">美国录取申请政策:</p>
        <ul className="sch_schlist">
          <li>
            <div>
              <img src={hafu} alt="" />
            </div>
            <div>
              < h2 > 哈佛大学</h2>
              <span className="schlist_left schlist_lefts" onClick={this.props.CloseBlock}>
                A  Level获得录取的学生通常3或4门A  Level预估成绩达到A*/A；
                </span>
            </div>
          </li>
          <li>
            <div>
              <img src={yelu} alt="" />
            </div>
            <div>
              < h2 > 耶鲁大学</h2>
              < span className="schlist_left schlist_lefts" onClick={this.props.CloseBlock}>
                可以用A Level替代SAT II成绩申请，可以换算学分，成绩为A或B以上
                </span>
            </div>
          </li>
          <li>
            <div>
              <img src={gelunyabi} alt="" />
            </div>
            <div>
              <h2>哥伦比亚大学</h2>
              < span className="schlist_left schlist_lefts" onClick={this.props.CloseBlock}>
                A  Level成绩可以换算学分,A  Level成绩达到A或B的每一科目可以获得6学分
                </span>
            </div>
          </li>
          <li>
            <div>
              <img src={pulin} alt="" />
            </div>
            <div>
              <h2> 普林斯顿大学</h2>
              <span className="schlist_left schlist_lefts" onClick={this.props.CloseBlock}>
                A  Level成绩A相当于AP成绩5；A  Level成绩B相当于AP成绩4，
                </span>
            </div>
          </li>
        </ul>
      </section>
    )
  }
}

export default SchoolIntroduceAlvel;