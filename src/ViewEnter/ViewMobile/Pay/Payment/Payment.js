import React, { Component } from 'react';
import {Images} from './images';
import './Payment.less';
import $ from 'jquery';
import {Message} from 'element-react';
import { ActivityIndicator,Modal } from 'antd-mobile';
import {Link} from 'react-router-dom';
import { $http, plus, GetQueryString } from '@function/Function';
import {viewAuthorize,closeModal} from '@components/Mobile/onlinePay/common'

class Payment extends Component {
  constructor(props) {
    super(props);
		this.state = {
      //选择付款方式：微信wx、支付宝zfb
      chosePayMethod:null,
      xyState:true,
      agreement:'none',
      mask:'none',
      success:'none',
      fail:'none',      
      payText:'尚未获取支付结果',
      courseContent:[],
      action:'',
      value:'',
      payStatus:'',
      teacherName:'',
      teacherTel:'',
      animating: true,
      //分笔支付
      splitPayment:false,
      splitData:null,
      hasPayNo:0,
      payedOrderAmt:0,//已支付的订单金额
      mainOrder:null,
      Obj:{
        discountPrice:'0',
        discountHour:'0',
        actualPrice:'0',
        totalHour:'0',
        data:[],
      },
      orientation:window.orientation,
      authority:false,
      authorityText:'请重新登录！',
      paylogintype:0,
		};
    //订单号
    this.orderId=GetQueryString("orderNo");
    
	};
  componentDidMount(){
    plus.rem();
    this._loadData();
    //旋转屏幕 重新加载
    window.addEventListener("orientationchange", function() {
      window.location.reload();
    }, false);
  }


  // 页面加载数据
  //点击立即支付按钮，会先执行查询操作，成功后执行回调
  _loadData(callback){ 
    const localCode=localStorage.getItem('vertifyCode');
    this.setState({
      animating:true
    })
    $http.get(this,{
      url:'/live/order/front/selectOrderDetail',
      dataType: "json",
      data:{
        orderNo:this.orderId,
        vertifyCode:localCode
      },
      success: function (res) {
        this.setState({
          animating:false
        })
        if(!viewAuthorize(this,res,localCode)) return;
        const data=res.data;
        if(data){
          if(data.orderSubList){
            //分笔
            this.setState({
              splitPayment:true,//是否分笔 状态
              splitData:data.orderSubList,//分笔数据
              hasPayNo:data.payedOrderCnt,//已经支付的笔数
              payedOrderAmt:data.payedOrderAmt,//已支付的订单金额
              nopayOrderAmt:data.nopayOrderAmt,//未支付
              mainOrder:data.orderNo,//主订单号
            })
            //从支付结果返回的情况 
            //点击立即支付 更新数据但不提示支付状态弹框
            if((this.orderId!=data.orderNo)&&!callback){//地址栏订单和主订单不同 以此判断支付返回
              let splitOrderData=data.orderSubList.map(item=>(item.orderNo));
              const index=splitOrderData.indexOf(this.orderId);
              const currentSubPayStatus=data.orderSubList.map(item=>(item.payStatus))[index];
              if(currentSubPayStatus){//1为支付成功 0为支付失败
                this.setState({
                  payStatus: currentSubPayStatus,
                  payText:'支付成功',
                  mask:'block',
                  agreement:'none',     
                  success:'block',
                  fail:'none'
                })
              }else{
                this.setState({
                  mask:'block',
                  fail:'block'
                })
              }
            }else{//访问主订单地址 支付完成的情况需要弹窗
              if(data.nopayOrderAmt==0){
                this.setState({
                  payStatus: 1,
                  payText:'支付成功',
                  mask:'block',
                  agreement:'none',     
                  success:'block',
                  fail:'none',
                })
              }
            }
          }else{//不分割订单的情况
            this.setState({
              splitPayment:false,//是否分笔状态
            })
            //支付状态 支付成功:1 未支付:0
            let payStatus = data.payStatus;
            if(payStatus == 1){
              this.setState({
                payStatus: data.payStatus,
                payText:'支付成功',
                mask:'block',
                agreement:'none',     
                success:'block',
                fail:'none',
                nopayOrderAmt:data.nopayOrderAmt
              })
            }else{
            if(window.location.href.indexOf('out_trade_no')!=-1){//返回地址
              this.setState({
                mask:'block',
                fail:'block'
              })
            }
          }
          
          }
          this.setState({
            animating:false,
              teacherName:data.employeeName,
              teacherTel:data.salePhone,
              Obj:{
                discountPrice:data.discountPrice||0,//折扣金额
                discountHour:data.presentHour||0,//赠送课时
                actualPrice:data.actualPrice||0,//实际需支付金额
                totalHour:data.totalHour||0,//合计时长
                data:data.detailList,//课程详情
              } 
          },function(){
            if(callback){
              callback()
            }
          })
        }
      }
    })
  }
  //支付方式选择
  switchPayMethod=(type)=>{
    this.setState({
      chosePayMethod:type
    })
  }
 
