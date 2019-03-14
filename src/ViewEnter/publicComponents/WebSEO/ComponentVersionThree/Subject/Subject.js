import React,{Component} from 'react';
import './Subject.less';
import Slider from "react-slick";
class Subject extends Component{
    constructor(){
        super();
    }
    render(){
        const subjectSettings = {
            infinite: true,
            slidesToShow: 3,
            slidesToScroll: 1,
            speed: 500,
            autoplay: true
          }
        return(
            <section className="Subject">
                    <div className="Subject-content">
                    {this.props.guidance.length > 3 ?
                    <div className="typeOne">
                        <div className="Subject-block1">
                            <div></div>
                            <img src={this.props.LeftImg} alt='' />
                        </div>
                        <div className="Subject-box">
                        <Slider {...subjectSettings}>
                            {
                                this.props.guidance.map((item, index) => (
                                <div className="Subject-block2" key={index}>
                                    <img src={item.img} alt='' />
                                    <span>{item.title}</span>
                                    <div>
                                    <h2>{item.title}</h2>
                                    <p>{item.text}</p>
                                    <button onClick={this.props.formPop}>了解更多</button>
                                    </div>
                                </div>
                                ))
                            }
                        </Slider>
                        </div>
                        <div className="Subject-block1">
                            <div></div>
                            <img src={this.props.RightImg} alt='' />
                        </div>
                    </div>
                    :
                    <div className="typeTwo">
                        <div className="Subject-block1">
                            <img src={this.props.LeftImg} alt='' />
                        </div>
                        {
                            this.props.guidance.map((item, index) => (
                            <div className="Subject-block2" key={index}>
                                <img src={item.img} alt='' />
                                <span>{item.title}</span>
                                <div>
                                <h2>{item.title}</h2>
                                <p>{item.text}</p>
                                <button onClick={this.props.formPop}>了解更多</button>
                                </div>
                            </div>
                            ))
                        }
                        <div className="Subject-block1">
                            <img src={this.props.RightImg} alt='' />
                        </div>
                    </div>
                    }
                    </div>
                    <div className="Subject-bottom">
                    {
                        this.props.subjects.map((item, index) => (
                        <div key={index}>
                            <span><img src={item.img} alt='' /></span>
                            <p className="course-name">{item.text1}</p>
                            <p className="english-name">{item.text2}</p>
                        </div>
                        ))
                    }
                    </div>
            </section>
         )
        }
    }
    export default Subject;