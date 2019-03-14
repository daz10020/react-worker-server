import React,{ Component } from 'react';

import './MakingCalls.less';


class MakingCalls extends Component{
  render(){
    return(
      <section className="tel">
        <a href="tel:400-1798-499"><div className="tel-img"></div></a>
      </section>
    )
  }
}

export default MakingCalls;