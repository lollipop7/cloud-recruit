import React, {Component} from 'react';
import { Link } from 'react-router'

export default class LeftNavComponent extends Component {

    navData = [
        {name:'员工名册',path:'manager'},
        {name:'档案管理',path:'manager/archives'},
        {name:'组织架构',path:'manager/organize'},
        {name:'全员状况',path:'manager/condition'},
        {name:'人事动态',path:'manager/dynamics'}
    ];

    state = {
        activeType: 0
    }

    handleClick = activeType => {
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
                            return (
                                <Link to={item.path}>
                                    <li 
                                        key={index}
                                        className={activeType === index ? 'active': ''}
                                        style={{
                                            backgroundImage: `url(static/images/manager/img-0${index+1}.png)`
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