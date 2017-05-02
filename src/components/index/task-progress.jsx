import React, {Component} from 'react';
import echarts from 'static/js/echarts.min.js';
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
                    itemWidth: 15,
                    data:[
                        {
                            name: '申请人数 ',
                            icon: 'image://static/images/index/reply.png'
                        },
                        {
                            name: '面试人数',
                            icon: 'image://static/images/index/interview.png'
                        },
                        {
                            name: '复试人数',
                            icon: 'image://static/images/index/sinterview.png'
                        },
                        {
                            name: 'offer人数',
                            icon: 'image://static/images/index/offer.png'
                        },
                        {
                            name: '入职人数',
                            icon: 'image://static/images/index/entry.png'
                        }
                    ],
                    itemGap: 11,
                    textStyle: {
                        color: '#6b6b6b',
                        fontSize: 12
                    },
                    padding: 7,
                    bottom: 0,
                    borderColor: '#d5d5d5',
                    borderWidth: 1,
                },
                grid: {
                    show: false,
                    top: 0,
                    bottom: 0,
                    left: 0,
                    right: 0,
                    width: 244,
                    height: 276,
                    containLabel: false
                },
                series: [
                    {
                        name:'任务完成指数',
                        type:'pie',
                        center: ['50%',115],
                        radius: ['40%', '65%'],
                        avoidLabelOverlap: false,
                        label: {
                            normal: {
                                show: true,
                                position: 'inside',
                                formatter: '{c}',
                                textStyle:{
                                    fontSize: 12
                                }
                            },
                            emphasis: {
                                show: true,
                                textStyle: {
                                    fontSize: '16',
                                    fontWeight: 'bold'
                                }
                            }
                        },
                        data:[
                            {value:335, name:'申请人数 '},
                            {value:310, name:'面试人数'},
                            {value:234, name:'复试人数'},
                            {value:135, name:'offer人数'},
                            {value:1548, name:'入职人数'}
                        ]
                    }
                ]
            };

            // 使用刚指定的配置项和数据显示图表。
            myChart.setOption(option);
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