import React, {Component} from 'react';

import { Input } from 'antd';

export default class TopComponent extends Component {

    state = {
        keyWord: '',
        _selectedIndex: 0   //当前选中的
    }

    setSelectedIndex = _selectedIndex => {
        this.setState({_selectedIndex});
    }

    getItem = (item, index) => {
        const {_selectedIndex} = this.state,
            {
                num=0,
                desc='',
                circle=false,
                numColor='',
                type=''
            } =item,
            {isLoading} = this.props;
            return(
                <div 
                    className={`box ${_selectedIndex === index ? 'active' : ''}`}
                    style={{
                        borderColor: _selectedIndex === index && numColor,
                        marginRight: index === 2 && 40
                    }}
                    onClick={this.handleClickBox.bind(this,index,type,desc)}
                >
                    <div className="table">
                        <div className="table-cell">
                            <p className="num" style={{
                                color: numColor
                            }}>
                                {
                                    isLoading ? 
                                    <div 
                                        className={_selectedIndex === index ? 'preloader-white' : 'preloader'} 
                                    >
                                    </div> : 
                                    num
                                }
                            </p>
                            <p className="desc">
                                {desc}
                            </p>
                        </div>
                    </div>
                    {
                        _selectedIndex === index && <div className="triangle" style={{borderBottomColor: _selectedIndex === index  ? numColor : ''}}></div>
                    }
                    {
                        circle && <div className="circle"></div>
                    }
                </div>
            )

    }

    handleClickBox = (index,type,desc) => {
        this.setSelectedIndex(index);
        const {onClick} = this.props;
        if(onClick){
            onClick(type,desc)
        }
    }

    handleKeyUp = e => {

        if(e.keyCode === 13){
            console.log('回车搜索');
        }
    }

    handleChange = e => {
        this.setState({
            keyWord: e.target.value
        });
    }

    handleClick = e => {
        console.log(e);
    }

    

    render() {
        const {keyWord} = this.state;
        const {data=[],isLoading} = this.props;
        return (
            <div
                style={{
                    position: 'relative',
                    fontSize: 0
                }}
            >
                {data.map((item,index) => {
                    return this.getItem(item, index)
                })}
                <Input 
                    placeholder="员工搜索"
                    style={{
                        position: 'absolute',
                        right: 0,
                        top: 0,
                        width: 200
                    }}
                    onKeyUp = {this.handleKeyUp}
                    onChange = {this.handleChange}
                    suffix={
                        <a 
                            href="javascript:;"
                            onClick={this.handleClick}
                        >
                            <img src="static/images/manager/search.png" alt="搜索"/>
                        </a>
                    }
                />
                <p style={{
                    fontSize: '12px',
                    color: '#868686',
                    marginTop: 8
                }}>
                    *待入职员工和离职员工不计入人员总数，不会在全部人员中显示。
                </p>
            </div>
        );
    }
}

