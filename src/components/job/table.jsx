import React, {Component , PropTypes} from 'react';

import {Table,Modal,Popover,Button} from 'antd';

import columns from 'data/table-columns/job-table';
import LoadingComponent from 'components/loading';
import JobInfoComponent from './job-info';

// redux
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as Actions from 'actions';

class TableComponent extends Component {
    state = {
        currentClickJob:{},
        positionname:""
    }
    static contextTypes = {
        router: PropTypes.object
    }

    columns = [];

    shouldComponentUpdate(nextProps,nextState) {
        return this.props !== nextProps || this.state !== nextState;
    }

    showJobInfo = (record) => {
        const {getJobInfo,showJobModal} = this.props;
        const {positionid} = record;
        getJobInfo({positionid});
        // 当前点的职位的详细信息
        this.setState({currentClickJob:record});
        showJobModal();
    }
    //跳转到招聘管理页面，并且传参数获取相应数据
    getInterviewNum = (record) =>{
        const {positionid} = record;
        //3代表面试管理
        this.props.getResumeId({positionid:positionid,stageid:"3"})
        //路由跳转
        this.context.router.push(`recruit`);
    }
    componentDidMount() {
        this.columns = this.getColumns();
    }

    getColumns() {
        columns[2].render = this.renderWithAtag;
        columns[6].render = this.renderWithInterview;
        columns[7].render = this.renderWithReInterview;
        columns[columns.length - 1].render = (text,record,index) => {
            switch(parseInt(text)) {
                case 0:
                    return <button className="status-button plan">准备中</button>;
                case 1:
                    return (
                            <button className="status-button progress">进行中</button>
                    );
                case 2:
                    return <button className="status-button complete">已完成</button>;
                case 3:
                    return <button className="status-button end">已终止</button>;
            }
        }
        return columns;
    }

    renderWithAtag = (text, record, index) => {
        return (
            <a 
                className="positionname" 
                href="javascript:;" 
                title={text}
                onClick={() => this.showJobInfo(record)}
            >
                {text}
            </a>
        )
    }
    //面试列渲染
    renderWithInterview = (text, record, index) => {
        return (
            <a 
                className="positionname" 
                href="javascript:;" 
                title={text}
                onClick={() => this.getInterviewNum(record)}
            >
                {text}
            </a>
        )
    }
    //复试列渲染
    renderWithReInterview = (text, record, index) => {
        return (
            <a 
                className="positionname" 
                href="javascript:;" 
                title={text}
                onClick={() => this.getInterviewNum(record)}
            >
                {text}
            </a>
        )
    }

    render() {
        const {
            listData,
            isLoading,
            isLoadingAbort,
            paginationCurrent,
            paginationChange,
            getJobList,
            getJobCategory,
            modalVisible,
            hideJobModal,
        } = this.props;
        const {positionname} = this.state
        const {list,count} = listData;
        return (
            <div style={{
                position: 'relative',
                width: 950,
                height: 780
            }}>
                <Table 
                    dataSource={
                        list.map((item,index)=>{
                            item.key = index;
                            return item;
                        })
                    } 
                    bordered
                    loading={isLoading}
                    columns={this.columns}
                    pagination={{
                        defaultPageSize:20,
                        total: count,
                        current: paginationCurrent,
                        onChange:(page,pageSize)=> paginationChange(page,pageSize)
                    }}
                />
                <Modal
                    wrapClassName="vertical-center-modal"
                    visible={modalVisible}
                    onCancel={!isLoadingAbort ? () => hideJobModal() : () => {}}
                    width={1100}
                    footer={null}
                >
                    <JobInfoComponent
                        data={this.state.currentClickJob} 
                        getJobList={getJobList}
                        getJobCategory={getJobCategory}
                    />
                </Modal>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    listData: state.Job.listData, // 统计列表数据
    isLoading: state.Job.isLoadingList,
    modalVisible: state.Job.modalVisible,
    isLoadingAbort: state.Job.isLoadingAbort
})
const mapDispatchToProps = dispatch => ({
    getJobCategory: bindActionCreators(Actions.jobActions.getJobCategory, dispatch),
    getJobInfo: bindActionCreators(Actions.jobActions.getJobInfo, dispatch),
    showJobModal: bindActionCreators(Actions.jobActions.showJobModal, dispatch),
    hideJobModal: bindActionCreators(Actions.jobActions.hideJobModal, dispatch),
    getResumeId: bindActionCreators(Actions.jobActions.getResumeId, dispatch)
})

export default connect( 
    mapStateToProps,
    mapDispatchToProps
)(TableComponent);