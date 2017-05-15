import * as types from 'constants/talent';
import {AjaxByToken,cancelRequestByKey} from 'utils/ajax';

import {notification} from 'antd'; 

const LOAD_CATEGORY_START = {type:types.LOAD_CATEGORY_START};
const LOAD_CATEGORY_DONE = {type:types.LOAD_CATEGORY_DONE};
const LOAD_TALENT_CATEGORY = {type:types.LOAD_TALENT_CATEGORY};


const LOAD_LIST_START = {type:types.LOAD_LIST_START};
const LOAD_LIST_DONE = {type:types.LOAD_LIST_DONE};
const LOAD_TALENT_LIST = {type:types.LOAD_TALENT_LIST};

// ==== 创建标签 ====
const SHOW_CREATE_LABEL_MODAL = {type:types.SHOW_CREATE_LABEL_MODAL};
const HIDE_CREATE_LABEL_MODAL = {type:types.HIDE_CREATE_LABEL_MODAL};
const CREATE_LABEL_START = {type:types.CREATE_LABEL_START};
const CREATE_LABEL_DONE = {type:types.CREATE_LABEL_DONE};
const SHOW_DELETE_LABEL_MODAL = {type:types.SHOW_DELETE_LABEL_MODAL};
const HIDE_DELETE_LABEL_MODAL = {type:types.HIDE_DELETE_LABEL_MODAL};
const DELETE_LABEL_START = {type:types.DELETE_LABEL_START};
const DELETE_LABEL_DONE = {type:types.DELETE_LABEL_DONE};

// ==== 移动简历 ====
const SHOW_MOVE_RESUME_MODAL = {type:types.SHOW_MOVE_RESUME_MODAL};
const HIDE_MOVE_RESUME_MODAL = {type:types.HIDE_MOVE_RESUME_MODAL};
const MOVE_RESUME_START = {type:types.MOVE_RESUME_START};
const MOVE_RESUME_DONE = {type:types.MOVE_RESUME_DONE};

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
    const uri = '/web/queryTalent';
    cancelRequestByKey(uri);
    dispatch(LOAD_LIST_START);
    AjaxByToken(uri,{
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

// 显示创建分类Modal
export const showCreateLabelModal = () => (dispatch,getState) => {
    dispatch(SHOW_CREATE_LABEL_MODAL);
}

// 隐藏创建分类Modal
export const hideCreateLabelModal = () => (dispatch,getState) => {
    dispatch(HIDE_CREATE_LABEL_MODAL);
}

// 创建分类标签
export const createLabel = (data,getTalentCategory=()=>{}) => (dispatch,getState) => {
    dispatch(CREATE_LABEL_START);
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
        dispatch(CREATE_LABEL_DONE);
        setTimeout(()=>{
            dispatch(HIDE_CREATE_LABEL_MODAL);
        },500);
        // 重新获取左侧导航栏数据
        getTalentCategory();
    });
}

// 显示删除分类Modal
export const showDeleteLabelModal = () => (dispatch,getState) => {
    dispatch(SHOW_DELETE_LABEL_MODAL);
}

// 隐藏删除分类Modal
export const hideDeleteLabelModal = () => (dispatch,getState) => {
    dispatch(HIDE_DELETE_LABEL_MODAL);
}

// 删除分类标签
export const deleteLabel = (data,getTalentCategory=()=>{}) => (dispatch,getState) => {
    dispatch(DELETE_LABEL_START);
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
            dispatch(DELETE_LABEL_DONE);
            setTimeout(()=>{
                dispatch(HIDE_DELETE_LABEL_MODAL);
            },500);
            getTalentCategory();
        }
    });
}

// 显示移动人员Modal
export const showMoveResumeModal = () => (dispatch,getState) => {
    dispatch(SHOW_MOVE_RESUME_MODAL);
}

// 隐藏移动人员Modal
export const hideMoveResumeModal = () => (dispatch,getState) => {
    dispatch(HIDE_MOVE_RESUME_MODAL);
}

// 移动人员
export const moveResume = (data) => (dispatch,getState) => {
    dispatch(MOVE_RESUME_START);
    AjaxByToken('/web/resumemobile',{
        head: {
            transcode: 'L0031'
        },
        data: data
    })
    .then(res=>{
        dispatch(MOVE_RESUME_DONE);
        if(typeof res == 'object'){
            dispatch(HIDE_MOVE_RESUME_MODAL);
        }
    });
}