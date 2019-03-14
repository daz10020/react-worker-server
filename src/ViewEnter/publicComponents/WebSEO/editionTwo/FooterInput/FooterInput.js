import React, { Component } from 'react';
import { Input } from 'element-react'
import './FooterInput.less';
import { Toast } from 'antd-mobile';
import { $http, plus, Trim, getBrowserSource } from '@function/Function';

import phone from './矩形42.png'
class FooterInput extends Component {
  constructor() {
    super();
    this.browserSource = getBrowserSource();
    this.state = {
      IPdizhi: window.IPdizhi,
      remark:''
    }
  }
  componentDidMount() {
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
    let nameMatched = myRe.test(document.getElementById("footerSubmitInput").value);
    if (!nameMatched) {
        Toast.fail("请输入正确的手机号")
      document.getElementById("footerSubmitInput").value = "";
      return
    }
    $http.post(this, {
      url: "/live/activityPrepareExam/front/saveActivityPrepareExam",
      dataType: "json",
      data: {
        "activitySoure": this.props.activitySoure,
        "activityId": this.props.activityId,
        "studentName": "",
        "phone": Trim(document.getElementById("footerSubmitInput").value),
        "grade": "",
        "targetSchool": "",
        "pageSource": this.browserSource,
        'ipAddress': this.state.IPdizhi,
        'remark':this.state.remark
      },
      success: function (res) {
        if (res.success) {
          document.getElementById("footerSubmitInput").value = "";
          Toast.success(res.msg)
          this._close();
          window._agl && window._agl.push(['track', ['success', {t: 3}]])
        } else {
            Toast.fail(res.msg)
        }
      }
    })
  }

  render() {
    return (
      <section className="footer_input">
        <div>
          <span>
            <Input id="footerSubmitInput" placeholder="请输入联系方式" maxLength={11} />
            <img src={phone} alt="" />
          </span>
          <span onClick={this._submitBottom} style={{ fontSize: this.props.FooterFontSize }}>{this.props.FooterSubmitBottom}</span>
          <span><span>或直接拨打</span>400-1798-499</span>
          <span onClick={this.props.submitInput}>获得历年真题</span>
        </div>
      </section>
    )
  }
}

export default FooterInput;