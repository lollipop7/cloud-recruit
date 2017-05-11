import React, {Component,PropTypes} from 'react';

import merge from 'lodash/merge';
import trim from 'lodash/trim';

import {Table} from 'antd';
import columns from 'data/table-columns/index-table';

import LoadingComponent from 'components/loading';

// redux
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as Actions from 'actions';

import {notification} from 'antd';

class TableComponent extends Component {

    static contextTypes = {
        router: PropTypes.object
    }

    state = {
    }

    columns = this._getColumns();

    componentDidMount() {
        this.setState({
            isLoading: true
        });
        let data = [];
        for(let i=0;i<10;i++){
            data.push({
                key: `${i}`,
                username: '',
                positionname: '',
                eventtime: '',
                telephone: ''
            });
        }
        this.setState({
            datasource: data
        });
        this.props.getEntryPerson();
    }

    componentWillUnmount() {
        this.props.resetEntryPerson();
    }

    componentWillUpdate(nextProps,nextState) {
        const list = nextProps.entryPersonList;
        if(nextState.isLoading && list.length > 0){
            let data = [];
            data = list.map((item,index)=>{
                /**
                 * username 人员名称
                 * positionname 申请职位
                 * eventtime 时间出发时间
                 * telephone 人员手机号码
                 * resumeid 简历id
                 * stagename 当前流程名称
                 * id(Integer) 当前流程id
                 */
                return merge(
                    {key:index},
                    item,
                    {entry: '入职管理'}
                );
            });
            this.setState({
                isLoading: false,
                datasource: data
            });
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

    render() {
        const {isLoading=false,datasource=[]} = this.state;
        const {entryPersonList=[]} = this.props;
        return (
            <div className="entry-person box-border">
                <div className="title" onClick={this.handleClick}>待入职人员</div>
                <Table 
                    columns={this.columns}
                    dataSource={datasource}
                    pagination={false}
                />
                {isLoading && 
                    <div style={{
                        position: 'absolute',
                        width: '100%',
                        height: 350,
                        bottom: 0,
                        backgroundColor: '#FFF'
                    }}>
                        <LoadingComponent />
                    </div>
                }
            </div>
        );
    }
}

const mapStateToProps = state => ({
    entryPersonList: state.Home.entryPersonList
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