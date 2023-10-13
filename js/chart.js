import example_data from "./example_data.js";
let article_data_pos = [];
let article_data_neg = [];
var chart = {
    async bar_chart(label, datas, hotArticles) {
        //        await this.get_accuracy_img();
        await this.draw_map(label, datas, null, hotArticles);
        let point_value = 0;
        let index_low = 0, index_high = 0;
        for (var i = 0; i < datas.length; i++) {
            if ((datas[i + 1] != null) && (datas[i + 1] - datas[i] > point_value)) {
                point_value = datas[i + 1] - datas[i];
                index_low = i;
                index_high = i + 1;
            }
        }
        let max = Math.max.apply(null, datas);
        let max_index = datas.indexOf(max);
        let max_text = label[datas.indexOf(max)];
        let min = max;
        for (var i = 0; i < datas.length; i++) {
            if (datas[i] < min && datas[i] != 0) {
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

        document.getElementById("b_reverse").innerHTML =
            "<h5>討論熱度轉折點：</h5>" + "　轉折點日期：" +
            label[index_high] + "<br>　" + "該日討論文章數：" + datas[index_high].toLocaleString() + "<br>　" + "討論文章增加數：" + point_value.toLocaleString();



        //        最大值移掉，想個更好的呈現方式
        document.getElementById("b_max").innerHTML =
            "熱度高峰：" +
            max.toLocaleString() +
            "<br>" +
            "日期：" +
            max_text;
        //        最小值移掉，想個更好的呈現方式        
        document.getElementById("b_min").innerHTML =
            "熱度低谷：" +
            min.toLocaleString() +
            "<br>" +
            "日期：" +
            min_text;

        this.bar_chart_zoom(label, datas, max_index, hotArticles);

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
                onClick: async (evt, el, chart) => {
                    if (el[0]) {
                        document.getElementById("bar_link").innerHTML = "";
                        this.bar_chart_zoom(
                            label,
                            datas,
                            el[0].index,
                            hotArticles,
                        );
                        await this.draw_map(label, datas, el[0].index, hotArticles);
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
                        //                        backgroundColor: ["#00CACA", "#FF5151", "#4A4AFF","#FF9224"],
                        datalabels: {
                            color: "#332233",
                            //                            listeners: {
                            //                                click: function (context) {
                            //                                    console.log(
                            //                                        "label " +
                            //                                            context.dataIndex +
                            //                                            " 被按到了!"
                            //                                    );
                            //                                },
                            //                            },
                        },
                    },
                ],
            },
        });
        //document.getElementById('bar_chart_div').style.width = label.length * 100 + "";
    },
    async line_chart(label, data1, data2, posHotArticle, negHotArticle, wordCloudAnalysisResults, input_data) {

        let data2_max = Math.max.apply(null, data2);
        let max_index = data2.indexOf(data2_max);

        //        await this.get_article_table_data();
        var data1_all = data1,
            data2_all = data2,
            label_all = label;
        //        for (var i = 0; i < data1.length; i++) {
        //            if (data1_all[i] == 0 && data2_all[i] == 0) {
        //                data1_all.splice(i, i + 1);
        //                data2_all.splice(i, i + 1);
        //                label_all.splice(i, i + 1);
        //            }
        //        }

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
                        borderColor: "#22DD22",
                        //                        #66FF07
                    },
                    {
                        label: "負向評價數",
                        data: data2_all,
                        fill: false,
                        borderColor: "#FF5454",
                    },
                ],
            },
        });

        let new_data_pos = {};
        let new_data_neg = {};

        var pos_articles = [];
        var pos_url = [];
        var pos_sentimentCount = [];
        var wordSegment = [];
        var wordSegmentFrequency = [];
        var wordSegment_nb = [];
        var wordSegmentFrequency_nb = [];
        var wordSegment_adj = [];
        var wordSegmentFrequency_adj = [];
        var pos_push = [];
        var neg_push = [];

        for (var i = 0; i < label_all.length; i++) {
            if (posHotArticle[label_all[i]] != null && posHotArticle[label_all[i]] != "") {
                pos_articles.push(posHotArticle[label_all[i]][0].articleTitle);
                pos_url.push(posHotArticle[label_all[i]][0].url);
                pos_sentimentCount.push(posHotArticle[label_all[i]][0].sentimentCount);
                wordSegment.push(wordCloudAnalysisResults[i].wordSegment);
                wordSegmentFrequency.push(wordCloudAnalysisResults[i].wordSegmentFrequency);
                wordSegment_nb.push(wordCloudAnalysisResults[i].wordSegmentNb);
                wordSegmentFrequency_nb.push(wordCloudAnalysisResults[i].wordSegmentNbFrequency);
                wordSegment_adj.push(wordCloudAnalysisResults[i].wordSegmentAdj);
                wordSegmentFrequency_adj.push(wordCloudAnalysisResults[i].wordSegmentAdjFrequency);
                for (var j = 0; j < posHotArticle[label_all[i]][0].pushContents.length; j++) {
                    if (posHotArticle[label_all[i]][0].pushContents[j].pushContent.length >= 10) {
                        if (posHotArticle[label_all[i]][0].pushContents[j].pushContentSentiment == "positive") {
                            pos_push.push(posHotArticle[label_all[i]][0].pushContents[j].pushContent);
                        }
                        if (posHotArticle[label_all[i]][0].pushContents[j].pushContentSentiment == "negative") {
                            neg_push.push(posHotArticle[label_all[i]][0].pushContents[j].pushContent);
                        }
                    }
                }
            }
            else {
                pos_articles.push(null);
                pos_url.push(null);
                pos_sentimentCount.push(null);
                wordSegment.push(null);
                wordSegmentFrequency.push(null);
                wordSegment_nb.push(null);
                wordSegmentFrequency_nb.push(null);
                wordSegment_adj.push(null);
                wordSegmentFrequency_adj.push(null);
            }
        }

        let pos_point_value = 0;
        let pos_index_low = 0, pos_index_high = 0;


        for (var i = 0; i < data1_all.length; i++) {
            if ((data1_all[i + 1] != null) && data1_all[i + 1] - data1_all[i] > pos_point_value) {
                pos_point_value = data1_all[i + 1] - data1_all[i];
                pos_index_low = i;
                pos_index_high = i + 1;
            }
        }

        var neg_articles = [];
        var neg_url = [];
        var neg_sentimentCount = [];

        for (var i = 0; i < label_all.length; i++) {
            if (negHotArticle[label_all[i]] != null && negHotArticle[label_all[i]] != "") {
                neg_articles.push(negHotArticle[label_all[i]][0].articleTitle);
                neg_url.push(negHotArticle[label_all[i]][0].url);
                neg_sentimentCount.push(negHotArticle[label_all[i]][0].sentimentCount);
                for (var j = 0; j < negHotArticle[label_all[i]][0].pushContents.length; j++) {
                    if (negHotArticle[label_all[i]][0].pushContents[j].pushContent.length >= 10) {
                        if (negHotArticle[label_all[i]][0].pushContents[j].pushContentSentiment == "positive") {
                            pos_push.push(negHotArticle[label_all[i]][0].pushContents[j].pushContent);
                        }
                        if (negHotArticle[label_all[i]][0].pushContents[j].pushContentSentiment == "negative") {
                            neg_push.push(negHotArticle[label_all[i]][0].pushContents[j].pushContent);
                        }
                    }
                }
            }
            else {
                neg_articles.push(null);
                neg_url.push(null);
                neg_sentimentCount.push(null);
            }
        }

        let neg_point_value = 0;
        let neg_index_low = 0, neg_index_high = 0;

        for (var i = 0; i < data2_all.length; i++) {
            if ((data2_all[i + 1] != null) && data2_all[i + 1] - data2_all[i] > neg_point_value) {
                neg_point_value = data2_all[i + 1] - data2_all[i];
                neg_index_low = i;
                neg_index_high = i + 1;
            }
        }
        article_data_pos = pos_push;
        article_data_neg = neg_push;

        var change_info = setInterval(function () {
            document.getElementById("line_pinfo").innerHTML =
                "　正向評價：" + article_data_pos[Math.floor(Math.random() * article_data_pos.length)]
            document.getElementById("line_ninfo").innerHTML =
                "　負向評價：" + article_data_neg[Math.floor(Math.random() * article_data_neg.length)]
        }, 5000);


        this.line_chart_pie_chart(label[max_index], data1[max_index], data2[max_index]);

        await this.get_data_line_pos(input_data, label[max_index], label[max_index + 1]);

        await this.get_data_line_neg(input_data, label[max_index], label[max_index + 1]);

        document.getElementById("line_link_date").innerHTML = "日期：" + label_all[max_index]
        document.getElementById("line_plink").innerHTML =
            "　正向相關文章：" + "<a href=" + pos_url[max_index] + " target='_blank'>" + pos_articles[max_index] + "</a>";


        document.getElementById("line_nlink").innerHTML =
            "　負向相關文章：" + "<a href=" + neg_url[max_index] + " target='_blank'>" + neg_articles[max_index] + "</a>";

        document.getElementById("p_sum").innerHTML =
            "<h5>區間內關鍵字統計：</h5>" + "　1.關鍵字：" + wordSegment[max_index][0] + "：" + wordSegmentFrequency[max_index][0] + " 次<br>　2.關鍵字：" +
            wordSegment[max_index][1] + "：" + wordSegmentFrequency[max_index][1] + " 次<br>　3.關鍵字：" +
            wordSegment[max_index][2] + "：" + wordSegmentFrequency[max_index][2] + " 次";

        let line_table_data_all = "<th>整體關鍵字</th>";
        for (let i = 0; i < wordSegment[max_index].length; i++) {
            line_table_data_all = line_table_data_all + "<tr><td>" + wordSegment[max_index][i] + "：</td><td>" + wordSegmentFrequency[max_index][i] + "</td></tr>";
        }
        let line_table_data__nb = "<th>名詞關鍵字</th>";
        for (let i = 0; i < wordSegment_nb[max_index].length; i++) {
            line_table_data__nb = line_table_data__nb + "<tr><td>" + wordSegment_nb[max_index][i] + "：</td><td>" + wordSegmentFrequency_nb[max_index][i] + "</td></tr>";
        }
        let line_table_data_adj = "<th>形容詞關鍵字</th>";
        for (let i = 0; i < wordSegment_adj[max_index].length; i++) {
            line_table_data_adj = line_table_data_adj + "<tr><td>" + wordSegment_adj[max_index][i] + "：</td><td>" + wordSegmentFrequency_adj[max_index][i] + "</td></tr>";
        }

        document.getElementById("line_data_btn1").style.display = "block";
        document.getElementById("line_table_all_1").innerHTML = line_table_data_all;
        document.getElementById("line_table_nb_1").innerHTML = line_table_data__nb;
        document.getElementById("line_table_adj_1").innerHTML = line_table_data_adj;


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
                onHover: async (evt, activeEls) => {
                    try {
                        this.line_chart_pie_chart(label[activeEls[0].index], data1[activeEls[0].index], data2[activeEls[0].index]);

                        await this.get_data_line_pos(input_data, label[activeEls[0].index], label[activeEls[0].index + 1]);

                        await this.get_data_line_neg(input_data, label[activeEls[0].index], label[activeEls[0].index + 1]);

                        document.getElementById("line_link_date").innerHTML = "日期：" + label_all[activeEls[0].index]
                        document.getElementById("line_plink").innerHTML =
                            "　正向相關文章：" + "<a href=" + pos_url[activeEls[0].index] + " target='_blank'>" + pos_articles[activeEls[0].index] + "</a>";


                        document.getElementById("line_nlink").innerHTML =
                            "　負向相關文章：" + "<a href=" + neg_url[activeEls[0].index] + " target='_blank'>" + neg_articles[activeEls[0].index] + "</a>";


                        document.getElementById("p_sum").innerHTML =
                            "<h5>區間內關鍵字統計：</h5>" + "　1.關鍵字：" + wordSegment[activeEls[0].index][0] + "：" + wordSegmentFrequency[activeEls[0].index][0] + " 次<br>　2.關鍵字：" +
                            wordSegment[activeEls[0].index][1] + "：" + wordSegmentFrequency[activeEls[0].index][1] + " 次<br>　3.關鍵字：" +
                            wordSegment[activeEls[0].index][2] + "：" + wordSegmentFrequency[activeEls[0].index][2] + " 次";

                        let line_table_data_all = "<th>整體關鍵字</th>";
                        for (let i = 0; i < wordSegment[activeEls[0].index].length; i++) {
                            line_table_data_all = line_table_data_all + "<tr><td>" + wordSegment[activeEls[0].index][i] + "：</td><td>" + wordSegmentFrequency[activeEls[0].index][i] + "</td></tr>";
                        }
                        let line_table_data__nb = "<th>名詞關鍵字</th>";
                        for (let i = 0; i < wordSegment_nb[activeEls[0].index].length; i++) {
                            line_table_data__nb = line_table_data__nb + "<tr><td>" + wordSegment_nb[activeEls[0].index][i] + "：</td><td>" + wordSegmentFrequency_nb[activeEls[0].index][i] + "</td></tr>";
                        }
                        let line_table_data_adj = "<th>形容詞關鍵字</th>";
                        for (let i = 0; i < wordSegment_adj[activeEls[0].index].length; i++) {
                            line_table_data_adj = line_table_data_adj + "<tr><td>" + wordSegment_adj[activeEls[0].index][i] + "：</td><td>" + wordSegmentFrequency_adj[activeEls[0].index][i] + "</td></tr>";
                        }

                        document.getElementById("line_data_btn1").style.display = "block";
                        document.getElementById("line_table_all_1").innerHTML = line_table_data_all;
                        document.getElementById("line_table_nb_1").innerHTML = line_table_data__nb;
                        document.getElementById("line_table_adj_1").innerHTML = line_table_data_adj;

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
                        borderColor: "#22DD22",
                    },
                    {
                        label: "負向評價數",
                        data: data2,
                        fill: false,
                        borderColor: "#FF5454",
                    },
                ],
            },
        });
        if (label.length > 20) {
            document.getElementById("line_chart_div").style.width =
                label.length * 50 + "px";
        }

        let max = Math.max.apply(null, data1);
        let max_text = label[data1.indexOf(max)];
        let min = max;
        for (var i = 0; i < data1.length; i++) {
            if (data1[i] < min && data1[i] != 0) {
                min = data1[i];
            }
        }
        let min_text = label[data1.indexOf(min)];
        ////        最大值移掉，想個更好的呈現方式
        //        document.getElementById("p_sum").innerHTML =
        //            "<h5>區間內正向情緒：</h5>" + "<br>　"
        ////            + data_key[0] + "：" + data_value[0] + "<br>　" + data_key[1] + "：" + data_value[1] + "<br>　" + data_key[2] + "：" + data_value[2]
        //
        //        document.getElementById("n_sum").innerHTML =
        //            "<h5>區間內負向情緒：</h5>" + "<br>　"
        ////            + data_key[0] + "：" + data_value[0] + "<br>　" + data_key[1] + "：" + data_value[1] + "<br>　" + data_key[2] + "：" + data_value[2]

        //        document.getElementById("p_max").innerHTML =
        //            "<h5>正向情緒爬升點：</h5>" + "　爬升點日期：" + 
        //            label[pos_index_high] + "<br>　" + "正向情緒討論數：" + data1[pos_index_high].toLocaleString() + "<br>　" + "正向情緒增加數：" + pos_point_value.toLocaleString();
        //        
        //        document.getElementById("n_max").innerHTML =
        //            "<h5>負向情緒爬升點：</h5>" + "　爬升點日期：" + 
        //            label[neg_index_high] + "<br>　" + "負向情緒討論數：" + data2[neg_index_high].toLocaleString() + "<br>　" + "負向情緒增加數：" + neg_point_value.toLocaleString();


        max = Math.max.apply(null, data2);
        max_text = label[data2.indexOf(max)];
        min = max;
        for (var i = 0; i < data2.length; i++) {
            if (data2[i] < max && data2[i] != 0) {
                min = data2[i];
            }
        }
        min_text = label[data2.indexOf(min)];

    },

    word_chart_all(wordSegment, frequency, wordSegmentNb, wordSegmentNbFrequency, wordSegmentAdj, wordSegmentAdjFrequency) {
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
        var title1 = chart1.title();
        title1.enabled(true);
        title1.text("整體關鍵字");
        title1.fontSize(30);
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
        var title2 = chart2.title();
        title2.enabled(true);
        title2.text("名詞關鍵字");
        title2.fontSize(30);
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
        var title3 = chart3.title();
        title3.enabled(true);
        title3.text("形容詞關鍵字");
        title3.fontSize(30);
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
        var title1_1 = chart1_1.title();
        title1_1.enabled(true);
        title1_1.text("整體關鍵字");
        title1_1.fontSize(30);
        var coolor1_1 = anychart.scales.linearColor();
        coolor1_1.colors(["#BFCDE0", "#000505"]);
        chart1_1.colorScale(coolor1_1);
        chart1_1.colorRange(true);
        chart1_1.colorRange().length("80%");
        chart1_1.container("wc1");
        chart1_1.draw();

        document.getElementById("wc4").innerHTML = null;
        var chart1_2 = anychart.tagCloud(data2);
        var title1_2 = chart1_2.title();
        title1_2.enabled(true);
        title1_2.text("名詞關鍵字");
        title1_2.fontSize(30);
        var coolor1_2 = anychart.scales.linearColor();
        coolor1_2.colors(["#BFCDE0", "#000505"]);
        chart1_2.colorScale(coolor1_2);
        chart1_2.colorRange(true);
        chart1_2.colorRange().length("80%");
        chart1_2.container("wc4");
        chart1_2.draw();

        document.getElementById("wc5").innerHTML = null;
        var chart1_3 = anychart.tagCloud(data3);
        var title1_3 = chart1_3.title();
        title1_3.enabled(true);
        title1_3.text("形容詞關鍵字");
        title1_3.fontSize(30);
        var coolor1_3 = anychart.scales.linearColor();
        coolor1_3.colors(["#BFCDE0", "#000505"]);
        chart1_3.colorScale(coolor1_3);
        chart1_3.colorRange(true);
        chart1_3.colorRange().length("80%");
        chart1_3.container("wc5");
        chart1_3.draw();
    },
    word_chart_positive(wordSegment, frequency, wordSegmentNb, wordSegmentNbFrequency, wordSegmentAdj, wordSegmentAdjFrequency) {
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
        var title1 = chart1.title();
        title1.enabled(true);
        title1.text("整體關鍵字");
        title1.fontSize(30);
        var coolor1 = anychart.scales.linearColor();
        coolor1.colors(["#44FF44", "#22AA44"]);
        chart1.colorScale(coolor1);
        chart1.colorRange(true);
        chart1.colorRange().length("80%");
        chart1.background().fill("#f9f9f9");
        chart1.container("word_cloud2");
        chart1.draw();

        document.getElementById("word_cloud6").innerHTML = null;
        var chart2 = anychart.tagCloud(data2);
        var title2 = chart2.title();
        title2.enabled(true);
        title2.text("名詞關鍵字");
        title2.fontSize(30);
        var coolor2 = anychart.scales.linearColor();
        coolor2.colors(["#44FF44", "#22AA44"]);
        chart2.colorScale(coolor2);
        chart2.colorRange(true);
        chart2.colorRange().length("80%");
        chart2.background().fill("#f9f9f9");
        chart2.container("word_cloud6");
        chart2.draw();

        document.getElementById("word_cloud7").innerHTML = null;
        var chart3 = anychart.tagCloud(data3);
        var title3 = chart3.title();
        title3.enabled(true);
        title3.text("形容詞關鍵字");
        title3.fontSize(30);
        var coolor3 = anychart.scales.linearColor();
        coolor3.colors(["#44FF44", "#22AA44"]);
        chart3.colorScale(coolor3);
        chart3.colorRange(true);
        chart3.colorRange().length("80%");
        chart3.background().fill("#f9f9f9");
        chart3.container("word_cloud7");
        chart3.draw();

        document.getElementById("wc2").innerHTML = null;
        var chart2_1 = anychart.tagCloud(data1);
        var title2_1 = chart2_1.title();
        title2_1.enabled(true);
        title2_1.text("整體關鍵字");
        title2_1.fontSize(30);
        var coolor2_1 = anychart.scales.linearColor();
        coolor2_1.colors(["#44FF44", "#22AA44"]);
        chart2_1.colorScale(coolor2_1);
        chart2_1.colorRange(true);
        chart2_1.colorRange().length("80%");
        chart2_1.container("wc2");
        chart2_1.draw();

        document.getElementById("wc6").innerHTML = null;
        var chart2_2 = anychart.tagCloud(data2);
        var title2_2 = chart2_2.title();
        title2_2.enabled(true);
        title2_2.text("名詞關鍵字");
        title2_2.fontSize(30);
        var coolor2_2 = anychart.scales.linearColor();
        coolor2_2.colors(["#44FF44", "#22AA44"]);
        chart2_2.colorScale(coolor2_2);
        chart2_2.colorRange(true);
        chart2_2.colorRange().length("80%");
        chart2_2.container("wc6");
        chart2_2.draw();

        document.getElementById("wc7").innerHTML = null;
        var chart2_3 = anychart.tagCloud(data3);
        var title2_3 = chart2_3.title();
        title2_3.enabled(true);
        title2_3.text("形容詞關鍵字");
        title2_3.fontSize(30);
        var coolor2_3 = anychart.scales.linearColor();
        coolor2_3.colors(["#44FF44", "#22AA44"]);
        chart2_3.colorScale(coolor2_3);
        chart2_3.colorRange(true);
        chart2_3.colorRange().length("80%");
        chart2_3.container("wc7");
        chart2_3.draw();
    },
    word_chart_negative(wordSegment, frequency, wordSegmentNb, wordSegmentNbFrequency, wordSegmentAdj, wordSegmentAdjFrequency) {
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
        var title1 = chart1.title();
        title1.enabled(true);
        title1.text("整體關鍵字");
        title1.fontSize(30);
        var coolor1 = anychart.scales.linearColor();
        coolor1.colors(["#EFADAC", "#EF3344"]);
        chart1.colorScale(coolor1);
        chart1.colorRange(true);
        chart1.colorRange().length("80%");
        chart1.background().fill("#f9f9f9");
        chart1.container("word_cloud3");
        chart1.draw();

        document.getElementById("word_cloud8").innerHTML = null;
        var chart2 = anychart.tagCloud(data2);
        var title2 = chart2.title();
        title2.enabled(true);
        title2.text("名詞關鍵字");
        title2.fontSize(30);
        var coolor2 = anychart.scales.linearColor();
        coolor2.colors(["#EFADAC", "#EF3344"]);
        chart2.colorScale(coolor2);
        chart2.colorRange(true);
        chart2.colorRange().length("80%");
        chart2.background().fill("#f9f9f9");
        chart2.container("word_cloud8");
        chart2.draw();

        document.getElementById("word_cloud9").innerHTML = null;
        var chart3 = anychart.tagCloud(data3);
        var title3 = chart3.title();
        title3.enabled(true);
        title3.text("形容詞關鍵字");
        title3.fontSize(30);
        var coolor3 = anychart.scales.linearColor();
        coolor3.colors(["#EFADAC", "#EF3344"]);
        chart3.colorScale(coolor3);
        chart3.colorRange(true);
        chart3.colorRange().length("80%");
        chart3.background().fill("#f9f9f9");
        chart3.container("word_cloud9");
        chart3.draw();

        document.getElementById("wc3").innerHTML = null;
        var chart3_1 = anychart.tagCloud(data1);
        var title3_1 = chart3_1.title();
        title3_1.enabled(true);
        title3_1.text("整體關鍵字");
        title3_1.fontSize(30);
        var coolor3_1 = anychart.scales.linearColor();
        coolor3_1.colors(["#EFADAC", "#EF3344"]);
        chart3_1.colorScale(coolor3_1);
        chart3_1.colorRange(true);
        chart3_1.colorRange().length("80%");
        chart3_1.container("wc3");
        chart3_1.draw();

        document.getElementById("wc8").innerHTML = null;
        var chart3_2 = anychart.tagCloud(data2);
        var title3_2 = chart3_2.title();
        title3_2.enabled(true);
        title3_2.text("名詞關鍵字");
        title3_2.fontSize(30);
        var coolor3_2 = anychart.scales.linearColor();
        coolor3_2.colors(["#EFADAC", "#EF3344"]);
        chart3_2.colorScale(coolor3_2);
        chart3_2.colorRange(true);
        chart3_2.colorRange().length("80%");
        chart3_2.container("wc8");
        chart3_2.draw();

        document.getElementById("wc9").innerHTML = null;
        var chart3_3 = anychart.tagCloud(data3);
        var title3_3 = chart3_3.title();
        title3_3.enabled(true);
        title3_3.text("形容關鍵字");
        title3_3.fontSize(30);
        var coolor3_3 = anychart.scales.linearColor();
        coolor3_3.colors(["#EFADAC", "#EF3344"]);
        chart3_3.colorScale(coolor3_3);
        chart3_3.colorRange(true);
        chart3_3.colorRange().length("80%");
        chart3_3.container("wc9");
        chart3_3.draw();
    },

    bar_chart_zoom(label, datas, index, hotArticles) {
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
        for (var i = 0; i < labels.length; i++) {
            if (hotArticles[labels[i]] != null && hotArticles[labels[i]] != "") {
                articles.push(hotArticles[labels[i]][0].articleTitle);
                url.push(hotArticles[labels[i]][0].url);
                messageCount.push(hotArticles[labels[i]][0].messageCount);
            }
            else {
                articles.push(null);
                url.push(null);
                messageCount.push(null);
            }
        }

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
                        document.getElementById("message_count").innerHTML = "　該篇文章留言數：" + messageCount[activeEls[0].index];
                        document.getElementById("bar_link").innerHTML =
                            "　相關文章：" + "<a href=" + url[activeEls[0].index] + " target='_blank'>" + articles[activeEls[0].index] + "</a>";
                        //                        document.getElementById("address").innerHTML = "　討論集中區域：" + address[activeEls[0].index];
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
                        //                        backgroundColor: ["#00CACA", "#FF5151", "#4A4AFF","#FF9224"],
                        datalabels: {
                            color: "#332233",
                        },
                    },
                ],
            },
        });
    },
    line_chart_pie_chart(label, data1, data2) {
        var width = window.innerWidth;
        var ctx = null;
        var graphique = null;
        if (width > 768) {
            ctx = document.getElementById("line_chart_pie_chart_1").getContext("2d");
            graphique = Chart.getChart("line_chart_pie_chart_1");
        }
        else {
            ctx = document.getElementById("line_chart_pie_chart_2").getContext("2d");
            graphique = Chart.getChart("line_chart_pie_chart_2");
        }


        var data_list = [data1, data2];
        var data_sum = data1 + data2;

        if (graphique) {
            graphique.destroy();
        }

        new Chart(ctx, {
            type: "pie",
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top'
                    },
                    datalabels: {
                        color: "#36A2EB",
                        anchor: "center",
                        align: "center",
                        offset: 4,
                        font: {
                            size: 20,
                        },
                        formatter: function (value, context) {
                            return Math.round(value / data_sum * 100) + '%';
                        }
                    },
                    title: {
                        display: true,
                        text: label + " 正負情緒百分比",
                        font: {
                            size: 20,
                            family: "NaniFont Light",
                        },
                    },
                },
            },
            data: {
                labels: ['正向', '負向'],
                datasets: [
                    {
                        data: data_list,
                        borderWidth: 1,
                        backgroundColor: ["#22DD22", "#FF5454"],
                        datalabels: {
                            color: "#332233",
                        },
                    },
                ],
            },
        });
    },
    async draw_map(label, datas, index, hotArticles) {
        const topology = await fetch(
            'https://code.highcharts.com/mapdata/countries/tw/tw-all.topo.json'
        ).then(response => response.json());

        var address = [['Pingtung', 0], ['Tainan', 0], ['Yilan', 0], ['Chiayi', 0],
        ['Taitung', 0], ['Penghu', 0], ['Kinmen', 0], ['Lienchiang', 0],
        ['Taipei', 0], ['Chiayi City', 0], ['Taichung', 0], ['Yunlin', 0],
        ['Kaohsiung', 0], ['New Taipei City', 0], ['Hsinchu City', 0], ['Hsinchu', 0],
        ['Keelung', 0], ['Miaoli', 0], ['Taoyuan', 0], ['Changhua', 0],
        ['Hualien', 0], ['Nantou', 0]];

        //    for(var i = 0;i<labels.length;i++){
        //        if(hotArticles[labels[i]] != null && hotArticles[labels[i]] != ""){
        //                switch(hotArticles.message.address) {
        //                    case 'Pingtung':
        //                            address[0][1]++;
        //                            break;
        //                    case 'Tainan':
        //                            address[1][1]++;
        //                            break;
        //                    case 'Yilan':
        //                            address[2][1]++;
        //                            break;
        //                    case 'Chiayi':
        //                            address[3][1]++;
        //                            break;
        //                    case 'Taitung':
        //                            address[4][1]++;
        //                            break;
        //                    case 'Penghu':
        //                            address[5][1]++;
        //                            break;
        //                    case 'Kinmen':
        //                            address[6][1]++;
        //                            break;
        //                    case 'Lienchiang':
        //                            address[7][1]++;
        //                            break;
        //                    case 'Taipei':
        //                            address[8][1]++;
        //                            break;
        //                    case 'Chiayi City':
        //                            address[9][1]++;
        //                            break
        //                    case 'Taichung':
        //                            address[10][1]++;
        //                            break;
        //                    case 'Yunlin':
        //                            address[11][1]++;
        //                            break;
        //                    case 'Kaohsiung':
        //                            address[12][1]++;
        //                            break;
        //                    case 'New Taipei City':
        //                            address[13][1]++;
        //                            break;
        //                    case 'Hsinchu City':
        //                            address[14][1]++;
        //                            break;
        //                    case 'Hsinchu':
        //                            address[15][1]++;
        //                            break;
        //                    case 'Keelung':
        //                            address[16][1]++;
        //                            break;
        //                    case 'Miaoli':
        //                            address[17][1]++;
        //                            break;
        //                    case 'Taoyuan':
        //                            address[18][1]++;
        //                            break;
        //                    case 'Changhua':
        //                            address[19][1]++;
        //                            break;
        //                    case 'Hualien':
        //                            address[20][1]++;
        //                            break;
        //                    case 'Nantou':
        //                            address[21][1]++;
        //                            break;
        //                }
        //        }
        //    }
        //        const data = [
        //        ['tw-pt', address[0][1]], ['tw-tn', address[1][1]], ['tw-il', address[2][1]], ['tw-ch', address[3][1]],
        //        ['tw-tt', address[4][1]], ['tw-ph', address[5][1]], ['tw-km', address[6][1]], ['tw-lk', address[7][1]],
        //        ['tw-tw', address[8][1]], ['tw-cs', address[9][1]], ['tw-th', address[10][1]], ['tw-yl', address[11][1]],
        //        ['tw-kh', address[12][1]], ['tw-tp', address[13][1]], ['tw-hs', address[14][1]], ['tw-hh', address[15][1]],
        //        ['tw-cl', address[16][1]], ['tw-ml', address[17][1]], ['tw-ty', address[18][1]], ['tw-cg', address[19][1]],
        //        ['tw-hl', address[20][1]], ['tw-nt', address[21][1]]
        //    ];

        const data = [
            ['tw-pt', 10], ['tw-tn', 11], ['tw-il', 12], ['tw-ch', 13],
            ['tw-tt', 14], ['tw-ph', 15], ['tw-km', 16], ['tw-lk', 17],
            ['tw-tw', 18], ['tw-cs', 19], ['tw-th', 20], ['tw-yl', 21],
            ['tw-kh', 22], ['tw-tp', 23], ['tw-hs', 24], ['tw-hh', 25],
            ['tw-cl', 26], ['tw-ml', 27], ['tw-ty', 28], ['tw-cg', 29],
            ['tw-hl', 30], ['tw-nt', 31]
        ];


        Highcharts.mapChart('map', {
            chart: {
                map: topology,
            },
            title: {
                text: '區域分布'
            },

            colorAxis: {
                min: 0
            },

            series: [{
                data: data,
                name: '區域資料',
                states: {
                    hover: {
                        color: '#BADA55'
                    }
                },
                dataLabels: {
                    enabled: true,
                    format: '{point.name}',
                },
                events: {
                    click: function (event) {
                        console.log(event.point.name);
                        console.log(event.point.options.value);
                        chart.bar_chart_zoom(label, datas, index, hotArticles);
                    }
                }
            }]
        });
        let area = [], _data = [];
        for (let i = 0; i < data.length; i++) {
            area[i] = data[i][0];
            _data[i] = data[i][1];
        }
        let max = Math.max.apply(null, _data);
        let max_text = area[_data.indexOf(max)];
        document.getElementById("address").innerHTML =
            //            "討論數集中區域：" + max_text;
            "討論數集中區域：" + "台北";
    },

    async get_data_line_pos(input_data, start, end) {
        if (end == null) {
            end = input_data.end
        }
        var data = {};
        //fake/
        await fetch(
            input_data.api_url +
            "WordCloud/" +
            input_data.topic +
            "/StatrDate/" +
            start +
            "/EndDate/" +
            end +
            "/Positive" +
            "?DateRange=" +
            input_data.dateRange +
            "&IsExactMatch=" +
            input_data.isEM +
            "&SearchMode=" +
            input_data.mode,
            {
                headers: {
                    Authorization: "Bearer " + input_data.token,
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    'ngrok-skip-browser-warning': true,
                },
            }
        )
            .then((response) => {
                return response.json();
            })
            .then((response) => {
                data = response;
            })
            .catch((error) => {
                console.log(error);
                console.log("Example Data：");
                data = example_data.WordCloud_pos_data
            });
        console.log(data);


        var pos_data1 = [];
        for (var i = 0; i < data.wordSegment.length; i++) {
            pos_data1.push({ x: data.wordSegment[i], value: data.wordSegmentFrequency[i] });
        }

        var pos_data2 = [];
        for (var i = 0; i < data.wordSegmentNb.length; i++) {
            pos_data2.push({ x: data.wordSegmentNb[i], value: data.wordSegmentNbFrequency[i] });
        }

        var pos_data3 = [];
        for (var i = 0; i < data.wordSegmentAdj.length; i++) {
            pos_data3.push({ x: data.wordSegmentAdj[i], value: data.wordSegmentAdjFrequency[i] });
        }


        document.getElementById("p_max").innerHTML =
            "<h5>區間內正向關鍵字：</h5>" + "　1.關鍵字：" +
            pos_data1[0].x + "：" + pos_data1[0].value + " 次<br>　2.關鍵字：" + pos_data1[1].x + "：" + pos_data1[1].value + " 次<br>　3.關鍵字：" + pos_data1[2].x + "：" + pos_data1[2].value + " 次";

        let line_table_data_all = "<th>整體關鍵字</th>";
        for (let i = 0; i < pos_data1.length; i++) {
            line_table_data_all = line_table_data_all + "<tr><td>" + pos_data1[i].x + "：</td><td>" + pos_data1[i].value + "</td></tr>";
        }
        let line_table_data__nb = "<th>名詞關鍵字</th>";
        for (let i = 0; i < pos_data2.length; i++) {
            line_table_data__nb = line_table_data__nb + "<tr><td>" + pos_data2[i].x + "：</td><td>" + pos_data2[i].value + "</td></tr>";
        }
        let line_table_data_adj = "<th>形容詞關鍵字</th>";
        for (let i = 0; i < pos_data3.length; i++) {
            line_table_data_adj = line_table_data_adj + "<tr><td>" + pos_data3[i].x + "：</td><td>" + pos_data3[i].value + "</td></tr>";
        }

        document.getElementById("line_data_btn2").style.display = "block";
        document.getElementById("line_table_all_2").innerHTML = line_table_data_all;
        document.getElementById("line_table_nb_2").innerHTML = line_table_data__nb;
        document.getElementById("line_table_adj_2").innerHTML = line_table_data_adj;

        return data;
    },

    async get_data_line_neg(input_data, start, end) {
        if (end == null) {
            end = input_data.end
        }
        var data = {};
        //fake/
        await fetch(
            input_data.api_url +
            "WordCloud/" +
            input_data.topic +
            "/StatrDate/" +
            start +
            "/EndDate/" +
            end +
            "/Negative" +
            "?DateRange=" +
            input_data.dateRange +
            "&IsExactMatch=" +
            input_data.isEM +
            "&SearchMode=" +
            input_data.mode,
            {
                headers: {
                    Authorization: "Bearer " + input_data.token,
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    'ngrok-skip-browser-warning': true,
                },
            }
        )
            .then((response) => {
                return response.json();
            })
            .then((response) => {
                data = response;
            })
            .catch((error) => {
                console.log(error);
                console.log("Example Data：");
                data = example_data.WordCloud_neg_data
            });


        var neg_data1 = [];
        for (var i = 0; i < data.wordSegment.length; i++) {
            neg_data1.push({ x: data.wordSegment[i], value: data.wordSegmentFrequency[i] });
        }

        var neg_data2 = [];
        for (var i = 0; i < data.wordSegmentNb.length; i++) {
            neg_data2.push({ x: data.wordSegmentNb[i], value: data.wordSegmentNbFrequency[i] });
        }

        var neg_data3 = [];
        for (var i = 0; i < data.wordSegmentAdj.length; i++) {
            neg_data3.push({ x: data.wordSegmentAdj[i], value: data.wordSegmentAdjFrequency[i] });
        }


        document.getElementById("n_max").innerHTML =
            "<h5>區間內負向關鍵字：</h5>" + "　1.關鍵字：" +
            neg_data1[0].x + "：" + neg_data1[0].value + " 次<br>　2.關鍵字：" + neg_data1[1].x + "：" + neg_data1[1].value + " 次<br>　3.關鍵字：" + neg_data1[2].x + "：" + neg_data1[2].value + " 次";

        let line_table_data_all = "<th>整體關鍵字</th>";
        for (let i = 0; i < neg_data1.length; i++) {
            line_table_data_all = line_table_data_all + "<tr><td>" + neg_data1[i].x + "：</td><td>" + neg_data1[i].value + "</td></tr>";
        }
        let line_table_data__nb = "<th>名詞關鍵字</th>";
        for (let i = 0; i < neg_data2.length; i++) {
            line_table_data__nb = line_table_data__nb + "<tr><td>" + neg_data2[i].x + "：</td><td>" + neg_data2[i].value + "</td></tr>";
        }
        let line_table_data_adj = "<th>形容詞關鍵字</th>";
        for (let i = 0; i < neg_data3.length; i++) {
            line_table_data_adj = line_table_data_adj + "<tr><td>" + neg_data3[i].x + "：</td><td>" + neg_data3[i].value + "</td></tr>";
        }

        document.getElementById("line_data_btn3").style.display = "block";
        document.getElementById("line_table_all_3").innerHTML = line_table_data_all;
        document.getElementById("line_table_nb_3").innerHTML = line_table_data__nb;
        document.getElementById("line_table_adj_3").innerHTML = line_table_data_adj;

        console.log(data);
        return data;
    },
    //    async get_accuracy_img() {
    //        var img_change = setInterval(function () {
    //            fetch("https://dog.ceo/api/breeds/image/random")
    //            .then((response) => {
    //                return response.json();
    //            })
    //            .then((response) => {
    //                document.getElementById("accuracy_img").src = response.message;
    //            })
    //            .catch((error) => {
    //                console.log(error);
    //            });
    //        }, 5000);
    //    },
    //    async get_article_table_data() {
    //        await fetch(
    //            api_url +
    //                "SentimentAnalysis/" +
    //                topic +
    //                "/StatrDate/" +
    //                start +
    //                "/EndDate/" +
    //                end +
    //                "?DateRange=" +
    //                dateRange +
    //                "&IsExactMatch=" +
    //                isEM +
    //                "&SearchMode=" +
    //                mode,
    //            {
    //                headers: {
    //                    Authorization: "Bearer " + token,
    //                    "Content-Type": "application/json",
    //                    Accept: "application/json",
    //                    'ngrok-skip-browser-warning':true,
    //                },
    //            }
    //        )
    //            .then((response) => {
    //                return response.json();
    //            })
    //            .then((response) => {
    //                data = response;
    //            })
    //            .catch((error) => {
    //                console.log(error);
    //                console.log("Example Data：");
    //                data = example_data.Sentiment_data;
    //            });
    //        article_data = data;
    //        console.log(data);
    //        return data;
    //        
    //    },
    get_article_table_pos() {
        let text = "<tr><td style='width:300px;text-align:center;'><h4>正向評價</h4></td></tr>";
        for (var i = 0; i < 10; i++) {
            text = text + "<tr><td>" + article_data_pos[Math.floor(Math.random() * article_data_pos.length)] + "</td></tr>";
        }
        document.getElementById("article_dialog_table").innerHTML = text;

    },
    get_article_table_neg() {
        let text = "<tr><td style='width:300px;text-align:center;'><h4>負向評價</h4></td></tr>";
        for (var i = 0; i < 10; i++) {
            text = text + "<tr><td>" + article_data_neg[Math.floor(Math.random() * article_data_neg.length)] + "</td></tr>";
        }
        document.getElementById("article_dialog_table").innerHTML = text;
    }

};
export default chart;
