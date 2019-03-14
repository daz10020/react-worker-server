import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import './TeacherModular.css';
import zy from './资源.png';
import leftks3 from './leftks3.png';
import {plus} from '@function/Function'
import Jerry from './jerry.png';
import Neal from "./Neal.png";
import Tino from "./Tino.png";

class TeacherModular extends Component {
    constructor(props) {
        super(props);
        this.state = {
            DistanceTwo:-7.5,
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
        plus.rem()
        this.timerTwo=setInterval(()=>{this.AMNTwo(1)}, 4000)
        document.getElementById("cpnt").addEventListener('transitionend',()=>{
          clearInterval(this.timerTwo)
          this.timerTwo=setInterval(()=>{this.AMNTwo(1)}, 4000)
          this.setState({
            EventStateTwo:"auto",
          })
          if(this.state.activeIndexTwo===4){
            this.setState({
              DistanceTwo:-7.5,
              activeIndexTwo:1,
              ChangeTimeTwo:0,
            })
          }
          if(this.state.activeIndexTwo===0){
            this.setState({
              DistanceTwo:-7.5*3,
              activeIndexTwo:3,
              ChangeTimeTwo:0,
            })
          }
        },false);
        // obj.addEventListener('WebkitTransitionEnd',fn,false);
    }
    AMNTwo(num){
      clearInterval(this.timerTwo)
      this.setState({
        EventStateTwo:"none",
      })
      if(num===1){
        this.setState({
          ChangeTimeTwo:0.4,
          DistanceTwo:this.state.DistanceTwo-7.5,
          activeIndexTwo:this.state.activeIndexTwo+num
        });
      }else {
        this.setState({
          ChangeTimeTwo:0.4,
          DistanceTwo:this.state.DistanceTwo+7.5,
          activeIndexTwo:this.state.activeIndexTwo+num
        })
      }
    }
    render() {
        // const Img=require("@/ViewEnter/ViewWebSEO/Mentor/bannerks.png")
      return (
        <section className="teachers" style={{backgroundColor:this.props.BgColor,marginBottom:this.props.ModularBottom}}>
          <p>海归名师团队</p>
          <p>95%来自世界名校 &nbsp;&nbsp;&nbsp;&nbsp;90%三年以上教学经验</p>
          <b></b>
          <aside>
            <img src={zy} width="787" height="332" style={{width:"10.96rem",height:"5.4rem"}} alt=""/>
            
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
                    <img src={Tino} alt="" />
                    <p>Tino老师</p>
                    <p>
                      复旦大学Fudan University<br />飞行器设计/工程数学硕士<br />所授课程：全科物理、全科数学<br />&nbsp;&nbsp;&nbsp;&nbsp;
                    </p>
                    <button onClick={this.props.ModelBtnClick}>点击联系他们</button>
                  </li>
                  <li>
                    <img src={Jerry} alt="" />
                    <p>Jerry老师</p>
                    <p>
                      华东理工大学<br />East China University of Science and Technology<br />材料工程博士<br />所授课程：物理
                    </p>
                    <button onClick={this.props.ModelBtnClick}>点击联系他们</button>
                  </li>
                  <li>
                    <img src={Neal} alt="" />
                    <p>Neal老师</p>
                    <p>
                      伯明翰大学University of Birmingham<br />生物工程以及生物材料硕士<br />所授课程：化学<br />&nbsp;&nbsp;&nbsp;&nbsp;
                    </p>
                    <button onClick={this.props.ModelBtnClick}>点击联系他们</button>
                  </li>
                  <li>
                    <img src={Tino} alt="" />
                    <p>Tino老师</p>
                    <p>
                      复旦大学Fudan University<br />飞行器设计/工程数学硕士<br />所授课程：全科物理、全科数学<br />&nbsp;&nbsp;&nbsp;&nbsp;
                    </p>
                    <button onClick={this.props.ModelBtnClick}>点击联系他们</button>
                  </li>
                  <li>
                    <img src={Jerry} alt="" />
                    <p>Jerry老师</p>
                    <p>
                      华东理工大学<br />East China University of Science and Technology<br />材料工程博士<br />所授课程：物理
                    </p>
                    <button onClick={this.props.ModelBtnClick}>点击联系他们</button>
                  </li>
                </ol>
              </li>
              <div>
                  <img className="rotate180" onClick={this.AMNTwo.bind(this,1)}  style={{pointerEvents:this.state.EventStateTwo}} src={leftks3} alt=""/>
              </div>
            </ul>
          </aside>
        </section>
      );
    }
}
export default TeacherModular;
