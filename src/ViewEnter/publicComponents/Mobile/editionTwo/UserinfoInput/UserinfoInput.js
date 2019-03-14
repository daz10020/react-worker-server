import React, { Component } from 'react';
import { Input} from 'element-react';
import { $http, plus, Trim,getBrowserSource } from '@function/Function';
import { Toast } from 'antd-mobile';
import './UserinfoInput.less'

class UserinfoInput extends Component{
  constructor(){
    super();
    this.browserSource=getBrowserSource();
    this.state = {
      IPdizhi: window.IPdizhi,
      remark:''
    }
  }

  componentDidMount() {
      $http.get(this, {
          url: "/live/visitRecord/front/saveVisitRecord",
          dataType: "json",
          data: {"activityId": this.props.activityId},
          success: function (res) {},
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
    let nameMatched = myRe.test(document.getElementById("inputId").value);
    if (!nameMatched) {
      Toast.fail("请输入正确的手机号", 2);
      document.getElementById("inputId").value = "";
      return;
    }
    $http.post(this, {
      url: "/live/activityPrepareExam/front/saveActivityPrepareExam",
      dataType: "json",
      data: {
        "activitySoure": this.props.activitySoure,
        "activityId": this.props.activityId,
        "studentName": "",
        "phone": Trim(document.getElementById("inputId").value),
        "grade": "",
        "targetSchool": "",
        "pageSource":this.browserSource,
        'ipAddress': this.state.IPdizhi,
        'remark':this.state.remark
      },
      success: function (res) {
        if (res.success) {
          document.getElementById("inputId").value = "";
          Toast.fail(res.msg, 2);
          this._close();
        } else {
          Toast.fail(res.msg, 2);
        }
      }
    })
  }

  render(){
    // console.log(window.IPdizhi)
    return(
      <section className="user_info_input">
        <div>
          <div>
            <span>免费获得<span>{this.props.Subject}</span></span>
            <p>{this.props.SubjectParticulars}</p>
          </div>
          <Input id="inputId" maxLength={11} placeholder="请输入您的手机号" />
          <button onClick={this._submitBottom}>立即领取</button>
        </div>
      </section>
    )
  }
}


export default UserinfoInput;