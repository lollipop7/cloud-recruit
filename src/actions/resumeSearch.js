import * as types from 'constants/resumeSearch';
import {AjaxByToken,cancelRequestByKey,AjaxByGetByResumeClient} from 'utils/ajax';
import axios from 'axios'

import {notification,Modal} from 'antd'; 

let defaultData = {};

// 简历查询
const RESUME_SEARCH = {type:types.RESUME_SEARCH};
// 个人简历详情
const RESUME_DETAIL = {type:types.RESUME_DETAIL};
// 请求开始显示loading
const RESUME_SEARCH_START = {type:types.RESUME_SEARCH_START};
const RESUME_SEARCH_DONE = {type:types.RESUME_SEARCH_DONE};
// 清空简历详情
const CLEAR_RESUME_DATA = {type:types.CLEAR_RESUME_DATA};
//查看详情loading
const VIEW_DETAILS_START = {type:types.VIEW_DETAILS_START};
const VIEW_DETAILS_DONE = {type:types.VIEW_DETAILS_DONE};

    export const searchResume = (data) => (dispatch,getState) => {
        dispatch({...RESUME_SEARCH_START})
        axios({
            url: `${resumeUrl}/client/queryResume`,
            method: 'get',
            params:data
        })
        .then(res=>{
            if(res.data.result){
                dispatch({...RESUME_SEARCH_DONE})
                dispatch({...RESUME_SEARCH,resumeData:res.data.data,totalHits:res.data.totalHits})
            }else{
                dispatch({...RESUME_SEARCH_DONE})
                Modal.info({
                    className:"searchTip",
                    title: '哎呦不巧，网页君神游外太空去了，您稍后刷新再试试~~',
                });
            }
            
        }).catch(error=>{
            console.log(error)
        });
    }
    //查询简历详情
    export const searchResumeDetail = (data) => (dispatch,getState) => {
        dispatch({...VIEW_DETAILS_START})
        axios({
            url: `${resumeUrl}/client/viewResume`,
            method: 'post',
            data:data
        })
        .then(res=>{
            if(res.data.result){
                dispatch({...RESUME_DETAIL,resumeDetailData:res.data.data})
            }else{
                dispatch({...VIEW_DETAILS_DONE});
                console.log(res.data.msg)
            }
        }).catch(error=>{
            console.log(error)
        });
    }
    //清空数据
    export const clearResumeData = () => (dispatch,getState) => {
        dispatch({...CLEAR_RESUME_DATA})
    }
    //下载简历
    export const downLoadResume = (data) => (dispatch,getState) => {
        axios({
            url: `${resumeUrl}/client/downResume`,
            method: 'post',
            data:data
        })
        .then(res=>{
            console.log(res)
        }).catch(error=>{
            console.log(error)
        });
    }