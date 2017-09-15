import React, {Component} from 'react';
import { Link } from 'react-router'

export default class LeftNavComponent extends Component {

    navData = [
        {name:'员工名册',path:'/manager'},              //clerk
        {name:'档案管理',path:'/manager/archives'},
        {name:'组织架构',path:'/manager/organize'},
        {name:'全员状况',path:'/manager/condition'},
        {name:'人事动态',path:'/manager/dynamics'}
    ];

    state = {
        activeType: 0
    }

    _showNprogress=(uri='')=>{
        const {location} = this.props,
            {pathname} = location;
        if(uri === pathname) return ;
        NProgress.start();
    }

    handleClick = (activeType, path) => {
        this.setState({activeType});
    }

    render() {
        const {activeType} = this.state;
        const {location} = this.props,
        {pathname} = location;
        return (
            <div className="left-nav">
                <ul>
                    {
                        this.navData.map((item,index)=>{
                            const {path,name} = item;
                            return (
                                <Link 
                                    to={path}
                                    onClick={()=>this._showNprogress(path)}
                                >
                                    <li 
                                        key={index}
                                        className={activeType === index ? 'active': ''}
                                        style={{
                                            backgroundImage: 
                                            `url(static/images/manager/${activeType === index ? `active-` : ``}img-0${index+1}.png)` 
                                        }}
                                        onClick={()=>this.handleClick(index)}
                                    >
                                    {item.name} 
                                    </li>
                                </Link>
                            )
                        })
                    }
                </ul>
            </div>
        );
    }
}