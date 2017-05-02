import React, {Component} from 'react';

import data from 'data/create-job';

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

export default class FormComponent extends Component {
    render() {
        return (
            <div className="form">
                <div className="bottom16">
                    <Input placeholder="公司名称" />
                    <Cascader options={cascaderOptions} onChange={onChange} placeholder="居住地" />
                    <Input placeholder="关键词" />
                    <Select placeholder="学历要求" style={{width: 209}} onChange={onChange}>
                        <Option value="jack">Jack</Option>
                        <Option value="lucy">Lucy</Option>
                        <Option value="Yiminghe">yiminghe</Option>
                    </Select>
                </div>
                <div>
                    <Select placeholder="工作年限" style={{width: 209}} onChange={onChange}>
                        {
                            data.workYear.map((item,index)=>{
                                return (
                                    <Option key={index} value={item}>{item}</Option>
                                )
                            })
                        }
                    </Select>
                    <Select placeholder="简历来源" style={{width: 209}} onChange={onChange}>
                        {
                            ['前程无忧','智联招聘','其他'].map((item,index)=>{
                                return (
                                    <Option key={index} value={item}>{item}</Option>
                                )
                            })
                        }
                    </Select>
                    <Button type="primary">查询</Button>
                    <Button>清空条件</Button>
                </div>
            </div>
        );
    }
}