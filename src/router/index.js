import {onEnterLoginHook,requireAuthHook,onLeavePage} from '../hook';

/**
 * 引入子路由
 */

// 职位管理页面子路由
const JobIndex = {
    path: 'index(/:positionid)',
    breadcrumbName:"职位管理",
    onEnter:requireAuthHook,
    onLeave:onLeavePage,
    getComponent(nextState,cb){
        require.ensure([], (require) => {
            cb(null, require('components/job/index').default)
        }, 'JobIndexPage')
    }
}

// 创建职位页面路由
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
    path: 'recruit(/:stageid)',
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
    breadcrumbName:"登陆",
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
    onEnter:requireAuthHook,
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
    onEnter:requireAuthHook,
    onLeave:onLeavePage,
    getComponent:(nextState,cb)=>{
        require.ensure([], (require) => {
            cb(null, require('pages/setting-email').default)
        }, 'SettingEmailPage')
    } 
}

// 引入员工管理页面路由
const ManagerPage = {
    path:"manager",
    breadcrumbName:"员工管理",
    onLeave:onLeavePage,
    getComponent:(nextState,cb)=>{
        require.ensure([], (require) => {
            cb(null, require('pages/manager').default)
        }, 'ManagerPage')
    }
}

// 引入使用帮助页面路由
const HelpPage = {
    path:"help",
    breadcrumbName:"使用帮助",
    onLeave:onLeavePage,
    getComponent:(nextState,cb)=>{
        require.ensure([], (require) => {
            cb(null, require('pages/help').default)
        }, 'HelpPage')
    }
}

// 引入404页面路由
const NotFoundPage = {
    path:"*",
    onLeave:onLeavePage,
    getComponent:(nextState,cb)=>{
        require.ensure([], (require) => {
            cb(null, require('pages/404').default)
        }, 'NotFoundPage')
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
      Job, // 职位
      Recruit, // 招聘
      Talent, // 人才
      Task, // 任务报表
      Login, // 登陆
      ChangePasswd, // 修改密码
      SettingEmail, // 设置邮箱
      resumeInfo, // 简历详情
      Email,
      ManagerPage, // 员工管理
      HelpPage, //使用帮助
      NotFoundPage // 404
    ]
  } ]
}

module.exports = RouteConfig;