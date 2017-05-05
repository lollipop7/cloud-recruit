import axios from 'axios';
import store from 'store';

// lodash
import merge from 'lodash/merge';
import omit from 'lodash/omit';

import { notification } from 'utils/antd';

const CancelToken = axios.CancelToken;
let cancel = [];

// let instance = axios.create({
//     timeout: 25000,
//     headers: {'Content-Type': 'application/json;charset=utf-8'},
// });

export const cancelRequest = function() {
    cancel.forEach(item=>{
        Object.keys(item).forEach(key=>{
            item[key]();
        });
    });
    cancel = [];
}

export const cancelRequestByKey = function(key) {
    cancel.forEach(item=>{
        item[key] && item[key](`cancel uri:${key} request!`);
    });
}

export const AjaxByPost = (uri, data) => {
    return new Promise(function(resolve, reject) {
        axios({
            url: uri,
            method: 'post',
            data: merge(data,{
                head:{
                    type:'h'
                }
            }),
            header: {
                contentType: 'application/json'
            },
            cancelToken: new CancelToken(function (c) {
                cancel.push({
                    [uri]: c
                });
            }),
            transformResponse(data,b){
                NProgress.done();
                return JSON.parse(data);
            }
        })
        .then(response => {
            const {data} = response;
            const { returnCode, returnMsg } = data;
            if (returnCode !== 'AAAAAAA') {
                console.error(`${returnCode}:${returnMsg}`);
                notification.error(returnMsg);
            } else {
                resolve(omit(data,['returnCode','returnMsg']));
            }
        })
        .catch(function(response,e) {
            // console.log(response.config);
            if (response instanceof Error) {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', response.message);
                notification.error('网络错误',response.message);
            } else if(axios.isCancel(response)) {
                console.log(response.message);
            } else {
                // The request was made, but the server responded with a status code
                // that falls out of the range of 2xx
                console.log(response.data);
                console.log(response.status);
                console.log(response.headers);
                console.log(response.config);
            }
        })
    });
    
}

export const AjaxByToken = (uri, data) => {
    // 获取本地存储的token
    const token = store.get('token');
    return AjaxByPost(uri, merge(data, { data: token }));
}