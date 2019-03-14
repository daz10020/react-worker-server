import React, { Component } from 'react';
import './Banner.less';
import { Input } from 'element-react';
import { Toast } from 'antd-mobile';
import phones from './矩形42.png';
import { $http, Trim, getBrowserSource } from '@function/Function';
import { Link } from 'react-router-dom';
import logo from './logo2.png'
class Banner extends Component{
  constructor(){
    super();
    this.browserSource = getBrowserSource();
    this.state = {
      IPdizhi: window.IPdizhi,
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
  
  _submitBottom() {
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
        "pageSource": this.browserSource,
        'ipAddress': this.state.IPdizhi,
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
      <section className="banner" style={{ backgroundImage: `url(${this.props.Img})`}}>
        <Link to="/" className="navHomeLink">
          <img src={logo} alt=""/>
        </Link>
        <div>
          <p>「免费获得」2019USAD <br />中国赛区最新赛情资讯</p>
          <div>
            <Input id="footer" placeholder="请输入手机号" maxLength={11} />
            <img src={phones} alt="" />
            <span onClick={this._submitBottom.bind(this)}>立即领取</span>
          </div>
        </div>
      </section>
    )
  }
}

export default Banner;