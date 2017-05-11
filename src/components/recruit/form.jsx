import React, {Component} from 'react';

import { Input , Button } from 'antd';

export default class FormComponents extends Component {

    state = {
        positionname: '',
        livecityid: '',
        username: '',
        workyear: ''
    }

    handleChange(field,e){
        this.setState({
            [field]: e.target.value
        });
    }

    resetForm = () => {
        this.setState({
            positionname: '',
            livecityid: '',
            username: '',
            workyear: ''
        });
    }

    render() {
        const {positionname,livecityid,username,workyear} = this.state;
        return (
            <div className="form">
                <div className="float-button">
                    <Button type="primary"></Button>
                    <span>导入简历</span>
                </div>
                <div className="bottom16">
                    <Input 
                        placeholder="申请职位"
                        value={positionname}
                        onChange={this.handleChange.bind(this,'positionname')}
                    />
                    <Input 
                        placeholder="居住地"
                        value={livecityid}
                        onChange={this.handleChange.bind(this,'livecityid')}
                    />
                </div>
                <div>
                    <Input 
                        placeholder="姓名" 
                        value={username}
                        onChange={this.handleChange.bind(this,'username')}
                    />
                    <Input 
                        placeholder="工作年限"
                        value={workyear}
                        onChange={this.handleChange.bind(this,'workyear')}
                    />
                    <Button type="primary">查询</Button>
                    <Button className="grey" onClick={this.resetForm}>清空条件</Button>
                </div>
            </div>
        );
    }
}