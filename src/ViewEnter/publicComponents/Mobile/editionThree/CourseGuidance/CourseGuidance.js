import React, { Component } from 'react';
import './CourseGuidance.less';
import {Images} from './images';

class CourseGuidance extends Component{
    constructor(){
        super()
    }
    render(){
        const {planData,showDialog}=this.props;
        return(
            <section className="planList">
                {
                    planData.map(item => {
                        const { id, tit, txt } = item;
                        return (
                            <div className={`planBox ${id > 4 ? 'b' : ''}`} key={id}>
                                <img src={item.img} alt="" className="planImg" />
                                <div className="pland"></div>
                                <div className="planCon">
                                    <div className="planTit">{tit}</div>
                                    <div className="planTxt">{txt}</div>
                                </div>
                            </div>
                        )
                    })
                }
                <div className="center">
                        <div className="moreBtn" onClick={showDialog}>
                            了解更多
                            <img src={Images.right} alt="" className="rightImg" />
                        </div>
                    </div>
            </section>
        )
    }
}
export default CourseGuidance;