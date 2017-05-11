import React, {Component,PropTypes} from 'react';

import {Table,Button , Modal,Select} from 'antd';
const Option = Select.Option;

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

    state = {
        modalVisible: false
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
        console.log(record);
    }

    moveItem = () => {
        this.setModalVisible(true);
    }

    setModalVisible = (modalVisible) => {
        this.setState({modalVisible});
    }

    render() {
        const {talentList,paginationChange} = this.props,
            {list,count} = talentList;
        return (
            <div>
                <div className="table-control">
                    <Button type="primary">删除</Button>
                    <Button type="primary" onClick={this.moveItem}>移动</Button>
                    <Modal
                        title="移动"
                        wrapClassName="vertical-center-modal"
                        visible={this.state.modalVisible}
                        onOk={() => this.setModalVisible(false)}
                        onCancel={() => this.setModalVisible(false)}
                    >
                        <span style={{
                            marginRight: 16
                        }}>移动到</span>
                        <Select defaultValue="lucy" style={{ width: 395 }}>
                            <Option value="jack">理财师</Option>
                            <Option value="lucy">在职人员</Option>
                            <Option value="Yiminghe">预约中</Option>
                        </Select>
                    </Modal>
                </div>
                <Table 
                    rowSelection={{type:'checkbox'}}
                    bordered
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