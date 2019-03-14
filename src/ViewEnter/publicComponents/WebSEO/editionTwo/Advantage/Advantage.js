import React,{ Component } from 'react';
import './Advantage.less'

class Advantage extends Component{
  render(){
    return(
        <section className="advantages">
          <h3>{this.props.Title}</h3>
          <p>{this.props.ParticularsOne}<br />
            {this.props.ParticularsTwo}
          </p>
          <b></b>
          <img src={this.props.Img} style={{width:this.props.Width,height:this.props.Height}} alt="" />
        </section>
    )
  }
}

export default Advantage;