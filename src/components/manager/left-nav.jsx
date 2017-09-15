import React, {Component} from 'react';
import { Link } from 'react-router'

export default class LeftNavComponent extends Component {

    navData = [{name:'员工名册',linkName:'manager/index'},
               {name:'档案管理',linkName:'manager/archives'},
               {name:'组织架构',linkName:'manager/organize'},
               {name:'全员状况',linkName:'manager/condition'},
               {name:'人事动态',linkName:'manager/dynamics'}];

    state = {
        activeType: 0
    }

    handleClick = activeType => {
        this.setState({activeType});
    }

    render() {
        const {activeType} = this.state;
        return (
            <div className="left-nav">
                <ul>
                    {
                        this.navData.map((item,index)=>{
                            return (
                                <Link to={item.linkName}>
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