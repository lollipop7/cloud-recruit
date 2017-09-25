import React, {Component} from 'react';
import LoadingComponent from 'components/loading';
import echarts from 'static/js/echarts.min.js';

// 指定图表的配置项和数据
// import options from 'data/chart/bar';

// redux
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as Actions from 'actions';

class BarChartComponent extends Component {

    option = {
        title: {
            text: '世界人口总量',
            subtext: '数据来自网络'
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        legend: {
            data: ['2011年', '2012年']
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'value',
            boundaryGap: [0, 0.01]
        },
        yAxis: {
            type: 'category',
            data: ['巴西','印尼','美国','印度','中国','世界人口(万)']
        },
        series: [
            {
                name: '2011年',
                type: 'line',
                data: [18203, 23489, 29034, 104970, 131744, 630230]
            },
            {
                name: '2012年',
                type: 'line',
                data: [19325, 23438, 31000, 121594, 134141, 681807]
            }
        ]
    };

    chartInstance = null;

    state = {
        isLoading: false,
        activeTab: 0,
        isEmpty: false
    }

    componentDidMount(){
        this.setState({
            isLoading: true
        });
        // 实例化图表
        this.chartInstance = echarts.init(this.refs.echarts);
        // 使用刚指定的配置项和数据显示图表。
        this.chartInstance.setOption(this.option);
    }

    render() {
        
        return (
            <div ref="echarts" className="box-border" style={{
                width: 885,
                height: 301,
            }}>
            </div>
        );
    }
}

const mapStateToProps = state => ({
})
const mapDispatchToProps = dispatch => ({
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BarChartComponent);