import React, {
  Component
} from 'react';
import './MackInput.less'
import {
  $http,
  Trim,
  getBrowserSource
} from '@function/Function';
import {
  Toast
} from 'antd-mobile';

import icon from './ICON-1.png'

class MaskInput extends Component {
  constructor(props) {
    super(props)
    this.state = {
      CloseState: "none",
      IPdizhi: window.IPdizhi,
      remark:''
    }
    this.browserSource = getBrowserSource();
  }
  CloseBlock = () => {
    this.setState({
      CloseState: 'block'
    })
  }

  componentDidMount() {
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

  // 点击申请免费试听
  submitMsg = () => {
    let myRe = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[0135678]|19[89]|18[0-9]|14[57])[0-9]{8}$/;
    let nameMatched = myRe.test(this.refs.tel.value);
    let grade = this.refs.grade.value;

    if (nameMatched == "") {
      Toast.fail("请输入手机号", 2);
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
        "grade": grade,
        'remark':this.state.remark

      },
      success: function (res) {
        if (res.success) {
          this.refs.name.value = "";
          this.refs.tel.value = "";
          this.refs.grade.value = "";

          Toast.success(res.msg, 2);
          this.setState({
            CloseState: 'none'
          })
          window._agl && window._agl.push(['track', ['success', {t: 3}]])
        } else {
          Toast.success(res.msg, 2);
        }
      }
    })
  }
  maskClick = () => {
    this.setState({
      CloseState: 'none'
    })
  }
  render() {
    return ( 
    <section className = "mask-box"style = {{display: this.state.CloseState} }>
     
      <div className = "mask"  > 
        <div className = "form-box">
        <img src={icon }  onClick = {this.maskClick} alt=""/>
        <h2> 立即提交， 短时间内给予回复 </h2> 
        <div className = "input-box" > < input ref = "name" type = "text" placeholder = "姓名" /></div> 
        <div className = "input-box" > 
          <input ref = "grade" type = "text" placeholder = "年级"/> </div> 
        <div className = "input-box"> 
          <input ref = "tel" maxLength = "11"type = "text"  placeholder = "手机号"/> </div>
          <button onClick = {this.submitMsg}> 提交 </button> 
        </div> 
      </div> 
      </section>
    )
  }
}

export default MaskInput;