var chart = {
            bar_chart(label,datas){
                    const c = document.getElementById('bar_chart');
                    var ctx = c.getContext("2d")
                    var gradient = ctx.createLinearGradient(0, 0, 0, 170);
                        gradient.addColorStop(0, "black");
                        gradient.addColorStop(1, "white");
                    ctx.fillStyle = gradient;
                    new Chart(c, {
                        type: 'bar',
                        data: {
                            labels: label.reverse(),
                            datasets: [{
                                label: '主題文章數',
                                data: datas.reverse(),
                                borderWidth: 1,
                                backgroundColor: ["#000505","#373041","#646873"],
                            }]
                        },
                        options: {
                            scales: {
                                y: {
                                    beginAtZero: true
                                }
                            }
                        }
                    });
                },
            line_chart(label,data1,data2){
                var ctx = document.getElementById('line_chart');
                var myChart = new Chart(ctx, {
                    type: 'line',
                    data: {
                        labels: label.reverse(),
                        datasets: [{
                    label: '正向評價數',
                    data: data1.reverse(),
                    fill: false,
                    borderColor: '#646873',},
                    {
                    label: '負向評價數',
                    data: data2.reverse(),
                    fill: false,
                    borderColor: '#000505',
                }
            ],
        }});
            },
			word_chart(wordSegment,frequency){
				var data = [];
                for(var i = 0;i<wordSegment.length;i++){
                    data.push({"x":wordSegment[i],"value":frequency[i]});
                }
                var chart = anychart.tagCloud(data);
                chart.title('關鍵字出現數比例');                
                var coolor = anychart.scales.linearColor();
                coolor.colors(["#BFCDE0", "#000505"]);
                chart.colorScale(coolor);
                chart.colorRange(true);
                chart.colorRange().length('80%');
                chart.container("word_cloud");
                chart.draw();
			}
}
export default chart;

