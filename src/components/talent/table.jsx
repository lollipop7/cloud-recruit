import React, {Component,PropTypes} from 'react';

import {Table} from 'antd';

import MoveModalComponents from './modal';

import columns from 'data/table-columns/talent-table';

import trim from 'lodash/trim';

// redux
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as Actions from 'actions';

class TableComponent extends Component {

    static propTypes = {
        paginationChange: PropTypes.func
    }

    _getColumns() {
        columns[0].render = (text,record,index) => {
            return (
                <a 
                    href="javascript:;" 
                    className="hover"
                    onClick={this.showResumeModal.bind(this,record)}
                >
                    {trim(text)}
                </a>
            )
        }

        columns[columns.length - 2].render = (text,record,index) => {
            return (
                <a href="javascript:;" className="highlight-text">
                   {text}
                </a>
            )
        }

        columns[columns.length - 1].render = (text,record,index) => {
            return (
                <a href="javascript:;">
                    <img 
                        src={`./static/images/talent/fav${parseInt(text) ? 1 : 2}.png`} 
                        alt={parseInt(text) ? '收藏' : '未收藏'} 
                        style={{
                            height: 17,
                            verticalAlign: 'middle',
                            marginLeft: 7
                        }}
                    />
                </a>
            )
        }
        return columns;
    }

    showResumeModal(record) {
    }

    render() {
        const {
            talentList,
            paginationChange,
            isLoading,
            paginationCurrent,
            customNavData
        } = this.props,
            {list,count} = talentList;
        return (
            <div>
                <MoveModalComponents customNavData={customNavData} />
                <Table 
                    rowSelection={{type:'checkbox'}}
                    bordered
                    loading={isLoading}
                    columns={this._getColumns()} 
                    dataSource={
                        list.map((item,index)=>{
                            item.key = index;
                            item.control = '入职管理'
                            return item;
                        })
                    }
                    pagination={{
                        defaultPageSize:20 ,
                        total: count,
                        current: paginationCurrent,
                        onChange:(page,pageSize)=> paginationChange(page,pageSize)
                    }}
                />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    isLoading: state.Talent.isListLoading,
    talentList: state.Talent.talentList // 列表数据
})
const mapDispatchToProps = dispatch => ({
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TableComponent);