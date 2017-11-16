/**
 * Created by guofeng on 2017/11/14.
 */
define(['jquery', 'common', 'layer', 'chartBundle'], function($, COMMON, layer, Chart) {
    var af = {
        load: function () {
            var chartColors = {
                red: 'rgb(255, 99, 132)',
                orange: 'rgb(255, 159, 64)',
                yellow: 'rgb(255, 205, 86)',
                green: 'green',
                blue: 'rgb(54, 162, 235)',
                purple: 'rgb(153, 102, 255)',
                grey: 'rgb(201, 203, 207)'
            };
            var Samples = {
                utils:{
                    srand: function(seed) {
                        this._seed = seed;
                    },
                    rand: function(min, max) {
                        var seed = this._seed;
                        min = min === undefined ? 0 : min;
                        max = max === undefined ? 1 : max;
                        this._seed = (seed * 9301 + 49297) % 233280;
                        return min + (this._seed / 233280) * (max - min);
                    }
                }
            };
            Samples.utils.srand(Date.now());
            var randomScalingFactor = function() {
                return Math.round(Samples.utils.rand(-100, 100));
            };
            var config = {
                type: 'line',
                data: {
                    labels: ["1", "2", "3"],
                    datasets: [{
                        label: "a",
                        fill: false,
                        // pointRadius: 6,          //点形半径。如果设置为0，则不会呈现该点。
                        // pointHoverRadius: 5,    //对鼠标事件作出反应的非显示点的像素大小。
                        backgroundColor: chartColors.blue,
                        borderColor: chartColors.blue,
                        data: [3.1,5.45,2.5],
                    }, {
                        label: "b",
                        fill: false,
                        backgroundColor: chartColors.green,
                        borderColor: chartColors.green,
                        borderDash: [5, 5],
                        data: [4,4,2],
                    }, {
                        label: "c",
                        display:true,
                        backgroundColor: chartColors.red,
                        borderColor: chartColors.red,
                        data: [4.8,4.9,3],
                        fill: false,
                    }, {
                        label: "d",
                        display:true,
                        backgroundColor: chartColors.red,
                        borderColor: chartColors.red,
                        data: [4.2,4.1,3.3],
                        fill: false,
                    }, {
                        label: "e",
                        display:true,
                        backgroundColor: chartColors.red,
                        borderColor: chartColors.red,
                        data: [1.4,1.7,3],
                        fill: false,
                    }, {
                        label: "f",
                        fill: false,
                        backgroundColor: chartColors.green,
                        borderColor: chartColors.green,
                        borderDash: [5, 5],
                        data: [2,3,1],
                    }, {
                        label: "g",
                        fill: false,
                        backgroundColor: chartColors.green,
                        borderColor: chartColors.green,
                        borderDash: [5, 5],
                        data: [3,2,1],
                    }]
                },
                options: {
                    responsive: true,
                    title:{
                        display:true,
                        text:'最大：10 最小：0'
                    },
                    legend: {
                        position: 'bottom',
                    },
                    tooltips: {
                        mode: 'index'
                    },
                    scales: {
                        xAxes: [{
                            scaleLabel: {
                                display: false,
                                labelString: 'Month'
                            }
                        }],
                        yAxes: [{
                            scaleLabel: {
                                display: false,
                                labelString: 'Value'
                            },
                            ticks: {
                                beginAtZero:true
                            }
                        }]
                    }
                }
            };
            var ctx = document.getElementById("canvas").getContext("2d");
            var myLine = new Chart(ctx, config);

            var tableLength=4;//行数

            //刷新
            $("#loadBtn").click(function(){
                if(config.data.labels.length<tableLength){
                    config.data.datasets.push({
                        label: "h",
                        fill: false,
                        backgroundColor: chartColors.yellow,
                        borderColor: chartColors.yellow,
                        borderDash: [5, 5],
                        data: [3,2,1],
                    });
                    config.data.labels=["1",'2','3','4'];
                };
                config.data.datasets.forEach(function(dataset) {
                    if(dataset.data.length<tableLength) {
                        dataset.data.push(4);
                    };
                    dataset.data = dataset.data.map(function() {
                        return randomScalingFactor();
                    });
                });
                myLine.update();
            });
        }
    };
    return{
        'init':af.load
    };
});