import store from 'store';

import {cancelRequest} from 'utils/ajax';

export const onEnterLoginHook = (nextState,replace) => {
    const {token} = store.get('token') || {};
    if(token) replace({pathname:'/'});
}

export const requireAuthHook = (nextState,replace) => {
    const {token} = store.get('token') || {};
    // if(!token) replace({pathname:'/login'});
}

export const onLeavePage = (nextState,replace) => {
    cancelRequest();
}