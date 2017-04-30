import React, {Component} from 'react';

import { Input , Select , Tag , Radio , Button } from 'antd';
import data from 'data/create-job';

import TimeComponent from 'components/time';

const Option = Select.Option;
const { CheckableTag } = Tag;
const RadioGroup = Radio.Group;

const children = [];
data.workYear.forEach( (item,index)=>{
    children.push(<Option key={index}>{item}</Option>);
});

function handleChange(value) {
  console.log(`Selected: ${value}`);
}

class MyTag extends Component {
    state={
        checked:false,
        
    }
    handleChange = (checked) => {
        this.setState({ checked });
    }
    render() {
        return (
            <CheckableTag 
                checked={this.state.checked} 
                onChange={this.handleChange}
                {...this.props}
            />
        )
    }
}

export default class CreateJobPage extends Component {
    
    state = {
        workType: 1
    }

    onChange=(e)=>{
         this.setState({
            workType: e.target.value,
        });
    }

    render() {
        return (
            <ul>
                <li className="base-info">
                    <h2 className="title">
                        基本信息
                    </h2>
                    <ul>
                        <li>
                            <div className="inline-block">
                                <span>职位名称</span>
                                <Input placeholder="请输入职位名称" />
                            </div>
                            <div className="inline-block">
                                <span>薪资待遇</span>
                                <Input placeholder="请输入薪资待遇" />
                            </div>
                        </li>
                        <li>
                            <div className="inline-block">
                                <span>用人部门</span>
                                <Input placeholder="请输入用人部门" />
                            </div>
                            <div className="inline-block">
                                <span>招聘理由</span>
                                <Input placeholder="请输入招聘理由" />
                            </div>
                        </li>
                        <li>
                            <div className="inline-block">
                                <span>招聘人数</span>
                                <Input type="number" placeholder="请输入招聘人数" />
                            </div>
                            <div className="inline-block">
                                <span>工作地点</span>
                                <Input placeholder="请输入工作地点" />
                            </div>
                            <div className="inline-block">
                                <span>工作年限</span>
                                <Select
                                    size='default'
                                    placeholder="选择工作年限"
                                    onChange={handleChange}
                                    allowClear
                                    style={{ width: 185,height:40 }}
                                >
                                {children}
                                </Select>
                            </div>
                        </li>
                        <li>
                            <div className="inline-block">
                                <span>专业</span>
                                <Select
                                    size='default'
                                    placeholder="选择/修改"
                                    onChange={handleChange}
                                    allowClear
                                    style={{ width: 155,height:40 }}
                                >
                                {children}
                                </Select>
                            </div>
                            <div className="inline-block">
                                <span>学历</span>
                                <Select
                                    size='default'
                                    placeholder="请选择学历"
                                    onChange={handleChange}
                                    allowClear
                                    style={{ width: 155,height:40 }}
                                >
                                {children}
                                </Select>
                            </div>
                        </li>
                    </ul>
                </li>
                <li className="tags">
                    <h2 className="title">
                        福利标签
                    </h2>
                    <ul>
                        <li>选择职位亮点，提升职位吸引力，有效增加职位投递！</li>
                        <li>
                            <ul>
                                {
                                    data.tags.map((item,index)=>{
                                        return (
                                            <li key={index}>
                                                {
                                                    item.map( (val,key)=>{
                                                        return (
                                                            <MyTag key={key}>{val}</MyTag>
                                                        )
                                                    })
                                                }
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </li>
                    </ul>
                </li>
                <li className="other-info">
                    <h2 className="title">
                        其他信息
                    </h2>
                    <ul>
                        <li>
                            <span>工作类型</span>
                            <RadioGroup onChange={this.onChange} value={this.state.workType}>
                                <Radio value={1}>全职</Radio>
                                <Radio value={2}>兼职</Radio>
                                <Radio value={3}>实习</Radio>
                            </RadioGroup>
                        </li>
                        <li>
                            <span>工作职责</span>
                            <Input type="textarea" style={{
                                width: 494,
                                height: 130,
                                verticalAlign: 'text-top'
                            }} />
                        </li>
                        <li>
                            <span>任职资格</span>
                            <Input type="textarea" style={{
                                width: 494,
                                height: 130,
                                verticalAlign: 'text-top'
                            }} />
                        </li>
                        <li>
                            <TimeComponent showField={true} style={{width:185}} />
                        </li>
                        <li>
                            <span>是否紧急</span>
                            <RadioGroup onChange={this.onChange} value={this.state.workType}>
                                <Radio value={1}>是</Radio>
                                <Radio value={2}>否</Radio>
                            </RadioGroup>
                        </li>
                    </ul>
                </li>
                <li className="control">
                    <ul>
                        <li>
                            <Button>发布</Button>
                            <Button>重置</Button>
                        </li>
                    </ul>
                </li>
            </ul>
        );
    }
}