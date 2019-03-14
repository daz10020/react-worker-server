
import React,{Component} from 'react'
import { Toast} from 'antd-mobile';

// 跳转 并保存验证码
export const go=(that,item)=>{
    localStorage.setItem('vertifyCode',item.vertifyCode);
    that.props.history.push({
        pathname:`/payment/?orderNo=${item.orderNo}`,
    }); 
}

// loading
export const loading=(that,state)=>{
    that.setState({
        animating:state
    })
}

// 更新orderlist
export const orderlistUpdate = (that,data) => {
    that.setState({
        orderlist:data
    })
}

// 手机号 查询订单状态 
export const telResultCode=(that,data)=>{
    switch (data.resultCode){
        // 参数正确
        case 0:
            if(data.orderList.length===1){
                go(that,{orderNo:data.orderList[0].orderNo,vertifyCode:data.orderList[0].vertifyCode})
            }else{
                orderlistUpdate(that,data.orderList)
            }
           break;
       // 参数正确，无待支付订单
       case 1:
           orderlistUpdate(that,null) 
           break;
       // 验证码错误
       case 3:
           Toast.fail('验证码错误，请重新输入！', 2);
           break;
   }
}

// 订单识别码 查询订单状态 
export const codeResultCode=(that,data)=>{
    switch (data.resultCode){
        // 参数正确
        case 0:
           go(that,{orderNo:data.orderNo,vertifyCode:data.vertifyCode})
           break;
       // 参数正确，无待支付订单
       case 1:
           orderlistUpdate(that,null) 
           break;
       // 订单号错误
       case 2:
           Toast.fail('访问地址错误，请联系管理员！', 2);
           break;
       // 订单识别码错误
       case 3:
           Toast.fail('订单识别码错误，请重新输入！', 2);
           break;
   }
}

// 查看权限
export const viewAuthorize=(that,res,localCode)=>{
    if(res.data.hasOwnProperty('vertifyCode')){
        if(localCode!==res.data.vertifyCode){
            that.setState({
                animating:false,
                authority:true,
                authorityText:'请重新登录！',
                paylogintype:res.data.loginType
            })
            return false;
        }else{
            that.setState({
                animating:false,
            })
            return true
        }
      }else{
        that.setState({
          animating:false,
          authority:true,
          authorityText:'订单号不存在!',
          paylogintype:0
        })
        return false;
      }
}

//关闭模态框，跳转登录页
export const closeModal=(that,orderno)=>{
    that.setState({
        authority:false
    })
    if(that.logintype===0||that.logintype===undefined){
        // 没返回也跳转手机号登录
        that.props.history.push({
            pathname:'/paylogin',
        });
    }else{
        that.props.history.push({
            pathname:'/codepaylogin?orderNo='+orderno,
        });
    }
  }

// 判断微信内置浏览器
export function isWeixinBrowser() {
    var agent = navigator.userAgent.toLowerCase();
    if (agent.match(/MicroMessenger/i) == "micromessenger") {
        alert('请使用微信以外的手机浏览器访问！')
    }
}