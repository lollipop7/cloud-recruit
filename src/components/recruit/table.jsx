import React, {Component} from 'react';

import {Table,Button} from 'antd';

import LoadingComponent from 'components/loading';

import columns from 'data/table-columns/recruit-table';
import trim from 'lodash/trim';

// redux
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as Actions from 'actions';

class TableComponents extends Component { 
    componentDidMount() {
    }

    showResumeModal = (record) => {
        // 显示详情页面Modal
        const {resumeid,id} = record;
        this.props.showResumeModal({id,resumeid});
    }

    getColumns = () => {
        columns[0].render = (text,record,index) => {
            return  <a 
                        className="hover" 
                        href="javascript:void(0)" 
                        title={text}
                        onClick={this.showResumeModal.bind(this,record)}
                    >{trim(text)}</a>
        }
        return columns;
    }

    render() {
        const {
            recruitList,
            isLoading,
            paginationChange,
            paginationCurrent
        } = this.props;
        return (
            <div style={{
                position: 'relative'
            }}>
                <div className="table-control">
                    {/*<Button type="primary">删除</Button>*/}
                </div>
                {/*rowSelection={{type:'checkbox'}}*/}
                <Table 
                    bordered
                    loading={isLoading}
                    columns={this.getColumns()} 
                    dataSource={
                        recruitList.list.map((item,index)=>{
                            item.key = index;
                            return item;
                        })
                    }
                    pagination={{
                        defaultPageSize: 20 ,
                        total: recruitList.count,
                        current: paginationCurrent,
                        onChange:(page,pageSize)=> paginationChange(page,pageSize)
                    }}
                />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    isLoading: state.Recruit.isListLoading,
    recruitList: state.Recruit.recruitList // 列表数据
})
const mapDispatchToProps = dispatch => ({
    showResumeModal: bindActionCreators(Actions.RecruitActions.showResumeModal, dispatch)
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TableComponents);