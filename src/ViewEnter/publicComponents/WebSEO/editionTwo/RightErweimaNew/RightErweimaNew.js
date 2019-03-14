import './RightErweimaNew.less'
import ewm from './二维码2.png';

import React,{ Component} from 'react';
class RightErweimaNew extends Component{

  componentDidMount() {
  }
  
  render(){
    return(
        <section className="tel-ewm-box">
            <div className="tel-ewm">
                <div className="tel-icon">
                    <span></span>
                    <div className="hot-tel">咨询热线：400-1798-499</div>
                </div>
                <div className="ewm-icon">
                    <span></span>
                    <div className="ewm-img"><img src={ewm}/></div>
                </div>
            </div>
        </section>
    )
  }
}

export default RightErweimaNew;