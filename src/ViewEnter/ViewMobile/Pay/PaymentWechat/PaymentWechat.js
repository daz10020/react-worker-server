import React, { Component } from 'react';
import { $http, plus, GetQueryString } from '@function/Function';
import { Toast, ActivityIndicator,Modal } from 'antd-mobile';
import './PaymentWechat.less';
import {viewAuthorize} from '@components/Mobile/onlinePay/common'

class PaymentWechat extends Component {
    constructor(props) {
        super(props);
        this.state = {
          fail:'none',
          mask:'none',
          payText:'尚未获取支付结果',
          payStatus:'',
          content:'none',
          animating: true,
          payurl:'javascript:void(0)',
          authority:false,
          authorityText:'请重新登录！',
        }
        //订单号
        this.orderNo=GetQueryString("orderNo");
        this.payTotalOrderCnt=GetQueryString("payTotalOrderCnt");
      }
    componentDidMount(){
        plus.rem();
        this.payResult(true);
    }

    // 调微信接口
    weixin(){  
      this.setState({
        animating: true
      }) 
      $http.get(this, {
        url: "/pay/weixinpay/front/order",
        dataType: "json",
        data:{orderNo : this.orderNo,payTotalOrderCnt:this.payTotalOrderCnt},
        success: function (res) {
          let url = res.data.mweb_url
          if( url ){
            this.setState({
              content: 'block',
              animating: false,
              payurl:url
            })            
          }else{
            this.setState({
              animating: false,
              payurl:'javascript:void(0)'
            }) 
            Toast.info('系统繁忙，请稍候重试', 1);
          }
        },
        error:function(err){
          this.setState({
            content: 'block',
            animating: false
          }) 
         
        }        
      });
    }
    //   点击支付完成
    payComplete=()=>{
        this.setState({
          mask:'block',
          fail:'block',
        })
        if(this.state.payStatus == 1){
            this.setState({
                payText:'支付成功'
            })
        }else{
            this.setState({
                payText:'尚未取得支付结果'
            })
        }
    }
    // 重新支付
    rePay=()=>{
      // this.props.history.goBack();
      if(this.state.payStatus){
        //支付完成
        Toast.info('订单已支付！', 1);
        return;
      }else{
        this.weixin()
      }
     
    }
    // 点击查询支付结果
  payResult=(isinit)=>{  
    const localCode=localStorage.getItem('vertifyCode'); 
    this.setState({
      animating:true
    })
    $http.get(this,{
      url:'/live/order/front/selectOrderDetail',
      dataType: "json",
      data:{
        orderNo:this.orderNo,
        vertifyCode:localCode
      },
      success: function (res) {  
        this.setState({
          animating: false,
        })
        const data=res.data; 
        if(data){
          if(!viewAuthorize(this,res,localCode)) return;
          if(data.orderSubList){
            //分笔
            let splitOrderData=data.orderSubList.map(item=>(item.orderNo));
            const index=splitOrderData.indexOf(this.orderNo);
            const currentSubPayStatus=data.orderSubList.map(item=>(item.payStatus))[index];
            this.setState({
              content: 'block',
              payStatus:currentSubPayStatus,
            })
          
           if(currentSubPayStatus==1){//1为支付成功 0为支付失败
             if(!isinit){//查询结果
               this.props.history.push({
                 pathname:`/payment/?orderNo=${this.orderNo}`,
               });
             }else{
               this.setState({
                 payurl:'javascript:void(0)'
               })
             }
           }else{//支付状态是0
             this.weixin()
           } 
         }else{//单笔
           // 1为支付成功，0为未支付  
           if(data.payStatus == 1){
             this.props.history.push({
               pathname:`/payment/?orderNo=${this.orderNo}`,
             });
           }else{
             this.weixin()
           }   
         }
        }
      }
    })    
  }
  //判断是否提示支付成功
  judgeStatus=()=>{
    if(this.state.payurl=='javascript:void(0)'&&this.state.payStatus==1){
      Toast.info('此订单已支付成功！', 1);
    }
  }
  //关闭模态框，跳转登录页
  closeModal=()=>{
    this.setState({
      authority:false
    })
    this.props.history.push({
      pathname:'/paylogin',
    });
    
  }
    render() {
        return (
            <div className="fail-wrap" style={{display:this.state.content}}>
                <ActivityIndicator
                    toast
                    text="Loading..."
                    size="large"
                    animating={this.state.animating}
                />
                <section className="fail-header">
                    支付中心
                </section>
                <section className="fail-content">
                    <div className="fail-box">
                        <p>1.如果已完成支付，请点击<span>支付完成</span>按钮；</p>
                        <p>2.如果未打开微信客户端或者未完成支付，请点击<span>立即支付</span>按钮继续支付。</p>
                        <div>
                          <button onClick={this.payComplete} className="payImitate">支付完成</button>
                          <a href={this.state.payurl} className="search-pay" onClick={this.judgeStatus.bind(this)}  >立即支付</a>
                        </div>
                    </div>
                </section>
                <div className="dialog-mask" style={{display:this.state.mask}} onClick={this.closeDialog}></div>
                <section className="dialog-fail" style={{display:this.state.fail}}>
                <div className="fail-box">
                    <h2>{this.state.payText}</h2>
                    <p>若已完成支付，可稍后再次查询支付结果； 若未完成支付，点击立即支付</p>
                    <a href={this.state.payurl} onClick={this.judgeStatus.bind(this)} className="payImitate">立即支付</a>
                    <button onClick={this.payResult.bind(this,false)} className="search-pay">查询支付结果</button>
                </div>
                </section>
                <Modal
                  visible={this.state.authority}
                  transparent
                  maskClosable={false}
                  title="提示"
                  footer={[{ text: '确定', onPress: () => { this.closeModal(); } }]}
                >
                  <p>{this.state.authorityText}</p>
                </Modal>
            </div> 
        )
    }
}
export default PaymentWechat;