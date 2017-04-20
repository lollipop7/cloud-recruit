import 'whatwg-fetch';
import message from 'antd/lib/message';

const checkStatus = response => {
    if (response.status >= 200 && response.status < 300) {
        return response
    } else {
        var error = new Error(response.statusText)
        error.response = response
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
                    message.error(data.returnMsg,3);
                    resolve(data);
                })
                .catch(function(error) {
                    reject(error);
                })
            });
    
}