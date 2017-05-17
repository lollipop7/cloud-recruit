import store from 'store';

import {cancelRequest} from 'utils/ajax';

export const onEnterLoginHook = (nextState,replace) => {
    const {token} = store.get('token') || {};
    if(token) replace({pathname:'/'});
}

export const requireAuthHook = (nextState,replace) => {
    const {token} = store.get('token') || {};
    if(!token) replace({pathname:'/login'});
    // 修改网页title
    const {routes} = nextState,
    title = routes[routes.length - 1 ].breadcrumbName;
    document.title = `51云招聘 - ${title ? title : '首页'}`;
}

export const onLeavePage = (nextState,replace) => {
    cancelRequest();
}