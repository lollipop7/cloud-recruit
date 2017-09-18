import React, {Component} from 'react';

import { Button } from 'antd';

import ControlComponent from './clerk-detail/control';

 export default class ClerkDetail extends Component {

     componentDidMount(){
        NProgress.done();
     }

     render(){
        const {routes} = this.props;
        console.log(this.props);
        return (
            <div className="right-panel clerk-detail">
                <ControlComponent/>
            </div>
        );
     }
 }