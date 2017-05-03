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

// react-router
import { Router , hashHistory } from 'react-router'

// redux
import { createStore , applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import reducer from './reducer';

import getRoutes from './router';
const routes = getRoutes();

// 创建一个store
const store = createStore(reducer,applyMiddleware(thunk));

import Styles from './scss/main.scss';

ReactDom.render(
    <Provider store={store}>
        <Router history={hashHistory}>
            {routes}
        </Router>
    </Provider>
,document.getElementById('app'));