import store from 'store';

import {cancelRequest} from 'utils/ajax';

// 已经登录如果再次进入登陆页,跳转到首页
export const onEnterLoginHook = (nextState,replace) => {
    const {token} = store.get('token') || {};
    if(token) replace({pathname:'/'});
}

// 权限验证
export const requireAuthHook = (nextState,replace) => {
    const {token} = store.get('token') || {};
<<<<<<< HEAD
        if(!token) replace({pathname:'/login'});
        // 修改网页title
        const {routes} = nextState,
        title = routes[routes.length - 1 ].breadcrumbName;
        document.title = `51云招聘 - ${title ? title : '首页'}`;  
=======
    if(!token) replace({pathname:'/login'});
    // 修改网页title
    const {routes} = nextState,
    title = routes[routes.length - 1 ].breadcrumbName;
    document.title = `51云招聘 - ${title ? title : '首页'}`; 
>>>>>>> 3afd87a6bdf4be85be58ae0748b778055a65aa7c
}

// 离开页面触发此钩子
export const onLeavePage = (nextState,replace) => {
    cancelRequest();
}