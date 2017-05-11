import React, {Component} from 'react';

import {Table,Modal} from 'antd';

import columns from 'data/table-columns/job-table';
import LoadingComponent from 'components/loading';
import JobInfoComponent from './job-info';

// redux
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as Actions from 'actions';

class TableComponent extends Component {
    state = {
        dataSource:[],
        modalVisible: false
    }

    columns = [];

    showJobInfo = (record) => {
        const {positionid} = record;
        this.props.getJobInfo({positionid});
        this.setModalVisible(true);
    }

    componentDidMount() {
        this.columns = this.getColumns();
    }

    getColumns() {
        columns[2].render = this.renderWithAtag;
        return columns;
    }

    renderWithAtag = (text, record, index) => {
        return (
            <a 
                className="positionname" 
                href="javascript:;" 
                title={text}
                onClick={this.showJobInfo.bind(this,record)}
            >
                {text}
            </a>
        )
    }

    handleChange = (p) => {
        const {paginationChange} = this.props;
        if(paginationChange){
            paginationChange(p);
        }
    }

    setModalVisible = (modalVisible) => {
        this.setState({modalVisible});
    }

    render() {
        const {listData,isLoading} = this.props;
        const {list,count} = listData;
        return (
            <div style={{
                position: 'relative',
                width: 950,
                height: 780
            }}>
                <Table 
                    dataSource={list} 
                    bordered
                    columns={this.columns}
                    pagination={
                        count > 20 
                        ? {
                            pageSize:20 ,
                            total: count
                        }
                        : false
                    }
                    onChange={this.handleChange}
                />
                {isLoading &&
                    <LoadingComponent style={{
                        position: 'absolute',
                        zIndex: 3,
                        width: 950,
                        top: 34,
                        height: 746,
                    }} />
                }
                <Modal
                    wrapClassName="vertical-center-modal"
                    visible={this.state.modalVisible}
                    onOk={() => this.setModalVisible(false)}
                    onCancel={() => this.setModalVisible(false)}
                    width={1100}
                    footer={null}
                >
                    <JobInfoComponent />
                </Modal>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    listData: state.Job.listData, // 统计列表数据
    isLoading: state.Job.isLoadingList
})
const mapDispatchToProps = dispatch => ({
    getJobInfo: bindActionCreators(Actions.jobActions.getJobInfo, dispatch)
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TableComponent);