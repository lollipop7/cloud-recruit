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

export const AjaxByPost = (uri,data) => {
    return new Promise(function(resolve, reject) {
                fetch(uri, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                })
                .then(checkStatus)
                .then(parseJSON)
                .then(data=>{
                    resolve(data);
                })
                .catch(function(error) {
                    reject(error);
                })
            });
    
}