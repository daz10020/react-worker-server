import React,{Component} from 'react';
import './KeyTitle.less';
class KeyTitle extends Component{
    constructor(){
        super();
    }
    render(){
        const {title,subtitle}=this.props;
        return(
            <div className='KeyTitle'>
                <div className='title'>
                    {title.map((item,index)=>(
                        <span key={index} className={`${item.bold?'bold':''}`}>{item.name}</span>
                    ))}
               </div>
               {subtitle?(<div className='subtitle'>
                    {subtitle}
               </div>):''}
               
            </div>
        )
    }
}
export default KeyTitle;