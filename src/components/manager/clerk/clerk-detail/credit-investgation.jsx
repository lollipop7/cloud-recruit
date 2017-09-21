import React, {Component} from 'react';

import LoadingComponent from 'components/loading';

export default class CreditInvestgation extends Component {

    state = {
        isSuit: true
    }

    render() {
        const {isSuit} = this.state;
        return (
            <div className="credit-investgation clerk-tab-container">
                <div className="identify-tel inverst-field">
                    <div className="inverst-item inline-block box-border">
                        <div className="top-title">
                            身份证核查
                            <span className="pull-right" style={{color: "#48df81"}}>信息源自中国公安部</span>
                        </div>
                        <div className="superior-content">
                            <div className="inline-block">
                                <img src={`/static/images/manager/clerk/${isSuit ? `gou` : `cha`}.png`} alt="勾差" style={{height: 44}}/>
                            </div>
                            <div className="info-right inline-block">
                                <ul>
                                    <li className="list-item">
                                        <span style={{fontSize: 20}}>刘德华</span>
                                        <span>河南省-郑州市</span>
                                        <span>男</span>
                                    </li>
                                    <li className="list-item">
                                        <span>411721199305177744</span>
                                        <span>1993-05-17</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <img   className="consquence"
                               src={`/static/images/manager/clerk/${isSuit ? `pipei.png` : `bupipei.png`}`
                               } alt="匹配"/>
                    </div>
                    <div className="inverst-item inline-block box-border">
                        <div className="top-title">
                            身份证核查
                            <span className="pull-right" style={{color: "#c25255"}}>信息源自运营商</span>
                        </div>
                        <div className="superior-content">
                            <div className="inline-block">
                                <img src={`/static/images/manager/clerk/${!isSuit ? `gou` : `cha`}.png`} 
                                    alt="勾差"
                                    style={{height: 44}}/>
                            </div>
                            <div className="info-right inline-block">
                                <ul>
                                    <li className="list-item">
                                        <span style={{fontSize: 20}}>138824573271</span>
                                        <span>移动号码</span>
                                    </li>
                                    <li className="list-item">
                                        <span>刘德华</span>
                                        <span>所在地-河北省</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <img   className="consquence"
                               src={`/static/images/manager/clerk/${!isSuit ? `pipei.png` : `bupipei.png`}`
                               } alt="匹配"/>
                    </div>
                </div>
                <div className="inverst-field">
                    <div className="inverst-item">
                        <div className="top-title">
                            学历信息核查
                            <span className="pull-right">数据源自学信网</span>
                        </div>
                        <div className="superior-content">
                            <div>
                                <div className="inline-block info-bar">
                                    <span>毕业证书编号 : </span>
                                    <span>201198000052393</span>
                                </div>
                                <div className="inline-block info-bar">
                                    <span>专业 : </span>
                                    <span>汉语言文学</span>
                                </div>
                                <div className="inline-block info-bar">
                                    <span>院校地址 : </span>
                                    <span>上海市杨浦区邯郸路220号</span>
                                </div>
                            </div>
                            <div>
                                <div className="inline-block">
                                    <div className="inline-block">
                                        <img src="/static/images/clerk/logo.png" alt="学校logo" style={{width: 120, height: 120}}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}