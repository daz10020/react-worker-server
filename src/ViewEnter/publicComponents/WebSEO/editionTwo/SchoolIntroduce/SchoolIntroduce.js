import React, { Component } from 'react';
import './SchoolIntroduce.less';
import jianqiao from './剑桥.png';
import niujin from './牛津.png';
import yelu from './耶鲁大学.png';
import hafu from './哈佛.png';
import masheng from './麻省理工.png';
import pulin from './普林斯顿大学.png';
import lundun from './伦敦政经学院.png';
import diguo from './帝国理工学院.png';
import gelunyabi from './哥伦比亚大学.png'


class SchoolIntroduce extends Component{
  render(){
    return(
      <section className="school_introduce">
        <p className="sch_note">美国入学优惠政策:</p>
        <p className="sch_mingxiao" style={{display:this.props.titleShow}}>
          <span>常春藤名校</span>
          科目40分及以上，总分42分以上录取。
            <span>TOP20</span>  39分及以上录取，
            <span>TOP50</span>  37分及以上录取。
          </p>
        <ul className="sch_schlist">
          <li>
            <div>
              <img src={hafu} alt="" />
            </div>
            <div>
              < h2 > 哈佛大学</h2>
              <span className="schlist_left" onClick={this.props.CloseBlock}>
                成绩优异的IB学生（ 三科IB主科均达到6或7分者） 直接进校修读大学二年级课程， 无需研修大一课程。
                </span>
            </div>
          </li>
          <li>
            <div>
              <img src={yelu} alt="" />
            </div>
            <div>
              < h2 > 耶鲁大学</h2>
              < span className="schlist_left" onClick={this.props.CloseBlock}>
                IB高等级考试获得6 - 7 分的学生给于两项累计学分的奖励（ 相当于两门耶鲁大学的课程学分）。 学生可利用这些累计学分或提前毕业， 或直接越级到大二年级学习。
                </span>
            </div>
          </li>
          <li>
            <div>
              <img src={masheng} alt="" />
            </div>
            <div>
              < h2 > 麻省理工大学</h2>
              < span className="schlist_left" onClick={this.props.CloseBlock}>
                IB成绩优秀者实行奖励学分制。 任何一门IB人文科学考试成绩在6 - 7 分者将折抵总选修课的9学分。
                </span>
            </div>
          </li>
          <li>
            <div>
              <img src={pulin} alt="" />
            </div>
            <div>
              <h2> 普林斯顿大学</h2>
              <span className="schlist_left" onClick={this.props.CloseBlock}>
                承认IB文凭， IB毕业生是唯一有资格越级插班的群体。 各科高等级考试成绩6 - 7 分者可准许越级插班。
                </span>
            </div>
          </li>
        </ul>
        <p className="sch_note">英国大学录取要求:</p>
        <ul className="sch_schlist">
          <li>
            <div>
              <img src={jianqiao} alt="" />
            </div>
            <div>
              <h2>剑桥大学</h2>
              <span onClick={this.props.CloseBlock}>
                总成绩41分以上 <br />
                高等级考试成绩6－7分
                </span>
            </div>
          </li>
          <li>
            <div>
              <img src={niujin} alt="" />
            </div>
            <div>
              <h2>牛津大学</h2>
              <span onClick={this.props.CloseBlock}>
                总成绩38分以上有⼀门以<br />
                上高等级考试成绩达到6－7分
                </span>
            </div>
          </li>
          <li>
            <div>
              <img src={lundun} alt="" />
            </div>
            <div>
              <h2>伦敦政经学院</h2>
              <span onClick={this.props.CloseBlock}>
                总分37-38，HL课程的分<br />
                数需要达到666-766的水平
                </span>
            </div>
          </li>
          <li>
            <div>
              <img src={diguo} alt="" />
            </div>
            <div>
              <h2>帝国理工学院</h2>
              <span onClick={this.props.CloseBlock}>
                总分38-42，相关科目需<br />
                要达到6分或7分
                </span>
            </div>
          </li>
        </ul>
      </section>
    )
  }
}

export default SchoolIntroduce;