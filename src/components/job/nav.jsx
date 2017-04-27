import React, {Component} from 'react';

export default class LeftNavComponent extends Component {

    state = {
        selectedIndex: 0
    }

    handleClick(index,type) {
        if(this.state.selectedIndex === index) return;
        this.setState({
            selectedIndex: index
        });
        const {onClick} = this.props;
        if(onClick){
            onClick(type);
        }
    }

    render() {
        const {selectedIndex} = this.state;
        const {title='',data} = this.props;
        return (
            <ul className="left-nav box-border">
                <li>
                    <a href="javascript:void(0);">{title}</a>
                    <dl>
                        {data.map((item,index)=>{
                            const {type,title,num} = item;
                            return (
                                <dd 
                                    key={index} 
                                    onClick={this.handleClick.bind(this,index,type)}
                                    className={selectedIndex === index ? 'active' : ''}
                                >
                                    {title} ({num})
                                </dd>
                            )
                        })}
                    </dl>
                </li>
            </ul>
        );
    }
}