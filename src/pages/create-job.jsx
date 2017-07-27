import React, { Component,PropTypes } from 'react';

import { Button , Tag } from 'antd';
import BaseInfoComponent from 'components/create-job/baseinfo';
// import TagsComponent from 'components/create-job/tags';
import OtherInfoComponent from 'components/create-job/other-info';

import BreadCrumbComponent from 'components/breadcrumb';

import SaveModalComponent from 'components/create-job/save-modal'

import each from 'lodash/each';
import pick from 'lodash/pick';

// redux
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as Actions from 'actions';

class CreateJobPage extends Component {
    state={
        job:["金融理财师","合规","高级理财经理","出纳","营销专员"],
        Tags:["金融理财师","合规","高级理财经理","营销专员","理财规划师","分公司副总经理"]
    }
    
     static contextTypes = {
        router: PropTypes.object
    }

    componentDidMount() {
        NProgress.done();
    }

    resetForm = () => {
        if(!this.props.isCanCreateJob) return false;
        const {BaseInfoComponent,OtherInfoComponent} = this.refs;
        BaseInfoComponent.resetForm();
        OtherInfoComponent.resetForm();
    }

    createJob =() => {
        // if(this.props.isCanCreateJob){
        //     const {BaseInfoComponent,OtherInfoComponent} = this.refs,
        //     baseinfoData = BaseInfoComponent.getFormData();
        //     if(!baseinfoData) return ;
        //     const otherInfoData = OtherInfoComponent.getFormData();
        //     if(!otherInfoData) return ;
        //     this.props.createJob({
        //         ...BaseInfoComponent.state,...OtherInfoComponent.state
        //     },this.context);
           
        // }
         this.props.showSaveJobModal()
    }
    handleClick =() => {
        window.history.back()
    }

    render() {
        let routesCopy = [];
        const {routes} = this.props;
        each(routes,item=>{
            routesCopy.push(pick(item,['breadcrumbName','path']));
        });
        each(routesCopy,(item,index)=>{
            if(item.path === 'job'){
                routesCopy[index].path = '/job/index';
            }
        });
        return (
            <div className="page-content new-job-page">
                
                <BreadCrumbComponent routes={routesCopy} />
                {/*<ul className="job-ul">
                    <li>
                        <Button style={{height:25}} onClick={this.handleClick}>&lt;&nbsp;返回</Button>
                    </li>
                    <li>
                        <span>热招职位：</span>
                        <ul>
                            {
                                this.state.job.map((item,index) => {
                                    return <li><a href="javascript:;">{item}</a></li>
                                })
                            }
                        </ul>
                    </li>
                </ul>
                <div style={{paddingLeft:0,marginBottom:20}}>
                    <span style={{fontSize:14}}>最近发布职位：</span>
                    {
                        this.state.Tags.map((item,index) => {
                            return <Tag closable color="#62a6d5">{item}</Tag>
                        })
                    }
                </div>*/}
                <ul className="job-form">
                    <BaseInfoComponent ref="BaseInfoComponent" />
                    {/*<TagsComponent />*/}
                    <OtherInfoComponent ref="OtherInfoComponent" />
                    <li className="control">
                        <ul>
                            <li>
                                <Button type="primary" onClick={this.createJob}>发布</Button>
                                <Button onClick={this.resetForm}>重置</Button>
                            </li>
                        </ul>
                    </li>
                </ul>
                <SaveModalComponent/>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    isCanCreateJob: state.Job.isCanCreateJob
})
const mapDispatchToProps = dispatch => ({
    createJob: bindActionCreators(Actions.jobActions.createJob, dispatch),
    showSaveJobModal: bindActionCreators(Actions.jobActions.showSaveJobModal, dispatch)
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CreateJobPage);