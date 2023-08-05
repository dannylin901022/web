var chart = {
    bar_chart(label, datas) {
        let max = Math.max.apply(null, datas);
        let max_text = label[datas.indexOf(max)];
        let min = max;
        for (var i = 0; i < datas.length; i++) {
            if (datas[i] < max && datas[i] != 0) {
                min = datas[i];
            }
        }
        let min_text = label[datas.indexOf(min)];

        let sum = 0;
        for (var i = 0; i < datas.length; i++) {
            sum += datas[i];
        }

        document.getElementById("b_sum").innerHTML =
            "文章總數：" + sum.toLocaleString();
        document.getElementById("b_max").innerHTML =
            "主題討論最大值：" +
            max.toLocaleString() +
            "<br>" +
            "日期：" +
            max_text;
        document.getElementById("b_min").innerHTML =
            "主題討論最小值：" +
            min.toLocaleString() +
            "<br>" +
            "日期：" +
            min_text;

        var ctx = document.getElementById("bar_chart").getContext("2d");
        var gradient = ctx.createLinearGradient(0, 0, 0, 170);
        gradient.addColorStop(0, "black");
        gradient.addColorStop(1, "white");
        ctx.fillStyle = gradient;
        var graphique = Chart.getChart("bar_chart");
        if (graphique) {
            graphique.destroy();
        }
        new Chart(ctx, {
            type: "bar",
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                    },
                    xAxes: {
                        ticks: {
                            maxTicksLimit: 50,
                            //autoSkip: false
                        },
                    },
                },
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    datalabels: {
                        color: "#36A2EB",
                        anchor: "end",
                        align: "end",
                        offset: 4,
                        font: {
                            size: 0,
                        },
                        listeners: {
                            enter: function (context, event) {
                                context.hovered = true;
                                return true;
                            },
                            leave: function (context, event) {
                                context.hovered = false;
                                return true;
                            },
                        },
                    },
                },
                onHover: (evt, activeEls) => {
                    activeEls.length > 0
                        ? (evt.chart.canvas.style.cursor = "pointer")
                        : (evt.chart.canvas.style.cursor = "default");
                },
                onClick: (evt, el, chart) => {
                    if (el[0]) {
                        document.getElementById("bar_link").innerHTML = "";
                        this.bar_chart_zoom(
                            label,
                            datas,
                            el[0].index,
                            max,
                            max_text
                        );
                    }
                },
            },
            data: {
                labels: label,
                datasets: [
                    {
                        label: "主題討論數",
                        data: datas,
                        borderWidth: 1,
                        backgroundColor: ["#05FFA7", "#3CC796", "#58FFC4"],
                        datalabels: {
                            color: "#332233",
                            listeners: {
                                click: function (context) {
                                    console.log(
                                        "label " +
                                            context.dataIndex +
                                            " 被按到了!"
                                    );
                                },
                            },
                        },
                    },
                ],
            },
        });
        //document.getElementById('bar_chart_div').style.width = label.length * 100 + "";
    },
    line_chart(label, data1, data2) {
        var data1_all = data1,
            data2_all = data2,
            label_all = label;
        for (var i = 0; i < data1.length; i++) {
            if (data1_all[i] == 0 && data2_all[i] == 0) {
                data1_all.splice(i, i + 1);
                data2_all.splice(i, i + 1);
                label_all.splice(i, i + 1);
            }
        }

        var ctx = document.getElementById("line_chart_all");
        var graphique = Chart.getChart("line_chart_all");
        if (graphique) {
            graphique.destroy();
        }
        var myChart = new Chart(ctx, {
            type: "line",
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                    },
                },
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    datalabels: {
                        color: "#36A2EB",
                        anchor: "end",
                        align: "end",
                        offset: 4,
                        font: {
                            size: 0,
                        },
                    },
                    legend: {
                        position: "left",
                    },
                },
            },
            data: {
                labels: label_all,
                datasets: [
                    {
                        label: "正向評價數",
                        data: data1_all,
                        fill: false,
                        borderColor: "#FF5454",
                    },
                    {
                        label: "負向評價數",
                        data: data2_all,
                        fill: false,
                        borderColor: "#66FF07",
                    },
                ],
            },
        });

        ctx = document.getElementById("line_chart");
        graphique = Chart.getChart("line_chart");
        if (graphique) {
            graphique.destroy();
        }
        myChart = new Chart(ctx, {
            type: "line",
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                    },
                },
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    datalabels: {
                        color: "#36A2EB",
                        anchor: "end",
                        align: "end",
                        offset: 4,
                        font: {
                            size: 0,
                        },
                    },
                    legend: {
                        position: "left",
                    },
                },
            },
            data: {
                labels: label,
                datasets: [
                    {
                        label: "正向評價數",
                        data: data1,
                        fill: false,
                        borderColor: "#FF5454",
                    },
                    {
                        label: "負向評價數",
                        data: data2,
                        fill: false,
                        borderColor: "#66FF07",
                    },
                ],
            },
        });
        document.getElementById("line_chart_div").style.width =
            label.length * 50 + "";

        let max = Math.max.apply(null, data1);
        let max_text = label[data1.indexOf(max)];
        let min = max;
        for (var i = 0; i < data1.length; i++) {
            if (data1[i] < max && data1[i] != 0) {
                min = data1[i];
            }
        }
        let min_text = label[data1.indexOf(min)];
        document.getElementById("p_max").innerHTML =
            "正向最大值：" +
            max.toLocaleString() +
            "<br>" +
            "日期：" +
            max_text;
        document.getElementById("p_min").innerHTML =
            "正向最小值：" +
            min.toLocaleString() +
            "<br>" +
            "日期：" +
            min_text;

        max = Math.max.apply(null, data2);
        max_text = label[data2.indexOf(max)];
        min = max;
        for (var i = 0; i < data2.length; i++) {
            if (data2[i] < max && data2[i] != 0) {
                min = data2[i];
            }
        }
        min_text = label[data2.indexOf(min)];
        document.getElementById("n_max").innerHTML =
            "負向最大值：" +
            max.toLocaleString() +
            "<br>" +
            "日期：" +
            max_text;
        document.getElementById("n_min").innerHTML =
            "負向最小值：" +
            min.toLocaleString() +
            "<br>" +
            "日期：" +
            min_text;
    },
    word_chart_all(wordSegment, frequency) {
        //chart_1
        var data1 = [];
        for (var i = 0; i < wordSegment.length; i++) {
            data1.push({ x: wordSegment[i], value: frequency[i] });
        }
        document.getElementById("word_cloud1").innerHTML = null;
        var chart1 = anychart.tagCloud(data1);
        chart1.title("總體關鍵字出現數比例");
        var coolor1 = anychart.scales.linearColor();
        coolor1.colors(["#BFCDE0", "#000505"]);
        chart1.colorScale(coolor1);
        chart1.colorRange(true);
        chart1.colorRange().length("80%");
        chart1.container("word_cloud1");
        chart1.draw();

        document.getElementById("wc1").innerHTML = null;
        var chart1_1 = anychart.tagCloud(data1);
        chart1_1.title("總體關鍵字出現數比例");
        var coolor1_1 = anychart.scales.linearColor();
        coolor1_1.colors(["#BFCDE0", "#000505"]);
        chart1_1.colorScale(coolor1_1);
        chart1_1.colorRange(true);
        chart1_1.colorRange().length("80%");
        chart1_1.container("wc1");
        chart1_1.draw();
    },
    word_chart_positive(wordSegment, frequency) {
        //chart_2
        var data2 = [];
        for (var i = 0; i < wordSegment.length; i++) {
            data2.push({ x: wordSegment[i], value: frequency[i] });
        }

        document.getElementById("word_cloud2").innerHTML = null;
        var chart2 = anychart.tagCloud(data2);
        chart2.title("正向關鍵字出現數比例");
        var coolor2 = anychart.scales.linearColor();
        coolor2.colors(["#EFADAC", "#EF3344"]);
        chart2.colorScale(coolor2);
        chart2.colorRange(true);
        chart2.colorRange().length("80%");
        chart2.container("word_cloud2");
        chart2.draw();

        document.getElementById("wc2").innerHTML = null;
        var chart2_2 = anychart.tagCloud(data2);
        chart2_2.title("正向關鍵字出現數比例");
        var coolor2_2 = anychart.scales.linearColor();
        coolor2_2.colors(["#EFADAC", "#EF3344"]);
        chart2_2.colorScale(coolor2_2);
        chart2_2.colorRange(true);
        chart2_2.colorRange().length("80%");
        chart2_2.container("wc2");
        chart2_2.draw();
    },
    word_chart_negative(wordSegment, frequency) {
        //chart_3
        var data3 = [];
        for (var i = 0; i < wordSegment.length; i++) {
            data3.push({ x: wordSegment[i], value: frequency[i] });
        }
        document.getElementById("word_cloud3").innerHTML = null;
        var chart3 = anychart.tagCloud(data3);
        chart3.title("負向關鍵字出現數比例");
        var coolor3 = anychart.scales.linearColor();
        coolor3.colors(["#33CC45", "#22AA44"]);
        chart3.colorScale(coolor3);
        chart3.colorRange(true);
        chart3.colorRange().length("80%");
        chart3.container("word_cloud3");
        chart3.draw();

        document.getElementById("wc3").innerHTML = null;
        var chart3_3 = anychart.tagCloud(data3);
        chart3_3.title("負向關鍵字出現數比例");
        var coolor3_3 = anychart.scales.linearColor();
        coolor3_3.colors(["#33CC45", "#22AA44"]);
        chart3_3.colorScale(coolor3_3);
        chart3_3.colorRange(true);
        chart3_3.colorRange().length("80%");
        chart3_3.container("wc3");
        chart3_3.draw();
    },

    bar_chart_zoom(label, datas, index, max, max_text) {
        var ctx = document.getElementById("bar_chart_zoom").getContext("2d");
        var data = [
            datas[index - 2],
            datas[index - 1],
            datas[index],
            datas[index + 1],
            datas[index + 2],
        ];
        var labels = [
            label[index - 2],
            label[index - 1],
            label[index],
            label[index + 1],
            label[index + 2],
        ];

        let max_zoom = Math.max.apply(null, data);
        let min = Math.min.apply(null, data);

        var graphique = Chart.getChart("bar_chart_zoom");
        if (graphique) {
            graphique.destroy();
        }

        new Chart(ctx, {
            type: "bar",
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                    },
                },
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    datalabels: {
                        color: "#36A2EB",
                        anchor: "end",
                        align: "end",
                        offset: 4,
                        font: {
                            size: 16,
                        },
                        listeners: {
                            enter: function (context, event) {
                                context.hovered = true;
                                return true;
                            },
                            leave: function (context, event) {
                                context.hovered = false;
                                return true;
                            },
                        },
                    },
                },
                onHover: (evt, activeEls) => {
                    try {
                        console.log(activeEls[0]);
                        if (
                            activeEls[0].index == data.indexOf(max) &&
                            datas[max] == data[max_zoom]
                        ) {
                            document.getElementById("bar_link").innerHTML =
                                "　最大值相關連結：" + "http://www.google.com";
                            //                                    要顯示點選位置的網址，用這個function收到的index去抓收到的datas裡的網址
                        } else {
                            //                                        document.getElementById("bar_link").innerHTML = "";
                        }
                        activeEls.length > 0
                            ? (evt.chart.canvas.style.cursor = "pointer")
                            : (evt.chart.canvas.style.cursor = "default");
                    } catch (e) {
                        //                                    document.getElementById("bar_link").innerHTML = "";
                    }
                },
                onClick: (evt, el, chart) => {
                    if (el[0]) {
                        if (chart.data.labels[el[0].index] == max_text) {
                            location.href = "http://www.google.com";
                            //                                        要顯示點選位置的網址，用這個function收到的index去抓收到的datas裡的網址
                        }
                    }
                },
            },
            data: {
                labels: labels,
                datasets: [
                    {
                        label: "主題討論數",
                        data: data,
                        borderWidth: 1,
                        backgroundColor: ["#05FFA7", "#3CC796", "#58FFC4"],
                        datalabels: {
                            color: "#332233",
                        },
                    },
                ],
            },
        });
    },
};
export default chart;
