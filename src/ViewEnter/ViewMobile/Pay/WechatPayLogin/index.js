import './style.less';
import {$http, Trim,GetQueryString,plus } from '@function/Function';
import PopupFrame from '@components/Mobile/onlinePay/PopupFrame/PopupFrame'
import {loading,codeResultCode,orderlistUpdate} from '@components/Mobile/onlinePay/common'

import React, { Component } from 'react';
import { Form, Input, Button} from 'antd';
import { Toast, ActivityIndicator } from 'antd-mobile';

const FormItem = Form.Item;

const apis = {
    // 登陆
    login: '/live/order/front/lianJie',
}

class WechatPayLoginForm extends Component {
    constructor() {
        super();
        this.state = {
            orderlist:'',
            animating: false,
        }
         //订单号
        this.orderNo=GetQueryString("orderNo");
    }
    componentDidMount(){
        plus.rem();
    }
    // 提交订单
    handleSubmit = e => {
        e.preventDefault();
        const { props: { form, history } } = this;
        form.validateFields((err, values) => {
            if (!err) {
                loading(this,true)
                $http.get(this, {
                    url: apis.login,
                    dataType: "json",
                    data: {
                        orderNo:this.orderNo,
                        loginCode:values.loginCode
                    },
                    success: function (res) {
                        loading(this,false)
                        const {success,data}=res;
                        if(success){
                            codeResultCode(this,data)
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
    render() {
        const {animating,orderlist}=this.state;
        const {form: { getFieldDecorator} }=this.props;
        const formItemLayout = {
            labelCol: {
              xs: { span: 6 },
              sm: { span: 6 },
            },
            wrapperCol: {
              xs: { span: 18 },
              sm: { span: 18 },
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
                                label="订单识别码"
                                {...formItemLayout}
                            >
                                {getFieldDecorator('loginCode',{
                                    rules:[{
                                        required: true,
                                        message:'请输入订单识别码！',
                                    }],
                                    validateTrigger: 'onBlur'
                                })(
                                    <Input
                                        placeholder='请输入订单识别码'
                                        className="inp"
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
                        {orderlist===null
                            && 
                        <PopupFrame>
                            <div className="error-tip">
                                <h2>提示</h2>
                                <p>此订单识别码没有待支付订单！</p>
                                <button onClick={()=>{orderlistUpdate(this,[])}}>返回</button>
                            </div>
                        </PopupFrame>
                        }
                    </div>
                </section>
                
            </div>
        )
    }
}

const WechatPayLogin = Form.create()(WechatPayLoginForm);
export default WechatPayLogin;