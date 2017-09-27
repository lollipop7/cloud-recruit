import React, {Component} from 'react';

import TopComponent from './clerk/top';
import ControlComponent from './clerk/control';
import TableComponent from './clerk/table';
import UploadClerkModal from './clerk/upload-clerk-modal';

//top navdata
import navData from 'data/nav/crewstatis';

import isEmpty from 'lodash/isEmpty';

//redux
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as Actions from 'actions';

class ClerkPage extends Component {

    state = {
        paginationCurrent: 1,
        tableHead: '全部人员',
                     
    }

    //显示条件
    params = {
        skip: 0,
        count:"20",
        type: "sum",  //查询状态
    }

    // 表单数据
    formData = {
    };

    componentDidMount(){
        NProgress.done();
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
        this.props.getCrewList({...this.params});
    }

    setPaginationCurrent = paginationCurrent => {
        this.setState({paginationCurrent});
    }

    //页码改变的回调，参数是改变后的页码及每页条数
    paginationChange = (page,pageSize) => {
        this.params.skip = (page-1)*20;
        this._requestCrewData();
        this.setPaginationCurrent(page);
    }

    handleClickTop = (type,desc) => {
        this.params.type = type;
        this.params.skip = 0;
        this._requestCrewData();
        this.setPaginationCurrent(1);
        this.setTableHead(desc);
    }

    setTableHead = tableHead => {
        this.setState({tableHead});
    }

    render() {
        const {
            paginationCurrent,
            tableHead
        } = this.state,
        {
            manageStastistics,
            showUploadClerkModal
        } = this.props,
        {isLoading, list} = manageStastistics;
        return (
            <div className="right-panel clerk-page">
                <TopComponent 
                    data={this._getNavData(list)}
                    onClick={this.handleClickTop}
                    isLoading= {isLoading}
                />
                <ControlComponent 
                    title={tableHead}
                    showUploadClerkModal={showUploadClerkModal}
                />
                <TableComponent 
                    paginationChange={this.paginationChange}
                    paginationCurrent={paginationCurrent}
                />
                <UploadClerkModal/>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    manageStastistics: state.Manage.manageStastistics
})

const mapDispatchToProps = dispatch => ({
    getCrewStatis: bindActionCreators(Actions.ManageActions.getCrewStatis,dispatch),
    getCrewList: bindActionCreators(Actions.ManageActions.getCrewList,dispatch),
    showUploadClerkModal: bindActionCreators(Actions.ManageActions.showUploadClerkModal,dispatch)
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ClerkPage)