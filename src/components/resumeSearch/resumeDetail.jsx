import React, {Component,PropTypes} from 'react';

import {Button , Menu , Input , Icon , Select , Cascader} from 'antd';
const SubMenu = Menu.SubMenu;

export default class ResumeDetailPage extends Component {
    checkResumeDetail = () => {
        this.props.checkCandidate()
    }
    render() {
        const {path} = this.props;
        return (
            <div className="resumeDetail">
                <div className="detail-item">
                    <div className="details-item-intention">
                        <div className="resume-id">
                            <span>ID:</span>
                            <span>10064996</span>
                        </div>
                        <div className="intention">
                            <div className="intention-item">
                                <span>求职意向：</span>
                                <span>WEB前端开发</span>
                            </div>
                            <div className="intention-item">
                                <span>薪资范围：</span>
                                <span>10001-15000</span>
                            </div>
                            <div className="intention-item">
                                <span>期望城市：</span>
                                <span>上海</span>
                            </div>
                            <div className="intention-item">
                                <span>更新时间：</span>
                                <span>2018-01-09</span>
                            </div>
                        </div>  
                    </div>
                    <div className="details-item-main">
                        <div className="main-left">
                            <h3>崔先生 | 26岁 | 3年 | 本来工坊科技有限公司 | html前端工程师 | 北京 昌平区</h3>
                            <div className="main-left-company">
                                <p>本来工坊科技有限公司</p>
                                <p>web前端工程师</p>
                                <p>2016-03-01 至 2016-09-01</p>
                            </div>
                            <div className="main-left-company">
                                <p>蓝凌（北京）科技有限公司</p>
                                <p>HTML5开发工程师</p>
                                <p>2014-06-01 至 2016-04-01</p>
                            </div>
                            <div className="main-left-company">
                                <p>榆林职业技术学院</p>
                                <p>电子信息科学与技术</p>
                                <p>大专</p>
                            </div>  
                        </div>
                        <div className="main-right">
                            <Button 
                                className="detailBtn"
                                type="primary" 
                                ghost 
                                onClick= {this.checkResumeDetail}
                            >
                                查看联系人
                            </Button>
                            <div style={{width:"100%",height:10}}></div>
                            <Button 
                                type="primary" 
                                ghost 
                                className="detailBtn"
                            >
                                {path ==="collectResume" ?"取消收藏":"收藏"}
                            </Button>
                            <div style={{width:"100%",height:10}}></div>
                            {path ==="collectResume" &&
                                <Button 
                                    type="primary" 
                                    ghost 
                                    className="detailBtn"
                                >
                                    备注
                                </Button>
                            }
                            
                        </div>
                    </div>
                </div>    
            </div>
        );
    }
}