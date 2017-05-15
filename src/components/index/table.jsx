import React, {Component} from 'react';

import merge from 'lodash/merge';
import trim from 'lodash/trim';

import {Table} from 'antd';
import columns from 'data/table-columns/index-table';

import LoadingComponent from 'components/loading';

// 招聘人员详细信息Modal页面
import ResumeModalComponent from 'components/resume-modal';

// redux
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as Actions from 'actions';

import {notification} from 'antd';

class TableComponent extends Component {
    isIframeRefresh = false;
    columns = this._getColumns();
    componentDidMount() {
        // let data = [];
        // for(let i=0;i<10;i++){
        //     data.push({
        //         key: `${i}`,
        //         username: '',
        //         positionname: '',
        //         eventtime: '',
        //         telephone: ''
        //     });
        // }
        // this.setState({
        //     datasource: data
        // });
        this.props.getEntryPerson();
        // 监听简历详情页面是否发生流程更改
        window.addEventListener('message',e=>{
            console.log(e);
            const {data} = e;
            if(data === 'rerequest'){
                this.isIframeRefresh = true;
            }
        });
    }

    componentWillUnmount() {
        this.props.resetEntryPerson();
    }

    shouldComponentUpdate(nextProps,nextState) {
        return this.props.list !== nextProps.list || 
            this.props.isLoading !== nextProps.isLoading;
    }

    componentWillUpdate(nextProps,nextState) {
        if(nextProps.visible !== this.props.visible || this.isIframeRefresh){
            this.isIframeRefresh = false;
        }
    }

    showResumeModal(record) {
        // 显示详情页面Modal
        const {id,resumeid} = record;
        this.props.showResumeModal({id,resumeid});
    }

    _getColumns() {
        columns[0].render = (text,record,index) => {
            /**
             * resumeid 简历id
             * id 当前流程id
             */
            return (
                <a 
                    className="hover" 
                    href="javascript:void(0);"
                    onClick={this.showResumeModal.bind(this,record)}
                >
                    {trim(text)}
                </a>
            )
        }  
        columns[columns.length - 1].render = (text,record,index) => {
            return  <a 
                        onClick={this.showResumeModal.bind(this,record)}
                        className="highlight-text"
                    >
                        {text}
                    </a>
        }
        return columns;
    }

    handleClick = () => {
        notification.info({
            message: '提示',
            description: '功能正在开发中...'
        });
    }

    onModalChange = () => {
        if(this.isIframeRefresh){
            this.props.getEntryPerson();
        }
    }

    render() {
        const {isLoading=false,list=[]} = this.props;
        return (
            <div className="entry-person box-border">
                <div className="title" onClick={this.handleClick}>待入职人员</div>
                <Table 
                    columns={this.columns}
                    dataSource={list.map((item,index)=>{
                        return merge(
                            {key:index},
                            item,
                            {entry: '入职管理'}
                        );
                    })}
                    pagination={false}
                    loading={isLoading}
                />
                {/*招聘人员详细信息Modal页面*/}
                <ResumeModalComponent onChange={this.onModalChange} />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    visible: state.Recruit.visible,
    list: state.Home.entryPersonList,
    isLoading: state.Home.isEntryLoading
})
const mapDispatchToProps = dispatch => ({
    getEntryPerson: bindActionCreators(Actions.homeActions.getEntryPerson, dispatch),
    resetEntryPerson: bindActionCreators(Actions.homeActions.resetEntryPerson, dispatch),
    showResumeModal: bindActionCreators(Actions.RecruitActions.showResumeModal, dispatch)
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TableComponent);