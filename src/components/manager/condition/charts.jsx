import React, {Component} from 'react';
// redux
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as Actions from 'actions';
// 员工性质分布饼图
import FirstChartComponent from 'components/manager/condition/first-chart';

class SearchComponent extends Component {

     componentDidMount(){
        NProgress.done();
        var type = ["1"];
        type.forEach((item,index)=>{
            this.props.getEmployeeQuality({counttype:item})
        })
     }

     render(){
        const { employeeQuality } = this.props;
        employeeQuality!=undefined && console.log('fg',employeeQuality)
        return (
            <div>
                <div className="pull-left">
                    <FirstChartComponent employeeQuality={employeeQuality.chart1}/>
                </div>
            </div>
        );
     }
 }
const mapStateToProps = state => ({
    employeeQuality: state.Manage.employeeQuality
})
const mapDispatchToProps = dispatch => ({
    getEmployeeQuality: bindActionCreators(Actions.ManageActions.getEmployeeQuality, dispatch),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SearchComponent);