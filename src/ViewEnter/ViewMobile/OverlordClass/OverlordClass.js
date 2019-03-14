import React, { Component } from 'react';
import './OverlordClass.less';
import Activity from "@stores/Activity.json";
import { Images } from './images.js';
import { introBlock,activityRoute,course,win,explain } from './data.js';
import { $http, plus, Trim, GetQueryString ,shareconfig,enterType} from '@function/Function';
import { Toast,ActivityIndicator } from 'antd-mobile';
import logo from '@picture/logo.png';

const { OverlordClass: { activitySoure, activityId } = {} } = Activity;

class OverlordClass extends Component{
    constructor(){
        super()
        this.state={
            leftTime:{
                day:0,
                hour:0,
                minute:0,
                second:0
            },
            activityEnd:false,
            startTime:'',
            endTime:'',
            userData:[],
            listTop:0,
            footerName:'',
            footerTel:'',
            footerSchool:'',
            footerLevel:'',
            maskName:'',
            maskTel:'',
            maskSchool:'',
            maskLevel:'',
            animating:false,
            mask:'none',
            maskbg:'none',
            animated:true,
            success:'none'
        }
        
        this.code=GetQueryString('code')
        this.showMask=this.showMask.bind(this)
        this.closeDialog=this.closeDialog.bind(this)
    }
    componentDidMount(){
        plus.rem();
        this.getOverlordData();
    }
    componentWillMount() {
        enterType.call(document);
        const url=shareconfig();
        plus.WeChat(["onMenuShareAppMessage","onMenuShareTimeline"], function (wx) {
            wx.onMenuShareAppMessage({
                title: '菠萝在线“霸王课”上线！国际课程“免费”体验！独家引爆上海国际教育圈！', // 分享标题
                desc: '菠萝在线“霸王课”，独家策划引爆上海国际教育圈，2018年终福利，名师教学，vip服务，国际教育圈首个“霸王餐”课程，错过再等一年！', // 分享描述
                link: url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                imgUrl: window.location.protocol + "//" + window.location.host + logo, // 分享图标
                type: '', // 分享类型,music、video或link，不填默认为link
                dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                success: function () {
                    // 用户确认分享后执行的回调函数
                }
            });
            wx.onMenuShareTimeline({
                title: '菠萝在线“霸王课”上线！国际课程“免费”体验！独家引爆上海国际教育圈！', // 分享标题
                desc: '菠萝在线“霸王课”，独家策划引爆上海国际教育圈，2018年终福利，名师教学，vip服务，国际教育圈首个“霸王餐”课程，错过再等一年！', // 分享描述
                link: url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                imgUrl: window.location.protocol + "//" + window.location.host + logo, // 分享图标
                type: '', // 分享类型,music、video或link，不填默认为link
                dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                success: function () {
                    // 用户确认分享后执行的回调函数
                }
            });
        });
    }

