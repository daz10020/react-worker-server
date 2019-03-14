import React,{Component} from 'react'
import './PopupFrame.less'

class PopupFrame extends Component{
    constructor(){
        super()
    }
    render(){
        const child=this.props.children;
        return(
            <section className='PopupFrame'>
                <div className='content'>
                    {child}
                </div>
            </section>
        )
    }
}
export default PopupFrame;