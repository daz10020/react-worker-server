import React, { Component } from 'react';
import { Link }  from 'react-router-dom'
import {Input} from 'element-react'
import { Toast } from 'antd-mobile';
import { $http, plus, Trim,getBrowserSource } from '@function/Function';
import './bannerinput.less'
import logo from './logo1.png';
import phone from './矩形42.png'
import logo2 from './logo2.png'
class BannerInput extends Component{
  constructor(){
    super();
    this.browserSource=getBrowserSource();
    this.state = {
      IPdizhi:window.IPdizhi,
      remark:''
    }
  }
  componentDidMount(){
    $http.get(this, {
      url: "/live/visitRecord/front/saveVisitRecord",
      dataType: "json",
      data: { "activityId": this.props.activityId },
      success: function (res) { },
    });
    plus.rem();
    let reurl = window.location.href;
    let remark = reurl.substring(0,28);
    if(remark == 'http://www.boluozaixian.com/'){
      this.setState({
        remark:'bl'
      })
    }else{
      this.setState({
        remark:'sd'
      })
    }
    
  }
  _submitBottom = () => {
    let myRe = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[0135678]|19[89]|18[0-9]|14[57])[0-9]{8}$/;
    let nameMatched = myRe.test(document.getElementById("footer").value);
    if (!nameMatched) {
        Toast.fail("请输入正确的手机号")
      document.getElementById("footer").value = "";
      return
    }
    $http.post(this, {
    
      url: "/live/activityPrepareExam/front/saveActivityPrepareExam",
      dataType: "json",
      data: {
        "activitySoure": this.props.activitySoure,
        "activityId": this.props.activityId,
        "studentName": "",
        "phone": Trim(document.getElementById("footer").value),
        "grade": "",
        "targetSchool": "",
        "pageSource":this.browserSource,
        'ipAddress':this.state.IPdizhi,
         'remark':this.state.remark
      },
      success: function (res) {
        if (res.success) {
          document.getElementById("footer").value = "";
          Toast.success(res.msg)
          this._close();
          window._agl && window._agl.push(['track', ['success', {t: 3}]])
        } else {
            Toast.fail(res.msg);
        }
      }

    })
  }
  render(){
    return(
      <section className="nav-homes" style={{ backgroundImage: `url(${this.props.Img})` }}>
        <Link to="/" className="navHomeLink">
          <img src={logo} style={{ display: this.props.logoOne }} alt="" />
          <img src={logo2} style={{ display: this.props.logoTwo }} alt="" />
        </Link>
        <div style={{top:this.props.TopInput,right:this.props.RightInput}}>
          <p style={{color:this.props.bannerColor}}>免费获得</p>
          <h2 style={{ fontSize: this.props.TitleSize, color: this.props.bannerColor}}>{this.props.Title}</h2>
          <span style={{ color: this.props.bannerColor }}>
            {this.props.describeTitle}
          </span>
          <span style={{ color: this.props.bannerColor }}>
            {this.props.describeCont}
          </span>
          <div>
            <Input id="footer" placeholder="请输入您的手机号" maxLength={11} />
            <img src={phone} alt=""/>
          </div>
       
          <span onClick={this._submitBottom}>立即领取</span>
        </div>
      </section> 
    )
  }
}
export default BannerInput;