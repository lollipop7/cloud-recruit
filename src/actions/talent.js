import * as types from 'constants/talent';
import {AjaxByToken} from 'utils/ajax';

import {notification} from 'antd'; 

const LOAD_CATEGORY_START = {type:types.LOAD_CATEGORY_START};
const LOAD_CATEGORY_DONE = {type:types.LOAD_CATEGORY_DONE};
const LOAD_TALENT_CATEGORY = {type:types.LOAD_TALENT_CATEGORY};


const LOAD_LIST_START = {type:types.LOAD_LIST_START};
const LOAD_LIST_DONE = {type:types.LOAD_LIST_DONE};
const LOAD_TALENT_LIST = {type:types.LOAD_TALENT_LIST};

// ==== 创建标签 ====
const CREATE_LABEL = {type:types.CREATE_LABEL};
const DELETE_LABEL = {type:types.DELETE_LABEL};

// ==== 移动简历 ====
const MOVE_RESUME = {type:types.MOVE_RESUME};

export const getTalentCategory = () => (dispatch,getState) => {
    dispatch(LOAD_CATEGORY_START);
    AjaxByToken('/web/TalentStatis',{
        head: {
            transcode: 'L0024'
        }
    })
    .then(res=>{
        dispatch(LOAD_CATEGORY_DONE);
        dispatch({...LOAD_TALENT_CATEGORY,categoryData:res});
    });
}

export const getTalentList = (data) => (dispatch,getState) => {
    data.start = data.start + '';
    dispatch(LOAD_LIST_START);
    AjaxByToken('/web/queryTalent',{
        head: {
            transcode: 'L0025'
        },
        data: {...data,rows:20+''}
    })
    .then(res=>{
        dispatch(LOAD_LIST_DONE);
        // 如果返回状态吗不是AAAAAA res为服务器返回的错误信息
        if(typeof res === 'string') res = {list: [],count: 0};
        dispatch({...LOAD_TALENT_LIST,talentList:res});
    });
}

// 创建分类标签
export const createLabel = (data) => (dispatch,getState) => {
    AjaxByToken('/web/deleteOrSaveTheLable',{
        head: {
            transcode: 'L0026'
        },
        data: data
    })
    .then(res=>{
        notification.success({
            message: '提示',
            description: '新建类别成功'
        });
        dispatch({...CREATE_LABEL,createLabelRes:true});
    });
}

// 删除分类标签
export const deleteLabel = (data) => (dispatch,getState) => {
    AjaxByToken('/web/deleteOrSaveTheLable',{
        head: {
            transcode: 'L0026'
        },
        data: data
    })
    .then(res=>{
        if(typeof res == 'object'){
            notification.success({
                message: '提示',
                description: '删除类别成功'
            });
            dispatch({...DELETE_LABEL,deleteLabelRes:true});
        }
    });
}

// 移动人员
export const moveResume = (data) => (dispatch,getState) => {
    AjaxByToken('/web/resumemobile',{
        head: {
            transcode: 'L0031'
        },
        data: data
    })
    .then(res=>{
        if(typeof res == 'object'){
            // dispatch({...MOVE_RESUME,deleteLabelRes:true});
        }
    });
}