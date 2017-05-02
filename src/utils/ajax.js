import 'whatwg-fetch';
import store from 'store';
import merge from 'lodash/merge';

import {notification} from 'antd';

const checkStatus = response => {
    if (response.status >= 200 && response.status < 300) {
        return response
    } else {
        var error = new Error(response.statusText)
        error.response = response
        notification.error({
            message: '网络错误',
            description: response.statusText
        });
        throw error
    }
}

const parseJSON = response => {
    return response.json();
}

const getData = data => {
    data.head.type = 'h';
    return data;
}

export const AjaxByPost = (uri,data) => {
    return new Promise(function(resolve, reject) {
            fetch(uri, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(getData(data))
            })
            .then(checkStatus)
            .then(parseJSON)
            .then(data=>{
                const {returnCode,returnMsg} = data;
                if(returnCode !== 'AAAAAAA'){
                }else{
                    resolve(data);
                }
            })
            .catch(function(error) {
                reject(error);
            })
        });
}

export const AjaxByToken = (uri,data) => {
    // 获取本地存储的token
    const token = store.get('token');
    return AjaxByPost(uri,merge(data,{data:token}));
}