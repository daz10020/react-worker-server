import React,{Component} from 'react';
import './University.css';
// import { swiperUniversity } from './data.js';

class University extends Component{
    constructor(){
        super();
        this.state = {
            ActiveOne: '',
        }
    }
    componentDidMount(){
        this.setState({
            ActiveOne:this.props.num
        })
    }
    swiperHoverOne = (index) => {
        this.setState({
          ActiveOne: index
        })
    }
    render(){
        const { swiperUniversity } = this.props;
        return(
            <div className="University">
                <div className="swiper-box">
                {
                  swiperUniversity.map((item, index) => (
                    <div id={index} key={index} onMouseEnter={this.swiperHoverOne.bind(this, index)} className={`${this.state.ActiveOne === index ? 'swiperActive' : 'lay02-box'}`}>
                      <div className="lay02-mask">{item.name}</div>
                      <div className="lay02-text">
                        <h2>{item.name}</h2>
                        <p>{item.text}</p>
                      </div>
                      <img src={item.url} alt='' />
                    </div>
                  ))
                }
              </div>
            </div>
        )
    }
}

export default University;