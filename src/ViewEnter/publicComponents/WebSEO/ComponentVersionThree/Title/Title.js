import React,{Component} from 'react';
import './Title.less';
class Title extends Component{
    constructor(){
        super();
    }
    render(){
        return(
            <div className='Title'>
                <div className='title' style={{textAlign : this.props.Direction}}>
                        {
                            this.props.LeftName ? <span>{this.props.LeftName}</span>: ''
                        }
                        <span className="bold">{this.props.BoldName}</span>
                        {
                            this.props.RightName ? <span>{this.props.RightName}</span>: ''
                        }
               </div>
            </div>
        )
    }
}
export default Title;