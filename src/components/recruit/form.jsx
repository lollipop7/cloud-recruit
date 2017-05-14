import React, {Component} from 'react';

import { Input , Button } from 'antd';

import pickBy from 'lodash/pickBy';

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

    handleFind = () => {
        const filterObj = pickBy(this.state,(val,key)=>{
            return val !== '';
        });
        this.props.findEvent(filterObj);
    }

    render() {
        const {showUploadModal} = this.props;
        const {
            positionname,
            livecityid,
            username,
            workyear
        } = this.state;
        return (
            <div className="form">
                <div className="float-button" onClick={()=>showUploadModal()} style={{
                    bottom: 0
                }}>
                    <Button type="primary"></Button>
                    <span>导入简历</span>
                </div>
                <div className="bottom16">
                    <Input 
                        placeholder="申请职位"
                        value={positionname}
                        onChange={(e) => this.handleChange('positionname',e)}
                    />
                    <Input 
                        placeholder="居住地"
                        value={livecityid}
                        onChange={(e) => this.handleChange('livecityid',e)}
                    />
                </div>
                <div>
                    <Input 
                        placeholder="姓名" 
                        value={username}
                        onChange={(e) => this.handleChange('username',e)}
                    />
                    <Input 
                        placeholder="工作年限"
                        value={workyear}
                        onChange={(e) => this.handleChange('workyear',e)}
                    />
                    <Button type="primary" onClick={this.handleFind}>查询</Button>
                    <Button className="grey" onClick={this.resetForm}>清空条件</Button>
                </div>
            </div>
        );
    }
}