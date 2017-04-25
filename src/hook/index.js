import store from 'store';

export const onEnterLoginHook = (nextState,replace) => {
    const {token} = store.get('token') || {};
    if(token) replace({pathname:'/'});
}

export const requireAuthHook = (nextState,replace) => {
    const {token} = store.get('token') || {};
    // if(!token) replace({pathname:'/login'});
}