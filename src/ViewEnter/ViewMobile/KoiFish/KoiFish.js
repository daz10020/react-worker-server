//锦鲤活动
import React,{Component} from 'react'
import './KoiFish.less'
import {Images} from './images'
import http  from '@function/ActHttp';
import { Toast } from 'antd-mobile';

const baseurl='https://www.vipboluo.com/'//线上
// const baseurl='https://talkwechat.boluozaixian.com/'//测试

const apis = {
    // 获取头像
    headPortrait: 'web/activity/activityPhotoPage'
}

class KoiFish extends Component{
    constructor(){
        super()
        this.state={
            portraitData:[] ,
            total:''
        }
    }   
    componentDidMount(){
        this.getData();
    }
    getData(){
        const copy=window.config.url1;
        window.config.url1=baseurl;
        let params = {
            pageSize:15,
            pageNum:1,
            activityId:2
          };
        http.post(apis.headPortrait, params).then(sres=>{
            const { success, data}=sres;
            if (success) {
              this.setState({
                portraitData:data.list,
                total: data.total
              })
            } else {
                Toast.fail(data.msg);
            }
            window.config.url1=copy;
        }).catch(res=>{
            window.config.url1=copy;
        })
    }
    render(){
        const {portraitData,total}=this.state
        return(
            <div className='KoiFish'>
                <div className="banner"><img src={Images.banner} alt=""/></div>
                <div className="content">
                    <div className="code">
                        <div><img src={Images.qrcode} alt=""/></div>
                        <p>扫码立即报名</p>
                    </div>
                    <div className="signIn">
                        <p>已有<span>{total?3000+total:''}</span>人参与</p>
                        <ul>
                            {portraitData&&portraitData.map((item,index)=>(
                                <li key={index}>
                                    <img src={item} alt=""/>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}
export default KoiFish;