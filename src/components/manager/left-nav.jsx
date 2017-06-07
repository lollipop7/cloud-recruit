import React, {Component} from 'react';

export default class LeftNavComponent extends Component {

    navData = ['员工名册','档案管理','组织架构','全员状况','人事动态'];

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
                                <li 
                                    key={index}
                                    className={activeType === index ? 'active': ''}
                                    style={{
                                        backgroundImage: `url(static/images/manager/img-0${index+1}.png)`
                                    }}
                                    onClick={()=>this.handleClick(index)}
                                >
                                   {item} 
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        );
    }
}