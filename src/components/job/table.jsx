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
    //显示所有面试者的基本信息
    showInterviewNum = (record) =>{
        this.context.router.push(`recruit`);
        //this.props.showInterviewModal()
        //this.setState({positionname:record.positionname});
    }
    componentDidMount() {
        this.columns = this.getColumns();
    }

    getColumns() {
        columns[2].render = this.renderWithAtag;
        columns[6].render = this.renderWithInterview;
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
    renderWithInterview = (text, record, index) => {
        return (
            <a 
                className="positionname" 
                href="javascript:;" 
                title={text}
                onClick={() => this.showInterviewNum(record)}
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
            interviewmodalVisible,
            hideInterviewModal
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
                <Modal
                    title ={positionname}
                    visible={interviewmodalVisible}
                    onCancel={!isLoadingAbort ? () => hideInterviewModal() : () => {}}
                    width={1100}
                    footer={null}
                >
                </Modal>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    listData: state.Job.listData, // 统计列表数据
    isLoading: state.Job.isLoadingList,
    modalVisible: state.Job.modalVisible,
    isLoadingAbort: state.Job.isLoadingAbort,
    interviewmodalVisible: state.Job.interviewmodalVisible,
})
const mapDispatchToProps = dispatch => ({
    getJobCategory: bindActionCreators(Actions.jobActions.getJobCategory, dispatch),
    getJobInfo: bindActionCreators(Actions.jobActions.getJobInfo, dispatch),
    showJobModal: bindActionCreators(Actions.jobActions.showJobModal, dispatch),
    hideJobModal: bindActionCreators(Actions.jobActions.hideJobModal, dispatch),
    showInterviewModal: bindActionCreators(Actions.jobActions.showInterviewModal, dispatch),
    hideInterviewModal: bindActionCreators(Actions.jobActions.hideInterviewModal, dispatch)
})

export default connect( 
    mapStateToProps,
    mapDispatchToProps
)(TableComponent);