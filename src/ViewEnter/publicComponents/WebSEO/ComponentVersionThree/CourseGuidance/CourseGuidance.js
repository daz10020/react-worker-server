

import React,{Component} from 'react';
import './CourseGuidance.less';
import $ from 'jquery';
import learnmore from './Images/learnmore.png'
class CourseGuidance extends Component{
    constructor(){
        super();
        this.state={
            ImgShow:0,
        }
    }
    componentDidMount() {
        let that = this;
        window.onscroll = function () {
          // console.log(this.state.ImgShow);
          // let scrollTop = document.documentElement.scrollTop;
          let scrollTopZero = ($('.inner0').offset().top - $('.inner0').parent().offset().top + $('.inner0').height() / 2) / ($('.inner0').parent().height() - $('.inner0').height())+0.04;
          let scrollTopOne = ($('.inner1').offset().top - $('.inner1').parent().offset().top + $('.inner1').height() / 2) / ($('.inner1').parent().height() - $('.inner1').height())+0.04;
          let scrollTopTwo = ($('.inner2').offset().top - $('.inner2').parent().offset().top + $('.inner2').height() / 2) / ($('.inner2').parent().height() - $('.inner2').height())+0.04;
          let scrollTopThree = ($('.inner3').offset().top - $('.inner3').parent().offset().top + $('.inner3').height() / 2) / ($('.inner3').parent().height() - $('.inner3').height())+0.04;
          let scrollTopFour = ($('.inner4').offset().top - $('.inner4').parent().offset().top + $('.inner4').height() / 2) / ($('.inner4').parent().height() - $('.inner4').height())+0.04;
          console.log(scrollTopZero);
          let zs0 = Math.ceil(100 * scrollTopZero) / 100;
          let zs1 = Math.ceil(100 * scrollTopOne) / 100;
          let zs2 = Math.ceil(100 * scrollTopTwo) / 100;
          let zs3 = Math.ceil(100 * scrollTopThree) / 100;
          let zs4 = Math.ceil(100 * scrollTopFour) / 100;
          
          if (zs0 > .05 && zs0 < 1) {
            $('.inner0').removeClass('hide').addClass('active');
            $('.inner0').parent('.text-block').siblings().children('.text-block-inner').removeClass('active').addClass('hide');
            that.setState({
              ImgShow:0,
            })
          }else if (zs1 > .05 && zs1 < 1) {
            $('.inner1').removeClass('hide').addClass('active');
            $('.inner1').parent('.text-block').siblings().children('.text-block-inner').removeClass('active').addClass('hide');
            that.setState({
              ImgShow:1,
            })
          }else if (zs2 > .05 && zs2 < 1) {
            $('.inner2').removeClass('hide').addClass('active');
            $('.inner2').parent('.text-block').siblings().children('.text-block-inner').removeClass('active').addClass('hide');
            that.setState({
              ImgShow:2,
            })
          }else if (zs3 > .05 && zs3 < 1) {
            $('.inner3').removeClass('hide').addClass('active');
            $('.inner3').parent('.text-block').siblings().children('.text-block-inner').removeClass('active').addClass('hide');
            that.setState({
              ImgShow:3,
            })
          }else if (zs4 > .05 && zs4 < 1) {
            $('.inner4').removeClass('hide').addClass('active');
            $('.inner4').parent('.text-block').siblings().children('.text-block-inner').removeClass('active').addClass('hide');
            that.setState({
              ImgShow:4,
            })
          }else{
            $('.text-block-inner').removeClass('active').addClass('hide');
            that.setState({
              ImgShow:5,
            })
          }
        }
      }
    render(){
        return(
            <div className="guide-content">
              <div className="guide-left">
                <div className="guide-left-img">
                  <div className="img-block">
                    {
                      this.props.courseGuide.map((item,index) => (
                        <img key={index} className={this.state.ImgShow === index ? 'show' : 'hide'} src={item.img}/>
                      ))
                    }
                  </div>
                </div>
              </div>
              <div className="guide-right">
                <div className="guide-right-text">
                  {
                    this.props.courseGuide.map((item, index) => (
                      <div key={index} className="text-block">
                        <div className={`text-block-inner hide inner${index}`}>
                          <h2>{item.title}</h2>
                          <p>{item.text}</p>
                          <span onClick={this.props.formPop}>了解更多<img src={learnmore} /></span>
                        </div>
                      </div>
                    ))
                  }
                </div>
              </div>
            </div>
        )
    }
}
export default CourseGuidance;