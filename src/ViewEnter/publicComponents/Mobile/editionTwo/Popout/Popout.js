import React, { Component } from 'react';
import { Input } from 'element-react';
import { $http, plus, Trim,getBrowserSource } from '@function/Function';
import { Toast } from 'antd-mobile';
import icon_2 from './icon1.png';
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
             "studentName": Trim(document.getElementById("FixName").value),
             "phone": Trim(document.getElementById("FixNumber").value),
             "grade": Trim(document.getElementById("FixGrade").value),
             "targetSchool": Trim(document.getElementById("FixSchool").value),
             "pageSource":this.browserSource,
             'ipAddress': this.state.IPdizhi,
             'remark':this.state.remark

          },
          success: function (res) {
              if (res.success) {
                  document.getElementById("FixName").value = "";
                  document.getElementById("FixNumber").value = "";
                  document.getElementById("FixGrade").value = "";
                  document.getElementById("FixSchool").value = "";
                  Toast.fail(res.msg, 2);
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
            <div className="dialong_top">
              <img src={icon_2} alt="" />
            </div>
            <div className="dialong_close" 
              onClick={this._close.bind(this)}>
              <img src={close} alt="" />
            </div>
            <div className="dialong_content">
              <div className="dialong_input">
                <span>学生姓名:</span>
                <div><Input id="FixName" /></div>
              </div>
              <div className="dialong_input">
                <span>
                  <sup style={{ color: "red", marginLeft: "-5px" }}>*</sup>
                  联系方式:</span>
                <div><Input id="FixNumber" maxLength={11} /></div>
              </div>
              <div className="dialong_input">
                <span>就读年级:</span>
                <div><Input id="FixGrade" /></div>
              </div>
              <div className="dialong_input">
                <span>目标学校:</span>
                <div><Input id="FixSchool" /></div>
              </div>
            </div>
            <div className="dialong_button" onClick={this._submitSucceed.bind(this)}>
              <span>点击提交,预定名额</span>
            </div>
            <div className="dialong_footer">
              <p>咨询电话：400-1798-499</p>
              <p>上海市静安区恒丰路329号隆宇国际商务广场2502室</p>
            </div>
          </div>
        </section>
      </div>
    )
  }
}


export default Popout;