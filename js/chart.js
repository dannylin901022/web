var chart = {
    bar_chart(label, datas,hotArticles) {
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
        
        document.getElementById("message_count").innerHTML = ""
        document.getElementById("bar_link").innerHTML = ""
        
        var ctx = document.getElementById("bar_chart").getContext("2d");
        var gradient = ctx.createLinearGradient(0, 0, 0, 170);
        gradient.addColorStop(0, "black");
        gradient.addColorStop(1, "white");
        ctx.fillStyle = gradient;
        var graphique = Chart.getChart("bar_chart");
        if (graphique) {
            graphique.destroy();
        }
        
        graphique = Chart.getChart("bar_chart_zoom");
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
                            max_text,
                            hotArticles,
                            
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
    line_chart(label, data1, data2,posHotArticle,negHotArticle) {
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
        
        document.getElementById("line_plink").innerHTML = ""
        document.getElementById("line_pinfo").innerHTML = ""
        document.getElementById("line_nlink").innerHTML = ""
        document.getElementById("line_ninfo").innerHTML = ""

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

        var pos_articles = [];
        var pos_url = [];
        var pos_sentimentCount = [];
        
        for(var i = 0;i<label_all.length;i++){
            if(posHotArticle[label_all[i]] != null && posHotArticle[label_all[i]] != ""){
                pos_articles.push(posHotArticle[label_all[i]][0].articleTitle);
                pos_url.push(posHotArticle[label_all[i]][0].url);
                pos_sentimentCount.push(posHotArticle[label_all[i]][0].sentimentCount);
            }
            else{
                pos_articles.push(null);
                pos_url.push(null);
                pos_sentimentCount.push(null);
            }
        }
        
        var neg_articles = [];
        var neg_url = [];
        var neg_sentimentCount = [];
        
        for(var i = 0;i<label_all.length;i++){
            if(negHotArticle[label_all[i]] != null && negHotArticle[label_all[i]] != ""){
                neg_articles.push(negHotArticle[label_all[i]][0].articleTitle);
                neg_url.push(negHotArticle[label_all[i]][0].url);
                neg_sentimentCount.push(negHotArticle[label_all[i]][0].sentimentCount);
            }
            else{
                neg_articles.push(null);
                neg_url.push(null);
                neg_sentimentCount.push(null);
            }
        }
        
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
                onHover: (evt, activeEls) => {
                    try {
                        document.getElementById("line_link_date").innerHTML = "日期：" + label_all[activeEls[0].index]
                        document.getElementById("line_plink").innerHTML =
                            "　正向相關文章：" + "<a href=" + pos_url[activeEls[0].index] +  " target='_blank'>" + pos_articles[activeEls[0].index] + "</a>";
                        
                        document.getElementById("line_pinfo").innerHTML =
                            "　正向文章分析資訊：　正向情緒：" + pos_sentimentCount[activeEls[0].index].positive + "　負向情緒：" + pos_sentimentCount[activeEls[0].index].negative;
                        
                        document.getElementById("line_nlink").innerHTML =
                            "　負向相關文章：" + "<a href=" + neg_url[activeEls[0].index] +  " target='_blank'>" + neg_articles[activeEls[0].index] + "</a>";
                        
                        document.getElementById("line_ninfo").innerHTML =
                            "　負向文章分析資訊：　正向情緒：" + neg_sentimentCount[activeEls[0].index].positive + "　負向情緒：" + neg_sentimentCount[activeEls[0].index].negative;
                        
                        activeEls.length > 0
                            ? (evt.chart.canvas.style.cursor = "pointer")
                            : (evt.chart.canvas.style.cursor = "default");
                    } catch (e) {
                        //                                    document.getElementById("bar_link").innerHTML = "";
                    }
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
        if(label.length > 20){
            document.getElementById("line_chart_div").style.width =
            label.length * 50 + "px";
        }

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
    word_chart_all(wordSegment, frequency,wordSegmentNb,wordSegmentNbFrequency,wordSegmentAdj,wordSegmentAdjFrequency) {
        //chart_1
        var data1 = [];
        for (var i = 0; i < wordSegment.length; i++) {
            data1.push({ x: wordSegment[i], value: frequency[i] });
        }
        
        var data2 = [];
        for (var i = 0; i < wordSegmentNb.length; i++) {
            data2.push({ x: wordSegmentNb[i], value: wordSegmentNbFrequency[i] });
        }
        
        var data3 = [];
        for (var i = 0; i < wordSegmentAdj.length; i++) {
            data3.push({ x: wordSegmentAdj[i], value: wordSegmentAdjFrequency[i] });
        }
        
        document.getElementById("word_cloud1").innerHTML = null;
        var chart1 = anychart.tagCloud(data1);
        chart1.title("整體關鍵字");
        var coolor1 = anychart.scales.linearColor();
        coolor1.colors(["#BFCDE0", "#000505"]);
        chart1.colorScale(coolor1);
        chart1.colorRange(true);
        chart1.colorRange().length("80%");
        chart1.background().fill("#f9f9f9");
        chart1.container("word_cloud1");
        chart1.draw();
        
        document.getElementById("word_cloud4").innerHTML = null;
        var chart2 = anychart.tagCloud(data2);
        chart2.title("名詞關鍵字");
        var coolor2 = anychart.scales.linearColor();
        coolor2.colors(["#BFCDE0", "#000505"]);
        chart2.colorScale(coolor2);
        chart2.colorRange(true);
        chart2.colorRange().length("80%");
        chart2.background().fill("#f9f9f9");
        chart2.container("word_cloud4");
        chart2.draw();
        
        document.getElementById("word_cloud5").innerHTML = null;
        var chart3 = anychart.tagCloud(data3);
        chart3.title("形容詞關鍵字");
        var coolor3 = anychart.scales.linearColor();
        coolor3.colors(["#BFCDE0", "#000505"]);
        chart3.colorScale(coolor3);
        chart3.colorRange(true);
        chart3.colorRange().length("80%");
        chart3.background().fill("#f9f9f9");
        chart3.container("word_cloud5");
        chart3.draw();

        document.getElementById("wc1").innerHTML = null;
        var chart1_1 = anychart.tagCloud(data1);
        chart1_1.title("整體關鍵字");
        var coolor1_1 = anychart.scales.linearColor();
        coolor1_1.colors(["#BFCDE0", "#000505"]);
        chart1_1.colorScale(coolor1_1);
        chart1_1.colorRange(true);
        chart1_1.colorRange().length("80%");
        chart1_1.container("wc1"); 
        chart1_1.draw();
        
        document.getElementById("wc4").innerHTML = null;
        var chart1_2 = anychart.tagCloud(data2);
        chart1_2.title("名詞關鍵字");
        var coolor1_2 = anychart.scales.linearColor();
        coolor1_1.colors(["#BFCDE0", "#000505"]);
        chart1_2.colorScale(coolor1_2);
        chart1_2.colorRange(true);
        chart1_2.colorRange().length("80%");
        chart1_2.container("wc4"); 
        chart1_2.draw();
        
        document.getElementById("wc5").innerHTML = null;
        var chart1_3 = anychart.tagCloud(data3);
        chart1_3.title("形容關鍵字");
        var coolor1_3 = anychart.scales.linearColor();
        coolor1_3.colors(["#BFCDE0", "#000505"]);
        chart1_3.colorScale(coolor1_3);
        chart1_3.colorRange(true);
        chart1_3.colorRange().length("80%");
        chart1_3.container("wc5"); 
        chart1_3.draw();
    },
    word_chart_positive(wordSegment, frequency,wordSegmentNb,wordSegmentNbFrequency,wordSegmentAdj,wordSegmentAdjFrequency) {
        //chart_2
        var data1 = [];
        for (var i = 0; i < wordSegment.length; i++) {
            data1.push({ x: wordSegment[i], value: frequency[i] });
        }
        
        var data2 = [];
        for (var i = 0; i < wordSegmentNb.length; i++) {
            data2.push({ x: wordSegmentNb[i], value: wordSegmentNbFrequency[i] });
        }
        
        var data3 = [];
        for (var i = 0; i < wordSegmentAdj.length; i++) {
            data3.push({ x: wordSegmentAdj[i], value: wordSegmentAdjFrequency[i] });
        }

        document.getElementById("word_cloud2").innerHTML = null;
        var chart1 = anychart.tagCloud(data1);
        chart1.title("整體關鍵字");
        var coolor1 = anychart.scales.linearColor();
        coolor1.colors(["#EFADAC", "#EF3344"]);
        chart1.colorScale(coolor1);
        chart1.colorRange(true);
        chart1.colorRange().length("80%");
        chart1.background().fill("#f9f9f9");
        chart1.container("word_cloud2");
        chart1.draw();
        
        document.getElementById("word_cloud6").innerHTML = null;
        var chart2 = anychart.tagCloud(data2);
        chart2.title("名詞關鍵字");
        var coolor2 = anychart.scales.linearColor();
        coolor2.colors(["#EFADAC", "#EF3344"]);
        chart2.colorScale(coolor2);
        chart2.colorRange(true);
        chart2.colorRange().length("80%");
        chart2.background().fill("#f9f9f9");
        chart2.container("word_cloud6");
        chart2.draw();
        
        document.getElementById("word_cloud7").innerHTML = null;
        var chart3 = anychart.tagCloud(data3);
        chart3.title("形容詞關鍵字");
        var coolor3 = anychart.scales.linearColor();
        coolor3.colors(["#EFADAC", "#EF3344"]);
        chart3.colorScale(coolor3);
        chart3.colorRange(true);
        chart3.colorRange().length("80%");
        chart3.background().fill("#f9f9f9");
        chart3.container("word_cloud7");
        chart3.draw();

        document.getElementById("wc2").innerHTML = null;
        var chart2_1 = anychart.tagCloud(data1);
        chart2_1.title("整體關鍵字");
        var coolor2_1 = anychart.scales.linearColor();
        coolor2_1.colors(["#EFADAC", "#EF3344"]);
        chart2_1.colorScale(coolor2_1);
        chart2_1.colorRange(true);
        chart2_1.colorRange().length("80%");
        chart2_1.container("wc2");
        chart2_1.draw();
        
        document.getElementById("wc6").innerHTML = null;
        var chart2_2 = anychart.tagCloud(data2);
        chart2_2.title("名詞關鍵字");
        var coolor2_2 = anychart.scales.linearColor();
        coolor2_2.colors(["#EFADAC", "#EF3344"]);
        chart2_2.colorScale(coolor2_2);
        chart2_2.colorRange(true);
        chart2_2.colorRange().length("80%");
        chart2_2.container("wc6");
        chart2_2.draw();
        
        document.getElementById("wc7").innerHTML = null;
        var chart2_3 = anychart.tagCloud(data3);
        chart2_3.title("形容詞關鍵字");
        var coolor2_3 = anychart.scales.linearColor();
        coolor2_3.colors(["#EFADAC", "#EF3344"]);
        chart2_3.colorScale(coolor2_3);
        chart2_3.colorRange(true);
        chart2_3.colorRange().length("80%");
        chart2_3.container("wc7");
        chart2_3.draw();
    },
    word_chart_negative(wordSegment, frequency,wordSegmentNb,wordSegmentNbFrequency,wordSegmentAdj,wordSegmentAdjFrequency) {
        //chart_3
        var data1 = [];
        for (var i = 0; i < wordSegment.length; i++) {
            data1.push({ x: wordSegment[i], value: frequency[i] });
        }
        
        var data2 = [];
        for (var i = 0; i < wordSegmentNb.length; i++) {
            data2.push({ x: wordSegmentNb[i], value: wordSegmentNbFrequency[i] });
        }
        
        var data3 = [];
        for (var i = 0; i < wordSegmentAdj.length; i++) {
            data3.push({ x: wordSegmentAdj[i], value: wordSegmentAdjFrequency[i] });
        }
        
        document.getElementById("word_cloud3").innerHTML = null;
        var chart1 = anychart.tagCloud(data1);
        chart1.title("整體關鍵字");
        var coolor1 = anychart.scales.linearColor();
        coolor1.colors(["#33CC45", "#22AA44"]);
        chart1.colorScale(coolor1);
        chart1.colorRange(true);
        chart1.colorRange().length("80%");
        chart1.background().fill("#f9f9f9");
        chart1.container("word_cloud3");
        chart1.draw();
        
        document.getElementById("word_cloud8").innerHTML = null;
        var chart2 = anychart.tagCloud(data2);
        chart2.title("名詞關鍵字");
        var coolor2 = anychart.scales.linearColor();
        coolor2.colors(["#33CC45", "#22AA44"]);
        chart2.colorScale(coolor2);
        chart2.colorRange(true);
        chart2.colorRange().length("80%");
        chart2.background().fill("#f9f9f9");
        chart2.container("word_cloud8");
        chart2.draw();
        
        document.getElementById("word_cloud9").innerHTML = null;
        var chart3 = anychart.tagCloud(data3);
        chart3.title("形容詞關鍵字");
        var coolor3 = anychart.scales.linearColor();
        coolor3.colors(["#33CC45", "#22AA44"]);
        chart3.colorScale(coolor3);
        chart3.colorRange(true);
        chart3.colorRange().length("80%");
        chart3.background().fill("#f9f9f9");
        chart3.container("word_cloud9");
        chart3.draw();

        document.getElementById("wc3").innerHTML = null;
        var chart3_1 = anychart.tagCloud(data1);
        chart3_1.title("整體關鍵字");
        var coolor3_1 = anychart.scales.linearColor();
        coolor3_1.colors(["#33CC45", "#22AA44"]);
        chart3_1.colorScale(coolor3_1);
        chart3_1.colorRange(true);
        chart3_1.colorRange().length("80%");
        chart3_1.container("wc3");
        chart3_1.draw();
        
        document.getElementById("wc8").innerHTML = null;
        var chart3_2 = anychart.tagCloud(data2);
        chart3_2.title("名詞關鍵字");
        var coolor3_2 = anychart.scales.linearColor();
        coolor3_2.colors(["#33CC45", "#22AA44"]);
        chart3_2.colorScale(coolor3_2);
        chart3_2.colorRange(true);
        chart3_2.colorRange().length("80%");
        chart3_2.container("wc8");
        chart3_2.draw();
        
        document.getElementById("wc9").innerHTML = null;
        var chart3_3 = anychart.tagCloud(data3);
        chart3_3.title("形容詞關鍵字");
        var coolor3_3 = anychart.scales.linearColor();
        coolor3_3.colors(["#33CC45", "#22AA44"]);
        chart3_3.colorScale(coolor3_3);
        chart3_3.colorRange(true);
        chart3_3.colorRange().length("80%");
        chart3_3.container("wc9");
        chart3_3.draw();
    },

    bar_chart_zoom(label, datas, index, max, max_text,hotArticles) {
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
        var articles = [];
        var url = [];
        var messageCount = [];
        for(var i = 0;i<labels.length;i++){
            if(hotArticles[labels[i]] != null && hotArticles[labels[i]] != ""){
                articles.push(hotArticles[labels[i]][0].articleTitle);
                url.push(hotArticles[labels[i]][0].url);
                messageCount.push(hotArticles[labels[i]][0].messageCount);
            }
            else{
                articles.push(null);
                url.push(null);
                messageCount.push(null);
            }
        }

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
                        document.getElementById("message_count").innerHTML = "　該篇文章留言數：" + messageCount[activeEls[0].index];
                        document.getElementById("bar_link").innerHTML =
                            "　相關文章：" + "<a href=" + url[activeEls[0].index] +  " target='_blank'>" + articles[activeEls[0].index] + "</a>";
                        activeEls.length > 0
                            ? (evt.chart.canvas.style.cursor = "pointer")
                            : (evt.chart.canvas.style.cursor = "default");
                    } catch (e) {
                        //                                    document.getElementById("bar_link").innerHTML = "";
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
