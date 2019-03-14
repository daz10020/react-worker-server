import React, { Component } from 'react';
import './OrderDetail.less';
import { ActivityIndicator } from 'antd-mobile';
import { $http , plus, GetQueryString  } from '@function/Function';
import { Icon } from 'antd-mobile'
import icon3 from './icon_youhui.png';
class OrderDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orderId:GetQueryString("orderNo"),
      animation:true,
      Obj:{
        discountPrice:'0',
        discountHour:'0',
        actualPrice:'0',
        totalHour:'0',
        data:[],
        splitPayment:true,//分笔支付
        splitNum:3,//笔数
        splitPriceEach:0,//每笔费用
      }
    }
  }
  componentDidMount(){
    plus.rem();
    this._loadData();
  }
  _loadData(){ 
    const localCode=localStorage.getItem('vertifyCode');
    $http.get(this,{
      url:'/live/order/front/selectOrderDetail',
      dataType: "json",
      data:{
        orderNo:this.state.orderId,
        vertifyCode:localCode
      },
      success: function (res) {
        this.setState({
          animating:false,
          Obj:{
            discountPrice:res.data.discountPrice ? res.data.discountPrice : 0,
            discountHour:res.data.presentHour ? res.data.presentHour :0,
            actualPrice:res.data.actualPrice ? res.data.actualPrice :0,
            totalHour:res.data.totalHour ? res.data.totalHour :0,
            data:res.data.detailList
          }                  
        })
      },
    })
  }
  back=()=>{
    this.props.history.goBack();
  }
  
  render() {
    const {splitPayment,splitNum,splitPriceEach,animating}=this.state;
    return (
      <div className="order-box">
      <ActivityIndicator
            toast
            text="Loading..."
            size="large"
            animating={animating}
        />
      	<section className="order-header">
      	 <div className="header">
          <span onClick={this.back}><Icon type="left" size="md"></Icon></span>
          订单详情
         </div>
      	</section>
        <section className="payment-content">
          <div className="price">
            <p>订单支付成功！支付总金额：<span>￥{this.state.Obj.actualPrice}</span></p>
          </div>
          <div className="order-list">
            <div className="order-number">
              <p>订单编号：<span>{this.state.orderId}</span></p>
            </div>
            <div className="order-course">
              <ul>
              {
                this.state.Obj.data.map((item,index)=>
                <li key={index}>
                  <div className="course-box">
                    <div className="course-img"><img src={$http.URL+item.path}/></div>  
                    <div className="course-text">
                      <p className="course-name">{item.classTypeName}课程</p>
                      <p className="course-hour">共<span>{item.hour}</span>节课时</p>
                      <p className="course-price"><span>￥{item.price*item.hour}</span></p>
                    </div>
                  </div>
                </li>
              )}
              </ul>
              {/* 分笔支付 */}
              {splitPayment && 
                <div className='tips'>
                  <i className='blue'>分笔支付</i>
                  <p>此订单支付方式为分笔支付，支付共分为<span>{splitNum}</span>笔，每笔支付金额为￥<span>{splitPriceEach}</span>元。</p>
                </div>
              }
              <div className="discount">
                <p><i><img src={icon3}/></i>已优惠<span>{this.state.Obj.discountPrice}</span>元，赠送<span>{this.state.Obj.discountHour}</span>节课时</p>
              </div>
            </div>
          </div>
        </section>  
                
      </div>     
    )
  }
}

export default OrderDetail;