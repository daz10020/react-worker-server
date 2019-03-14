import React, { Component } from 'react';
import './MaskInput.less'
import { Images } from './images.js'
import { $http, Trim,getBrowserSource } from '@function/Function';
import { Toast } from 'antd-mobile';
class MaskInput extends Component {
  constructor(props){
    super(props);
    this.state= {
      formShow: 'none',
      remark: '',
      IPdizhi: window.IPdizhi,
    } 
    this.browserSource = getBrowserSource();
  }

  // 点击显示弹窗
  CloseBlock = () => {
    this.setState({
      formShow: 'block'
    })
  }

  // 点击关闭弹窗
  closeForm = () => {
    this.setState({
      formShow: 'none'
    })
  }
  componentDidMount(){
    let reurl = window.location.href;
    let remark = reurl.substring(0, 28);
    if (remark == 'http://www.boluozaixian.com/') {
      this.setState({
        remark: 'bl'
      })
    } else {
      this.setState({
        remark: 'sd'
      })
    }
  }
  // 点击申请免费试听
  submitMsg = () => {
    let myRe = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[0135678]|19[89]|18[0-9]|14[57])[0-9]{8}$/;
    let nameMatched = myRe.test(this.refs.tel.value);
    let name = this.refs.name.value;
    if (!name) {
      Toast.fail("姓名不能为空", 2);
      return;
    }
    if (!nameMatched) {
      Toast.fail("请输入正确的手机号", 2);
      this.refs.tel.value = "";
      return;
    }
    $http.post(this, {
      url: "/live/activityPrepareExam/front/saveActivityPrepareExam",
      dataType: "json",
      data: {
        "studentName": this.refs.name.value,
        "phone": Trim(this.refs.tel.value),
        "activitySoure": this.props.activitySoure,
        "activityId": this.props.activityId,
        'ipAddress': this.state.IPdizhi,
        "pageSource": this.browserSource,
        "remark": this.state.remark
      },
      success: function (res) {
        if (res.success) {
          this.refs.name.value = "";
          this.refs.tel.value = "";
          Toast.success(res.msg, 2);
          this.setState({
            mask: 'none'
          })
        } else {
          Toast.success(res.msg, 2);
        }
      }
    })
  }

  render(){
    return(
      <section id="pop-wrap" style={{ display: this.state.formShow }}>
        <div className="pop-box">
          <div className="pop-mask" onClick={this.closeForm}></div>
          <div className="form-box">
            <div className="form">
              <div className="form-title">
                免费申请
                <span onClick={this.closeForm}>
                  <img src={Images.close} alt='' />
                </span>
              </div>
              <div className="input-box">
                <span>
                  <img src={Images.icon2} alt='' />
                </span>
                <input ref="name" type="text" placeholder="请输入姓名" />
              </div>
              <div className="input-box">
                <span>
                  <img src={Images.icon1} alt='' />
                </span>
                <input ref="tel" type="text" placeholder="请输入手机号" />
              </div>
              <button onClick={this.submitMsg}>立即申请</button>
            </div>
          </div>
        </div>
      </section>
    )
  }
}

export default MaskInput;