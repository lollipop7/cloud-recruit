import React, {Component} from 'react';

export default class TaskProgressComponent extends Component {

    componentDidMount() {
         var myChart = echarts.init(this.refs.echarts);
            // 指定图表的配置项和数据
            var option = {
                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b}: {c} ({d}%)",
                    position: function (pos, params, dom, rect, size) {
                        // 鼠标在左侧时 tooltip 显示到右侧，鼠标在右侧时 tooltip 显示到左侧。
                        var obj = {top: 60};
                        obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 5;
                        return obj;
                    }
                },
                legend: {
                    data:[
                        {
                            name: '申请人数',
                            icon: 'circle'
                        },
                        {
                            name: '面试人数',
                            icon: 'circle'
                        },
                        {
                            name: '复试人数',
                            icon: 'circle'
                        },
                        {
                            name: 'offer人数',
                            icon: 'circle'
                        },
                        {
                            name: '入职人数',
                            icon: 'circle'
                        }
                    ],
                    itemGap: 5,
                    textStyle: {
                        color: '#6b6b6b',
                        fontSize: 12
                    },
                    width: '100%',
                    bottom: 0,
                    borderColor: '#d5d5d5',
                    borderWidth: 1,
                },
                grid: {
                    show: true,
                    top: 0,
                    containLabel: false
                },
                series: [
                    {
                        name:'任务完成指数',
                        type:'pie',
                        radius: ['50%', '70%'],
                        avoidLabelOverlap: false,
                        label: {
                            normal: {
                                show: false,
                                position: 'center'
                            },
                            emphasis: {
                                show: true,
                                textStyle: {
                                    fontSize: '16',
                                    fontWeight: 'bold'
                                }
                            }
                        },
                        labelLine: {
                            normal: {
                                show: false
                            }
                        },
                        data:[
                            {value:335, name:'申请人数'},
                            {value:310, name:'面试人数'},
                            {value:234, name:'复试人数'},
                            {value:135, name:'offer人数'},
                            {value:1548, name:'入职人数'}
                        ]
                    }
                ]
            };

            // 使用刚指定的配置项和数据显示图表。
            // myChart.setOption(option);
    }

    render() {
        return (
            <div className="task-progress box-border">
                <div className="title">任务完成指数</div>
                <div ref="echarts" className="pie-chart">

                </div>
            </div>
        );
    }
}