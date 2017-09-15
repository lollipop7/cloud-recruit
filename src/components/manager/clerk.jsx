import React, {Component} from 'react';

// 右边控制面板
import RightComponent from './right';

export default class ClerkPage extends Component {

    componentDidMount() {
        NProgress.done();
    }

    render() {
        return (
            <RightComponent {...this.props}/>
        );
    }
}