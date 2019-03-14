import React, { Component } from 'react';
import './BannerInputBox.less';
import { $http,Trim,getBrowserSource } from '@function/Function';
import { Toast } from 'antd-mobile';

class BannerInputBox extends Component{
    constructor(){
        super();
        this.state={
            IPdizhi:window.IPdizhi,
            remark:'',
        }
        this.browserSource = getBrowserSource();
    }
    componentDidMount() {
        let reurl = window.location.href;
        let remark = reurl.substring(0, 28);
        if (remark == 'http://www.boluozaixian.com/') {
            this.setState({
                remark:'bl'
            })
        } else {
            this.setState({
                remark:'sd'
            })
        }
    }
    //提交电话
    submitTelOne(activitySoure,activityId){
        let myRe = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[0135678]|19[89]|18[0-9]|14[57])[0-9]{8}$/;
        let nameMatched = myRe.test(this.refs.telOne.value);   
        if (!nameMatched) {
          Toast.fail("请输入正确的手机号", 2);
          this.refs.telOne.value = "";
          return;
        }
        $http.post(this, {
          url: "/live/activityPrepareExam/front/saveActivityPrepareExam",
          dataType: "json",
          data: {
            "phone": Trim(this.refs.telOne.value),
            "activitySoure": activitySoure,
            "activityId": activityId,
            'ipAddress': this.state.IPdizhi,
            "pageSource": this.browserSource,
            "remark":this.state.remark
          },
          success: function (res) {
            if (res.success) {
              this.refs.telOne.value = "";
              Toast.success(res.msg, 2);
              window._agl && window._agl.push(['track', ['success', {t: 3}]]) 
            } else {
              Toast.success(res.msg, 2);
            }
          }
        })
    }

    render(){
        const{title1,title2,title3,tipli,activitySoure,activityId,bgstyle}=this.props;
        return(
            <div className='BannerInputBox' style={bgstyle?bgstyle:{}}>
                {title1?<h1 style={title1.style?title1.style:{}} dangerouslySetInnerHTML={{__html: title1.name}}></h1>:''}
                {title2?<h2 style={title2.style?title2.style:{}} dangerouslySetInnerHTML={{__html: title2.name}}></h2>:''}
                {title3?<h3 style={title3.style?title3.style:{}} dangerouslySetInnerHTML={{__html: title3.name}}></h3>:''}
                {tipli?(<ul>
                    {tipli.map((item,index)=>(
                        <li key={index}>{item}</li>
                    ))}
                </ul>):''}
                <div className="input-box">
                    <input type="text" ref="telOne"  placeholder="请输入您的手机号"/>
                    <div className="receive" onClick={this.submitTelOne.bind(this,activitySoure,activityId)}>立即领取</div>
                </div>
                
            </div>  
        )
    }
}
export default BannerInputBox;