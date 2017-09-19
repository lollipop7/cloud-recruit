import * as types from 'constants/manage';
import axios from 'axios';
import {AjaxByToken, cancelRequestByKey} from 'utils/ajax';

import {notification} from 'antd';
import isNumber from 'lodash/isNumber';

 //获取员工管理人员统计信息
const GET_MANAGE_START = {type: types.GET_MANAGE_START};
const GET_MANAGE_END = {type: types.GET_MANAGE_END};
const GET_MANAGE_STATISTICS = {type: types.GET_MANAGE_STATISTICS};

//员工管理人员信息列表查询
const LOAD_LIST_START = {type: types.LOAD_LIST_START};
const LOAD_LIST_DONE = {type: types.LOAD_LIST_DONE};
const LOAD_CREW_LIST = {type: types.LOAD_CREW_LIST};

// 获取全员概览-员工性质分布信息
const GET_EMPLOYEE_QUALITY = {type:types.GET_EMPLOYEE_QUALITY};

 //获取员工管理人员统计信息
 export const getCrewStatis = () => (dispatch,getState) => {
    dispatch(GET_MANAGE_START);
    AjaxByToken('emp/crewstatis',{
        head: {
            transcode: 'L0042'
        }
    })
    .then(res=>{
        dispatch(GET_MANAGE_END);
        dispatch({...GET_MANAGE_STATISTICS,list:res});
    },err=>{
        dispatch(GET_MANAGE_END);
        dispatch({...GET_MANAGE_STATISTICS,list:[]});
    })
 };

 //员工管理人员信息列表查询
export const getCrewList = (data={}) => (dispatch, getState) => {
    if(isNumber(data.skip)) data.skip = data.skip + '';
    const uri = 'emp/crewquery';
    // cancelRequestByKey(uri);
    NProgress.start();
    dispatch(LOAD_LIST_START);
    AjaxByToken(uri, {
        head: {
            transcode: 'L0043'
        },
        data: {...data}
    })
    .then(res=>{
        dispatch(LOAD_LIST_DONE);
        dispatch({...LOAD_CREW_LIST,list:res.list,count:res.count});
    },err=>{
        // console.log(err);
        dispatch(LOAD_LIST_DONE);
    })
}
 
// 获取全员概览-员工性质分布信息
export const getEmployeeQuality = (latestDays) => (dispatch,getState) => {
    AjaxByToken('TaskCompletion',{
        head: {
            transcode: 'L0009'
        },
        data: {
            latestDays: latestDays + '' //将数字转化为字符串
        }
    })
    .then(res=>{
        console.log(55555,res)
        dispatch({...GET_EMPLOYEE_QUALITY,employeeQuality:[{cnt: 2, stagename: "全职", stageid: 1},
                                                           {cnt: 2, stagename: "兼职", stageid: 2},
                                                           {cnt: 2, stagename: "实习", stageid: 3},
                                                           {cnt: 2, stagename: "未填写", stageid: 4},
                                                          ]});
    },err=>{
        dispatch({...GET_EMPLOYEE_QUALITY,employeeQuality:[1]});
    });
}
