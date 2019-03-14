import React, { Component } from 'react';
import './InputBox.less';
import { $http,Trim,getBrowserSource } from '@function/Function';
import { Toast } from 'antd-mobile';
class InputBox extends Component{
    constructor(){
        super();
        this.state={
            phone:'',
            remark:'',
        }
        this.browserSource=getBrowserSource();
        
    }
    onChangePhone(e){
        this.setState({
            phone:Trim(e.target.value)
        })
    }
    // 提交电话号
    submit() {
        const {browserSource} =this;
        const {activitySoure,activityId} = this.props;
        const {phone, remark} = this.state;
        if (!/^(0|86|17951)?(13[0-9]|15[012356789]|166|17[0135678]|19[89]|18[0-9]|14[57])[0-9]{8}$/.test(phone)) {
        Toast.fail('请输入正确的手机号', 2);
        return;
        }
        $http.post(this, {
        url: "/live/activityPrepareExam/front/saveActivityPrepareExam",
        dataType: "json",
        data: {
            phone,
            "activitySoure": activitySoure,
            "activityId": activityId,
            "pageSource": browserSource,
            'ipAddress': window.IPdizhi,
            'remark': remark
        },
        success: function (res) {
            if (res.success) {
            this.setState({ phone: '' });
            Toast.success(res.msg, 2);
            } else {
            Toast.fail(res.msg, 2);
            }
        }
        });
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

    render(){
        const {title1,title2,title3,btn}=this.props;
        return(
            <div className='InputBox'>
                <div className="title">
                    {title1?<h1 style={title1.style?title1.style:{}} dangerouslySetInnerHTML={{__html: title1.name}}></h1>:''}
                    {title2?<h2 style={title2.style?title2.style:{}} dangerouslySetInnerHTML={{__html: title2.name}}></h2>:''}
                    {title3?<h3 style={title3.style?title1.style:{}} dangerouslySetInnerHTML={{__html: title3.name}}></h3>:''}
                </div>
                <div className="inputcontainer">
                    <input
                        placeholder="请输入您的手机号"
                        maxLength={11}
                        value={this.state.phone}
                        onChange={this.onChangePhone.bind(this)} />
                </div>
                <div className="btn" style={btn?btn.style:{}} onClick={this.submit.bind(this)}>{btn?btn.name:'立即领取'}</div>
            </div>
        )
    }
}
export default InputBox;
