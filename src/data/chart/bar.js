module.exports = {
    
    title: {
        text: ''
    },
        tooltip: {},
    legend: {
        data:['月薪（万元）']
    },
    xAxis: {
        data: ["P10","P50","平均值","P90"]
    },
    yAxis: {},
    series: [{
        name: '月薪（万元）',
        barWidth :60,
        label: {
            normal: {
                show: true,
                position: 'outside',
                color:"#656565",
                formatter: '{c}（万元）'
            }
        },
        type: 'bar',
        data: [2,3,4,3]
    }]
}