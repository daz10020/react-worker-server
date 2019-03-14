import './PayLogin.less';
import { VALIDATE_PHONE_REG,$http,plus} from '@function/Function';
import PopupFrame from '@components/Mobile/onlinePay/PopupFrame/PopupFrame'
import {go,loading,orderlistUpdate,telResultCode} from '@components/Mobile/onlinePay/common'

import React, { Component } from 'react';
import { Form, Input, Button } from 'antd';
import { Toast,ActivityIndicator } from 'antd-mobile';

const FormItem = Form.Item;

const apis = {
    // 获取验证码
    getCode: '/live/order/front/sendSMSOrder',
    // 登陆
    login: '/live/order/front/payLoginGetOrderList',
}


class PayLoginForm extends Component {
    constructor() {
        super();
        this.state = {
            codeBtn: "获取验证码",
            orderlist:[],
            choseIndex:null,
            getcode:false,
            animating:false
        }
    }
    componentWillMount(){
        plus.rem()
    }
    // 发送验证码
    sendCode = e =>{
        this.props.form.validateFields(['tel'],{},(err, values)=>{
            if (!err) {
                loading(this,true)
                $http.get(this, {
                    url: apis.getCode,
                    dataType: "json",
                    data: values,
                    success: function (res) {
                        loading(this,false)
                        if(res.success==true){
                            this.setState({
                                getcode:true
                            })
                            if(res.data.success==false){
                                // 没有待支付订单
                                orderlistUpdate(this,null)
                                return;
                            }else{
                                Toast.success('获取成功！');
                                this.setState({
                                    codeBtn: '59s'
                                });
                                this.timeId = setInterval(e => {
                                    const num = this.state.codeBtn.replace(/\D/ig,"");
                                    if (num === '1') {
                                        window.clearInterval(this.timeId);
                                        return this.setState({
                                            codeBtn: '获取验证码',
                                        });
                                    }
                                    this.setState({
                                        codeBtn: num - 1 + 's',
                                    });
                                }, 1050);
                            }
                        }else{
                            // 返回错误
                            Toast.info(res.msg, 1);
                           
                        }
                    },
                    error:function(err){
                        // 请求错误
                        Toast.fail(err.message, 2);
                        loading(this,false)
                    }  
                });
            }
        })
    }
    // 提交订单
    handleSubmit = e => {
        e.preventDefault();
        const { props: { form, history } } = this;
        if(!this.state.getcode){
            Toast.info('请获取验证码！', 1);
            return;
        }
        form.validateFields((err, values) => {
            if (!err) {
                loading(this,true)
                $http.get(this, {
                    url: apis.login,
                    dataType: "json",
                    data: values,
                    success: function (res) {
                        loading(this,false)
                        const {data,success}=res;
                        if(success){
                            telResultCode(this,data)
                        }else{
                            Toast.fail("验证码输入错误！", 2);
                        }
                    },
                    error:function(err){
                        // 请求错误
                        Toast.fail(err.message, 2);
                        loading(this,false)
                    } 
                });
            }
        });
    }
    // 选择订单
    switchIndex(index){
        go(this,this.state.orderlist[index])
    }
    render() {
        const {codeBtn,orderlist,choseIndex,animating}=this.state;
        const {form: { getFieldDecorator} }=this.props;
        const formItemLayout = {
            labelCol: {
              xs: { span: 4 },
              sm: { span: 4 },
            },
            wrapperCol: {
              xs: { span: 20 },
              sm: { span: 20 },
            },
          };
        return (
            <div className="paylogin-wrap">
                <ActivityIndicator
                    toast
                    text="Loading..."
                    size="large"
                    animating={animating}
                />
                <header>支付登陆</header>
                <section className="paylogin-content">
                    <div className="paylogin-box">
                        <h1>支付登陆</h1>
                        <Form className='form' onSubmit={this.handleSubmit}>
                            <FormItem 
                                className='formitem' 
                                label="手机号" 
                                {...formItemLayout}
                            >
                                {getFieldDecorator('tel',{
                                    rules:[{
                                        required: true,
                                        message:'请输入正确的手机号！',
                                        pattern:VALIDATE_PHONE_REG
                                    }],
                                    validateTrigger: 'onBlur'
                                })(
                                    <Input
                                        type='phone'
                                        placeholder='请输入手机号'
                                        className="inp"
                                    />
                                )}
                            </FormItem>
                            <FormItem 
                                className='formitem' 
                                label="验证码"
                                {...formItemLayout}
                            >
                                {getFieldDecorator('code',{
                                    rules:[{
                                        required: true,
                                        message:'请输入验证码！',
                                    }],
                                    validateTrigger: 'onBlur'
                                })(
                                    <Input
                                        placeholder='请输入验证码'
                                        className="inp"
                                        suffix={
                                            <a href="javascript:void(0);" className={`sendBtn ${codeBtn !== '获取验证码' ? 'disabled' : ''}`} onClick={this.sendCode}>{codeBtn}</a>
                                        }
                                    />
                                )}
                            </FormItem>
                            <FormItem className="formbtn">
                                <Button 
                                    className='diabtn'
                                    htmlType="submit"
                                >进入订单</Button>
                            </FormItem>
                        </Form>
                    </div>
                </section>
                {orderlist===null
                    && 
                <PopupFrame>
                    <div className="error-tip">
                        <h2>错误提示</h2>
                        <p>对不起，此手机号没有待支付订单，请重新输入！</p>
                        <button onClick={()=>{orderlistUpdate(this,[])}}>返回重试</button>
                    </div>
                </PopupFrame>
                }
                {Array.isArray(orderlist)&&orderlist.length>1
                    &&
                <PopupFrame>
                    <div className='ordercont'>
                        <h1><i></i>您有多笔订单！</h1>
                        <h2>请进行选择支付</h2>
                        <ul>
                            {orderlist.map((item,index)=>(
                                <li key={index} className={choseIndex===index?'active':''} onClick={this.switchIndex.bind(this,index)}>
                                    <p>订单编号：{item.orderNo}</p>
                                    <h1>待支付总金额：<span>{item.actualPrice}</span>元</h1>
                                    <i></i>
                                </li>
                            ))}
                        </ul>
                    </div>
                </PopupFrame>
                }
            </div>
        )
    }
}
const PayLogin = Form.create()(PayLoginForm);
export default PayLogin;