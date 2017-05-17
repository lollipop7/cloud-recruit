import React, {Component} from 'react';

import moment from 'moment';

import {Input} from 'antd';

// redux
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as Actions from 'actions';

class EmailListComponents extends Component {

    state = {
        keyword: ''
    }

    keyword = '';

    componentDidMount() {
        this.props.getEmailHistory();
    }

    handleChange = e => {
        this.setState({
            keyword: e.target.value
        });
    }

    handleKeyUp = e => {
        const {keyword} = this.state;
        if(e.keyCode === 13 &&  this.keyword !== keyword){
            this.keyword = keyword;
            this.props.getEmailHistory({keyword});
        }
    }

    calcTimeDiff(timeStamp) {
        const now = moment().format('x');
        const timeDiff = now-timeStamp;
        const diffHour = timeDiff/1000/60/60;
        if(diffHour < 24) {
            return Math.floor(diffHour) + '小时前';
        }
        return Math.floor(diffHour/24) + '天前';
    }

    render() {
        const {keyword} = this.state,
            {list} = this.props;
        return (
            <div className="box-border">
                <Input 
                    value={keyword}
                    className="search"
                    placeholder="搜索职位或简历"
                    onChange={this.handleChange}
                    onKeyUp = {this.handleKeyUp}
                    suffix={
                        <span className="search-icon"></span>
                    }
                />
                <ul className="history-list">
                    {
                        list.map((item,index)=>{
                            const {headimg,resumename,positionname,srdate} = item;
                            return <li key={index}>
                                        <div className="table">
                                            <div className="table-cell">
                                                <img src="/static/images/email/head.png" alt="用户头像"/>
                                            </div>
                                            <div className="table-cell">
                                                <div className="name">
                                                    {resumename}
                                                </div>
                                                <div className="position-name">
                                                    {positionname}
                                                </div>
                                            </div>
                                            <div className="table-cell">
                                                {this.calcTimeDiff(srdate)}
                                            </div>
                                        </div>
                                    </li>
                        })
                    }
                </ul>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    list: state.Email.list
})
const mapDispatchToProps = dispatch => ({
    getEmailHistory: bindActionCreators(Actions.EmailActions.getEmailHistory, dispatch)
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EmailListComponents);