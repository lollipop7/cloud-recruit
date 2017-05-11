import React, {Component,PropTypes} from 'react';

export default class LeftNavComponent extends Component {

    static propTypes = {
        title: PropTypes.string,
        data: PropTypes.array,
        isLoading: PropTypes.bool,
        onClick: PropTypes.func
    }

    state = {
        _selectedIndex: 0
    }

    handleClick(index,type) {
        if(this.state._selectedIndex === index) return;
        this.setState({
            _selectedIndex: index
        });
        const {onClick} = this.props;
        if(onClick){
            onClick(type);
        }
    }

    getItem = (item,index) => {
        const {_selectedIndex} = this.state,
            {type,title,num=0} = item,
            {isLoading} = this.props;
        return (
            <dd 
                key={index} 
                onClick={this.handleClick.bind(this,index,type)}
                className={_selectedIndex === index ? 'active' : ''}
            >
                {title} 
                ({isLoading ?
                    <div 
                        className={_selectedIndex === index ? 'preloader-white' : 'preloader'} 
                        style={{
                            position: 'relative',
                            top: 3,
                            width: 16,
                            height: 16
                        }}
                    >
                    </div> :
                    num
                })
            </dd>
        )
    }

    render() {
        const {_selectedIndex} = this.state,
            {
                title='',
                data=[]
            } = this.props;
        return (
            <ul className="left-nav box-border">
                <li>
                    <a className="title" href="javascript:void(0);">{title}</a>
                    <dl>
                        {data.map((item,index)=>{
                            return this.getItem(item,index);
                        })}
                    </dl>
                </li>
            </ul>
        );
    }
}