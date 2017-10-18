module.exports = {
    
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        }
    },
    legend: {
        data:[{
            name: '工作月份',
            // 强制设置图形为圆
            icon: 'circle',
            // 设置文本为红色
            textStyle: {
                color: 'red'
            }
        }]
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis: {
        type: 'value'
    },
    yAxis: {
        type: 'category',
        data: ['第一份工作', '第二份工作', '第三份工作', '第四份工作']
    },
    series: [
                {
                    name: '工作月份',
                    type: 'bar',
                    data: [
                        {value:10,itemStyle:{normal:{color:"#ffb530"}}}, 
                        {value:52,itemStyle:{normal:{color:"#61aa61"}}},
                        {value:36,itemStyle:{normal:{color:"#1587c7"}}},
                        {value:30,itemStyle:{normal:{color:"#c25255"}}}
                    ]
                }
                
    ]
}