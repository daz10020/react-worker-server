import React, {Component} from 'react';
import './MSider.css';
import Tomas from './Tomas老师.png';
import Yuki from './Yuki老师.png';
import leftks3 from "./leftks3.png";
import nect from './Neal.png'
class MSider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      DistanceTwo:-23,
      ChangeTimeTwo:0,
      activeIndexTwo:1,
      EventStateTwo:"auto"
    };
    this.timerTwo=null
  };
  componentWillMount(){
    clearInterval(this.timerTwo)
  }
  componentDidMount(){
    this.timerTwo=setInterval(()=>{this.AMNTwo(1)}, 4000)
    document.getElementById("cpnt").addEventListener('transitionend',()=>{
      clearInterval(this.timerTwo)
      this.timerTwo=setInterval(()=>{this.AMNTwo(1)}, 4000)
      this.setState({
        EventStateTwo:"auto",
      })
      if(this.state.activeIndexTwo===4){
        this.setState({
          DistanceTwo:-23,
          activeIndexTwo:1,
          ChangeTimeTwo:0,
        })
      }
      if(this.state.activeIndexTwo===0){
        this.setState({
          DistanceTwo:-23*3,
          activeIndexTwo:3,
          ChangeTimeTwo:0,
        })
      }
    },false);
  }

  AMNTwo(num){
    clearInterval(this.timerTwo)
    this.setState({
      EventStateTwo:"none",
    })
    if(num===1){
      this.setState({
        ChangeTimeTwo:0.4,
        DistanceTwo:this.state.DistanceTwo-23,
        activeIndexTwo:this.state.activeIndexTwo+num
      });
    }else {
      this.setState({
        ChangeTimeTwo:0.4,
        DistanceTwo:this.state.DistanceTwo+23,
        activeIndexTwo:this.state.activeIndexTwo+num
      })
    }
  }
  render() {
    return (
      <section className="MSider" 
        style={{ backgroundColor: this.props.BgColor, marginBottom: this.props.marginBottoms}}>
        <aside>
          <ul>
            <div>
              <img src={leftks3} onClick={this.AMNTwo.bind(this,-1)}  style={{pointerEvents:this.state.EventStateTwo}} alt=""/>
            </div>   
            <li className="wrop">
              <ol className="cpnt" id="cpnt" style={{
                transform: `translateX(${this.state.DistanceTwo}rem)`,
                transition: `${this.state.ChangeTimeTwo}s`
                }}>
                <li>
                	<div className="teacher-box">
	                	<div className="teacher-img">
	                  	<img src={nect} alt=""/>
	                  </div>
	                  <div className="teacher-desc">
		                  <p>Neal老师</p>
		                  <p>伯明翰大学University of Birmingham<br />生物工程以及生物材料硕士<br />所授课程：化学</p>	                  
	                  </div>
                  </div>
                  <button onClick={this.props.BtnClick}>点击联系他们</button>
                </li>
                <li>
                	<div className="teacher-box">
	                	<div className="teacher-img">
	                  	<img src={Tomas} alt=""/>
	                  </div>
	                  <div className="teacher-desc">
	                  <p>Tomas老师</p>
	                  <p>前国际化学校招生官<br/>菠萝在线首席国际学校择校顾问<br/>曾帮助600+名学生进入理想国际学校</p>
	                  </div>
                  </div>
                  <button onClick={this.props.BtnClick}>点击联系他们</button>
                </li>
                <li>
                	<div className="teacher-box">
	                	<div className="teacher-img">
	                  	<img src={Yuki} alt=""/>
	                  </div>
	                  <div className="teacher-desc">
		                  <p>Yuki 老师</p>
		                  <p>英国纽卡斯尔大学 应用英语与英语教育硕士<br/>帮助学生攻克小托福考试和英语笔试<br/>&nbsp;&nbsp;&nbsp;&nbsp;</p>
	                  </div>
                  </div>
                  <button onClick={this.props.BtnClick}>点击联系他们</button>
                </li>
                <li>
                	<div className="teacher-box">
	                	<div className="teacher-img">
	                  	<img src={nect} alt=""/>
	                  </div>
	                  <div className="teacher-desc">
		                  <p>Neal老师</p>
		                  <p>伯明翰大学University of Birmingham<br />生物工程以及生物材料硕士<br />所授课程：化学</p>
	                  </div>
                  </div>
                  <button onClick={this.props.BtnClick}>点击联系他们</button>
                </li>
                <li>
                	<div className="teacher-box">
	                	<div className="teacher-img">
	                  	<img src={Tomas} alt=""/>
	                  </div>
	                  <div className="teacher-desc">
		                  <p>Tomas老师</p>
		                  <p>前国际化学校招生官<br/>菠萝在线首席国际学校择校顾问<br/>曾帮助600+名学生进入理想国际学校</p>
	                  </div>
                  </div>
                  <button onClick={this.props.BtnClick}>点击联系他们</button>
                </li>
              </ol>
            </li>
            <div>
              <img className="rotate180" onClick={this.AMNTwo.bind(this,1)}  style={{pointerEvents:this.state.EventStateTwo}} src={leftks3} alt=""/>
            </div>
          </ul>
          <img src={this.props.Img} alt=""/>
        </aside>
      </section>
    );
  }
}
export default MSider;