  // 点击弹出购买协议
  xyClick=()=>{
    this.setState({
      agreement:'block',
      mask:'block',
    })    
  }
  // 点击关闭弹窗
  closeDialog=()=>{
    this.setState({
      mask:'none',
      agreement:'none',     
      success:'none',
    }) 
  }
  // 点击同意购买协议
  agree=()=>{
    this.setState({
      xyState:true,
      mask:'none',
      agreement:'none'
    }) 
  }
  // 点击不同意购买协议
  disagree=()=>{
    this.setState({
      xyState:false,
      mask:'none',
      agreement:'none'
    }) 
  }
  // 点击查询支付结果
  payResult=()=>{  
    this._loadData()
  }
  // 点击支付完成
  payComplete=()=>{
    this.setState({
      mask:'block',
      fail:'block'
    })
  }

  // 点击重新支付
  rePay=()=>{
    this.setState({
      mask:'none',
      fail:'none'
    })
  }
  
  // 点击立即支付
  submitClick=(orderNo,payTotalOrderCnt)=>{
    if(this.state.xyState == false){
      Message('请同意购买协议');
      return;
    }
    //支付前先查询
    this._loadData(()=>{
      //查询订单成功 回调支付
      const postdata={orderNo:orderNo,payTotalOrderCnt:payTotalOrderCnt}
      if(this.state.nopayOrderAmt==0){
        Message('此订单已支付成功');
        return;
      }
      if(this.state.chosePayMethod){
        const chosePayMethod=this.state.chosePayMethod;
        if(chosePayMethod=='wx'){
          //  微信支付 需要跳转页面 
          this.props.history.push({
            pathname:`/paymentWechat/?orderNo=${orderNo}&payTotalOrderCnt=${payTotalOrderCnt}`,
          });
        }else if(chosePayMethod=='zfb'){
          //  支付宝支付
          this.setState({
            animating:true
          })
          $http.get(this, {
            url: "/live/order/front/pay",
            dataType: "json",
            data:postdata,
            success: function (res) { 
              this.setState({
                action: res.data.action,
                value:  res.data.biz_content,
                animating:false          
              })
              $('input[type="submit"]').click()
            },
            error:function(err){
              alert(err)
            }        
          });
        }
      }else{
        Message('请选择支付方式');
      }
    })
    
    
  }
    
