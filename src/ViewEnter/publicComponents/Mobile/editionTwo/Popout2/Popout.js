import React, { Component } from 'react';
import { Input } from 'element-react';
import { $http, plus, Trim,getBrowserSource } from '@function/Function';
import { Toast } from 'antd-mobile';
import close from './close.png';
import './Popout.less'
class Popout extends Component {
  constructor(props){
    super(props);
    this.state = {
      dialogss: "none",
      IPdizhi: window.IPdizhi,
      remark:''
    }
    this.browserSource=getBrowserSource();

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
  //提交
  _submitSucceed(){
      let myRe = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[0135678]|19[89]|18[0-9]|14[57])[0-9]{8}$/;
      let nameMatched = myRe.test(document.getElementById("FixNumber").value);
      if(!nameMatched){
          Toast.fail("请输入正确的手机号", 2);
          document.getElementById("FixNumber").value="";
          return
      }
      $http.post(this, {
          url: "/live/activityPrepareExam/front/saveActivityPrepareExam",
          dataType: "json",
          data: {
            "activitySoure": this.props.activitySoure,
            "activityId": this.props.activityId,
             "studentName": Trim(document.getElementById("FixName").value),
             "phone": Trim(document.getElementById("FixNumber").value),
             "grade": Trim(document.getElementById("FixGrade").value),
             "pageSource":this.browserSource,
             'ipAddress': this.state.IPdizhi,
             "targetSchool": "",
             'remark':this.state.remark

          },
          success: function (res) {
              if (res.success) {
                  document.getElementById("FixName").value = "";
                  document.getElementById("FixNumber").value = "";
                  document.getElementById("FixGrade").value = "";
                  Toast.success(res.msg, 2);
                  this._close();
              } else {
                  Toast.fail(res.msg, 2);
              }
          }
      })
  }

  _Dialog(){
    this.setState({
      dialogss:"block"
    })
  }
  
  _close() {
    this.setState({
      dialogss: "none"
    })
  }
  render(){
    return(
      <div>
        {/* 弹框 */}
        <section className="section_dialog" style={{ display: this.state.dialogss }}>
          <div className="section_dialog_box">
            <div className="dialong_close" 
              onClick={this._close.bind(this)}>
              <img src={close} alt="" />
            </div>
            <div className="title">立即提交<br/>短时间内给与回复</div>
            <div className="dialong_content">
              <div className="dialong_input">
               <Input id="FixName" placeholder='姓名'/>
              </div>
              <div className="dialong_input">
                <Input id="FixGrade" placeholder='年级'/>
              </div>
              <div className="dialong_input">
               <Input id="FixNumber" maxLength={11} placeholder='手机号'/>
              </div>
            </div>
            <div className="dialong_button" onClick={this._submitSucceed.bind(this)}>
              <span>立即提交</span>
            </div>
          </div>
        </section>
      </div>
    )
  }
}


export default Popout;