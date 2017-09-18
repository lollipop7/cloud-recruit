import React, {Component,PropTypes} from 'react';

import {Button} from 'antd';
import BasicPage from './basic';

import ScrollPageContent from 'components/scroll-page-content';

export default class HelpPage extends BasicPage {

    static contextTypes = {
        router: PropTypes.object
    }

    componentDidMount(){
        this.hideNProgress();
    }

    goHome = () => {
        NProgress.start();
        this.context.router.push('/');
    }

    render() {
        return (
            <ScrollPageContent>
                <div className="page-content not-found-page">
                    {/*<img src="./static/images/404/404.png" alt="page not found"/>*/}
                    <div className="error-text"style={{
                            fontSize: 72,
                            top: 200
                        }}>
                        <p>您访问的页面待开发</p>
                    </div>
                    <Button type="primary" onClick={this.goHome}>返回首页</Button>
                </div>
            </ScrollPageContent>
        );
    }
}