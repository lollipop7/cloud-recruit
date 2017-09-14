import React, {Component} from 'react';

import TopComponent from './top';
import ControlComponent from './control';
import TableComponent from './table';

//top navdata
import navData from 'data/nav/crewstatis';

import isEmpty from 'lodash/isEmpty';

//redux
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as Actions from 'actions';

class RightComponent extends Component {

    state = {
        paginationCurrent: 1
    }

    //显示条件
    params = {
        skip: 0,
        count:"20",
        type: "sum" //查询状态
    }

    // 表单数据
    formData = {
    };

    componentDidMount(){
        console.log(this.props);
        //请求全部员工数据
        this.props.getCrewStatis();
        //员工管理人员信息列表
        this._requestCrewData();
    }

    _getNavData = list => {
        let data = [];
        // {
        //     sum,        //总人数
        //     formal,     //正式员工数量
        //     trial,      //试用期人数
        //     hired,      //待入职人数
        //     departure,  //离职人员数量 
        // } = list;
        if(!isEmpty(list)){
            Object.keys(navData).forEach((item)=>{
                navData[item].num = list[item];
                data.push(navData[item])
            });
        }else{
            Object.keys(navData).forEach(item=>{
                navData[item].num = 0;
                data.push(navData[item])
            });
        }
        return data;
    }

    //获取员工管理人员信息列表
    _requestCrewData = () => {
        this.props.getCrewList();
    }

    setPaginationCurrent = paginationCurrent => {
        this.setState({paginationCurrent});
    }

    paginationChange = () => {

    }

    handleClickTop = type => {
        console.log(type);
        this.params.type = type;
        this.params.skip = 0;
        this.setPaginationCurrent(1);
    }

    render() {
        const {paginationCurrent} = this.state,
        {manageStastistics} = this.props,
        {isLoading, list} = manageStastistics;
        return (
            <div className="right-panel">
                <TopComponent 
                    data={this._getNavData(list)}
                    onClick={this.handleClickTop}
                    isLoading= {isLoading}
                />
                <ControlComponent />
                <TableComponent 
                    paginationChange={this.paginationChange}
                    paginationCurrent={paginationCurrent}
                />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    manageStastistics: state.Manage.manageStastistics,
    crewList: state.Manage.crewList
})

const mapDispatchToProps = dispatch => ({
    getCrewStatis: bindActionCreators(Actions.ManageActions.getCrewStatis,dispatch),
    getCrewList: bindActionCreators(Actions.ManageActions.getCrewList,dispatch)
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RightComponent)