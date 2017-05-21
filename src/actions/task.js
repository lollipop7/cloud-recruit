import * as types from 'constants/task.js';

import axios from 'axios';
import store from 'store';
import FileSaver from 'file-saver';
import merge from 'lodash/merge';

import {AjaxByToken,cancelRequestByKey} from 'utils/ajax';

import {notification} from 'antd'; 

import data from 'data/test';

// 获取任务报表
const GET_TASK_START = {type:types.GET_TASK_START};
const GET_TASK_REPORT = {type:types.GET_TASK_REPORT};
const GET_TASK_DONE = {type:types.GET_TASK_DONE};

// 下载任务报表
const DOWNLOAD_TASK_START = {type:types.DOWNLOAD_TASK_START};
const DOWNLOAD_TASK_DONE = {type:types.DOWNLOAD_TASK_DONE};

// 获取任务报表
export const getTaskReport = (data={},startDate,endDate) => (dispatch,getState) => {
    dispatch(GET_TASK_START);
    AjaxByToken('/web/progress_report',{
        head: {
            transcode: 'L0034',
        },
        data: data
    })
    .then(res=>{
        dispatch(GET_TASK_DONE);
        // let copyMap={};
        // copyMap['海擎金融总部'] = JSON.parse(JSON.stringify(res.map['51金融圈总部']));
        // let data = {...res.map,...copyMap};
        let endtime = endDate ? endDate : new Date().getTime(),
            starttime = startDate ? startDate :  endtime - 7*24*60*60*1000;
        dispatch({...GET_TASK_REPORT,data:{list:res.map,starttime,endtime}});
    });
}

// 下载任务报表
export const downloadTaskReport = () => (dispatch,getState) => {
    dispatch(DOWNLOAD_TASK_START);
    // AjaxByToken('/web/progress_reportDownLoad',{
    //     head: {
    //         transcode: 'L0039'
    //     }
    // })
    // .then(res=>{
    //     dispatch(DOWNLOAD_TASK_DONE);
    //     // dispatch({...GET_TASK_REPORT,data:res.map});
    // },err=>{
    //     dispatch(DOWNLOAD_TASK_DONE);
    // });
    const token = store.get('token');
    axios({
        url: '/web/progress_reportDownLoad',
        method: 'post',
        data: merge({data:token},{
            head:{
                type:'h',
                transcode: 'L0039'
            }
        }),
        header: {
            contentType: 'application/json;charset=utf-8'
        },
    })
    .then(res=>{
        dispatch(DOWNLOAD_TASK_DONE);
        const {data} = res;
        var blob = new Blob([data], {type: "application/vnd.ms-excel"});
        FileSaver.saveAs(blob, "任务报表.xls");
    });
}