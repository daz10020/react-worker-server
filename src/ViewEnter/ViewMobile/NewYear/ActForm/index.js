import './index.less'
import Images from '../images'
import { plus, VALIDATE_PHONE_REG } from "@function/Function";
import http from "@function/ActHttp";
import { checkStep, activityId } from '../Success'
import { shareInit } from '../prize'

import React, { Component } from 'react'
import { Button, Modal, List, InputItem, Toast, ActivityIndicator } from 'antd-mobile';

const { bg4, logo1, fudai, kaiqi, guanbi } = Images

const apis = {
    // 获取验证码
    getCode: '/web/activity/smsSend',
    // 提交表单
    submit: '/activity/cjh5/addRedeemCodeCJH5'
}

class NewYearActFrom extends Component {
    constructor() {
        super()
        this.state = {
            start: false,
            show: false,
            userName: '',
            mobile: '',
            smsCode: '',
            codeBtnTxt: '发送',
            animating: false
        }
        this.timeId = 0;
        this.sendFlg = false
    }

    componentWillMount() {
        plus.rem2();
        checkStep((stepInfo, userInfo) => {
            // 开始渲染
            this.setState({ start: true })
            // 分享初始化
            shareInit(stepInfo.activityImages, userInfo)
            // 用户id
            this.userId = userInfo.id
        })
    }

    // 提交
    close = e => {
        this.setState({
            show: false,
            userName: '',
            mobile: '',
            smsCode: ''
        });
    }

    // 表单输入变化
    handleInputChange = key => val => {
        this.setState({
            [key]: val
        });
    }
    handleInputBlur = () => {
        setTimeout(() => { window.scrollTo(0, 0) }, 100)
    }

    // 获取验证码
    getCodeBtn = e => {
        let { mobile, codeBtnTxt } = this.state
        mobile = mobile.replace(/\W/g, '')
        if (codeBtnTxt !== '发送') {
            return
        } else if (mobile === '') {
            return Toast.fail('请填写手机号码！', 1.5)
        } else if (!VALIDATE_PHONE_REG.test(mobile)) {
            return Toast.fail('请输入正确的手机号码！', 1.5);
        }
        this.setState({ animating: true })

        http.post(apis.getCode, { mobile }).then(res => {
            Toast.success('发送成功！');
            // 标记为已发送过验证码
            this.sendFlg = true;
            this.setState({
                codeBtnTxt: '59s',
                animating: false
            });
            // 设置倒计时
            this.timeId = setInterval(e => {
                // 获取当前按钮文字，判断是否可以重新发送
                const num = this.state.codeBtnTxt.replace(/\D/ig, "");
                if (num === '1') {
                    window.clearInterval(this.timeId);
                    return this.setState({ codeBtnTxt: '发送' });
                }
                this.setState({ codeBtnTxt: num - 1 + 's' });
            }, 1050);
        }).catch(err => {
            this.setState({ animating: false })
            console.log(err);
        })
    }

    // 提交
    handleSubmit = e => {
        let { userName, mobile, smsCode } = this.state
        mobile = mobile.replace(/\W/g, '');
        if (userName === '') {
            return Toast.fail('请填写姓名！', 1.5)
        } else if (mobile === '') {
            return Toast.fail('请先填写手机号码！', 1.5)
        } else if (!VALIDATE_PHONE_REG.test(mobile)) {
            return Toast.fail('请输入正确的手机号码！', 1.5)
        } else if (!this.sendFlg) {
            return Toast.fail('请先获取验证码！', 1.5)
        } else if (smsCode === '') {
            return Toast.fail('请先填写验证码！', 1.5)
        }
        this.setState({ animating: true })
        http.post(apis.submit, {
            mobile,
            activityId,
            smsCode,
            userName,
            userId: this.userId,
            type: 2,
            step: 3
        }).then(res => {
            window.location.replace('/newyear/suc')
        }).catch(err => {
            this.setState({ animating: false })
            console.log(err);
        })
    }

    render() {
        const { state, handleSubmit, handleInputChange, close, getCodeBtn, handleInputBlur } = this
        const { start, show, userName, mobile, smsCode, codeBtnTxt, animating } = state
        return start && (
            <section className="acrform" style={{ backgroundImage: `url(${bg4})` }}>
                <ActivityIndicator toast text="正在提交" animating={animating}/>
                <img className="logo" src={logo1} alt=""/>
                <div className="title">
                    <div className="tit1">福袋幸运值已蓄满</div>
                    <div className="tit2">大奖即刻开启</div>
                </div>
                <img src={fudai} alt="" className="fudai"/>
                <Button className="showBtn" onClick={() => this.setState({ show: true })}>
                    <img src={kaiqi} alt="" className="showBtnImg"/>
                </Button>
                <Modal
                    visible={show}
                    transparent
                    maskClosable={false}
                    className='formWrap'
                >
                    <section className="form">
                        <div className="formTit">请填写信息</div>
                        <div className="formSubTit">(便于相关奖品发放，不会泄露隐私)</div>
                        <List className="formList">
                            <InputItem
                                className="formItem"
                                maxLength="15"
                                onChange={handleInputChange('userName')}
                                onBlur={handleInputBlur}
                                value={userName}
                            >姓名</InputItem>
                            <InputItem
                                className="formItem"
                                type="phone"
                                onChange={handleInputChange('mobile')}
                                onBlur={handleInputBlur}
                                value={mobile}
                                extra={<a href="javascript:void(0);" className="getCodeBtn"
                                          onClick={getCodeBtn}>{codeBtnTxt}</a>}
                            >手机</InputItem>
                            <InputItem
                                className="formItem"
                                maxLength="6"
                                onChange={handleInputChange('smsCode')}
                                onBlur={handleInputBlur}
                                value={smsCode}
                            >验证码</InputItem>
                        </List>
                        <Button className="showBtn" onClick={handleSubmit}>提交</Button>
                    </section>
                    <img src={guanbi} alt="" className="clsImg" onClick={close}/>
                </Modal>
            </section>
        )
    }

}

export default NewYearActFrom;
