import React, {Component} from 'react';
import Classroom from '@/ViewEnter/ViewWeb/Classroom/Classroom';


class BundleLoginh extends Component {

    componentWillMount() {
        if (!localStorage.getItem("token")) {
            this.props.history.push("/login")
        }
    }

    render() {
        //组件渲染
        return this.props.child;
    }
}
class BundleLogin extends Component {

    render() {
        //组件渲染
        return <BundleLoginh child={Classroom}/>;
    }
}

export default BundleLogin;
