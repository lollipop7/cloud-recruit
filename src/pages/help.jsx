import React, {Component,PropTypes} from 'react';

import {Button} from 'antd';

import ScrollPageContent from 'components/scroll-page-content';

export default class NotFoundPage extends Component {

    static contextTypes = {
        router: PropTypes.object
    }

    componentDidMount(){
        NProgress.done();
    }

    goHome = () => {
        NProgress.start();
        this.context.router.push('/');
    }

    render() {
        return (
            <ScrollPageContent>
                <div className="page-content not-found-page">
                    {/* <div className="opening-img error-img"></div> */}
                    <div className="error-text">
                        <p>页面待开发,敬请期待！</p>
                    </div>
                    <Button type="primary" onClick={this.goHome}>返回首页</Button>
                </div>
            </ScrollPageContent>
        );
    }
}