import React,{Component} from 'react';
import './UniversitySpecial.less';
// import { swiperUniversity } from './data.js';

class UniversitySpecial extends Component{
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
            <div className="UniversitySpecial">
                <div className="swiper-box">
                {
                  swiperUniversity.map((item, index) => (
                    <div id={index} key={index} onMouseEnter={this.swiperHoverOne.bind(this, index)} className={`${this.state.ActiveOne === index ? 'swiperActive' : 'lay02-box'}`}>
                      <div className="lay02-mask">{item.name}</div>
                      <div className="lay02-text"> 
                        <div className="lay02-text-inner">   
                         <h2>{item.name}</h2> 
                            <div className="achieve">
                                <p>{item.text}</p>
                                <p>{item.achieve}</p>
                            </div>   
                        </div>
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

export default UniversitySpecial;