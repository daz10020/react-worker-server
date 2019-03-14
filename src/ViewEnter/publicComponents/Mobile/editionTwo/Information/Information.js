import React,{ Component } from 'react';
import { Input } from 'element-react';
import { $http, plus, Trim,getBrowserSource } from '@function/Function';
import { Toast } from 'antd-mobile';
import "./Information.less"
class Information extends Component{
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


  // 底部预约试听
  _submitBottom=()=>{
    let myRe = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[0135678]|19[89]|18[0-9]|14[57])[0-9]{8}$/;
    let nameMatched = myRe.test(document.getElementById("footerId").value);
    if (!nameMatched) {
      Toast.fail("请输入正确的手机号", 2);
      document.getElementById("footerId").value = "";
      return;
    }

    $http.post(this, {
      url: "/live/activityPrepareExam/front/saveActivityPrepareExam",
      dataType: "json",
      data: {
        "activitySoure":this.props.activitySoure,
        "activityId": this.props.activityId,
        "studentName": "",
        "phone": Trim(document.getElementById("footerId").value),
        "grade": "",
        "targetSchool": "",
        "pageSource":this.browserSource,
        'ipAddress': this.state.IPdizhi,
        'remark':this.state.remark
      },
      success: function (res) {
        if (res.success) {
          document.getElementById("footerId").value = "";
          Toast.success(res.msg, 2);
          this._close();
        } else {
          Toast.fail(res.msg, 2);
        }
      }
    })
  }
  render(){
    return(
      <div className="section_footers" style={{display:this.props.footerDisplay}}>
        <div className="section_inputs">
          <Input id="footerId" maxLength={11} style={{height:"3rem"}} placeholder="请输入联系方式" />
        </div>
        <div onClick={this._submitBottom} className="section_buttons">
          <span>
            {this.props.title}
          </span>
        </div>
      </div>
    )
  }
  
}
export default Information;