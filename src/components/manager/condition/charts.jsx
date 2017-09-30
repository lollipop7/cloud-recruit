import React, {Component} from 'react';
// redux
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as Actions from 'actions';
// 员工性质分布饼图
import FirstChartComponent from 'components/manager/condition/first-chart';

export default class SearchComponent extends Component {
     componentDidMount(){
        NProgress.done();
     }
     render(){
        return (
            <div>
                <div className="pull-left">
                    <FirstChartComponent type={"1"}/>
                    <FirstChartComponent type={"2"}/>
                </div>
            </div>
        );
     }
 }