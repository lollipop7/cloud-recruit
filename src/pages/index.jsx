import React, {Component} from 'react';
import BasicPage from './basic';
import TimeComponent from 'components/index/time';
// 列表
import ListComponent from 'components/index/list';
// 折线图
import LineChartComponent from 'components/index/line-chart';
// 饼图
import PieChartComponent from 'components/index/pie-chart';
// 表格
import TableComponent from 'components/index/table';

import ScrollPageContent from 'components/scroll-page-content';

export default class IndexPage extends BasicPage {

    componentDidMount() {
        this.hideNProgress();
    }
    
    render() {
        return (
            <ScrollPageContent>
                <div className="page-content index-page">
                    <div className="list-block">
                        <div className="pull-left">
                            <TimeComponent />
                            <ListComponent />
                        </div>
                        <div className="pull-right" style={{backgroundColor: '#FFF'}}>
                            <LineChartComponent />
                        </div>
                    </div>
                    <div className="list-block">
                        <div className="pull-left">
                            <PieChartComponent />
                        </div>
                        <div className="pull-right">
                            <TableComponent />
                        </div>
                    </div>
                </div>
            </ScrollPageContent>
        );
    }
}