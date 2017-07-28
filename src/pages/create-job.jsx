import React, { Component,PropTypes } from 'react';

import { Button } from 'antd';
import BaseInfoComponent from 'components/create-job/baseinfo';
// import TagsComponent from 'components/create-job/tags';
import OtherInfoComponent from 'components/create-job/other-info';
import TopComponent from 'components/create-job/top.jsx';

import BreadCrumbComponent from 'components/breadcrumb';

import each from 'lodash/each';
import pick from 'lodash/pick';

// redux
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as Actions from 'actions';

class CreateJobPage extends Component {
    
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
        if(this.props.isCanCreateJob){
            const {BaseInfoComponent,OtherInfoComponent} = this.refs,
            baseinfoData = BaseInfoComponent.getFormData();
            if(!baseinfoData) return ;
            const otherInfoData = OtherInfoComponent.getFormData();
            if(!otherInfoData) return ;
            this.props.createJob({
                ...BaseInfoComponent.state,...OtherInfoComponent.state
            },this.context);
        }
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
                <div style = {{border: '1px solid #d5d5d5'}}>
                    <div className="back-zone">
                        <TopComponent/> 
                    </div>
                    <ul className="new-job-form">
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
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    isCanCreateJob: state.Job.isCanCreateJob
})
const mapDispatchToProps = dispatch => ({
    createJob: bindActionCreators(Actions.jobActions.createJob, dispatch)
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CreateJobPage);