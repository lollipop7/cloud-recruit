import React, {Component} from 'react';

import {Table,Button , Modal,Select} from 'antd';
const Option = Select.Option;

import columns from 'data/table-columns/talent-table';

export default class TableComponent extends Component {
    state = {modalVisible: false};
    componentDidMount() {
        let data = [];
        for(let i=0;i<20;i++){
            data.push({
                key: `${i}`,
                name: '刘德华',
                sex: '男',
                address: '上海',
                birthdate: '1990年10月31日',
                education: '本科',
                workYear: '10年',
                expectJob: '网络维护专员',
                created: '2017-03-04',
                control: '招聘管理',
                isFav: true
            });
        }
        this.setState({
            data
        });
    }

    moveItem = () => {
        this.setState({
            modalVisible: true
        });
    }

    setModal1Visible(bool) {
        this.setState({
            modalVisible: bool
        });
    }

    render() {
        return (
            <div>
                <div className="table-control">
                    <Button type="primary">删除</Button>
                    <Button type="primary" onClick={this.moveItem}>移动</Button>
                    <Modal
                        title="移动"
                        wrapClassName="vertical-center-modal"
                        visible={this.state.modalVisible}
                        onOk={() => this.setModal1Visible(false)}
                        onCancel={() => this.setModal1Visible(false)}
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
                    columns={columns} 
                    dataSource={this.state.data}
                    pagination={{
                        defaultPageSize:20 ,
                        total: 1000
                    }}
                />
            </div>
        );
    }
}