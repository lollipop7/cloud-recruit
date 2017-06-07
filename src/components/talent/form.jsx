import React, {Component} from 'react';

import { Input , Button , Cascader , Select } from 'antd';
const Option = Select.Option;

// lodash
import pickBy from 'lodash/pickBy';

// 学历要求
import education from 'data/select/education';
// 工作年限下拉数据
import workyears from 'data/select/talent-workyears';

export default class FormComponent extends Component {

    state = {
        // company: '', // 公司名称
        city: '', // 居住地
        keywords: '', // 关键字
        edu: undefined, // 学历要求
        year: undefined, // 工作年限
        source: undefined // 简历来源
    }

    shouldComponentUpdate(nextProps,nextState) {
        return this.props !== nextProps || this.state !== nextState;
    }

    resetForm = (clickNav=false) => {
        this.setState({
            // company: '', // 公司名称
            city: '', // 居住地
            keywords: '', // 关键字
            edu: undefined, // 学历要求
            year: undefined, // 工作年限
            source: undefined // 简历来源
        });
        this.props.findEvent({},clickNav);
    }
    
    handleChange(field,e) {
        this.setState({
            [field]: e.target.value
        });
    }

    handleSelectChange = (field,value) => {
        this.setState({
            [field]: value
        });
    }

    handleFind = () => {
        const filterObj = pickBy(this.state,(val,key)=>{
            return val !== '' && val !== undefined
        });
        this.props.findEvent(filterObj);
    }

    render() {
        const {showUploadModal} = this.props,
            {
                // company,
                city,
                keywords,
                edu=undefined,
                year=undefined,
                source=undefined
            } = this.state;
        return (
            <div className="form" style={{
                position: 'relative'
            }}>
                <div className="float-button" onClick={()=>showUploadModal()} style={{
                    bottom: -35
                }}>
                    <Button type="primary" style={{
                        backgroundImage: 'url(/static/images/recruit/import.png)'
                    }}></Button>
                    <span>导入简历</span>
                </div>
                <div className="bottom16">
                    {/*<Input 
                        placeholder="公司名称"
                        value={company}
                        onChange={(e)=>this.handleChange('company',e)}
                    />*/}
                    <Input 
                        placeholder="居住地"
                        value={city}
                        onChange={(e)=>this.handleChange('city',e)}
                    />
                    <Input 
                        placeholder="关键词"
                        value={keywords}
                        onChange={(e)=>this.handleChange('keywords',e)}
                    />
                    <Select 
                        placeholder="学历要求" 
                        style={{width: 209}}
                        value={edu}
                        onChange={(value)=>this.handleSelectChange('edu',value)}
                    >
                        {
                            education.map((item,index)=>{
                                return (
                                    <Option key={index} value={item}>{item}</Option>
                                )
                            })
                        }
                    </Select>
                    {/*<Input 
                        placeholder="工作年限"
                        value={year}
                        onChange={(e)=>this.handleChange('year',e)}
                    />*/}
                    <Select 
                        placeholder="工作年限" 
                        style={{width: 209}}
                        value={year}
                        onChange={(value)=>this.handleSelectChange('year',value)}
                    >
                        {
                            workyears.map((item,index)=>{
                                return (
                                    <Option key={index} value={item}>{item}</Option>
                                )
                            })
                        }
                    </Select>
                </div>
                <div>
                    
                    <Select 
                        placeholder="简历来源" 
                        style={{width: 209}} 
                        value={source}
                        onChange={(value)=>this.handleSelectChange('source',value)}
                    >
                        {
                            [{
                                name: '前程无忧',
                                value: '51job'
                            },{
                                name: '智联招聘',
                                value: 'zhilian'
                            },{
                                name: '其他',
                                value: 'unknown'
                            }].map((item,index)=>{
                                return (
                                    <Option key={index} value={item.value}>{item.name}</Option>
                                )
                            })
                        }
                    </Select>
                    <Button type="primary" onClick={this.handleFind}>查询</Button>
                    <Button className="grey" onClick={()=>this.resetForm(false)}>清空条件</Button>
                </div>
            </div>
        );
    }
}