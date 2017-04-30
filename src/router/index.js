import React from 'react';
import { Route, IndexRoute } from 'react-router';
import {onEnterLoginHook,requireAuthHook} from '../hook';

export default function getRoutes () {
  return (
    <Route path='/' component={require('views/Framework').default} breadcrumbName="首页" >
      // 首页
      <IndexRoute component={require('pages/index').default} onEnter={requireAuthHook} />
      <Route path="job" component={require('pages/job').default} breadcrumbName="职位管理" onEnter={requireAuthHook}>
        <Route path="newJob" component={require('pages/create-job').default} breadcrumbName="新建职位" onEnter={requireAuthHook} />
      </Route>
      <Route path="recruit" component={require('pages/recruit').default} breadcrumbName="招聘流程" onEnter={requireAuthHook} />
      <Route path="talent" component={require('pages/talent').default} breadcrumbName="人才库" onEnter={requireAuthHook} />
      <Route path="task" component={require('pages/task').default} breadcrumbName="任务报表" onEnter={requireAuthHook} />
      <Route path="login" component={require('pages/login').default} onEnter={onEnterLoginHook} />
    </Route>
  )
}
