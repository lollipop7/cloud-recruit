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

//员工管理档案管理在职人员信息
const GET_ARCHIVES_START = {type: types.GET_ARCHIVES_START};
const GET_ARCHIVES_DONE = {type: types.GET_ARCHIVES_DONE};
const GET_ARCHIVES_LIST = {type: types.GET_ARCHIVES_LIST};

//员工管理档案管理离职人员信息
const GET_LEAVEARCHIVES_START = {type: types.GET_LEAVEARCHIVES_START};
const GET_LEAVEARCHIVES_DONE = {type: types.GET_LEAVEARCHIVES_DONE};
const GET_LEAVEARCHIVES_LIST = {type: types.GET_LEAVEARCHIVES_LIST};

//档案管理员工数据
const GET_ARCHIVES_DATA = {type: types.GET_ARCHIVES_DATA};

//档案管理个人材料Modal
const SHOW_PERSONALMATERIAL_MODAL = {type:types.SHOW_PERSONALMATERIAL_MODAL};
const HIDE_PERSONALMATERIAL_MODAL = {type:types.HIDE_PERSONALMATERIAL_MODAL};

//员工名册-员工详情
const SHOW_CLERK_DETAIL = {type: types.SHOW_CLERK_DETAIL};

//档案管理table数据
const ARCHIVES_TABLE_DATA = {type: types.ARCHIVES_TABLE_DATA}

// 获取全员概览-员工性质分布信息
const GET_EMPLOYEE_QUALITY = {type:types.GET_EMPLOYEE_QUALITY};

// 获取全员概览-员工性质分布信息
const GET_DEPARTMENT_LIST = {type:types.GET_DEPARTMENT_LIST};

// 根据部门id查询子部门及人员
const GET_DEPARTMENT_STAFF = {type:types.GET_DEPARTMENT_STAFF};

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

//获取档案管理在职人员列表信息
export const getArchivesList = (data={}) => (dispatch,getState) => {
    NProgress.start();
    dispatch(GET_ARCHIVES_START);
    AjaxByToken('archives/resume_statis_List_Job', {
        head: {
            transcode: 'L0075'
        },
        data: data
    })
    .then(res=>{
        //console.log(res)
        dispatch(GET_ARCHIVES_DONE);
        dispatch({...GET_ARCHIVES_LIST,list:res.list,count:res.count});
    },err=>{
        console.log(err);
        dispatch(GET_ARCHIVES_DONE);
    })
}

//获取档案管理离职人员列表信息
export const getLeaveArchivesList = (data={}) => (dispatch,getState) => {
    NProgress.start();
    dispatch(GET_LEAVEARCHIVES_START);
    AjaxByToken('archives/resume_statis_List_Department', {
        head: {
            transcode: 'L0076'
        },
        data: data
    })
    .then(res=>{
        //console.log(res)
        dispatch(GET_LEAVEARCHIVES_DONE);
        for(let i=0;i<res.list.length;i++){
            delete res.list[i].children;  
        }
        dispatch({...GET_LEAVEARCHIVES_LIST,list:res.list,count:res.count});
        
    },err=>{
        dispatch(GET_LEAVEARCHIVES_DONE);
    })
}

//显示档案管理个人材料Modal
export const showPersonalMaterialModal = () => (dispatch,getState) => {
    dispatch({...SHOW_PERSONALMATERIAL_MODAL,personalMaterialVisible:true})
}
export const hidePersonalMaterialModal = () => (dispatch,getState) => {
    dispatch({...HIDE_PERSONALMATERIAL_MODAL,personalMaterialVisible:false})
}

//员工名册-员工详情
export const showClerkDetail = data => (dispatch, getState) => {
    dispatch({...SHOW_CLERK_DETAIL, crewDetail:data});
}

//档案管理在职、离职人员数据
export const getArchivesData = (data={}) => (dispatch,getState) => {
    AjaxByToken('archives/resume_statis', {
        head: {
            transcode: 'L0074'
        },
        data: data
    })
    .then(res=>{
        //console.log(res)
        //dispatch(GET_ARCHIVES_DONE);
        dispatch({...GET_ARCHIVES_DATA,archivesData:res});
    },err=>{
        console.log(err);
        dispatch(GET_ARCHIVES_DONE);
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
        dispatch({...GET_EMPLOYEE_QUALITY,employeeQuality:[{cnt: 2, stagename: "全职", stageid: 1},
                                                           {cnt: 2, stagename: "兼职", stageid: 2},
                                                           {cnt: 2, stagename: "实习", stageid: 3},
                                                           {cnt: 2, stagename: "未填写", stageid: 4},
                                                          ]});
    },err=>{
        dispatch({...GET_EMPLOYEE_QUALITY,employeeQuality:[1]});
    });
}

//  组织架构-部门列表查询
export const getDepartMentList = (data={}) => (dispatch,getState) => {
    AjaxByToken('structure/resume_statis_List_Department',{
        head: {
            transcode: 'L0078',
            type: 'h'
        },
        data: data
    })
    .then(res=>{
        dispatch({...GET_DEPARTMENT_LIST,list:res.list,count:res.count});
    },err=>{
        dispatch({...GET_DEPARTMENT_LIST});
    });
}

//档案管理table数据
export const changeTableData = (data) => (dispatch, getState) => {
    dispatch({...ARCHIVES_TABLE_DATA,archivesTableData:data})
}
 
//  组织架构-根据部门id查询子部门及人员
export const getDepartMentStaff = (data={}) => (dispatch,getState) => {
    AjaxByToken('structure/resume_statis_List_DepartmentAndResumeOff',{
        head: {
            transcode: 'L0079',
            type: 'h'
        },
        data: data
    })
    .then(res=>{
        dispatch({...GET_DEPARTMENT_STAFF,departmentStaff:res});
    },err=>{
        dispatch({...GET_DEPARTMENT_STAFF});
    });
}