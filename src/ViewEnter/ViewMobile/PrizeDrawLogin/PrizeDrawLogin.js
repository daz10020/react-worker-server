import './PrizeDrawLogin.less';
import logo from '@picture/logo.png';
import { Images } from './images.js';
import { enterType, VALIDATE_PHONE_REG, plus, shareconfig } from '@function/Function';
import http  from '@function/ActHttp';

import React, { Component } from 'react';
import { Form, Input, Button } from 'antd';
import { Toast } from 'antd-mobile';

const FormItem = Form.Item;

const shareObj = {
    title: '100%中奖，更有免单大奖等你领！菠萝在线2018年终超级福利', // 分享标题
    desc: '菠萝在线国际课程线上一对一_Alevel培训|AP培训|IB培训_国际学校排名', // 分享描述
    imgUrl: window.location.protocol + "//" + window.location.host + logo, // 分享图标
    type: '', // 分享类型,music、video或link，不填默认为link
    dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
};

const apis = {
    // 获取验证码
    getCode: '/web/activity/smsSend',
    // 登陆
    login: '/web/activity/smsLogin',
}

class PrizeDrawFrom extends Component {
    constructor() {
        super();
        this.state = {
            codeBtnTxt: '获取验证码',
        };
        this.timeId = 0;
    }

    componentWillMount() {
        enterType.call(document);

        const nobj = Object.assign(shareObj, {url: shareconfig()})
        plus.WeChat(["onMenuShareAppMessage","onMenuShareTimeline"], function (wx) {
            wx.onMenuShareAppMessage(nobj);
            wx.onMenuShareTimeline(nobj);
        });
    }

    componentDidMount() {
    }
    // 提交表单
    handleSubmit = e => {
        e.preventDefault();
        const { props: { form, history } } = this;
        form.validateFields((err, values) => {
            if (!err) {
                http.post(apis.login, {
                    ...values
                }).then(res => {
                    const { msg, success, data } = res;
                    if (success) {
                        const { mobile, userName } = values;
                        window.sessionStorage.setItem('prizeDraw', JSON.stringify({
                            mobile,
                            userName
                        }));
                        history.push({
                            pathname: `/prizeDrawIndex/`,
                        });
                    } else {
                        Toast.fail(msg);
                    }
                })
            }
        });
    }

    // 清空姓名
    emitEmptyUserName = e => {
        this.props.form.resetFields('userName');
    }
    // 清空手机号
    emitEmptyPhone = e => {
        this.props.form.resetFields('mobile');
    }

    // 发送验证码
    sendCode = e => {
        this.props.form.validateFields(['mobile', 'userName'], { force: true }, (err, values) => {
            if (!err) {
                http.post(apis.getCode, {
                    ...values
                }).then(res => {
                    Toast.success('获取成功！');
                    this.setState({
                        codeBtnTxt: '59s'
                    });
                    this.timeId = setInterval(e => {
                        const num = this.state.codeBtnTxt.replace(/\D/ig,"");
                        if (num === '1') {
                            window.clearInterval(this.timeId);
                            return this.setState({
                                codeBtnTxt: '获取验证码',
                            });
                        }
                        this.setState({
                            codeBtnTxt: num - 1 + 's',
                        });
                    }, 1050);
                }).catch(err => {
                    console.log(err);
                })
            }
        });
    }

    render() {
        const { form: { getFieldDecorator } } = this.props;
        const {
            codeBtnTxt,
        } = this.state;

        return (
            <section className="PrizeDrawLogin">
                <img src={Images.logo} alt="" className="logo"/>
                <Form onSubmit={this.handleSubmit} className="form">
                    <FormItem className="formItem">
                        {getFieldDecorator('userName', {
                            rules: [{
                                required: true,
                                message: '请输入姓名！',
                            }],
                        })(
                            <Input
                                placeholder="请输入姓名"
                                className="inp"
                                suffix={
                                    <a href="javascript:void(0);" onClick={this.emitEmptyUserName}>
                                        <img src={Images.empty} alt="" className="emptyIcon" />
                                    </a>
                                }
                            />
                        )}
                    </FormItem>
                    <FormItem className="formItem">
                        {getFieldDecorator('mobile', {
                            rules: [{
                                required: true,
                                message: '请输入正确的手机号码！',
                                pattern: VALIDATE_PHONE_REG
                            }],
                            validateTrigger: 'onBlur'
                        })(
                            <Input
                                type="phone"
                                placeholder="请输入手机号"
                                className="inp"
                                suffix={
                                    <a href="javascript:void(0);" onClick={this.emitEmptyPhone}>
                                        <img src={Images.empty} alt="" className="emptyIcon" />
                                    </a>
                                }
                            />
                        )}
                    </FormItem>
                    <FormItem className="formItem">
                        {getFieldDecorator('code', {
                            rules: [{
                                required: true,
                                message: '请输入验证码！',
                            }],
                        })(
                            <Input
                                placeholder="请输入验证码"
                                className="inp codeInp"
                                suffix={
                                    <span className={`sendBtn ${codeBtnTxt !== '获取验证码' ? 'dis' : ''}`} onClick={this.sendCode}>{codeBtnTxt}</span>
                                }
                            />
                        )}
                    </FormItem>
                    <FormItem className="footer">
                        <Button className="diaBtn" htmlType="submit">登录</Button>
                    </FormItem>
                </Form>
            </section>
        )
    }
}

const PrizeDrawLogin = Form.create()(PrizeDrawFrom);
export default PrizeDrawLogin;