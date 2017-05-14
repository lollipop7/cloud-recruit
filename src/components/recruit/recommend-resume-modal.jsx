import React, {Component} from 'react';

import {Modal,Input,Button,Table} from 'antd';

import columns from 'data/table-columns/recommend-resume-table';

// redux
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as Actions from 'actions';

class RecommendResumeModalComponents extends Component {

    state = {
        dataSource: []
    }

    componentDidMount() {
        let dataSource = [];
        for(var i=0;i<10;i++){
            dataSource.push({
                key: i,
                positionid: 'sw1925',
                positionname: '营销推广专员',
                department: '市场部',
                address: '上海 浦东新区',
                starttime: '2017-03-04',
                endtime: '2017-04-21',
                recruitnum: '10',
                control: '选择'
            });
        }
        this.setState({
            dataSource
        });
    }

    _getColumns() {
        columns[columns.length - 1].render = (text,record,index)=>{
            return (
                <a href="javascript:;" className="highlight-text">
                    {text}
                </a>
            )
        }
        return columns;
    }

    render() {
        const {dataSource} = this.state;
        const {visible} = this.props.data;
        return (
            <Modal
                title="职位推荐"
                wrapClassName="vertical-center-modal recommend-resume-modal"
                visible={visible}
                onCancel={this.props.hideModal}
                footer={null}
            >
                <div>
                    <div className="form">
                        <Input 
                            placeholder="职位名称"
                        />
                        <Input 
                            placeholder="工作地点"
                        />
                        <Button type="primary">
                            查询
                        </Button>
                        <Button className="grey">
                            清空条件
                        </Button>
                    </div>
                </div>
                <Table 
                    columns={this._getColumns()}
                    dataSource={dataSource}
                    bordered
                />
            </Modal>
        );
    }
}

const mapStateToProps = state => ({
    data: state.Recruit.recommendModal
})
const mapDispatchToProps = dispatch => ({
    hideModal: bindActionCreators(Actions.RecruitActions.hideRecommendModal, dispatch)
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RecommendResumeModalComponents);