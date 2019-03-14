import React, { Component } from 'react';
import './CourseAdvantage.less';
import {Images} from './images';

// props参数：types,bgTransfrom
// 例1：type(左侧列表)，infoName(标题)，infoCont(列表)，infovip(底部强调文字)，imgname(左侧图片名称)
//   export const types = [
//     {type:'方案定制',infoName:'择校备考定制化训练营',infoCont:['最新学校招生资讯','专人入学助理，专人全包式服务','目标匹配、能力定位、ABC三段式高校应对备考方案'],infovip:['一对一中短期竞争力全面提升'],imgname:'photoframe'},{
//         type:'英文强化',infoName:'国际学校入学英文笔试强化',infoCont:['基于托福/小托福、雅思、ESL以及校内教材出卷,同时考察学生的语言能力和批判性思维能力。'],infovip:['词汇量训练','阅读/语法/听力强化','目标学校测试真题模拟',imgname:'book']
//     }
// ];

//例2：type(左侧列表)，info(一段话)，imgname(左侧图片名称)
// export const types = [
//   {type:'方案定制',info:'每年12月份中国考生需要提交IB考试报名，次年5月份再去参加IB科目考试，因此菠萝在线老师建议，学生需要平时巩固所选科目成绩，考前集中冲刺强化提分',imgname:'photoframe'}, { 
//       type:'英文强化',info:'如果学生想要取得满分，往年的IB考试题目是需要去练习的，因为期末考试中的试题往往会是类似的风格，相同系数的难度',imgname:'book'
//   },{
//       type:'科目提升',info:'IB有时会希望考生在答案中提出自己非常具体的观点，而不是仅仅学习教科书灌输给你的知识——这样你的满分目标更容易实现',imgname:'hat'
//   }
// ];

class CourseAdvantage extends Component {
  constructor() {
    super();
    this.state = {
      courseStatus: 0
    }
  }
  switchType(index) {
    this.setState({
      courseStatus: index
    })
  }
  render() {
    const { courseStatus } = this.state;
    const {types,bgTransform}=this.props;
    return (
      <div className='courseAdvantage'>
        <ul className='list'>
          {types.map((item, index) => (
            <li className={`${index == courseStatus ? 'active' : ''}`} onMouseEnter={this.switchType.bind(this, index)} key={index}>
              <i><img src={Images[`${item.imgname}`]} /></i>
              <p>{item.type}</p>
            </li>
          ))}
        </ul>
        <div className="infowrap">
          <div className='bg' style={bgTransform?{'width':`${10.75*bgTransform}rem`,'height':`${10.75*bgTransform}rem`,'marginTop':`${5.375*(1-bgTransform)}rem`,'marginLeft':`${5.375*(1-bgTransform)}rem`}:{}}></div>
          {/* 判断是否是右侧展示类型 */}
        {types[courseStatus].info?
          (<div className='singlecont'>
            <p>{types[courseStatus].info}</p>
          </div>):
          (<div className="info">
          <div className="cont">
                <h1>{types[courseStatus].infoName}</h1>
                <ul className='contlist'>
                  {types[courseStatus].infoCont.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
                <ul className='viplist'>
                  {types[courseStatus].infovip.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
          </div>
          </div>)
        }
            
          <div className="viplistbg"></div>
        </div>
      </div>
    )
  }
}
export default CourseAdvantage;