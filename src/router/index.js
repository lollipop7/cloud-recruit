import React from 'react';
import { Route, IndexRoute , Redirect } from 'react-router';
import {onEnterLoginHook,requireAuthHook} from '../hook';
// component={require('pages/index').default} 
// component={require('pages/talent').default}
// component={require('pages/job').default}
// component={require('pages/create-job').default}
// component={require('pages/task').default} 
// component={require('pages/login').default}
// component={require('pages/recruit').default}
export default function getRoutes () {
  return (
    <Route path='/' component={require('views/Framework').default} breadcrumbName="首页" >
         // 首页
        <IndexRoute 
            onEnter={requireAuthHook}
            getComponent={(nextState,cb)=>{
                require.ensure([], (require) => {
                    cb(null, require('pages/index').default)
                }, 'IndexPage')
            }} 
        />
        <Route 
            path="job" 
            getComponent={(nextState,cb)=>{
                require.ensure([], (require) => {
                    cb(null, require('pages/job').default)
                }, 'JobPage')
            }}  
            breadcrumbName="职位管理"
            onEnter={requireAuthHook}
        >
                <Route 
                    path="index" 
                    getComponent={(nextState,cb)=>{
                        require.ensure([], (require) => {
                            cb(null, require('components/job/index').default)
                        }, 'JobIndexPage')
                    }}  
                    onEnter={requireAuthHook} 
                />
                <Route 
                path="newJob" 
                getComponent={(nextState,cb)=>{
                    require.ensure([], (require) => {
                        cb(null, require('pages/create-job').default)
                    }, 'NewJobPage')
                }}  
                breadcrumbName="新建职位" 
                onEnter={requireAuthHook} 
            />
        </Route>
        <Route 
            path="recruit" 
            getComponent={(nextState,cb)=>{
                require.ensure([], (require) => {
                    cb(null, require('pages/recruit').default)
                }, 'RecruitPage')
            }}  
            breadcrumbName="招聘流程" 
            onEnter={requireAuthHook} 
        />
        <Route path="talent" 
            breadcrumbName="人才库" 
            onEnter={requireAuthHook}
            getComponent={(nextState,cb)=>{
                require.ensure([], (require) => {
                    cb(null, require('pages/talent').default)
                }, 'TalentPage')
            }}  
        />
        <Route 
            path="task" 
            breadcrumbName="任务报表" 
            onEnter={requireAuthHook}
            getComponent={(nextState,cb)=>{
                require.ensure([], (require) => {
                    cb(null, require('pages/task').default)
                }, 'TaskPage')
            }}   
        />
        <Route 
            path="login" 
            getComponent={(nextState,cb)=>{
                require.ensure([], (require) => {
                    cb(null, require('pages/login').default)
                }, 'LoginPage')
            }}    
            onEnter={onEnterLoginHook} 
        />
        <Redirect from="/job" to="/job/index" />
    </Route>
  )
}
