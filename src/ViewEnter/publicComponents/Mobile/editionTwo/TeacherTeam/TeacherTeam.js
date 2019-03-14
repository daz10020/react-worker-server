import React, { Component } from 'react';
import './TeacherTeam.less'
import { plus } from '@function/Function';

import earth from './组4.png'
import ziyuan7 from './资源 7.png'


class TeacherTeam extends Component{
  componentDidMount() {
    plus.rem();
  }
  render(){
    return(
      <section className="mobileig_four" style={{backgroundColor:this.props.BgColor}}>
        <div className="four_img">
          <img src={earth} alt="" />
        </div>
        <div className="four_title">
          <p>海归名师团队</p>
          <span>95%来自世界名校 &nbsp; 90%三年以上教学经验</span>
        </div>
        <div className="four_describe">
          <img src={ziyuan7} alt="" />
        </div>
      </section>
    )
  }
}
export default TeacherTeam;