    title(title){
        return(
            <div className='maintitle'>
                <p dangerouslySetInnerHTML={{__html: title}}></p>
            </div>
        )
    }
    //活动剩余时间
    countcalc(){
        const now=new Date().getTime();
        const {endTime}=this.state;
        let left=null;
        if(endTime<now) return '活动已结束';//活动结束
        left=endTime-now;
        const day = parseInt(left / (1000 * 60 * 60 * 24));
        const hour = parseInt((left % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minute = parseInt((left % (1000 * 60 * 60)) / (1000 * 60));
        const second = parseInt((left % (1000 * 60)) / 1000);
        this.setState({
            leftTime:{day,hour,minute,second}
        })
        return left;
    }
    countResult(){
        this.timer=setInterval(()=>{
            let leftTime=this.countcalc();
            if(leftTime==='活动已结束'){
                this.setState({
                    activityEnd:true
                })
            }else{
                this.setState({
                    activityEnd:false
                })
            }
            this.translateY();
        },1000)
    }
    formatNum(num){
        if(num<10){
            return '0'+num
        }else{
            return num
        }
    }
    formatmSecond(num,type){
        if(!num) return;
        const date=new Date(num);
        let Y = date.getFullYear();
        let M = date.getMonth()+1;
        let D = date.getDate();
        if(type=='Y-M-D'){
            return Y+'.'+M+'.'+D
        }else{
            return M+'.'+D
        }
        
    }
    
    translateY(){
        const baseUnit=1;
        const {listTop,userData}=this.state;
        if(-listTop>(userData.length*2.18-0.5)){
            this.setState({
                listTop:0,
                animated:false,
            })
        }else{
            this.setState({
                listTop:this.state.listTop-baseUnit,
                animated:true,
            })
        }
        
    }
    //获取开始时间、结束时间、轮播数据
    getOverlordData(){
        $http.get(this, {
            url: "/live/overlordClass/front/info",
            dataType: "json",
            success: function (res) {
                const { data, success } = res;
                if(success){
                    const {baseInfo,userData}=data
                    this.setState({
                        startTime:baseInfo.startTime,
                        endTime:baseInfo.endTime,
                        userData
                    })
                    this.countResult();
                }
            }
          });
    }
    setItemval(value,protoname){
        const val=Trim(value);
        this.setState({
            [protoname]:val
        })
    }
    testPhoneNum(num){
        if(!/^(0|86|17951)?(13[0-9]|15[012356789]|166|17[0135678]|19[89]|18[0-9]|14[57])[0-9]{8}$/.test(num)){
            Toast.info('手机号输入错误！',2)
            return false;
        }else{
            return true
        }
    }
    submit(name,tel,school,level,type){
        if(!name){
            Toast.info('请输入姓名！',2)
            return;
        }
        if(!tel){
            Toast.info('请输入手机号！',2)
            return;
        }
        if(!school){
            Toast.info('请输入在读学校！',2)
            return;
        }
        if(!level){
            Toast.info('请输入年级！',2)
            return;
        }
        if(!this.testPhoneNum(tel)){
            return;
        }
        this.setState({
            animating:true
        })
        $http.post(this, {
            url: "/live/overlordClass/front/singUp",
            dataType: "json",
            data: {
                studentName:name,
                phone:tel,
                targetSchool:school,
                grade:level,
                pageSource:'',
                ipAddress:window.IPdizhi,
                activitySoure,
                activityId,
                employeeCode:this.code
            },
            success: function (res) {
                this.setState({
                    animating:false,//loading
                  })
                if (res.success) {
                    if(type=='footer'){
                        this.setState({
                            footerName:'',
                            footerTel:'',
                            footerSchool:'',
                            footerLevel:'',
                        })
                    }else{
                        this.setState({
                            maskName:'',
                            maskTel:'',
                            maskSchool:'',
                            maskLevel:'',
                            mask:'none',
                            maskbg:'none'
                        })
                    }
                    this.signInSuccess();
                    this.getOverlordData();
                    Toast.info('报名成功，请保持电话畅通等待课程体验通知', 2);
                } else {
                    Toast.fail(res.msg, 2);
                }
            },
            error:function(err){
              this.setState({
                animating:false,//loading
              })
              alert(err);
            }
        });
    }
    showMask(){
        this.setState({
            mask:'block',
            maskbg:'block'
        })
    }
    closeDialog(){
        this.setState({
            mask:'none',
            maskbg:'none',
            maskName:'',
            maskSchool:'',
            maskTel:'',
            maskLevel:'',
            success:'none',
        })
    }
    signInSuccess(){
        this.setState({
            success:'block',
            maskbg:'block'
        })
    }
    
    render(){
        const {day,hour,minute,second}=this.state.leftTime;
        const {userData,listTop,footerName,footerTel,footerSchool,footerLevel,maskName,maskTel,maskSchool,maskLevel,animating,mask,maskbg,activityEnd,startTime,endTime,animated,success}=this.state;
        return(
            <div className='OverlordClass'>
                <ActivityIndicator
                    toast
                    text="Loading..."
                    size="large"
                    animating={animating}
                />
                <div className='randomEntry' onClick={this.showMask}><img src={Images.randomEntry} alt=""/></div>
                <div className='introBlock'>
                    <ul>
                        {introBlock.map((item,index)=>(
                            <li key={index}>
                                <p>{item.subtitle}</p>
                                <p>{item.title}</p>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className='activity'>
                    {this.title('如何参加“霸王课”活动')}
                    <ul>
                        {activityRoute.map((item,index)=>(
                            <li key={index}>
                                <div className="top">
                                    <p>STEP</p>
                                    <p>{item.step}</p>
                                </div>
                                <div className='content'>
                                    <p>{item.cont}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <div className='btn' onClick={this.showMask}>“霸王课”快速报名</div>
                </div>
                <div className='countDown'>
                    {this.title('活动倒计时')}
                    <div className='subtitle'>报名时间：{this.formatmSecond(startTime,'Y-M-D')} - {this.formatmSecond(endTime,'M-D')}</div> 
                    {activityEnd===true
                        ?<div className='countBox'>
                            <p className='finish'>活动已结束</p>
                        </div>
                        :<div className='countBox'>
                            <p>{this.formatNum(day)}<span>天</span></p>
                            <p>{this.formatNum(hour)}<span>时</span></p>
                            <p>{this.formatNum(minute)}<span>分</span></p>
                            <p>{this.formatNum(second)}<span>秒</span></p>
                        </div> 
                    } 
                       
                </div>
                <div className='signInActivity'>
                    {this.title(`已有<span>${userData.length?userData.length+300:0}</span>名用户成功报名“霸王课”`)}
                    <div className="signlist">
                        <div className={`listwrap ${animated?'transition':''}`} style={{transform:`translateY(${listTop}rem)`}}>
                            <ul>
                                {userData.map((item,index)=>(
                                    <li key={index}>
                                        {
                                            item.studentName.length<3&&
                                            <p>{item.studentName.substr(0, 1) + '*'}</p>
                                        }
                                        {
                                            item.studentName.length>=3&&
                                            <p>{item.studentName.substr(0, 1) + '*' + item.studentName.substr(item.studentName.length-1,item.studentName.length)}</p>
                                        }
                                        <p>{item.phone.substr(0, 3) + '****' + item.phone.substr(7)}</p>
                                        <p><span>已报名成功</span>“霸王课”</p>
                                    </li>
                                ))}
                            </ul>
                            <ul>
                                {userData.map((item,index)=>(
                                    <li key={index}>
                                        {
                                            item.studentName.length<3&&
                                            <p>{item.studentName.substr(0, 1) + '*'}</p>
                                        }
                                        {
                                            item.studentName.length>=3&&
                                            <p>{item.studentName.substr(0, 1) + '*' + item.studentName.substr(item.studentName.length-1,item.studentName.length)}</p>
                                        }
                                        <p>{item.phone.substr(0, 3) + '****' + item.phone.substr(7)}</p>
                                        <p><span>已报名成功</span>“霸王课”</p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
                <div className='course'>
                    {this.title('5960元超值霸王课')}
                    <ul>
                        {course.map((item,index)=>(
                            <li key={index}>
                                <div className='header'>价值{item.account}元</div>
                                <div className='cont'>
                                    <img src={item.src} alt=""/>
                                    <p dangerouslySetInnerHTML={{__html: item.cont}}></p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className='win'>
                    {this.title('如何提升“霸王课”中奖概率')}
                    <ul>
                        {win.map((item,index)=>(
                            <li key={index}>
                                <div className='header'>
                                    <span>{item.num}</span>
                                    <span>{item.rate}</span>
                                </div>
                                <div className="cont">
                                    {item.cont}
                                </div>
                                {index===2
                                    ?<div className='rightImg' onClick={this.showMask}><img src={item.src} alt=""/></div>
                                    :<div className='rightImg'><img src={item.src} alt=""/></div>
                                }
                                
                            </li>
                        ))}
                    </ul>
                </div>
                <div className='explain'>
                    {this.title('“霸王课”活动说明')}
                    <div className='content'>
                        <h1>活动说明：</h1>
                        <ul>
                            {explain.map((item,index)=>(
                                <li key={index}>{item}</li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className='footer'>
                    <i><img src={Images.footerimg} alt=""/></i>
                    <div className='info'>
                        <input
                            placeholder="姓名"
                            value={footerName}
                            onChange={(ev)=>this.setItemval(ev.target.value,'footerName')} />
                        <input
                            placeholder="手机号"
                            value={footerTel}
                            maxLength={11}
                            onChange={(ev)=>this.setItemval(ev.target.value,'footerTel')} />
                        <input
                            placeholder="在读学校"
                            value={footerSchool}
                            onChange={(ev)=>this.setItemval(ev.target.value,'footerSchool')} />
                        <input
                            placeholder="所在年级"
                            value={footerLevel}
                            onChange={(ev)=>this.setItemval(ev.target.value,'footerLevel')} />
                        <div className='btn' onClick={this.submit.bind(this,footerName,footerTel,footerSchool,footerLevel,'footer')}>立即报名</div> 
                    </div>
                </div>
                <div className="dialog-mask" style={{display:maskbg}} onClick={this.closeDialog}></div>
                <div className='maskinput' style={{display:mask}}>
                    <div className='close' onClick={this.closeDialog}></div>
                    <div className='inputwrap'>
                        <input
                            placeholder="姓名"
                            value={maskName}
                            onChange={(ev)=>this.setItemval(ev.target.value,'maskName')} />
                        <input
                            placeholder="手机号"
                            value={maskTel}
                            maxLength={11}
                            onChange={(ev)=>this.setItemval(ev.target.value,'maskTel')} />
                        <input
                            placeholder="在读学校"
                            value={maskSchool}
                            onChange={(ev)=>this.setItemval(ev.target.value,'maskSchool')} />
                        <input
                            placeholder="所在年级"
                            value={maskLevel}
                            onChange={(ev)=>this.setItemval(ev.target.value,'maskLevel')} />
                        <div className='btn' onClick={this.submit.bind(this,maskName,maskTel,maskSchool,maskLevel,'mask')}>立即报名</div>
                    </div>
                    
                </div>
                <div className='success' style={{display:success}}>
                    <div className='content'>
                        <i className='close' onClick={this.closeDialog}></i>
                        <h1><img src={Images.successicon}/>报名成功！</h1>
                        <h2>请保持电话畅通等待课程体验通知</h2>
                        <div className='code'><img src={Images.zhenren}/></div>
                        <p>等不及？扫码添加菠萝在线官方微信<br/>备注“霸王课”，快速抢位！</p>
                    </div>
                </div>
            </div>
        )
    }
}
export default OverlordClass;