import React, {Component} from 'react';

import { Input , Button , Select , Icon } from 'antd';
const Search = Input.Search

import pickBy from 'lodash/pickBy';
// 工作年限下拉数据
import workyears from 'data/select/talent-workyears';
// 学历要求
import education from 'data/select/education';

export default class FormComponents extends Component {

    state = {
        positionname: '',
        livecityid: '',
        username: '',
        workyear: '',
        year:undefined,
        time:"按申请时间升序",
        edu:undefined
        
    }

    shouldComponentUpdate(nextProps,nextState) {
        return this.state !== nextState;
    }

    handleChange(field,e){
        this.setState({
            [field]: e.target.value
        });
    }

    // resetForm = (clickNav=false) => {
    //     this.setState({
    //         positionname: '',
    //         livecityid: '',
    //         username: '',
    //         workyear: ''
    //     });
    //     this.props.findEvent({},clickNav);
    // }

    handleFind = () => {
        const filterObj = pickBy(this.state,(val,key)=>{
            return val !== '';
        });
        this.props.findEvent(filterObj);
    }
    handleSelectChange = (field,value) => {
        this.setState({
            [field]: value
        });
    }
    resetForm = (clickNav=false) => {
        this.setState({
            edu: undefined, // 学历要求
            year: undefined, // 工作年限
        });
    }

    render() {
        const {showUploadModal} = this.props;
        const {
            positionname,
            livecityid,
            username,
            workyear,
            year,
            edu,
            time
        } = this.state;
        return (
            <div className="form">
                <div className="form-btn">
                    <span onClick={()=>showUploadModal()}>
                        添加候选人&nbsp;+
                    </span> 
                    <Select 
                        defaultValue="按申请时间升序" 
                        style={{width: 180,height:30}}
                        value={time}
                        onChange={(value)=>this.handleSelectChange('time',value)}
                    >
                        {
                            ["按申请时间升序",
                            "按申请时间降序",
                            "学历由高到低",
                            "学历由低到高",
                            "按部门排序（a-z）",
                            ].map((item,index)=>{
                                return (
                                    <Option key={index} value={item}>{item}</Option>
                                )
                            })
                        }
                    </Select>
                </div>
                {/*<div className="float-button" onClick={()=>showUploadModal()} style={{
                    bottom: 0
                }}>
                    <Button type="primary"></Button>
                    <span>导入简历</span>
                </div>*/}
                <div className="bottom16">       
                    <Select 
                            placeholder="工作年限" 
                            style={{width: 189,marginRight:16}}
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
                            placeholder="请选择学历" 
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
                <div style={{height:40,marginBottom:20}}>
                    <span className="btn" onClick={this.handleFind}> 筛选</span> 
                    <span className="btn" onClick={()=>this.resetForm(false)}> 重置</span>  
                </div>
                
            </div>
        );
    }
}