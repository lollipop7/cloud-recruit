import React, {Component} from 'react';

import { Input , Button , Cascader , Select } from 'antd';
const Option = Select.Option;

const cascaderOptions = [{
  value: 'zhejiang',
  label: '浙江',
  children: [{
    value: 'hangzhou',
    label: '杭州',
    children: [{
      value: 'xihu',
      label: '西湖',
    }],
  }],
}, {
  value: 'jiangsu',
  label: '江苏',
  children: [{
    value: 'nanjing',
    label: '南京',
    children: [{
      value: 'zhonghuamen',
      label: '中华门',
    }],
  }],
}];

function onChange(value) {
  console.log(value);
}

export default class FormComponents extends Component {

    state = {
        positionname: '',
        livecityid: '',
        username: '',
        workyear: ''
    }

    handleChange(field,e){
        this.setState({
            [field]: e.target.value
        });
    }

    resetForm = () => {
        this.setState({
            positionname: '',
            livecityid: '',
            username: '',
            workyear: ''
        });
    }

    render() {
        const {positionname,livecityid,username,workyear} = this.state;

        return (
            <div className="form">
                <div className="float-button">
                    <Button type="primary"></Button>
                    <span>导入简历</span>
                </div>
                <div className="bottom16">
                    <Input 
                        placeholder="申请职位"
                        value={positionname}
                        onChange={this.handleChange.bind(this,'positionname')}
                    />
                    <Cascader 
                        options={cascaderOptions} 
                        onChange={onChange} 
                        placeholder="居住地" 
                    />
                </div>
                <div>
                    <Input 
                        placeholder="姓名" 
                        value={username}
                        onChange={this.handleChange.bind(this,'username')}
                    />
                    <Select placeholder="工作年限" style={{
                        width: 249,
                        marginRight: 16
                    }} onChange={onChange}>
                        {
                            [].map((item,index)=>{
                                return (
                                    <Option key={index} value={item}>{item}</Option>
                                )
                            })
                        }
                    </Select>
                    <Button type="primary">查询</Button>
                    <Button className="grey" onClick={this.resetForm}>清空条件</Button>
                </div>
            </div>
        );
    }
}