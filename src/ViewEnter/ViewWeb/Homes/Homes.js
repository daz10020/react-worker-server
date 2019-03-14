import React, { Component } from 'react';

class Homes extends Component {
    constructor(props) {
        super(props);
        localStorage.clear()
        sessionStorage.clear()
        window.location.replace('http://www.boluozaixian.com')
    };

    render() {
        return <div></div>
    }

}

export default Homes;
