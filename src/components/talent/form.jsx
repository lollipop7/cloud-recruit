import React, {Component} from 'react';

import { Input , Button , Cascader , Select , Icon } from 'antd';
const Option = Select.Option;
const Search = Input.Search

// lodash
import pickBy from 'lodash/pickBy';

// 学历要求
import education from 'data/select/education';
// 工作年限下拉数据
import workyears from 'data/select/talent-workyears';
//行业下拉数据
import industry from 'data/select/industry';
//性别
import sex from 'data/select/industry';


export default class FormComponent extends Component {

    state = {
        // company: '', // 公司名称
        city: '', // 居住地
        keywords: '', // 关键字
        edu: undefined, // 学历要求
        year: undefined, // 工作年限
        source: undefined, // 简历来源
        indry:undefined,//行业
        duty:undefined,//职责
        job:undefined,//职位
        status:undefined,//状态
        sex:undefined,//性别
        classify:undefined
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
            source: undefined,// 简历来源
            indry:undefined,//行业
            duty:undefined,//职责
            job:undefined,//职位
            status:undefined,//状态
            sex:undefined,//性别
            classify:undefined
        });
        this.props.findEvent({},clickNav);
    }
    
    handleChange = e => {
        console.log(e.target.value);
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
                source=undefined,
                indry=undefined,
                duty=undefined,
                job=undefined,
                status=undefined,
                sex=undefined,
                classify=undefined
            } = this.state;
        return (
            <div className="form" style={{
                position: 'relative'
            }}>
                <div className="float-button-right"  style={{ bottom: -35}}>
                    <span onClick={()=>showUploadModal()}>
                        导入人才&nbsp;<Icon type="enter" />
                    </span> 
                    <span>
                        按创建日期升序&nbsp;
                        <Icon type="caret-down" />
                    </span> 
                </div>
                <div className="bottom16">
                    <Select 
                        placeholder="工作年限" 
                        style={{width: 189}}
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
                    <Select 
                        placeholder="学历要求" 
                        style={{width: 189}}
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
                    <Select 
                        placeholder="行业" 
                        style={{width: 189}}
                        value={indry}
                        onChange={(value)=>this.handleSelectChange('indry',value)}
                    >
                        {
                            industry.map((item,index)=>{
                                return (
                                    <Option key={index} value={item}>{item}</Option>
                                )
                            })
                        }
                    </Select>
                    <Input 
                        placeholder="候选人搜索"
                        style={{
                            position: 'absolute',
                            right: 0,
                            top: 0,
                            width:200
                        }}
                        onKeyUp = {this.handleKeyUp}
                        onChange = {this.handleChange}
                        suffix={
                            <a 
                                href="javascript:;"
                                onClick={this.handleClick}
                            >
                                <img src="static/images/manager/search.png" alt="搜索"/>
                            </a>
                    }
                />
                    
                </div>
                <div className="bottom16">
                    
                    <Input 
                            placeholder="职位" 
                            style={{width: 189}}  
                        >
                    </Input>
                    <Select 
                            placeholder="状态" 
                            style={{width: 189}}
                            value={status}
                            onChange={(value)=>this.handleSelectChange('status',value)}
                        >
                            {
                                ["在职","离职"].map((item,index)=>{
                                    return (
                                        <Option key={index} value={item}>{item}</Option>
                                    )
                                })
                            }
                    </Select>
                    <Select 
                            placeholder="性别" 
                            style={{width: 189}}
                            value={sex}
                            onChange={(value)=>this.handleSelectChange('sex',value)}
                        >
                            {
                                ["男","女"].map((item,index)=>{
                                    return (
                                        <Option key={index} value={item}>{item}</Option>
                                    )
                                })
                            }
                    </Select>
                </div>
                <div style={{height:40}}>
                    <span className="btn"> 筛选</span> 
                    <span className="btn" onClick={()=>this.resetForm(false)}> 重置</span>  
                </div>
            </div>
        );
    }
}