import React, {Component} from 'react';

//面包屑导航
import BreadCrumbComponent from 'components/breadcrumb';

// 左侧导航栏
import LeftNavComponent from './left-nav';

//右侧详情
import RightComponent from './clerk-detail/right';

 export default class ClerkDetail extends Component {

     componentDidMount(){
        NProgress.done();
     }

     render(){
        const {routes} = this.props;
        return (
            <div className="page-content manager-page">
                <BreadCrumbComponent routes={routes} />
                <div className="box-border list-block">
                    <div className="pull-left">
                        <LeftNavComponent />
                    </div>
                    <div className="pull-right">
                        <RightComponent {...this.props}/>
                    </div>
                </div>
            </div>
        );
     }
 }