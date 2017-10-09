import React, {Component} from 'react';

import { Button } from 'antd';

import ControlComponent from './clerk-detail/control';
import HeaderInfoComponent from './clerk-detail/header-info';
import MainContent from './clerk-detail/main-content';

//redux
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as Actions from 'actions';

class ClerkDetail extends Component {

     componentDidMount(){
        NProgress.done();
        const rid = this.props.params.rid;
        this.props.queryEmployee({rid:rid});
     }

     render(){
         const {queryEmployeeList} = this.props,
         {list={}} = queryEmployeeList;
        return (
            <div className="right-panel clerk-detail-container">
                <ControlComponent/>
                <HeaderInfoComponent data={list}/>
                <MainContent data={list}/>
            </div>
        );
     }
 }

 const mapStateToProps = state => ({
    queryEmployeeList: state.Manage.queryEmployeeList
})

const mapDispatchToProps = dispatch => ({
    queryEmployee: bindActionCreators(Actions.ManageActions.queryEmployee,dispatch)
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ClerkDetail)