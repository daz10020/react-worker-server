import React, { Component } from 'react';
import './ReturneesTeacher.less';
import { Images } from './images.js';
import Slider from "react-slick";
import MaskInput from '@SEOWeb/MaskInput/MaskInput';
class ReturneesTeacher extends Component {
  constructor() {
    super();
    this.state = {
      currentitem: null
    }
  }
  hoveritem = (index) => {
    this.setState({
      currentitem: index
    })
  }
  leaveitem = () => {
    this.setState({
      currentitem: null
    })
  }
  CloseBlock = () => {
    this.refs.box.CloseBlock();
  }
  render() {
    const { currentitem } = this.state;
    const { activitySoure, activityId,teacherData } = this.props;
    const teacherSetting = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 2,
      slidesToScroll: 2
    }
    return (
      <div className='ReturneesTeacher' >
        <div className="bg"></div>
        <div className="cont">
          <div className="title">海归<span>名师</span>团队</div>
          <div className='subtitle'>100%严格审核 3轮筛选</div>
          <div className="info">
            <div className="left">
              <h2>全职任教教师团队</h2>
              <p><span>100%</span>海外教研背景 </p>
              <p><span>90%</span>以上具备三年以上资深教学经验</p>
            </div>
            <div className="right">
              <h2>严格教师录用标准</h2>
              <p>高资历海归教研团队,拥有毕业于斯坦福、UCLA、UCB、帝国理工等世界顶级名校优质教师队，比例高达<span>95%</span></p>
            </div>
          </div>
        </div>
        <div className="slider">
          <Slider {...teacherSetting}>
            {teacherData.map((item, index) => (
              <div className={`itemwrap ${(currentitem === index) ? 'active' : ''}`} key={index} onMouseEnter={this.hoveritem.bind(this, index)} onMouseLeave={this.leaveitem.bind(this)}>
                <div className='item'>
                  <div className="bg"><img src={item.gifsrc} alt='' /></div>
                  <i><img src={item.imgsrc} alt='' /></i>
                  <div className="info">
                    <h3>{item.name}</h3>
                    <p>{item.subject}</p>
                    <h1>{item.school}</h1>
                    <h2>{item.tips?item.tips:''}</h2>
                  </div>
                  <div className="appointment" onClick={this.CloseBlock}><div></div>预约名师</div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
        <MaskInput ref="box" activitySoure={activitySoure}
          activityId={activityId} />
      </div>
    )
  }
}
export default ReturneesTeacher;