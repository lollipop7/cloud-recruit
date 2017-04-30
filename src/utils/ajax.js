import 'whatwg-fetch';
import store from 'store';
import merge from 'lodash/merge';

import {notification} from 'antd';

const checkStatus = response => {
    // layer.closeAll('loading'); //关闭加载层
    if (response.status >= 200 && response.status < 300) {
        return response
    } else {
        var error = new Error(response.statusText)
        error.response = response
        notification.error({
            message: '网络错误',
            description: response.statusText
        });
        // Notification({
        //     title: '错误',
        //     message: response.statusText,
        //     type: 'error'
        // });
        // layer.open({
        //     type: 0,
        //     content: response.statusText,
        //     icon: 2
        // });
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
                    // layer.open({
                    //     type: 0,
                    //     content: returnMsg,
                    //     icon: 2
                    // });
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