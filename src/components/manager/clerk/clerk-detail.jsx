import React, {Component} from 'react';

//右侧详情
import RightComponent from './clerk-detail/right';

 export default class ClerkDetail extends Component {

     componentDidMount(){
        NProgress.done();
     }

     render(){
        const {routes} = this.props;
        return (
            <RightComponent {...this.props}/>
        );
     }
 }