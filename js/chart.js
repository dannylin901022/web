var chart = {
            bar_chart(label,datas){
                    var ctx = document.getElementById('bar_chart').getContext("2d")
                    var gradient = ctx.createLinearGradient(0, 0, 0, 170);
                        gradient.addColorStop(0, "black");
                        gradient.addColorStop(1, "white");
                    ctx.fillStyle = gradient;
                    var graphique = Chart.getChart("bar_chart");
                    if(graphique){
                        graphique.destroy();
                    }
                    new Chart(ctx, {
                        type: 'bar',
                        options: {
                            scales: {
                                y: {
                                    beginAtZero: true
                                }
                            },
                             plugins: {
                                datalabels: {
                                    color: '#36A2EB',
                                    anchor:'end',
                                    align: 'end',
                                    offset:4,
                                    font: {
                                        size: 8,
                                    },
                                }
                             },
                        },
                        data: {
                            labels: label,
                            datasets: [{
                                label: '主題文章數',
                                data: datas,
                                borderWidth: 1,
                                backgroundColor: ["#000505","#373041","#646873"],
                                datalabels: {
                                    color: '#332233'
                                },
                            }]
                        },
                        
                    });
                },
            line_chart(label,data1,data2){
                var ctx = document.getElementById('line_chart');
                var graphique = Chart.getChart("line_chart");
                    if(graphique){
                        graphique.destroy();
                    }
                var myChart = new Chart(ctx, {
                    type: 'line',
                    options: {
                            scales: {
                                y: {
                                    beginAtZero: true
                                }
                            },
                        },
                    data: {
                        labels: label,
                        datasets: [{
                    label: '正向評價數',
                    data: data1,
                    fill: false,
                    borderColor: '#646873',
                        },
                    {
                    label: '負向評價數',
                    data: data2,
                    fill: false,
                    borderColor: '#000505',
                }
            ],
        }});
                let max = Math.max.apply(null, data1);
                let max_text=label[data1.indexOf(max)];
                let min = Math.min.apply(null, data1);
                let min_text=label[data1.indexOf(min)];
                document.getElementById("p_max").innerHTML = "正向最大值：" + max + "\t\t日期：" + max_text;
                document.getElementById("p_min").innerHTML = "正向最小值：" + min + "\t\t日期：" + min_text;
                
                max = Math.max.apply(null, data2);
                max_text=label[data2.indexOf(max)];
                min = Math.min.apply(null, data2);
                min_text=label[data2.indexOf(min)];
                document.getElementById("n_max").innerHTML = "負向最大值：" + max + "\t\t日期：" + max_text;
                document.getElementById("n_min").innerHTML = "負向最小值：" + min + "\t\t日期：" + min_text;

            },
			word_chart(wordSegment,frequency){
                //chart_1
				var data1 = [];
                for(var i = 0;i<wordSegment.length;i++){
                    data1.push({"x":wordSegment[i],"value":frequency[i]});
                }
                document.getElementById("word_cloud1").innerHTML = null;
                var chart1 = anychart.tagCloud(data1);
                chart1.title('總體關鍵字出現數比例');                
                var coolor1 = anychart.scales.linearColor();
                coolor1.colors(["#BFCDE0", "#000505"]);
                chart1.colorScale(coolor1);
                chart1.colorRange(true);
                chart1.colorRange().length('80%');
                chart1.container("word_cloud1");
                chart1.draw();
                
                document.getElementById("wc1").innerHTML = null;
                var chart1_1 = anychart.tagCloud(data1);
                chart1_1.title('總體關鍵字出現數比例');                
                var coolor1_1 = anychart.scales.linearColor();
                coolor1_1.colors(["#BFCDE0", "#000505"]);
                chart1_1.colorScale(coolor1_1);
                chart1_1.colorRange(true);
                chart1_1.colorRange().length('80%');
                chart1_1.container("wc1");
                chart1_1.draw();
                
                
                //chart_2
				var data2 = [];
                for(var i = 0;i<wordSegment.length;i++){
                    data2.push({"x":wordSegment[i],"value":frequency[i]});
                }
                
                document.getElementById("word_cloud2").innerHTML = null;
                var chart2 = anychart.tagCloud(data2);
                chart2.title('正向關鍵字出現數比例');                
                var coolor2 = anychart.scales.linearColor();
                coolor2.colors(["#BFCDE0", "#000505"]);
                chart2.colorScale(coolor2);
                chart2.colorRange(true);
                chart2.colorRange().length('80%');
                chart2.container("word_cloud2");
                chart2.draw();
                
                document.getElementById("wc2").innerHTML = null;
                var chart2_2 = anychart.tagCloud(data2);
                chart2_2.title('正向關鍵字出現數比例');                
                var coolor2_2 = anychart.scales.linearColor();
                coolor2_2.colors(["#BFCDE0", "#000505"]);
                chart2_2.colorScale(coolor2_2);
                chart2_2.colorRange(true);
                chart2_2.colorRange().length('80%');
                chart2_2.container("wc2");
                chart2_2.draw();
                
                
                //chart_3
				var data3 = [];
                for(var i = 0;i<wordSegment.length;i++){
                    data3.push({"x":wordSegment[i],"value":frequency[i]});
                }
                document.getElementById("word_cloud3").innerHTML = null;
                var chart3 = anychart.tagCloud(data3);
                chart3.title('負向關鍵字出現數比例');                
                var coolor3 = anychart.scales.linearColor();
                coolor3.colors(["#BFCDE0", "#000505"]);
                chart3.colorScale(coolor3);
                chart3.colorRange(true);
                chart3.colorRange().length('80%');
                chart3.container("word_cloud3");
                chart3.draw();
                
                document.getElementById("wc3").innerHTML = null;
                var chart3_3 = anychart.tagCloud(data3);
                chart3_3.title('負向關鍵字出現數比例');                
                var coolor3_3 = anychart.scales.linearColor();
                coolor3_3.colors(["#BFCDE0", "#000505"]);
                chart3_3.colorScale(coolor3_3);
                chart3_3.colorRange(true);
                chart3_3.colorRange().length('80%');
                chart3_3.container("wc3");
                chart3_3.draw();
			}
}
export default chart;

