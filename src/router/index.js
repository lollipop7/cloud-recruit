import React from 'react';
import { Route, IndexRoute } from 'react-router';
import {onEnterLoginHook,requireAuthHook} from '../hook';

export default function getRoutes () {
  return (
    <Route path='/' component={require('views/Framework').default}>
      // 首页
      <IndexRoute component={require('pages/index').default} onEnter={requireAuthHook} />
      <Route path="job" component={require('pages/job').default} onEnter={requireAuthHook} />
      <Route path="recruit" component={require('pages/recruit').default} onEnter={requireAuthHook} />
      <Route path="login" component={require('pages/login').default} onEnter={onEnterLoginHook} />
    </Route>
  )
}
