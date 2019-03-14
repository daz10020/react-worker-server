import React, { Component } from 'react';
import "./MobileAdvantage.less"
import close from './close.png'
import open from './open.png'

class MobileAdvantage extends Component{
   constructor(props) {
     super(props)
     this.state = {
       renav: [close, open, open, open, open, open,open,open],
       renavCont: ["showCss", "hideCss", "hideCss", "hideCss", "hideCss", "hideCss", "hideCss", "hideCss"],
     }
   }
   
   renavChange(num) {
    if (num === this.state.renavCont.indexOf("showCss")) {
      this.setState({
        renav: [open, open, open, open, open, open, open, open],
        renavCont: ["hideCss", "hideCss", "hideCss", "hideCss", "hideCss", "hideCss", "hideCss", "hideCss"]
      });
      return
    }
    let renavArray = [],
      renavContArray = [];
    for (let i = 0; i < 8; i++) {
      renavArray.push(open);
      renavContArray.push("hideCss")
    }
    renavArray.splice(num, 1, close);
    renavContArray.splice(num, 1, "showCss");
    this.setState({
      renav: renavArray,
      renavCont: renavContArray
    });
  }
 
 
  render(){
    return(
      <section className="entrance">
        <div className="entr" style={{ backgroundColor: this.props.bgColor }}>
          <h2>{this.props.AduvantageTitle}</h2>
          <h3>{this.props.AduvantageCon}</h3>
          <div className="col">
            <ul>
              <li className="li-one"></li>
              <li>一对一个性化专业教学</li>
              <li onClick={this.renavChange.bind(this, 0)}><img src={this.state.renav[0]} /></li>
              <li></li>
            </ul>
            <ol className={this.state.renavCont[0]}>
                <li>
                  量身定制升学方案和备考计划，最大限激发学生潜能
		            </li>
            </ol>
            <ul>
              <li className="li-two"></li>
              <li>课程模式自由选择</li>
              <li onClick={this.renavChange.bind(this, 1)}><img src={this.state.renav[1]} /></li>
              <li></li>
            </ul>
            <ol className={this.state.renavCont[1]}>
              <li>
                灵活便捷不失效果保障
		          </li>
            </ol>
            <ul>
              <li className="li-three"></li>
              <li>学习顾问管家式服务</li>
              <li onClick={this.renavChange.bind(this, 2)}><img src={this.state.renav[2]} /></li>
              <li></li>
            </ul>
            <ol className={this.state.renavCont[2]}>
              <li>
                班主任全程跟踪并定期测评，实时反馈调整学习计划
		          </li>
            </ol>
            <ul>
              <li className="li-four"></li>
              <li>强大的国际化学校师资</li>
              <li onClick={this.renavChange.bind(this, 3)}><img src={this.state.renav[3]} /></li>
              <li></li>
            </ul>
            <ol className={this.state.renavCont[3]}>
              <li>
                核心教学团队均为海归名师或有多年国际化学校成功教学经验
		          </li>
            </ol>

            <ul style={{display:this.props.displayBlock}}>
              <li className="li-five"></li>
              <li>专业能力测试科学择校</li>
              <li onClick={this.renavChange.bind(this, 4)}><img src={this.state.renav[4]} /></li>
              <li></li>
            </ul>

            <ol className={this.state.renavCont[4]} style={{ display: this.props.displayBlock }}>
              <li>
                以历年考试真题和能力要求为基础，专业测试评估分析，科学择校建议
		          </li>
            </ol>

            <ul style={{ display: this.props.displayBlock }}> 
              <li className="li-six"></li>
              <li>最新招生咨询实时传送</li>
              <li onClick={this.renavChange.bind(this, 5)}><img src={this.state.renav[5]} /></li>
              <li></li>
            </ul>
            <ol className={this.state.renavCont[5]} style={{ display: this.props.displayBlock }}>
              <li>
                第一手国际化学校招生信息，实时同步传递
		          </li>
            </ol>
            <ul style={{display:this.props.displayBlocks}}>
              <li className="li-five"></li>
              <li>重组AMC知识系统</li>
              <li onClick={this.renavChange.bind(this, 6)}><img src={this.state.renav[6]} /></li>
              <li></li>
            </ul>
            
            <ol className={this.state.renavCont[6]} style={{ display: this.props.displayBlocks }}>
              <li>
                将AMC知识与所学课程相结合，相得益彰
		          </li>
            </ol>

            <ul style={{ display: this.props.displayBlocks }}> 
              <li className="li-six"></li>
              <li>个性备赛精准指导</li>
              <li onClick={this.renavChange.bind(this, 7)}><img src={this.state.renav[7]} /></li>
              <li></li>
            </ul>
            <ol className={this.state.renavCont[7]} style={{ display: this.props.displayBlocks }}>
              <li>
               根据个人自身情况，及时调整训练方向
		          </li>
            </ol>

          </div>
        </div>
      </section>
    )
  }
}

export default MobileAdvantage;