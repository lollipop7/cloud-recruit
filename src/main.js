import React from 'react';
import ReactDom from 'react-dom';
import Promise from 'promise-polyfill'; 

// css文件
import normallize from 'static/css/normalize.css';
import nprogress from 'static/css/nprogress.css';

// To add to window
if (!window.Promise) {
  window.Promise = Promise;
}

// React 性能分析工具
import Perf from 'react-addons-perf';
window.Perf = Perf;

// react-router
import { Router , hashHistory } from 'react-router'

// redux
import { createStore , applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import reducer from './reducer';

// import getRoutes from './router/router.bak';
// const routes = getRoutes();
import routes from './router';

// 创建一个store
const store = createStore(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__({
        name: 'test'
    }),
    applyMiddleware(thunk)
);

import Styles from './scss/main.scss';

ReactDom.render(
    <Provider store={store}>
        <Router history={hashHistory} routes={routes}>
        </Router>
    </Provider>
,document.getElementById('app'));