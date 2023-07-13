var chart = {
            bar_chart(label,datas){
                    const ctx = document.getElementById('bar_chart');

                    new Chart(ctx, {
                        type: 'bar',
                        data: {
                            labels: label,
                            datasets: [{
                                label: '關鍵字比數',
                                data: datas,
                                borderWidth: 1,
                                backgroundColor: ['yellow', 'aqua', 'pink', 'lightgreen', 'lightblue', 'gold','blue','green','red','gray','#55ee00'],
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
            line_chart(){
                var ctx = document.getElementById('line_chart');
                var myChart = new Chart(ctx, {
                    type: 'line',
                    data: {
                        labels: ['1/1', '1/8', '1/15', '1/22', '1/29', '2/5', '2/12'],
                        datasets: [{
                    label: '正向評價數',
                    data: [20, 22.3, 25, 26, 28, 31.2, 33],
                    fill: false,
                    borderColor: 'rgb(75, 192, 192)',},
                    {
                    label: '負向評價數',
                    data: [23, 26, 24.7, 30, 21, 23, 25],
                    fill: false,
                    borderColor: 'rgb(192, 75, 192)',
                }
            ],
        }});
            },
			word_chart(){
				var data = [
    					{"x": "小燈泡", "value": 1090000000, category: "小燈泡"},
    					{"x": "內湖", "value": 983000000, category: "內湖"},
    					{"x": "新聞", "value": 527000000, category: "新聞"},
    					{"x": "警方", "value": 281000000, category: "警方"},
    					{"x": "母親", "value": 267000000, category: "母親"},
    					{"x": "死刑", "value": 229000000, category: "死刑"},
    					{"x": "嫌犯", "value": 129000000, category: "嫌犯"},
                        {"x": "台北", "value": 100000000, category: "台北"},
                        {"x": "殺害", "value": 91000000, category: "殺害"},
                        {"x": "兒童", "value": 40000000, category: "兒童"},
                        {"x": "生命", "value": 20000000, category: "生命"},
  				];
                var chart = anychart.tagCloud(data);
                chart.title('關鍵字出現數');
                chart.angles([0]);
                chart.colorRange(true);
                chart.colorRange().length('80%');
                chart.container("word_cloud");
                chart.draw();
			}
}
export default chart;

