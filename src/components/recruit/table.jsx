import React, {Component} from 'react';

import {Table,Button} from 'antd';

import columns from 'data/table-columns/recruit-table';
import trim from 'lodash/trim';

// redux
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as Actions from 'actions';

class TableComponents extends Component { 
    componentDidMount() {
    }

    showRecruitInfo = (record) => {
        const {resumeid,id} = record;
        this.props.showResumeModal();
        // this.props.getResumeInfo({resumeId:resumeid,logId:id+''});
    }

    getColumns = () => {
        columns[0].render = (text,record,index) => {
            return  <a 
                        className="hover" 
                        href="javascript:void(0)" 
                        title={text}
                        onClick={this.showRecruitInfo.bind(this,record)}
                    >{text}</a>
        }
        return columns;
    }

    render() {
        const {recruitList} = this.props;
        return (
            <div>
                <div className="table-control">
                    <Button type="primary">删除</Button>
                </div>
                <Table 
                    rowSelection={{type:'checkbox'}}
                    bordered
                    columns={this.getColumns()} 
                    dataSource={recruitList.list}
                    pagination={{
                        defaultPageSize:20 ,
                        total: recruitList.count
                    }}
                />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    recruitList: state.Recruit.recruitList // 列表数据
})
const mapDispatchToProps = dispatch => ({
    showResumeModal: bindActionCreators(Actions.RecruitACtions.showResumeModal, dispatch),
    // getResumeInfo: bindActionCreators(Actions.RecruitACtions.getResumeInfo, dispatch)
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TableComponents);