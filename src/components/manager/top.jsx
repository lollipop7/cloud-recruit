import React, {Component} from 'react';

import { Input } from 'antd';

import BoxComponent from './box';

export default class TopComponent extends Component {

    state = {
        keyWord: ''
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
        return (
            <div
                style={{
                    position: 'relative',
                    fontSize: 0
                }}
            >
                <BoxComponent 
                    num={188}
                    desc="全部人员"
                    triangle={true}
                    numColor="#ef5672"
                />
                <BoxComponent 
                    num={169}
                    desc="正式员工"
                    numColor="#bb76fb"
                />
                <BoxComponent 
                    num={5}
                    desc="试用期"
                    circle={true}
                    numColor="#fac23f"
                    style={{
                        marginRight: 40
                    }}
                />
                <BoxComponent 
                    num={9}
                    desc="待入职人员"
                    numColor="#489bf4"
                />
                <BoxComponent 
                    num={2}
                    desc="离职员工"
                    numColor="#b2bac2"
                />
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