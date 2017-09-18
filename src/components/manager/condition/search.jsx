import React, {Component} from 'react';
import { Input , Button , Cascader , Select , Icon } from 'antd';
const Option = Select.Option;
const Search = Input.Search

 export default class SearchComponent extends Component {

     componentDidMount(){
        NProgress.done();
     }

     render(){
        const {routes} = this.props;
        return (
            <div className='form'>
                <div className="inline-block">
                    <Select
                        style={{ width: 200, 'margin-right':'16px' }}
                    >
                        <Option value="jack">Jack</Option>
                        <Option value="lucy">Lucy</Option>
                        <Option value="tom">Tom</Option>
                    </Select>
                </div>
                <div className="inline-block">
                    <Input 
                        placeholder="请输入岗位名称" 
                    />
                </div>
                <div className="bottom28 inline-block">
                    <div className="inline-block">
                        <Button style={{'margin-left':'16px' }} >搜索</Button>
                    </div>
                </div>
                <div className="pull-right">
                    <Button style={{width: '40px',padding: 0,border: 'none',backgroundColor: '#ffa93a'}} >
                        <img 
                            style = {{
                                width: 40,
                                height: 40
                            }}
                            src="./static/images/resume/share.jpg" alt="分享"/>
                    </Button>
                </div>
            </div>
        );
     }
 }