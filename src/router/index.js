import React from 'react';
import { Route, IndexRoute , Redirect } from 'react-router';
import {onEnterLoginHook,requireAuthHook,onLeavePage} from '../hook';

export default function getRoutes () {
  return (
    <Route path='/' component={require('views/Framework').default} breadcrumbName="首页" >
         // 首页
        <IndexRoute 
            onEnter={requireAuthHook}
            onLeave={onLeavePage}
            getComponent={(nextState,cb)=>{
                require.ensure([], (require) => {
                    cb(null, require('pages/index').default)
                }, 'IndexPage')
            }}
        />
        <Route 
            path="job" 
            breadcrumbName="职位管理"
            getComponent={(nextState,cb)=>{
                require.ensure([], (require) => {
                    cb(null, require('pages/job').default)
                }, 'JobPage')
            }}  
        >
                <Route 
                    path="index"
                    onEnter={requireAuthHook}
                    onLeave={onLeavePage} 
                    getComponent={(nextState,cb)=>{
                        require.ensure([], (require) => {
                            cb(null, require('components/job/index').default)
                        }, 'JobIndexPage')
                    }}  
                />
                <Route 
                path="newJob" 
                breadcrumbName="新建职位" 
                onEnter={requireAuthHook}
                onLeave={onLeavePage}
                getComponent={(nextState,cb)=>{
                    require.ensure([], (require) => {
                        cb(null, require('pages/create-job').default)
                    }, 'NewJobPage')
                }}  
            />
        </Route>
        <Route 
            path="recruit" 
            breadcrumbName="招聘流程" 
            onEnter={requireAuthHook}
            onLeave={onLeavePage}
            getComponent={(nextState,cb)=>{
                require.ensure([], (require) => {
                    cb(null, require('pages/recruit').default)
                }, 'RecruitPage')
            }}  
        />
        <Route 
            path="talent" 
            breadcrumbName="人才库" 
            onEnter={requireAuthHook}
            onLeave={onLeavePage}
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
            onLeave={onLeavePage}
            getComponent={(nextState,cb)=>{
                require.ensure([], (require) => {
                    cb(null, require('pages/task').default)
                }, 'TaskPage')
            }}   
        />
        <Route 
            path="login" 
            onEnter={onEnterLoginHook}
            getComponent={(nextState,cb)=>{
                require.ensure([], (require) => {
                    cb(null, require('pages/login').default)
                }, 'LoginPage')
            }}    
        />
        <Route 
            path="changePasswd" 
            breadcrumbName="修改密码"
            onLeave={onLeavePage}
            getComponent={(nextState,cb)=>{
                require.ensure([], (require) => {
                    cb(null, require('pages/change-passwd').default)
                }, 'ChangePasswdPage')
            }} 
        />
        <Route 
            path="settingEmail" 
            breadcrumbName="配置邮箱(候选人管理)"
            onLeave={onLeavePage}
            getComponent={(nextState,cb)=>{
                require.ensure([], (require) => {
                    cb(null, require('pages/setting-email').default)
                }, 'SettingEmailPage')
            }} 
        />
    </Route>
  )
}
