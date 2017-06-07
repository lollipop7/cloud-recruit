import React, {Component} from 'react';
import BasicPage from './basic';
import ScrollPageContent from 'components/scroll-page-content';

export default class HelpPage extends BasicPage {

    componentDidMount() {
        this.hideNProgress();
    }

    render() {
        return (
            <ScrollPageContent>
                <div className="page-content manager-page">
                    使用帮助界面
                </div>
            </ScrollPageContent>
        );
    }
}