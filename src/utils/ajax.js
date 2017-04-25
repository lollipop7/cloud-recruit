import 'whatwg-fetch';

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
            let index = layer.open({
                type: 3
            });
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
                layer.close(index);
                const {returnCode,returnMsg} = data;
                if(returnCode !== 'AAAAAAA'){
                    layer.open({
                        type: 0,
                        content: returnMsg,
                        icon: 2
                    });
                }else{
                    resolve(data);
                }
            })
            .catch(function(error) {
                layer.close(index);
                reject(error);
            })
        });
}