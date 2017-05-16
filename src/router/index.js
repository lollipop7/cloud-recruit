import {onEnterLoginHook,requireAuthHook,onLeavePage} from '../hook';

/**
 * 引入子路由
 */

// 职位管理页面子路由
const JobIndex = {
    path: 'index',
    onEnter:requireAuthHook,
    onLeave:onLeavePage,
    getComponent(nextState,cb){
        require.ensure([], (require) => {
            cb(null, require('components/job/index').default)
        }, 'JobIndexPage')
    }
}

const NewJob = {
    path: 'newJob',
    breadcrumbName:"新建职位",
    onEnter:requireAuthHook,
    onLeave:onLeavePage,
    getComponent(nextState,cb){
        require.ensure([], (require) => {
            cb(null, require('pages/create-job').default)
        }, 'NewJobPage')
    } 
}

// 引入职位管理路由组件
const Job = {
    path: 'job',
    breadcrumbName: '职位管理',
    getChildRoutes(partialNextState, cb) {
        require.ensure([], (require) => {
            cb(null, [
                JobIndex,
                NewJob
            ])
        })
    },
    getComponent(nextState,cb){
        require.ensure([], (require) => {
            cb(null, require('pages/job').default)
        }, 'JobPage')
    } 
}

// 引入招聘流程路由组件
const Recruit = {
    path: 'recruit', // resumeId:职位id logId:流程id
    breadcrumbName:"招聘流程", 
    onEnter:requireAuthHook,
    onLeave:onLeavePage,
    getComponent(nextState,cb){
        require.ensure([], (require) => {
            cb(null, require('pages/recruit').default)
        }, 'RecruitPage')
    }
}

// 引入招聘详情页面路由组件
const resumeInfo = {
    path: 'resumeInfo(/:resumeId)(/:logId)', // resumeId:职位id logId:流程id
    // breadcrumbName:"招聘流程", 
    onEnter:requireAuthHook,
    // onLeave:onLeavePage,
    getComponent(nextState,cb){
        require.ensure([], (require) => {
            cb(null, require('pages/resume-info').default)
        }, 'ResumeInfoPage')
    }
}

// 引入人才库路由组件
const Talent = {
    path:"talent(/:keywords)",
    breadcrumbName:"人才库",
    onEnter:requireAuthHook,
    onLeave:onLeavePage,
    getComponent:(nextState,cb)=>{
        require.ensure([], (require) => {
            cb(null, require('pages/talent').default)
        }, 'TalentPage')
    }
}

// 引入任务报表路由组件
const Task = {
    path:"task",
    breadcrumbName:"任务报表",
    onEnter:requireAuthHook,
    onLeave:onLeavePage,
    getComponent:(nextState,cb)=>{
        require.ensure([], (require) => {
            cb(null, require('pages/task').default)
        }, 'TaskPage')
    }
}

// 引入邮件路由组件
const Email = {
    path:"email",
    breadcrumbName:"邮件管理",
    onEnter:requireAuthHook,
    onLeave:onLeavePage,
    getComponent:(nextState,cb)=>{
        require.ensure([], (require) => {
            cb(null, require('pages/email').default)
        }, 'EmailPage')
    }
}

//引入登陆路由组件
const Login = {
    path:"login",
    onEnter:onEnterLoginHook,
    getComponent:(nextState,cb)=>{
        require.ensure([], (require) => {
            cb(null, require('pages/login').default)
        }, 'LoginPage')
    }
}

//引入修改密码路由
const ChangePasswd = {
    path:"changePasswd",
    breadcrumbName:"修改密码",
    onLeave:onLeavePage,
    getComponent:(nextState,cb)=>{
        require.ensure([], (require) => {
            cb(null, require('pages/change-passwd').default)
        }, 'ChangePasswdPage')
    }
}

// 引入配置邮箱路由
const SettingEmail = {
    path:"settingEmail",
    breadcrumbName:"配置邮箱(候选人管理)",
    onLeave:onLeavePage,
    getComponent:(nextState,cb)=>{
        require.ensure([], (require) => {
            cb(null, require('pages/setting-email').default)
        }, 'SettingEmailPage')
    } 
}

/*路由配置*/
const RouteConfig = {
  childRoutes: [ {
    path: '/',
    breadcrumbName:'首页',
    component: require('views/Framework').default,
    indexRoute: {
        onEnter:requireAuthHook,
        onLeave:onLeavePage,
        getComponent(nextState,cb){
            require.ensure([], (require) => {
                cb(null, require('pages/index').default)
            }, 'IndexPage')
        } 
    },
    childRoutes: [
      Job,
      Recruit,
      Talent,
      Task,
      Login,
      ChangePasswd,
      SettingEmail,
      resumeInfo,
      Email
    ]
  } ]
}

module.exports = RouteConfig;