  render() {
    const {Obj,animating,chosePayMethod,teacherName,teacherTel,xyState,success,mask,agreement,splitPayment,splitData,hasPayNo,payedOrderAmt,nopayOrderAmt,mainOrder}=this.state;
    let splitOrderList;//每笔订单
    let splitNum;//总笔数
    let splitPayList;//每笔支付金额
    let orderId=this.orderId//订单名
    let splitCurrentIndex=null;//当前笔 0开始
    let average=false;
    if(splitData){
      if(hasPayNo===splitData.length){//分笔支付完成
        splitCurrentIndex=hasPayNo-1
      }else{
        splitCurrentIndex=hasPayNo
      }
      splitOrderList=splitData.map(item=>(item.orderNo));
      splitNum=splitData.length;
      splitPayList=splitData.map(item=>(item.subOrderAmt));
      if(splitPayList[0]==splitPayList[splitPayList.length-1]){
        average=true;
      }
      orderId=splitOrderList[splitCurrentIndex];
    }
    return (     
      <div className="payment">
        <ActivityIndicator
            toast
            text="Loading..."
            size="large"
            animating={animating}
        />
        <section className="payment-header">
      	 <div className="header">支付中心</div>
      	</section>       
        <section className="payment-content">  
          <div className="payment-content-inner">      
            <div className="course-content">
              <div className="order-number">
                  <p>订单编号：<span>{orderId}</span></p>
              </div>
              <div className="order-list">
                <div className="order-course">
                {/* 课程列表 */}
                  <ul>
                    {
                      Obj.data.map((item,index)=>
                      <li key={index}>
                        <div className="course-box">
                          <div className="course-img"><img src={$http.URL+item.path}/></div>  
                          <div className="course-text">
                            <p className="course-name">{item.classTypeName}课程</p>
                            <p className="course-hour">共<span>{item.hour}</span>节课时</p>
                            <p className="course-price"><span>¥{item.price*item.hour}</span></p>
                          </div>
                        </div>
                      </li>
                    )}
                  </ul>
                    {/* 分笔支付 均分*/}
                    {(splitPayment && average)&&
                      <div className='tips'>
                        <i className='blue'>分笔支付</i>
                        <p className='red'>此订单支付方式为分笔支付，支付共分为<span>{splitNum}</span>笔，每笔支付金额为<span>¥{splitPayList[0]}</span></p>
                      </div>
                    }
                    {/* 分笔支付 不均分*/}
                    {(splitPayment && !average)&&
                      <div className='tips'>
                        <i className='blue'>分笔支付</i>
                        <p className='red'>此订单支付方式为分笔支付，支付共分为<span>{splitNum}</span>笔，前{splitNum-1}笔每笔<span>{splitPayList[0]}元</span>，最后1笔支付金额为<span>{splitPayList[splitNum-1]}元</span></p>
                      </div>
                    }
                 
                  {/* 优惠 */}
                  <div className="tips">
                    <i>优惠</i>
                    <p>已优惠<span>{Obj.discountPrice}</span>元，赠送<span>{Obj.discountHour}</span>节课时</p>
                  </div>
                </div>
              </div>       
            </div>
            <div className="payment-type-box">
              <div className="payment-type-title">支付方式</div>
              <div className="payment-type">
                <div className={chosePayMethod=='wx' ? "active" : ""} onClick={this.switchPayMethod.bind(this,'wx')} >
                  <div className="zf-inner">
                    <div className="zf-icon"><img src={Images.wx}/></div>
                    <div className="zf-text">
                      <h2>微信支付</h2>
                      <p>微信安全支付</p>
                    </div>
                    <div className="zf-radio">
                      <span></span>
                    </div>
                  </div>
                </div>             
                <div onClick={this.switchPayMethod.bind(this,'zfb')} className={chosePayMethod=='zfb' ? "active" : ""} >
                  <div className="zf-inner zf-inner2">
                    <div className="zf-icon"><img src={Images.zfb}/></div>
                    <div className="zf-text">
                      <h2>支付宝支付</h2>
                      <p>支付宝安全支付</p>
                    </div>
                    <div className="zf-radio">
                      <span ></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="consultation">
              <div className="consultation-inner">如有疑问，请联系您的课程顾问：<span>{teacherName}</span> <span className="line"></span><img src={Images.dianhua}/><a href={`tel:${teacherTel}`}>拨打电话</a></div>         
            </div>
            <div className="isagree">
              <p><span className="text1">我已阅读并同意</span><i className={xyState ? "xyIconTrue" : "xyIconFalse"} onClick={this.xyClick}></i><span className="text2" onClick={this.xyClick}>《购买协议》</span></p>
            </div>
          </div>
        </section>
        {splitPayment//是否分笔
        ?<section className="payment-footer">
         <div className="pay-msg"><span className="total-price">¥{splitPayList[splitCurrentIndex]}</span><p>分笔：<span>{splitCurrentIndex+1}</span>/<span>{splitNum}笔</span></p></div>
         <div className="pay-btn">
         <button onClick={this.submitClick.bind(this,orderId,splitCurrentIndex+1)} className={xyState?'':'disablebutton'}>立即支付</button>
         </div>
       </section>
       :<section className="payment-footer">
       <div className="pay-msg"><span className="total-price">¥{this.state.Obj.actualPrice}</span></div>
       <div className="pay-btn">
       <button onClick={this.submitClick.bind(this,orderId,0)} className={xyState?'':'disablebutton'}>立即支付</button>
      </div>
     </section>}
       
        
        <div className="dialog-mask" style={{display:mask}} onClick={this.closeDialog}></div>
        <section className="dialog-agreement" style={{display:agreement}}>
          <div className="agreement-box">
            <h2>购买协议</h2>
            <div className="agreement-content">
              <p>说明：</p>
              <p>1.用户是指具备相应行为能力以及正常学习能力的自然人。</p>
              <p>2.协议内容包括协议正文及所有菠萝在线已经发布的或将来可能发布的各类规则。用户应当遵守菠萝在线已经发布或将来可能发布的各类规则。</p>
              <p>3.用户在使用菠萝在线提供的各项服务的同时，承诺接受并遵守各项相关规则的规定。菠萝在线有权根据需要不时地制定、修改本协议或各类规则，如本协议有任何变更，菠萝在线将在网站上公布。</p>
              <p>请您仔细阅读本须知，支付课程费用意味着您已知悉并遵守本须知。 </p>
              <p>第一部分 课程服务</p>
              <p>1.菠萝在线为用户提供一对一精品在线视频教学或面授服务。</p>
              <p> 2.用户自行配备上网的所需设备，包括个人电脑、调制解调器或其他必备上网装置，并自行负担因使用这种接入方式而产生的上网电话</p>
            </div>
            
            <button className='disagree' onClick={this.disagree}>不同意</button>
            <button className='agree' onClick={this.agree}>同意</button>
          </div>         
        </section>
        
      <section className="dialog-success" style={{display:success}}>
          <div className="success-box">
          <i className='close' onClick={this.closeDialog}></i>
            <p className="success-img"><img src={Images.success}/></p>
            <h2>支付成功</h2>
            {/* 分笔 全部支付 */}
            {splitPayment&&hasPayNo==splitNum&&
            <div className='info'><p className="real-pay">已支付<span>¥{Obj.actualPrice}</span>元</p>
           <button><Link to={`/orderdetail?orderNo=${mainOrder}`}>查看订单详情</Link></button></div>}
           {/* 分笔 部分支付 */}
           {splitPayment&&hasPayNo!=splitNum&&
           <div className='info'><p className="real-pay">已支付<span>¥{payedOrderAmt}</span>元</p>
           <p className="real-pay">还需支付<span>¥{nopayOrderAmt}</span>元</p>
           <button><Link to={`/payment?orderNo=${mainOrder}`}>继续支付</Link></button> </div>}
           {/* 单笔 */}
           {!splitPayment&&
           <div className='info'><p className="real-pay">已支付<span>¥{Obj.actualPrice}</span>元</p>
           <button><Link to={`/orderdetail?orderNo=${this.orderId}`}>查看订单详情</Link></button></div>
           }

             
          </div>
        </section>
      <section className="dialog-fail" style={{display:this.state.fail}}>
        <div className="fail-box">
            <h2>{this.state.payText}</h2>
            <p>若已完成支付，可再次查询支付结果； 若未完成支付，请重新支付</p>
            <button onClick={this.rePay} className="repay">重新支付</button><button onClick={this.payResult} className="search-pay">查询支付结果</button>
        </div>
      </section>             
      <section className="zfb-form">
        <form name="punchout_form" method="post" action={this.state.action}>
          <input type="hidden" name="biz_content" value={this.state.value}/>
          <input type="submit" value="立即支付" style={{display:"none"}}/>
        </form> 
        {/* <xml><return_code><![CDATA[SUCCESS]]></return_code><return_msg><![CDATA[OK]]></return_msg><appid><![CDATA[wx3e8d90a30bb9a23f]]></appid><mch_id><![CDATA[1508226161]]></mch_id><nonce_str><![CDATA[qhf7JTDe4TZk2Iqt]]></nonce_str><sign><![CDATA[BE445FDE46DF593F7E4F7C04399098E2]]></sign><result_code><![CDATA[FAIL]]></result_code><err_code><![CDATA[INVALID_REQUEST]]></err_code><err_code_des><![CDATA[201 商户订单号重复]]></err_code_des><mweb_url><![CDATA[https://wx.tenpay.com/cgi-bin/mmpayweb-bin/checkmweb?prepay_id=&package=3735071344]]></mweb_url></xml> */}
      </section>
      <Modal
          visible={this.state.authority}
          transparent
          maskClosable={false}
          title="提示"
          footer={[{ text: '确定', onPress:  ()=>{closeModal(this,this.orderId)}  }]}
        >
          <p>{this.state.authorityText}</p>
        </Modal>
      </div>
    )
  }
}
export default Payment;