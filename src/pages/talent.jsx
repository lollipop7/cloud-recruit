import React, {Component} from 'react';

import ScrollPageContent from 'components/scroll-page-content';
import LeftNav from 'components/talent/nav';
import FormComponent from 'components/talent/form';
import TableComponent from 'components/talent/table';
import BreadCrumbComponent from 'components/breadcrumb';

// lodash
import isEmpty from 'lodash/isEmpty';
import isEqual from 'lodash/isEqual';

// nav data
import navData from 'data/nav/talent';

// redux
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as Actions from 'actions';

class TalentPage extends Component {

    state = {
        paginationCurrent:1
    }

    // form 表单数据
    formData = {};

    params = {
        type: 'all',
        start: 0
    }

    componentDidMount() {
        NProgress.done();
        // 请求分类数据
        this.props.getTalentCategory();
        // 请求列表数据
        this._requestData();
    }

    _requestData() {
        this.props.getTalentList({
            ...this.params,...this.formData
        });
    }

    _getCustomLabel() {
        const {categoryData} = this.props;
        let arr = [];
            const pattern = /\{(\w|\W){0,}\}$/ig,
            {content} = categoryData;
        if(categoryData.content){
            Object.keys(content || {}).forEach(item=>{
                let res = '',
                pairs = [],
                obj = {};
                if(pattern.test(item)){
                    const str = item.match(pattern)[0];
                    res = str.replace(/'/ig,""); // 去除单引号
                    res = res.replace(/(\{|\})/ig,""); // 去除花括号
                    res = res.replace(/\s/ig,""); // 去除空格
                    pairs = res.split(',');
                    pairs.forEach(item=>{
                        let tempPairs = item.split('=');
                        obj[tempPairs[0]] = tempPairs[1];                            
                    });
                    obj.title = obj.lablename;
                    obj.num = content[item];
                    obj.type = 'custom'; // 其他
                    arr.push(obj);
                }
            });
            arr = arr.sort((preObj,nextObj)=>{
                return parseInt(preObj.id) - parseInt(nextObj.id);
            });
        }
        return arr;
    }

    _getNavData = () => {
        let data = [];
        const {categoryData} = this.props;
        if(!isEmpty(categoryData)){
            Object.keys(navData).forEach(item=>{
                navData[item].num = categoryData[item];
                data.push(navData[item]);
            });
        }else{
            Object.keys(navData).forEach(item=>{
                navData[item].num = 0;
                data.push(navData[item]);
            });
        }
        return data;
    }

    handleClickNav(record) {
        // 点击侧边栏导航
        const {type,id} = record;
        this.params.type = type;
        this.params.start = 0;
        this.setState({
            paginationCurrent: 1
        });
        if(type === 'custom'){
            this.props.getTalentList({
                ...this.params,...this.formData,...{lableid:id}
            });
        }else{
            this._requestData();
        }
    }

    handleFind = (params) => {
        // 点击开始查找按钮
        if(isEqual(this.formData,params)) return ;
        this.formData = params;
        this.params.start = 0;
        this._requestData();
    }

    paginationChange = (page,pageSize) => {
        // 点击分页器
        this.params.start = (page - 1) * 20;
        this._requestData();
        this.setState({
            paginationCurrent: page
        });
    }

    render() {
        const {paginationCurrent} = this.state;
        const {routes,isLoading} = this.props;
        const customNavData = this._getCustomLabel();
        return (
            <ScrollPageContent>
                <div className="page-content talent-page">
                    <BreadCrumbComponent routes={routes} />
                    <div className="list-block">
                        <div className="pull-left">
                            <LeftNav 
                                title="人才分类" 
                                data={this._getNavData().concat(customNavData)}
                                isLoading={isLoading}
                                onClick={this.handleClickNav.bind(this)} 
                                handleDelete={(record)=>this.showDeleteLabelModal(record)}
                            />
                        </div>
                        <div className="pull-right">
                            <div className="box-border right-panel">
                                <FormComponent findEvent={this.handleFind} />
                                <TableComponent
                                    paginationCurrent={paginationCurrent}
                                    paginationChange={this.paginationChange}
                                    customNavData={customNavData}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                
            </ScrollPageContent>
        );
    }
}

const mapStateToProps = state => ({
    isLoading: state.Talent.isCategoryLoading,
    categoryData: state.Talent.categoryData // 分类数据
})
const mapDispatchToProps = dispatch => ({
    getTalentCategory: bindActionCreators(Actions.TalentActions.getTalentCategory, dispatch),
    getTalentList: bindActionCreators(Actions.TalentActions.getTalentList, dispatch)
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TalentPage);