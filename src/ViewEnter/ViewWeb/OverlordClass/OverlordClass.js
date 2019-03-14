import React , {Component} from 'react'
import {GetQueryString} from '@function/Function';
class OverlordClass extends Component{
    constructor(){
        super();      
        this.state = {
        }
        this.code=GetQueryString('code')
    }
    componentDidMount(){
        window.location.href= window.config.PCwebsite+'/seopage/overlordclass?code='+this.code
    }
    render(){
       return(
           <div></div>
       )
    }      
}

export default OverlordClass;
