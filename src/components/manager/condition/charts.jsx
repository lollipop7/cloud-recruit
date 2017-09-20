import React, {Component} from 'react';
// 员工性质分布饼图
import FirstChartComponent from 'components/manager/condition/first-chart';

 export default class SearchComponent extends Component {

     componentDidMount(){
        NProgress.done();
     }

     render(){
        const {routes} = this.props;
        return (
            <div>
                <div className="pull-left">
                    <FirstChartComponent/>
                </div>
            </div>
        );
     }
 }