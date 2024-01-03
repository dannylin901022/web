import example_data from "./example_data.js";
import search from "./search.js";

let article_data_pos = [],article_data_neg = [],article_score_pos = [],article_score_neg = [];

var chart = {
    async bar_chart(label, datas, hotArticles,addressDiscussNumber,input_data) {
        //        await this.get_accuracy_img();
//        await this.draw_map(label, datas, null, hotArticles,addressDiscussNumber);
        let point_value = 0;
        let index_low = 0, index_high = 0;
        for (var i = 0; i < datas.length; i++) {
            if ((datas[i + 1] != null) && (datas[i + 1] - datas[i] > point_value)) {
                point_value = datas[i + 1] - datas[i];
                index_low = i;
                index_high = i + 1;
            }
        }
        
        let label_month = [];
        let year_index = [];
        let ind = parseInt(label[0].substr(5,2),10);
        if(input_data.dateRange == 30 || input_data.dateRange == 31){
            for(var i = 0;i<label.length;i++){
//                label_month[i] = [label[i].substr(0,4)+"年",label[i].substr(5,2)+"月"];
                label_month[i] = [label[i].substr(0,4)+"年",ind < 10? "0" + ind + "月" : ind + "月"];
                ind++;
                if(ind > 12){
                    ind = 1;
                }
                if( i == 0 || label_month[i][0] != label_month[i-1][0]){
                    year_index.push(i);
                }
            }
        }
        else if(input_data.dateRange < 30){
            for(var i = 0;i<label.length;i++){
                label_month[i] = [label[i].substr(0,4)+"年",label[i].substr(5,2)+"月"+label[i].substr(8,2)+"日"];
                if( i == 0 || label_month[i][0] != label_month[i-1][0]){
                    year_index.push(i);
                }
            }
        }
        else{
            for(var i = 0;i<label.length;i++){
                label_month[i] = [label[i].substr(0,4)+"年",label[i].substr(5,2)+"月"];
                if( i == 0 || label_month[i][0] != label_month[i-1][0]){
                    year_index.push(i);
                }
            }
        }
        let month = [];
        for(let i = 0;i<label_month.length;i++){
            if(i == 0 || label_month[i][0] != label_month[i-1][0]){
                month.push(label_month[i][0]+label_month[i][1]);
            }
            else{
                month.push(label_month[i][1]);
            }
        }
        
        
        
        let max = Math.max.apply(null, datas);
        let max_index = datas.indexOf(max);
        let max_text = label_month[datas.indexOf(max)][0] + label_month[datas.indexOf(max)][1];
        let min = max;
        for (var i = 0; i < datas.length; i++) {
            if (datas[i] < min && datas[i] != 0) {
                min = datas[i];
            }
        }
        let min_text = month[datas.indexOf(min)];
        let up_table_data = [],up_table_label = [];
        for(var i = 0;i<datas.length;i++){
            if(datas[i+1] > datas[i] && datas[i+1]!=null && datas[i+1]-datas[i] > 100){
                up_table_data.push(datas[i+1]-datas[i]);
                up_table_label.push(label_month[i+1]);
            }
        }
        
        let down_table_data = [],down_table_label = [];
        for(var i = 0;i<datas.length;i++){
            if(datas[i+1] < datas[i] && datas[i+1]!=null && datas[i]-datas[i+1] > 100){
                down_table_data.push(datas[i]-datas[i+1]);
                down_table_label.push(label_month[i+1]);
            }
        }
        
        
        let sum = 0;
        for (var i = 0; i < datas.length; i++) {
            sum += datas[i];
        }
        
        
        

        document.getElementById("b_sum").innerHTML =
            "總討論數：" + sum.toLocaleString();

        document.getElementById("b_reverse").innerHTML =
            "<h5>討論熱度轉折點：</h5>" + "　討論數轉折點：" +
            label_month[index_high][0]+label_month[index_high][1] + "<br>　" + "期間內討論文章數：" + datas[index_high].toLocaleString() + "<br>　" + "討論文章增加數：" + point_value.toLocaleString();

        //        最大值移掉，想個更好的呈現方式
        document.getElementById("b_max").innerHTML =
            "熱度高峰：" +
            max.toLocaleString() +
            "<br>" +
            "資料區間：" +
            max_text;
        //        最小值移掉，想個更好的呈現方式  
        let b_table = "<tr><th style='font-size:20px;border:1px solid black;'>期間</th><th style='font-size:20px;border:1px solid black;'>討論增加數量</th></tr>";
        for(var i = 0;i<up_table_data.length;i++){
            if(i == 0 || up_table_label[i][0] != up_table_label[i-1][0]){
                b_table = b_table + "<tr><td style='border:1px solid black;'>" + up_table_label[i][0] + up_table_label[i][1] + "</td><td style='border:1px solid black;'>" + up_table_data[i].toLocaleString() + "</td></tr>";
            }
            else{
                b_table = b_table + "<tr><td style='border:1px solid black;'>" + up_table_label[i][1] + "</td><td style='border:1px solid black;'>" + up_table_data[i].toLocaleString() + "</td></tr>";
            }
        }
//        document.getElementById("b_min_table").innerHTML = b_table;
        
        let b_down_table = "<tr><th style='font-size:20px;border:1px solid black;'>期間</th><th style='font-size:20px;border:1px solid black;'>討論減少數量</th></tr>";
        for(var i = 0;i<down_table_data.length;i++){
            if(i == 0 || down_table_label[i][0] != down_table_label[i-1][0]){
                b_down_table = b_down_table + "<tr><td style='border:1px solid black;'>" + down_table_label[i][0] + down_table_label[i][1] + "</td><td style='border:1px solid black;'>" + down_table_data[i].toLocaleString() + "</td></tr>";
            }
            else{
                b_down_table = b_down_table + "<tr><td style='border:1px solid black;'>" + down_table_label[i][1] + "</td><td style='border:1px solid black;'>" + down_table_data[i].toLocaleString() + "</td></tr>";
            }
        }
//        document.getElementById("b_down_table").innerHTML = b_down_table;

        this.bar_chart_zoom(label, datas, max_index, hotArticles,label_month);

        document.getElementById("message_count").innerHTML = ""
        document.getElementById("bar_link").innerHTML = ""

        var ctx = document.getElementById("bar_chart").getContext("2d");
//        var gradient = ctx.createLinearGradient(0, 0, 0, 170);
//        gradient.addColorStop(0, "black");
//        gradient.addColorStop(1, "white");
//        ctx.fillStyle = gradient;
        var graphique = Chart.getChart("bar_chart");
        if (graphique) {
            graphique.destroy();
        }
        
        var data_sort = [];
        for(var i = 0;i<datas.length;i++){
            data_sort[i] = datas[i];
        }
        data_sort.sort(function(a, b){return b - a});
        var color_arr = [];
        var color_n = 100;
        
        for(var i = 0;i<data_sort.length;i++){
            if(i == 0){
                color_arr[datas.indexOf(data_sort[i])] = 'rgba(225,50,50,1)';
            }
            else if(data_sort != 0){
                color_arr[datas.indexOf(data_sort[i])] = 'rgba(50,' + color_n + ',50,1)';
                color_n += 20;
            }
        }

        const arbitraryLine = {
            id:'arbitraryLine',
            beforeDraw(chart,args,options){
                for(var i = 0;i<options.xPosition.length;i++){
                    const{ctx, chartArea:{top, right, bottom, left, width, height},scales:{xAxes,y}} = chart;
                    ctx.save();
                
                    ctx.fillStyle = options.arbitraryLine;
                    let n = 0;
                    if(datas.length < 5){
                        n = 50;
                    }
                    else if(datas.length < 10){
                        n = 40;
                    }
                    else if(datas.length < 15){
                        n = 30;
                    }
                    else if(datas.length < 20){
                        n = 20;
                    }
                    else if(datas.length > 20 && datas.length < 40){
                        n = 10;
                    }
                    else{
                        n = 0;
                    }
                    
                    ctx.fillRect(xAxes.getPixelForValue(options.xPosition[i])-n, top,2,height);
                    ctx.restore();
                }
            }
        }
        
        new Chart(ctx, {
            type: "bar",
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                        stacked:true,
                    },
                    xAxes: {
                        stacked:true,
                        ticks: {
                            maxTicksLimit: 50,
                            //autoSkip: false
                        },
                    },
                },
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    arbitraryLine:{
                        arbitraryLine:'#555555',
                        xPosition:year_index
                    },
                    datalabels: {
                        color: "#36A2EB",
                        anchor: "end",
                        align: "end",
                        offset: -4,
                        font: {
                            size: 12,
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
                            label_month
                        );
                        await this.draw_map(label, datas, el[0].index, hotArticles,addressDiscussNumber);
                    }
                },
            },
            data: {
                labels: month,
                datasets: [
                    {
                        label: "事件討論數",
                        data: datas,
                        borderWidth: 1,
                        backgroundColor:color_arr,
//                        backgroundColor: ["#05FFA7", "#3CC796", "#58FFC4"],
                        //                        backgroundColor: ["#00CACA", "#FF5151", "#4A4AFF","#FF9224"],
                        datalabels: {
                            color: "#332233",
                            formatter: (value) => {
                                    return value > 0 ? value : '';
                            },
                        },
                    },
                    {
                        label: "最高討論區間",
                        data: null,
                        borderWidth: 1,
                        backgroundColor:'rgba(225,50,50,1)',
                    },
                ],
            },
            plugins: [arbitraryLine],
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
        
        let label_month = [];
        let year_index = [];
        let ind = parseInt(label[0].substr(5,2),10);
        if(input_data.dateRange == 30 || input_data.dateRange == 31){
            for(var i = 0;i<label.length;i++){
//                label_month[i] = [label[i].substr(0,4)+"年",label[i].substr(5,2)+"月"];
                label_month[i] = [label[i].substr(0,4)+"年",ind < 10? "0" + ind + "月" : ind + "月"];
                ind++;
                if(ind > 12){
                    ind = 1;
                }
                if( i == 0 || label_month[i][0] != label_month[i-1][0]){
                    year_index.push(i);
                }
            }
        }
        else if(input_data.dateRange < 30){
            for(var i = 0;i<label.length;i++){
                label_month[i] = [label[i].substr(0,4)+"年",label[i].substr(5,2)+"月"+label[i].substr(8,2)+"日"];
                if( i == 0 || label_month[i][0] != label_month[i-1][0]){
                    year_index.push(i);
                }
            }
        }
        else{
            for(var i = 0;i<label.length;i++){
                label_month[i] = [label[i].substr(0,4)+"年",label[i].substr(5,2)+"月"];
                if( i == 0 || label_month[i][0] != label_month[i-1][0]){
                    year_index.push(i);
                }
            }
        }
        let month = [];
        for(let i = 0;i<label_month.length;i++){
            if(i == 0 || label_month[i][0] != label_month[i-1][0]){
                month.push(label_month[i][0]+label_month[i][1]);
            }
            else{
                month.push(label_month[i][1]);
            }
        }
        
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
        
        const arbitraryLine = {
            id:'arbitraryLine',
            beforeDraw(chart,args,options){
                for(var i = 0;i<options.xPosition.length;i++){
                    const{ctx, chartArea:{top, right, bottom, left, width, height},scales:{x,y}} = chart;
                    ctx.save();
                
                    ctx.fillStyle = options.arbitraryLine;
                    ctx.fillRect(x.getPixelForValue(options.xPosition[i]), top,2,height);
                    ctx.restore();
                }
            }
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
                    arbitraryLine:{
                        arbitraryLine:'#555555',
                        xPosition:year_index
                    },
                    datalabels: {
                        color: "#36A2EB",
                        anchor: "end",
                        align: "end",
                        offset: -4,
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
                labels: month,
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
            plugins: [arbitraryLine]
        });

        let new_data_pos = {};
        let new_data_neg = {};

        var pos_articles = [];
        var pos_content = [];
        var pos_url = [];
        var pos_sentimentCount = [];
        var pos_date = [];
        var pos_push_all = [];
        
        
        var wordSegment = [];
        var wordSegmentFrequency = [];
        var wordSegment_nb = [];
        var wordSegmentFrequency_nb = [];
        var wordSegment_adj = [];
        var wordSegmentFrequency_adj = [];
        
        
        var pos_push = [];
        var pos_score = [];
        
        
        var neg_push = [];
        var neg_score = [];

        for (var i = 0; i < label_all.length; i++) {
            if (posHotArticle[label_all[i]] != null && posHotArticle[label_all[i]] != "") {
                pos_articles.push(posHotArticle[label_all[i]][0].articleTitle);
                pos_content.push(posHotArticle[label_all[i]][0].articleContent);
                pos_url.push(posHotArticle[label_all[i]][0].url);
                pos_date.push(posHotArticle[label_all[i]][0].articleDate);
                pos_sentimentCount.push(posHotArticle[label_all[i]][0].sentimentCount);
                pos_push_all.push(posHotArticle[label_all[i]][0].pushContents);
                for (var j = 0; j < posHotArticle[label_all[i]][0].pushContents.length; j++) {
                    if (posHotArticle[label_all[i]][0].pushContents[j].pushContent.length >= 10) {
                        if (posHotArticle[label_all[i]][0].pushContents[j].pushContentSentiment == "positive") {
                            pos_push.push(posHotArticle[label_all[i]][0].pushContents[j].pushContent);
                            pos_score.push(posHotArticle[label_all[i]][0].pushContents[j].pushContentSentimentScore);
                        }
                        if (posHotArticle[label_all[i]][0].pushContents[j].pushContentSentiment == "negative") {
                            neg_push.push(posHotArticle[label_all[i]][0].pushContents[j].pushContent);
                            neg_score.push(posHotArticle[label_all[i]][0].pushContents[j].pushContentSentimentScore);
                        }
                    }
                }
            }
            else {
                pos_articles.push(null);
                pos_content.push(null);
                pos_url.push(null);
                pos_date.push(null);
                pos_sentimentCount.push(null);
                pos_push_all.push(null);
            }
            if(wordCloudAnalysisResults[i].wordSegment != null){
                wordSegment.push(wordCloudAnalysisResults[i].wordSegment);
                wordSegmentFrequency.push(wordCloudAnalysisResults[i].wordSegmentFrequency);
                wordSegment_nb.push(wordCloudAnalysisResults[i].wordSegmentNb);
                wordSegmentFrequency_nb.push(wordCloudAnalysisResults[i].wordSegmentNbFrequency);
                wordSegment_adj.push(wordCloudAnalysisResults[i].wordSegmentAdj);
                wordSegmentFrequency_adj.push(wordCloudAnalysisResults[i].wordSegmentAdjFrequency);
            }
            else{
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
        var neg_content = [];
        var neg_url = [];
        var neg_sentimentCount = [];
        var neg_date = [];
        var neg_push_all = [];

        

        for (var i = 0; i < label_all.length; i++) {
            if (negHotArticle[label_all[i]] != null && negHotArticle[label_all[i]] != "") {
                neg_articles.push(negHotArticle[label_all[i]][0].articleTitle);
                neg_url.push(negHotArticle[label_all[i]][0].url);
                neg_sentimentCount.push(negHotArticle[label_all[i]][0].sentimentCount);
                neg_content.push(negHotArticle[label_all[i]][0].articleContent);
                neg_date.push(negHotArticle[label_all[i]][0].articleDate);
                neg_push_all.push(negHotArticle[label_all[i]][0].pushContents);
                for (var j = 0; j < negHotArticle[label_all[i]][0].pushContents.length; j++) {
                    if (negHotArticle[label_all[i]][0].pushContents[j].pushContent.length >= 10) {
                        if (negHotArticle[label_all[i]][0].pushContents[j].pushContentSentiment == "positive") {
                            pos_push.push(negHotArticle[label_all[i]][0].pushContents[j].pushContent);
                            pos_score.push(negHotArticle[label_all[i]][0].pushContents[j].pushContentSentimentScore);
                        }
                        if (negHotArticle[label_all[i]][0].pushContents[j].pushContentSentiment == "negative") {
                            neg_push.push(negHotArticle[label_all[i]][0].pushContents[j].pushContent);
                            neg_score.push(negHotArticle[label_all[i]][0].pushContents[j].pushContentSentimentScore);
                        }
                    }
                }
            }
            else {
                neg_articles.push(null);
                neg_url.push(null);
                neg_sentimentCount.push(null);
                neg_content.push(null);
                neg_date.push(null);
                neg_push_all.push(null);
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
        article_score_pos = pos_score;
        article_score_neg = neg_score;

        var change_info = setInterval(function () {
            document.getElementById("line_pinfo").innerHTML =
                "　正向評價：" + article_data_pos[Math.floor(Math.random() * article_data_pos.length)]
            document.getElementById("line_ninfo").innerHTML =
                "　負向評價：" + article_data_neg[Math.floor(Math.random() * article_data_neg.length)]
        }, 5000);


        this.line_chart_pie_chart(month[max_index], data1[max_index], data2[max_index]);

        await this.get_data_line_pos(input_data, label[max_index], label[max_index + 1]);

        await this.get_data_line_neg(input_data, label[max_index], label[max_index + 1]);

        document.getElementById("line_link_date").innerHTML = "選取區間：" + label_month[max_index][0] + label_month[max_index][1];
        document.getElementById("line_plink").innerHTML =
            "　正向相關文章：" + "<a style='color:#4488ff' onclick='article_dialog_show(2)' role='button'>" + ((pos_articles[max_index] == null ? "無" : pos_articles[max_index]).length > 25?(pos_articles[max_index] == null ? "無" : pos_articles[max_index]).substring(0,25) + "...":(pos_articles[max_index] == null ? "無" : pos_articles[max_index])) + "</a>";

        
        document.getElementById("line_pos_article_title").innerHTML = pos_articles[max_index]
        document.getElementById("line_pos_article_date").innerHTML = "日期：" + pos_date[max_index]
        document.getElementById("line_pos_article_content").innerHTML = pos_content[max_index]
        vm.line_pos = pos_push_all[max_index];


        document.getElementById("line_nlink").innerHTML =
            "　負向相關文章：" + "<a style='color:#4488ff' onclick='article_dialog_show(3)' role='button'>" + ((neg_articles[max_index] == null ? "無" : neg_articles[max_index]).length > 25?(neg_articles[max_index] == null ? "無" : neg_articles[max_index]).substring(0,25) + "...":(neg_articles[max_index] == null ? "無" : neg_articles[max_index])) + "</a>";

        
        document.getElementById("line_neg_article_title").innerHTML = neg_articles[max_index]
        document.getElementById("line_neg_article_date").innerHTML = "日期：" + neg_date[max_index]
        document.getElementById("line_neg_article_content").innerHTML = neg_content[max_index]
        vm.line_neg = neg_push_all[max_index];
        
        document.getElementById("p_sum").innerHTML =
            "<h5>區間內關鍵字統計：</h5>" + "　1.關鍵字：" + wordSegment[max_index][0] + "：" + wordSegmentFrequency[max_index][0].toLocaleString() + " 次<br>　2.關鍵字：" +
            wordSegment[max_index][1] + "：" + wordSegmentFrequency[max_index][1].toLocaleString() + " 次<br>　3.關鍵字：" +
            wordSegment[max_index][2] + "：" + wordSegmentFrequency[max_index][2].toLocaleString() + " 次";

        let line_table_data_all = "<th>無區分詞性</th>";
        for (let i = 0; i < wordSegment[max_index].length; i++) {
            line_table_data_all = line_table_data_all + "<tr><td>" + wordSegment[max_index][i] + "：</td><td>" + wordSegmentFrequency[max_index][i].toLocaleString() + "</td></tr>";
        }
        let line_table_data__nb = "<th>專有名詞關鍵字</th>";
        for (let i = 0; i < wordSegment_nb[max_index].length; i++) {
            line_table_data__nb = line_table_data__nb + "<tr><td>" + wordSegment_nb[max_index][i] + "：</td><td>" + wordSegmentFrequency_nb[max_index][i].toLocaleString() + "</td></tr>";
        }
        let line_table_data_adj = "<th>形容詞關鍵字</th>";
        for (let i = 0; i < wordSegment_adj[max_index].length; i++) {
            line_table_data_adj = line_table_data_adj + "<tr><td>" + wordSegment_adj[max_index][i] + "：</td><td>" + wordSegmentFrequency_adj[max_index][i].toLocaleString() + "</td></tr>";
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
                    arbitraryLine:{
                        arbitraryLine:'#555555',
                        xPosition:year_index
                    },
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
                        this.line_chart_pie_chart(month[activeEls[0].index], data1[activeEls[0].index], data2[activeEls[0].index]);

                        await this.get_data_line_pos(input_data, label[activeEls[0].index], label[activeEls[0].index + 1]);

                        await this.get_data_line_neg(input_data, label[activeEls[0].index], label[activeEls[0].index + 1]);

                        document.getElementById("line_link_date").innerHTML = "選取區間：" + month[activeEls[0].index]
                        document.getElementById("line_plink").innerHTML =
                            "　正向相關文章：" + "<a style='color:#4488ff' onclick='article_dialog_show(3)' role='button'>" + ((pos_articles[activeEls[0].index] == null ? "無" : pos_articles[activeEls[0].index]).length > 25?(pos_articles[activeEls[0].index] == null ? "無" : pos_articles[activeEls[0].index]).substring(0,25) + "...":(pos_articles[activeEls[0].index] == null ? "無" : pos_articles[activeEls[0].index])) + "</a>";

        
        document.getElementById("line_pos_article_title").innerHTML = pos_articles[activeEls[0].index]
        document.getElementById("line_pos_article_date").innerHTML = "日期："+pos_date[activeEls[0].index]
        document.getElementById("line_pos_article_content").innerHTML = pos_content[activeEls[0].index]
        vm.line_pos = pos_push_all[activeEls[0].index];


                        document.getElementById("line_nlink").innerHTML =
                            "　負向相關文章：" + "<a style='color:#4488ff' onclick='article_dialog_show(2)' role='button'>" + ((neg_articles[activeEls[0].index] == null ? "無" : neg_articles[activeEls[0].index]).length > 25?(neg_articles[activeEls[0].index] == null ? "無" : neg_articles[activeEls[0].index]).substring(0,25) + "...":(neg_articles[activeEls[0].index] == null ? "無" : neg_articles[activeEls[0].index])) + "</a>";
        
        document.getElementById("line_pos_article_title").innerHTML = neg_articles[activeEls[0].index]
        document.getElementById("line_pos_article_date").innerHTML = "日期："+neg_date[activeEls[0].index]
        document.getElementById("line_pos_article_content").innerHTML = neg_content[activeEls[0].index]
        vm.line_neg = neg_push_all[activeEls[0].index];


                        document.getElementById("p_sum").innerHTML =
                            "<h5>區間內關鍵字統計：</h5>" + "　1.關鍵字：" + wordSegment[activeEls[0].index][0] + "：" + wordSegmentFrequency[activeEls[0].index][0].toLocaleString() + " 次<br>　2.關鍵字：" +
                            wordSegment[activeEls[0].index][1] + "：" + wordSegmentFrequency[activeEls[0].index][1].toLocaleString() + " 次<br>　3.關鍵字：" +
                            wordSegment[activeEls[0].index][2] + "：" + wordSegmentFrequency[activeEls[0].index][2].toLocaleString() + " 次";

                        let line_table_data_all = "<th>無區分詞性</th>";
                        for (let i = 0; i < wordSegment[activeEls[0].index].length; i++) {
                            line_table_data_all = line_table_data_all + "<tr><td>" + wordSegment[activeEls[0].index][i] + "：</td><td>" + wordSegmentFrequency[activeEls[0].index][i].toLocaleString() + "</td></tr>";
                        }
                        let line_table_data__nb = "<th>專有名詞關鍵字</th>";
                        for (let i = 0; i < wordSegment_nb[activeEls[0].index].length; i++) {
                            line_table_data__nb = line_table_data__nb + "<tr><td>" + wordSegment_nb[activeEls[0].index][i] + "：</td><td>" + wordSegmentFrequency_nb[activeEls[0].index][i].toLocaleString() + "</td></tr>";
                        }
                        let line_table_data_adj = "<th>形容詞關鍵字</th>";
                        for (let i = 0; i < wordSegment_adj[activeEls[0].index].length; i++) {
                            line_table_data_adj = line_table_data_adj + "<tr><td>" + wordSegment_adj[activeEls[0].index][i] + "：</td><td>" + wordSegmentFrequency_adj[activeEls[0].index][i].toLocaleString() + "</td></tr>";
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
                labels: month,
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
            plugins: [arbitraryLine]
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

    word_chart_all(relatedArticle,wordSegment, frequency, wordSegmentNb, wordSegmentNbFrequency, wordSegmentAdj, wordSegmentAdjFrequency) {
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
        title1.text("無區分詞性");
        title1.fontSize(30);
//        var coolor1 = anychart.scales.linearColor();
//        coolor1.colors(["#FFCC00", "#00CCFF"]);
//        chart1.colorScale(coolor1);
        chart1.palette(["#EFC638","#5151A2", "#715CA8","#F9F900", "#416EB6", "#2B103B"]);
//        chart1.colorRange(true);
//        chart1.colorRange().length("80%");
        chart1.background().fill("#f9f9f9");
        chart1.container("word_cloud1");
        chart1.draw();
        chart1.tooltip().format("出現機率：{%yPercentOfTotal}% \n\n筆數：{%value}");

        document.getElementById("word_cloud4").innerHTML = null;
        var chart2 = anychart.tagCloud(data2);
        var title2 = chart2.title();
        title2.enabled(true);
        title2.text("專有名詞關鍵字");
        title2.fontSize(30);
//        var coolor2 = anychart.scales.linearColor();
//        coolor2.colors(["#FFCC00", "#00CCFF"]);
//        chart2.colorScale(coolor2);
        chart2.palette(["#EFC638","#5151A2", "#715CA8","#F9F900", "#416EB6", "#2B103B"]);
//        chart2.colorRange(true);
//        chart2.colorRange().length("80%");
        chart2.background().fill("#f9f9f9");
        chart2.container("word_cloud4");
        chart2.draw();
        chart2.tooltip().format("出現機率：{%yPercentOfTotal}% \n\n筆數：{%value}");

        document.getElementById("word_cloud5").innerHTML = null;
        var chart3 = anychart.tagCloud(data3);
        var title3 = chart3.title();
        title3.enabled(true);
        title3.text("形容詞關鍵字");
        title3.fontSize(30);
//        var coolor3 = anychart.scales.linearColor();
//        coolor3.colors(["#FFCC00", "#00CCFF"]);
//        chart3.colorScale(coolor3);
        chart3.palette(["#EFC638","#5151A2", "#715CA8","#F9F900", "#416EB6", "#2B103B"]);
//        chart3.colorRange(true);
//        chart3.colorRange().length("80%");
        chart3.background().fill("#f9f9f9");
        chart3.container("word_cloud5");
        chart3.draw();
        chart3.tooltip().format("出現機率：{%yPercentOfTotal}% \n\n筆數：{%value}");

        document.getElementById("wc1").innerHTML = null;
        var chart1_1 = anychart.tagCloud(data1);
        var title1_1 = chart1_1.title();
        title1_1.enabled(true);
        title1_1.text("無區分詞性");
        title1_1.fontSize(30);
//        var coolor1_1 = anychart.scales.linearColor();
//        coolor1_1.colors(["#FFCC00", "#00CCFF"]);
//        chart1_1.colorScale(coolor1_1);
        chart1_1.palette(["#EFC638","#5151A2", "#715CA8","#F9F900", "#416EB6", "#2B103B"]);
//        chart1_1.colorRange(true);
//        chart1_1.colorRange().length("80%");
        chart1_1.container("wc1");
        chart1_1.draw();
        chart1_1.listen("pointClick", function(e){
            let article_score = [],article = [],content_score = [],content = [],contentSentiment = [],url = [],push_content_text = [],push_content_text_Sentiment = [],push_content_text_score = [];
            for(i in relatedArticle){
                if(i == e.point.get("x")){
                    for(let j = 0;j<relatedArticle[i].length;j++){
                        for(let n = 0;n<relatedArticle[i][j].pushContents.length;n++){
                            if(relatedArticle[i][j].pushContents[n].pushContent.includes(e.point.get("x"))){
                                push_content_text.push(relatedArticle[i][j].pushContents[n].pushContent);
                                push_content_text_Sentiment.push(relatedArticle[i][j].pushContents[n].pushContentSentiment);
                                push_content_text_score.push(relatedArticle[i][j].pushContents[n].pushContentSentimentScore);
                                push_content_text_Sentiment.push(relatedArticle[i][j].pushContents[n].pushContentSentiment);
                            }
                        }
                        article_score.push(relatedArticle[i][j].articleTitleSentimentScore);
                        article.push(relatedArticle[i][j].articleTitle);
                        content_score.push(relatedArticle[i][j].contentSentimentScore);
                        
                        var word = relatedArticle[i][j].articleContent.split(' '||'　'||'，'||'：'||':'||'');
                        var numberIndex = word.findIndex((word) => word.includes(e.point.get("x"), 0));
                        var indexWord = word[numberIndex];
                        content.push(indexWord);
                        
//                        content.push(relatedArticle[i][j].articleContent.substr(relatedArticle[i][j].articleContent.indexOf(' '||'　'||'，'||'：'||':',relatedArticle[i][j].articleContent.indexOf(e.point.get("x"))-20), relatedArticle[i][j].articleContent.indexOf(' '||'　'||'，'||'：'||':',relatedArticle[i][j].articleContent.indexOf(e.point.get("x")))-relatedArticle[i][j].articleContent.indexOf(e.point.get("x"))));
                                     
                        contentSentiment.push(relatedArticle[i][j].contentSentiment)
                        url.push(relatedArticle[i][j].url);
                    }
                }
            }
            let ran = Math.floor(Math.random() * article.length);
            let rnd = 0;
            if(content[ran]==null){
                rnd = Math.floor(Math.random() * push_content_text.length);
            }
            else{
                rnd = ran;
            }
            if(article[ran] == null){
                alert("項目：" + e.point.get("x") + "\n出現頻率：" + e.point.get("value") + "次");
            }
            else{
            if(confirm("項目：" + e.point.get("x") + "\n出現頻率：" + e.point.get("value") + "次" +
                  "\n\n該篇文章內文或留言出現此關鍵字：" + article[ran] + "\n\n內文關鍵字出現段落：" + (content[ran]==null?"僅留言出現":content[ran]) + "\n內文情緒分析：" + (contentSentiment[ran]=='positive'?"正向內容":"負向內容") + "　內文分析準確度：" + content_score[ran].toFixed(2) + "\n\n關鍵字出現留言：" + push_content_text[rnd] + "\n留言情緒分析：" + (push_content_text_Sentiment[rnd]=='positive'?"正向內容":"負向內容") + "　留言分析準確度：" + push_content_text_score[rnd].toFixed(2) + "\n\n文章連結：" + url[ran] + "\n\n是否移至該文章連結？") == true){
                
                window.open(url[ran]);
            }
            }
        });
        chart1_1.tooltip().format("出現機率：{%yPercentOfTotal}% \n\n筆數：{%value}");

        document.getElementById("wc4").innerHTML = null;
        var chart1_2 = anychart.tagCloud(data2);
        var title1_2 = chart1_2.title();
        title1_2.enabled(true);
        title1_2.text("專有名詞關鍵字");
        title1_2.fontSize(30);
//        var coolor1_2 = anychart.scales.linearColor();
//        coolor1_2.colors(["#66FF66", "#116611"]);
//        chart1_2.colorScale(coolor1_2);
        chart1_2.palette(["#EFC638","#5151A2", "#715CA8","#F9F900", "#416EB6", "#2B103B"]);
//        chart1_2.colorRange(true);
//        chart1_2.colorRange().length("80%");
        chart1_2.container("wc4");
        chart1_2.draw();
        chart1_2.listen("pointClick", function(e){
            let article_score = [],article = [],content_score = [],content = [],contentSentiment = [],url = [],push_content_text = [],push_content_text_Sentiment = [],push_content_text_score = [];
            for(i in relatedArticle){
                if(i == e.point.get("x")){
                    for(let j = 0;j<relatedArticle[i].length;j++){
                        for(let n = 0;n<relatedArticle[i][j].pushContents.length;n++){
                            if(relatedArticle[i][j].pushContents[n].pushContent.includes(e.point.get("x"))){
                                push_content_text.push(relatedArticle[i][j].pushContents[n].pushContent);
                                push_content_text_Sentiment.push(relatedArticle[i][j].pushContents[n].pushContentSentiment);
                                push_content_text_score.push(relatedArticle[i][j].pushContents[n].pushContentSentimentScore);
                                push_content_text_Sentiment.push(relatedArticle[i][j].pushContents[n].pushContentSentiment);
                            }
                        }
                        article_score.push(relatedArticle[i][j].articleTitleSentimentScore);
                        article.push(relatedArticle[i][j].articleTitle);
                        content_score.push(relatedArticle[i][j].contentSentimentScore);
                        
                        var word = relatedArticle[i][j].articleContent.split(' '||'　'||'，'||'：'||':'||'');
                        var numberIndex = word.findIndex((word) => word.includes(e.point.get("x"), 0));
                        var indexWord = word[numberIndex];
                        content.push(indexWord);
                        
//                        content.push(relatedArticle[i][j].articleContent.substr(relatedArticle[i][j].articleContent.indexOf(' '||'　'||'，'||'：'||':',relatedArticle[i][j].articleContent.indexOf(e.point.get("x"))-20), relatedArticle[i][j].articleContent.indexOf(' '||'　'||'，'||'：'||':',relatedArticle[i][j].articleContent.indexOf(e.point.get("x")))-relatedArticle[i][j].articleContent.indexOf(e.point.get("x"))));
                                     
                        contentSentiment.push(relatedArticle[i][j].contentSentiment)
                        url.push(relatedArticle[i][j].url);
                    }
                }
            }
            let ran = Math.floor(Math.random() * article.length);
            let rnd = 0;
            if(content[ran]==null){
                rnd = Math.floor(Math.random() * push_content_text.length);
            }
            else{
                rnd = ran;
            }
            if(article[ran] == null){
                alert("項目：" + e.point.get("x") + "\n出現頻率：" + e.point.get("value") + "次");
            }
            else{
            if(confirm("項目：" + e.point.get("x") + "\n出現頻率：" + e.point.get("value") + "次" +
                  "\n\n該篇文章內文或留言出現此關鍵字：" + article[ran] + "\n\n內文關鍵字出現段落：" + (content[ran]==null?"僅留言出現":content[ran]) + "\n內文情緒分析：" + (contentSentiment[ran]=='positive'?"正向內容":"負向內容") + "　內文分析準確度：" + content_score[ran].toFixed(2) + "\n\n關鍵字出現留言：" + push_content_text[rnd] + "\n留言情緒分析：" + (push_content_text_Sentiment[rnd]=='positive'?"正向內容":"負向內容") + "　留言分析準確度：" + push_content_text_score[rnd].toFixed(2) + "\n\n文章連結：" + url[ran] + "\n\n是否移至該文章連結？") == true){
                
                window.open(url[ran]);
            }
            }
        });
        chart1_2.tooltip().format("出現機率：{%yPercentOfTotal}% \n\n筆數：{%value}");

        document.getElementById("wc5").innerHTML = null;
        var chart1_3 = anychart.tagCloud(data3);
        var title1_3 = chart1_3.title();
        title1_3.enabled(true);
        title1_3.text("形容詞關鍵字");
        title1_3.fontSize(30);
//        var coolor1_3 = anychart.scales.linearColor();
//        coolor1_3.colors(["#FFCC00", "#00CCFF"]);
//        chart1_3.colorScale(coolor1_3);
        chart1_3.palette(["#EFC638","#5151A2", "#715CA8","#F9F900", "#416EB6", "#2B103B"]);
//        chart1_3.colorRange(true);
//        chart1_3.colorRange().length("80%");
        chart1_3.container("wc5");
        chart1_3.draw();
        chart1_3.listen("pointClick", function(e){
            let article_score = [],article = [],content_score = [],content = [],contentSentiment = [],url = [],push_content_text = [],push_content_text_Sentiment = [],push_content_text_score = [];
            for(i in relatedArticle){
                if(i == e.point.get("x")){
                    for(let j = 0;j<relatedArticle[i].length;j++){
                        for(let n = 0;n<relatedArticle[i][j].pushContents.length;n++){
                            if(relatedArticle[i][j].pushContents[n].pushContent.includes(e.point.get("x"))){
                                push_content_text.push(relatedArticle[i][j].pushContents[n].pushContent);
                                push_content_text_Sentiment.push(relatedArticle[i][j].pushContents[n].pushContentSentiment);
                                push_content_text_score.push(relatedArticle[i][j].pushContents[n].pushContentSentimentScore);
                                push_content_text_Sentiment.push(relatedArticle[i][j].pushContents[n].pushContentSentiment);
                            }
                        }
                        article_score.push(relatedArticle[i][j].articleTitleSentimentScore);
                        article.push(relatedArticle[i][j].articleTitle);
                        content_score.push(relatedArticle[i][j].contentSentimentScore);
                        
                        var word = relatedArticle[i][j].articleContent.split(' '||'　'||'，'||'：'||':'||'');
                        var numberIndex = word.findIndex((word) => word.includes(e.point.get("x"), 0));
                        var indexWord = word[numberIndex];
                        content.push(indexWord);
                        
//                        content.push(relatedArticle[i][j].articleContent.substr(relatedArticle[i][j].articleContent.indexOf(' '||'　'||'，'||'：'||':',relatedArticle[i][j].articleContent.indexOf(e.point.get("x"))-20), relatedArticle[i][j].articleContent.indexOf(' '||'　'||'，'||'：'||':',relatedArticle[i][j].articleContent.indexOf(e.point.get("x")))-relatedArticle[i][j].articleContent.indexOf(e.point.get("x"))));
                                     
                        contentSentiment.push(relatedArticle[i][j].contentSentiment)
                        url.push(relatedArticle[i][j].url);
                    }
                }
            }
            let ran = Math.floor(Math.random() * article.length);
            let rnd = 0;
            if(content[ran]==null){
                rnd = Math.floor(Math.random() * push_content_text.length);
            }
            else{
                rnd = ran;
            }
            if(article[ran] == null){
                alert("項目：" + e.point.get("x") + "\n出現頻率：" + e.point.get("value") + "次");
            }
            else{
            if(confirm("項目：" + e.point.get("x") + "\n出現頻率：" + e.point.get("value") + "次" +
                  "\n\n該篇文章內文或留言出現此關鍵字：" + article[ran] + "\n\n內文關鍵字出現段落：" + (content[ran]==null?"僅留言出現":content[ran]) + "\n內文情緒分析：" + (contentSentiment[ran]=='positive'?"正向內容":"負向內容") + "　內文分析準確度：" + content_score[ran].toFixed(2) + "\n\n關鍵字出現留言：" + push_content_text[rnd] + "\n留言情緒分析：" + (push_content_text_Sentiment[rnd]=='positive'?"正向內容":"負向內容") + "　留言分析準確度：" + push_content_text_score[rnd].toFixed(2) + "\n\n文章連結：" + url[ran] + "\n\n是否移至該文章連結？") == true){
                
                window.open(url[ran]);
            }
            }
        });
        chart1_3.tooltip().format("出現機率：{%yPercentOfTotal}% \n\n筆數：{%value}");
    },
    word_chart_positive(relatedArticle,wordSegment, frequency, wordSegmentNb, wordSegmentNbFrequency, wordSegmentAdj, wordSegmentAdjFrequency) {
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
        title1.text("無區分詞性");
        title1.fontSize(30);
//        var coolor1 = anychart.scales.linearColor();
//        coolor1.colors(["#66FF66", "#116611"]);
//        chart1.colorScale(coolor1);
        chart1.palette(["#EE3239","#5EAA5F", "#FECE00","#9D6AB8"]);
//        chart1.colorRange(true);
//        chart1.colorRange().length("80%");
        chart1.background().fill("#f9f9f9");
        chart1.container("word_cloud2");
        chart1.draw();
        chart1.tooltip().format("出現機率：{%yPercentOfTotal}% \n\n筆數：{%value}");

        document.getElementById("word_cloud6").innerHTML = null;
        var chart2 = anychart.tagCloud(data2);
        var title2 = chart2.title();
        title2.enabled(true);
        title2.text("專有名詞關鍵字");
        title2.fontSize(30);
//        var coolor2 = anychart.scales.linearColor();
//        coolor2.colors(["#66FF66", "#116611"]);
//        chart2.colorScale(coolor2);
        chart2.palette(["#EE3239","#5EAA5F", "#FECE00","#9D6AB8"]);
//        chart2.colorRange(true);
//        chart2.colorRange().length("80%");
        chart2.background().fill("#f9f9f9");
        chart2.container("word_cloud6");
        chart2.draw();
        chart2.tooltip().format("出現機率：{%yPercentOfTotal}% \n\n筆數：{%value}");

        document.getElementById("word_cloud7").innerHTML = null;
        var chart3 = anychart.tagCloud(data3);
        var title3 = chart3.title();
        title3.enabled(true);
        title3.text("形容詞關鍵字");
        title3.fontSize(30);
//        var coolor3 = anychart.scales.linearColor();
//        coolor3.colors(["#66FF66", "#116611"]);
//        chart3.colorScale(coolor3);
        chart3.palette(["#EE3239","#5EAA5F", "#FECE00","#9D6AB8"]);
//        chart3.colorRange(true);
//        chart3.colorRange().length("80%");
        chart3.background().fill("#f9f9f9");
        chart3.container("word_cloud7");
        chart3.draw();
        chart3.tooltip().format("出現機率：{%yPercentOfTotal}% \n\n筆數：{%value}");

        document.getElementById("wc2").innerHTML = null;
        var chart2_1 = anychart.tagCloud(data1);
        var title2_1 = chart2_1.title();
        title2_1.enabled(true);
        title2_1.text("無區分詞性");
        title2_1.fontSize(30);
//        var coolor2_1 = anychart.scales.linearColor();
//        coolor2_1.colors(["#66FF66", "#116611"]);
//        chart2_1.colorScale(coolor2_1);
        chart2_1.palette(["#EE3239","#5EAA5F", "#FECE00","#9D6AB8"]);
//        chart2_1.colorRange(true);
//        chart2_1.colorRange().length("80%");
        chart2_1.container("wc2");
        chart2_1.draw();
        chart2_1.listen("pointClick", function(e){
            let article_score = [],article = [],content_score = [],content = [],contentSentiment = [],url = [],push_content_text = [],push_content_text_Sentiment = [],push_content_text_score = [];
            for(i in relatedArticle){
                if(i == e.point.get("x")){
                    for(let j = 0;j<relatedArticle[i].length;j++){
                        for(let n = 0;n<relatedArticle[i][j].pushContents.length;n++){
                            if(relatedArticle[i][j].pushContents[n].pushContent.includes(e.point.get("x"))){
                                push_content_text.push(relatedArticle[i][j].pushContents[n].pushContent);
                                push_content_text_Sentiment.push(relatedArticle[i][j].pushContents[n].pushContentSentiment);
                                push_content_text_score.push(relatedArticle[i][j].pushContents[n].pushContentSentimentScore);
                                push_content_text_Sentiment.push(relatedArticle[i][j].pushContents[n].pushContentSentiment);
                            }
                        }
                        article_score.push(relatedArticle[i][j].articleTitleSentimentScore);
                        article.push(relatedArticle[i][j].articleTitle);
                        content_score.push(relatedArticle[i][j].contentSentimentScore);
                        
                        var word = relatedArticle[i][j].articleContent.split(' '||'　'||'，'||'：'||':'||'');
                        var numberIndex = word.findIndex((word) => word.includes(e.point.get("x"), 0));
                        var indexWord = word[numberIndex];
                        content.push(indexWord);
                        
//                        content.push(relatedArticle[i][j].articleContent.substr(relatedArticle[i][j].articleContent.indexOf(' '||'　'||'，'||'：'||':',relatedArticle[i][j].articleContent.indexOf(e.point.get("x"))-20), relatedArticle[i][j].articleContent.indexOf(' '||'　'||'，'||'：'||':',relatedArticle[i][j].articleContent.indexOf(e.point.get("x")))-relatedArticle[i][j].articleContent.indexOf(e.point.get("x"))));
                                     
                        contentSentiment.push(relatedArticle[i][j].contentSentiment)
                        url.push(relatedArticle[i][j].url);
                    }
                }
            }
            let ran = Math.floor(Math.random() * article.length);
            let rnd = 0;
            if(content[ran]==null){
                rnd = Math.floor(Math.random() * push_content_text.length);
            }
            else{
                rnd = ran;
            }
            if(article[ran] == null){
                alert("項目：" + e.point.get("x") + "\n出現頻率：" + e.point.get("value") + "次");
            }
            else{
            if(confirm("項目：" + e.point.get("x") + "\n出現頻率：" + e.point.get("value") + "次" +
                  "\n\n該篇文章內文或留言出現此關鍵字：" + article[ran] + "\n\n內文關鍵字出現段落：" + (content[ran]==null?"僅留言出現":content[ran]) + "\n內文情緒分析：" + (contentSentiment[ran]=='positive'?"正向內容":"負向內容") + "　內文分析準確度：" + content_score[ran].toFixed(2) + "\n\n關鍵字出現留言：" + push_content_text[rnd] + "\n留言情緒分析：" + (push_content_text_Sentiment[rnd]=='positive'?"正向內容":"負向內容") + "　留言分析準確度：" + push_content_text_score[rnd].toFixed(2) + "\n\n文章連結：" + url[ran] + "\n\n是否移至該文章連結？") == true){
                
                window.open(url[ran]);
            }
            }
        });
        chart2_1.tooltip().format("出現機率：{%yPercentOfTotal}% \n\n筆數：{%value}");

        document.getElementById("wc6").innerHTML = null;
        var chart2_2 = anychart.tagCloud(data2);
        var title2_2 = chart2_2.title();
        title2_2.enabled(true);
        title2_2.text("專有名詞關鍵字");
        title2_2.fontSize(30);
//        var coolor2_2 = anychart.scales.linearColor();
//        coolor2_2.colors(["#66FF66", "#116611"]);
//        chart2_2.colorScale(coolor2_2);
        chart2_2.palette(["#EE3239","#5EAA5F", "#FECE00","#9D6AB8"]);
//        chart2_2.colorRange(true);
//        chart2_2.colorRange().length("80%");
        chart2_2.container("wc6");
        chart2_2.draw();
        chart2_2.listen("pointClick", function(e){
            let article_score = [],article = [],content_score = [],content = [],contentSentiment = [],url = [],push_content_text = [],push_content_text_Sentiment = [],push_content_text_score = [];
            for(i in relatedArticle){
                if(i == e.point.get("x")){
                    for(let j = 0;j<relatedArticle[i].length;j++){
                        for(let n = 0;n<relatedArticle[i][j].pushContents.length;n++){
                            if(relatedArticle[i][j].pushContents[n].pushContent.includes(e.point.get("x"))){
                                push_content_text.push(relatedArticle[i][j].pushContents[n].pushContent);
                                push_content_text_Sentiment.push(relatedArticle[i][j].pushContents[n].pushContentSentiment);
                                push_content_text_score.push(relatedArticle[i][j].pushContents[n].pushContentSentimentScore);
                                push_content_text_Sentiment.push(relatedArticle[i][j].pushContents[n].pushContentSentiment);
                            }
                        }
                        article_score.push(relatedArticle[i][j].articleTitleSentimentScore);
                        article.push(relatedArticle[i][j].articleTitle);
                        content_score.push(relatedArticle[i][j].contentSentimentScore);
                        
                        var word = relatedArticle[i][j].articleContent.split(' '||'　'||'，'||'：'||':'||'');
                        var numberIndex = word.findIndex((word) => word.includes(e.point.get("x"), 0));
                        var indexWord = word[numberIndex];
                        content.push(indexWord);
                        
//                        content.push(relatedArticle[i][j].articleContent.substr(relatedArticle[i][j].articleContent.indexOf(' '||'　'||'，'||'：'||':',relatedArticle[i][j].articleContent.indexOf(e.point.get("x"))-20), relatedArticle[i][j].articleContent.indexOf(' '||'　'||'，'||'：'||':',relatedArticle[i][j].articleContent.indexOf(e.point.get("x")))-relatedArticle[i][j].articleContent.indexOf(e.point.get("x"))));
                                     
                        contentSentiment.push(relatedArticle[i][j].contentSentiment)
                        url.push(relatedArticle[i][j].url);
                    }
                }
            }
            let ran = Math.floor(Math.random() * article.length);
            let rnd = 0;
            if(content[ran]==null){
                rnd = Math.floor(Math.random() * push_content_text.length);
            }
            else{
                rnd = ran;
            }
            if(article[ran] == null){
                alert("項目：" + e.point.get("x") + "\n出現頻率：" + e.point.get("value") + "次");
            }
            else{
            if(confirm("項目：" + e.point.get("x") + "\n出現頻率：" + e.point.get("value") + "次" +
                  "\n\n該篇文章內文或留言出現此關鍵字：" + article[ran] + "\n\n內文關鍵字出現段落：" + (content[ran]==null?"僅留言出現":content[ran]) + "\n內文情緒分析：" + (contentSentiment[ran]=='positive'?"正向內容":"負向內容") + "　內文分析準確度：" + content_score[ran].toFixed(2) + "\n\n關鍵字出現留言：" + push_content_text[rnd] + "\n留言情緒分析：" + (push_content_text_Sentiment[rnd]=='positive'?"正向內容":"負向內容") + "　留言分析準確度：" + push_content_text_score[rnd].toFixed(2) + "\n\n文章連結：" + url[ran] + "\n\n是否移至該文章連結？") == true){
                
                window.open(url[ran]);
            }
            }
        });
        chart2_2.tooltip().format("出現機率：{%yPercentOfTotal}% \n\n筆數：{%value}");

        document.getElementById("wc7").innerHTML = null;
        var chart2_3 = anychart.tagCloud(data3);
        var title2_3 = chart2_3.title();
        title2_3.enabled(true);
        title2_3.text("形容詞關鍵字");
        title2_3.fontSize(30);
//        var coolor2_3 = anychart.scales.linearColor();
//        coolor2_3.colors(["#66FF66", "#116611"]);
//        chart2_3.colorScale(coolor2_3);
        chart2_3.palette(["#EE3239","#5EAA5F", "#FECE00","#9D6AB8"]);
//        chart2_3.colorRange(true);
//        chart2_3.colorRange().length("80%");
        chart2_3.container("wc7");
        chart2_3.draw();
        chart2_3.listen("pointClick", function(e){
            let article_score = [],article = [],content_score = [],content = [],contentSentiment = [],url = [],push_content_text = [],push_content_text_Sentiment = [],push_content_text_score = [];
            for(i in relatedArticle){
                if(i == e.point.get("x")){
                    for(let j = 0;j<relatedArticle[i].length;j++){
                        for(let n = 0;n<relatedArticle[i][j].pushContents.length;n++){
                            if(relatedArticle[i][j].pushContents[n].pushContent.includes(e.point.get("x"))){
                                push_content_text.push(relatedArticle[i][j].pushContents[n].pushContent);
                                push_content_text_Sentiment.push(relatedArticle[i][j].pushContents[n].pushContentSentiment);
                                push_content_text_score.push(relatedArticle[i][j].pushContents[n].pushContentSentimentScore);
                                push_content_text_Sentiment.push(relatedArticle[i][j].pushContents[n].pushContentSentiment);
                            }
                        }
                        article_score.push(relatedArticle[i][j].articleTitleSentimentScore);
                        article.push(relatedArticle[i][j].articleTitle);
                        content_score.push(relatedArticle[i][j].contentSentimentScore);
                        
                        var word = relatedArticle[i][j].articleContent.split(' '||'　'||'，'||'：'||':'||'');
                        var numberIndex = word.findIndex((word) => word.includes(e.point.get("x"), 0));
                        var indexWord = word[numberIndex];
                        content.push(indexWord);
                        
//                        content.push(relatedArticle[i][j].articleContent.substr(relatedArticle[i][j].articleContent.indexOf(' '||'　'||'，'||'：'||':',relatedArticle[i][j].articleContent.indexOf(e.point.get("x"))-20), relatedArticle[i][j].articleContent.indexOf(' '||'　'||'，'||'：'||':',relatedArticle[i][j].articleContent.indexOf(e.point.get("x")))-relatedArticle[i][j].articleContent.indexOf(e.point.get("x"))));
                                     
                        contentSentiment.push(relatedArticle[i][j].contentSentiment)
                        url.push(relatedArticle[i][j].url);
                    }
                }
            }
            let ran = Math.floor(Math.random() * article.length);
            let rnd = 0;
            if(content[ran]==null){
                rnd = Math.floor(Math.random() * push_content_text.length);
            }
            else{
                rnd = ran;
            }
            if(article[ran] == null){
                alert("項目：" + e.point.get("x") + "\n出現頻率：" + e.point.get("value") + "次");
            }
            else{
            if(confirm("項目：" + e.point.get("x") + "\n出現頻率：" + e.point.get("value") + "次" +
                  "\n\n該篇文章內文或留言出現此關鍵字：" + article[ran] + "\n\n內文關鍵字出現段落：" + (content[ran]==null?"僅留言出現":content[ran]) + "\n內文情緒分析：" + (contentSentiment[ran]=='positive'?"正向內容":"負向內容") + "　內文分析準確度：" + content_score[ran].toFixed(2) + "\n\n關鍵字出現留言：" + push_content_text[rnd] + "\n留言情緒分析：" + (push_content_text_Sentiment[rnd]=='positive'?"正向內容":"負向內容") + "　留言分析準確度：" + push_content_text_score[rnd].toFixed(2) + "\n\n文章連結：" + url[ran] + "\n\n是否移至該文章連結？") == true){
                
                window.open(url[ran]);
            }
            }
        });
        chart2_3.tooltip().format("出現機率：{%yPercentOfTotal}% \n\n筆數：{%value}");
    },
    word_chart_negative(relatedArticle,wordSegment, frequency, wordSegmentNb, wordSegmentNbFrequency, wordSegmentAdj, wordSegmentAdjFrequency) {
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
        title1.text("無區分詞性");
        title1.fontSize(30);
//        var coolor1 = anychart.scales.linearColor();
//        coolor1.colors(["#EEBBAA", "#DD2222"]);
//        chart1.colorScale(coolor1);
        chart1.palette(["#028C6A","#632A7E", "#F3553C","#003E19", "#280E3B", "#E81E25"]);
//        chart1.colorRange(true);
//        chart1.colorRange().length("80%");
        chart1.background().fill("#f9f9f9");
        chart1.container("word_cloud3");
        chart1.draw();
        chart1.tooltip().format("出現機率：{%yPercentOfTotal}% \n\n筆數：{%value}");

        document.getElementById("word_cloud8").innerHTML = null;
        var chart2 = anychart.tagCloud(data2);
        var title2 = chart2.title();
        title2.enabled(true);
        title2.text("專有名詞關鍵字");
        title2.fontSize(30);
//        var coolor2 = anychart.scales.linearColor();
//        coolor2.colors(["#EEBBAA", "#DD2222"]);
//        chart2.colorScale(coolor2);
        chart2.palette(["#028C6A","#632A7E", "#F3553C","#003E19", "#280E3B", "#E81E25"]);
//        chart2.colorRange(true);
//        chart2.colorRange().length("80%");
        chart2.background().fill("#f9f9f9");
        chart2.container("word_cloud8");
        chart2.draw();
        chart2.tooltip().format("出現機率：{%yPercentOfTotal}% \n\n筆數：{%value}");

        document.getElementById("word_cloud9").innerHTML = null;
        var chart3 = anychart.tagCloud(data3);
        var title3 = chart3.title();
        title3.enabled(true);
        title3.text("形容詞關鍵字");
        title3.fontSize(30);
//        var coolor3 = anychart.scales.linearColor();
//        coolor3.colors(["#EEBBAA", "#DD2222"]);
//        chart3.colorScale(coolor3);
        chart3.palette(["#028C6A","#632A7E", "#F3553C","#003E19", "#280E3B", "#E81E25"]);
//        chart3.colorRange(true);
//        chart3.colorRange().length("80%");
        chart3.background().fill("#f9f9f9");
        chart3.container("word_cloud9");
        chart3.draw();
        chart3.tooltip().format("出現機率：{%yPercentOfTotal}% \n\n筆數：{%value}");

        document.getElementById("wc3").innerHTML = null;
        var chart3_1 = anychart.tagCloud(data1);
        var title3_1 = chart3_1.title();
        title3_1.enabled(true);
        title3_1.text("無區分詞性");
        title3_1.fontSize(30);
//        var coolor3_1 = anychart.scales.linearColor();
//        coolor3_1.colors(["#EEBBAA", "#DD2222"]);
//        chart3_1.colorScale(coolor3_1);
        chart3_1.palette(["#028C6A","#632A7E", "#F3553C","#003E19", "#280E3B", "#E81E25"]);
//        chart3_1.colorRange(true);
//        chart3_1.colorRange().length("80%");
        chart3_1.container("wc3");
        chart3_1.draw();
        chart3_1.listen("pointClick", function(e){
            let article_score = [],article = [],content_score = [],content = [],contentSentiment = [],url = [],push_content_text = [],push_content_text_Sentiment = [],push_content_text_score = [];
            for(i in relatedArticle){
                if(i == e.point.get("x")){
                    for(let j = 0;j<relatedArticle[i].length;j++){
                        for(let n = 0;n<relatedArticle[i][j].pushContents.length;n++){
                            if(relatedArticle[i][j].pushContents[n].pushContent.includes(e.point.get("x"))){
                                push_content_text.push(relatedArticle[i][j].pushContents[n].pushContent);
                                push_content_text_Sentiment.push(relatedArticle[i][j].pushContents[n].pushContentSentiment);
                                push_content_text_score.push(relatedArticle[i][j].pushContents[n].pushContentSentimentScore);
                                push_content_text_Sentiment.push(relatedArticle[i][j].pushContents[n].pushContentSentiment);
                            }
                        }
                        article_score.push(relatedArticle[i][j].articleTitleSentimentScore);
                        article.push(relatedArticle[i][j].articleTitle);
                        content_score.push(relatedArticle[i][j].contentSentimentScore);
                        
                        var word = relatedArticle[i][j].articleContent.split(' '||'　'||'，'||'：'||':'||'');
                        var numberIndex = word.findIndex((word) => word.includes(e.point.get("x"), 0));
                        var indexWord = word[numberIndex];
                        content.push(indexWord);
                        
//                        content.push(relatedArticle[i][j].articleContent.substr(relatedArticle[i][j].articleContent.indexOf(' '||'　'||'，'||'：'||':',relatedArticle[i][j].articleContent.indexOf(e.point.get("x"))-20), relatedArticle[i][j].articleContent.indexOf(' '||'　'||'，'||'：'||':',relatedArticle[i][j].articleContent.indexOf(e.point.get("x")))-relatedArticle[i][j].articleContent.indexOf(e.point.get("x"))));
                                     
                        contentSentiment.push(relatedArticle[i][j].contentSentiment)
                        url.push(relatedArticle[i][j].url);
                    }
                }
            }
            let ran = Math.floor(Math.random() * article.length);
            let rnd = 0;
            if(content[ran]==null){
                rnd = Math.floor(Math.random() * push_content_text.length);
            }
            else{
                rnd = ran;
            }
            if(article[ran] == null){
                alert("項目：" + e.point.get("x") + "\n出現頻率：" + e.point.get("value") + "次");
            }
            else{
            if(confirm("項目：" + e.point.get("x") + "\n出現頻率：" + e.point.get("value") + "次" +
                  "\n\n該篇文章內文或留言出現此關鍵字：" + article[ran] + "\n\n內文關鍵字出現段落：" + (content[ran]==null?"僅留言出現":content[ran]) + "\n內文情緒分析：" + (contentSentiment[ran]=='positive'?"正向內容":"負向內容") + "　內文分析準確度：" + content_score[ran].toFixed(2) + "\n\n關鍵字出現留言：" + push_content_text[rnd] + "\n留言情緒分析：" + (push_content_text_Sentiment[rnd]=='positive'?"正向內容":"負向內容") + "　留言分析準確度：" + push_content_text_score[rnd].toFixed(2) + "\n\n文章連結：" + url[ran] + "\n\n是否移至該文章連結？") == true){
                
                window.open(url[ran]);
            }
            }
        });
        chart3_1.tooltip().format("出現機率：{%yPercentOfTotal}% \n\n筆數：{%value}");

        document.getElementById("wc8").innerHTML = null;
        var chart3_2 = anychart.tagCloud(data2);
        var title3_2 = chart3_2.title();
        title3_2.enabled(true);
        title3_2.text("專有名詞關鍵字");
        title3_2.fontSize(30);
//        var coolor3_2 = anychart.scales.linearColor();
//        coolor3_2.colors(["#EEBBAA", "#DD2222"]);
//        chart3_2.colorScale(coolor3_2);
        chart3_2.palette(["#028C6A","#632A7E", "#F3553C","#003E19", "#280E3B", "#E81E25"]);
//        chart3_2.colorRange(true);
//        chart3_2.colorRange().length("80%");
        chart3_2.container("wc8");
        chart3_2.draw();
        chart3_2.listen("pointClick", function(e){
            let article_score = [],article = [],content_score = [],content = [],contentSentiment = [],url = [],push_content_text = [],push_content_text_Sentiment = [],push_content_text_score = [];
            for(i in relatedArticle){
                if(i == e.point.get("x")){
                    for(let j = 0;j<relatedArticle[i].length;j++){
                        for(let n = 0;n<relatedArticle[i][j].pushContents.length;n++){
                            if(relatedArticle[i][j].pushContents[n].pushContent.includes(e.point.get("x"))){
                                push_content_text.push(relatedArticle[i][j].pushContents[n].pushContent);
                                push_content_text_Sentiment.push(relatedArticle[i][j].pushContents[n].pushContentSentiment);
                                push_content_text_score.push(relatedArticle[i][j].pushContents[n].pushContentSentimentScore);
                                push_content_text_Sentiment.push(relatedArticle[i][j].pushContents[n].pushContentSentiment);
                            }
                        }
                        article_score.push(relatedArticle[i][j].articleTitleSentimentScore);
                        article.push(relatedArticle[i][j].articleTitle);
                        content_score.push(relatedArticle[i][j].contentSentimentScore);
                        
                        var word = relatedArticle[i][j].articleContent.split(' '||'　'||'，'||'：'||':'||'');
                        var numberIndex = word.findIndex((word) => word.includes(e.point.get("x"), 0));
                        var indexWord = word[numberIndex];
                        content.push(indexWord);
                        
//                        content.push(relatedArticle[i][j].articleContent.substr(relatedArticle[i][j].articleContent.indexOf(' '||'　'||'，'||'：'||':',relatedArticle[i][j].articleContent.indexOf(e.point.get("x"))-20), relatedArticle[i][j].articleContent.indexOf(' '||'　'||'，'||'：'||':',relatedArticle[i][j].articleContent.indexOf(e.point.get("x")))-relatedArticle[i][j].articleContent.indexOf(e.point.get("x"))));
                                     
                        contentSentiment.push(relatedArticle[i][j].contentSentiment)
                        url.push(relatedArticle[i][j].url);
                    }
                }
            }
            let ran = Math.floor(Math.random() * article.length);
            let rnd = 0;
            if(content[ran]==null){
                rnd = Math.floor(Math.random() * push_content_text.length);
            }
            else{
                rnd = ran;
            }
            if(article[ran] == null){
                alert("項目：" + e.point.get("x") + "\n出現頻率：" + e.point.get("value") + "次");
            }
            else{
            if(confirm("項目：" + e.point.get("x") + "\n出現頻率：" + e.point.get("value") + "次" +
                  "\n\n該篇文章內文或留言出現此關鍵字：" + article[ran] + "\n\n內文關鍵字出現段落：" + (content[ran]==null?"僅留言出現":content[ran]) + "\n內文情緒分析：" + (contentSentiment[ran]=='positive'?"正向內容":"負向內容") + "　內文分析準確度：" + content_score[ran].toFixed(2) + "\n\n關鍵字出現留言：" + push_content_text[rnd] + "\n留言情緒分析：" + (push_content_text_Sentiment[rnd]=='positive'?"正向內容":"負向內容") + "　留言分析準確度：" + push_content_text_score[rnd].toFixed(2) + "\n\n文章連結：" + url[ran] + "\n\n是否移至該文章連結？") == true){
                
                window.open(url[ran]);
            }
            }
        });
        chart3_2.tooltip().format("出現機率：{%yPercentOfTotal}% \n\n筆數：{%value}");

        document.getElementById("wc9").innerHTML = null;
        var chart3_3 = anychart.tagCloud(data3);
        var title3_3 = chart3_3.title();
        title3_3.enabled(true);
        title3_3.text("形容關鍵字");
        title3_3.fontSize(30);
//        var coolor3_3 = anychart.scales.linearColor();
//        coolor3_3.colors(["#EEBBAA", "#DD2222"]);
//        chart3_3.colorScale(coolor3_3);
        chart3_3.palette(["#028C6A","#632A7E", "#F3553C","#003E19", "#280E3B", "#E81E25"]);
//        chart3_3.colorRange(true);
//        chart3_3.colorRange().length("80%");
        chart3_3.container("wc9");
        chart3_3.draw();
        chart3_3.listen("pointClick", function(e){
            let article_score = [],article = [],content_score = [],content = [],contentSentiment = [],url = [],push_content_text = [],push_content_text_Sentiment = [],push_content_text_score = [];
            for(i in relatedArticle){
                if(i == e.point.get("x")){
                    for(let j = 0;j<relatedArticle[i].length;j++){
                        for(let n = 0;n<relatedArticle[i][j].pushContents.length;n++){
                            if(relatedArticle[i][j].pushContents[n].pushContent.includes(e.point.get("x"))){
                                push_content_text.push(relatedArticle[i][j].pushContents[n].pushContent);
                                push_content_text_Sentiment.push(relatedArticle[i][j].pushContents[n].pushContentSentiment);
                                push_content_text_score.push(relatedArticle[i][j].pushContents[n].pushContentSentimentScore);
                                push_content_text_Sentiment.push(relatedArticle[i][j].pushContents[n].pushContentSentiment);
                            }
                        }
                        article_score.push(relatedArticle[i][j].articleTitleSentimentScore);
                        article.push(relatedArticle[i][j].articleTitle);
                        content_score.push(relatedArticle[i][j].contentSentimentScore);
                        
                        var word = relatedArticle[i][j].articleContent.split(' '||'　'||'，'||'：'||':'||'');
                        var numberIndex = word.findIndex((word) => word.includes(e.point.get("x"), 0));
                        var indexWord = word[numberIndex];
                        content.push(indexWord);
                        
//                        content.push(relatedArticle[i][j].articleContent.substr(relatedArticle[i][j].articleContent.indexOf(' '||'　'||'，'||'：'||':',relatedArticle[i][j].articleContent.indexOf(e.point.get("x"))-20), relatedArticle[i][j].articleContent.indexOf(' '||'　'||'，'||'：'||':',relatedArticle[i][j].articleContent.indexOf(e.point.get("x")))-relatedArticle[i][j].articleContent.indexOf(e.point.get("x"))));
                                     
                        contentSentiment.push(relatedArticle[i][j].contentSentiment)
                        url.push(relatedArticle[i][j].url);
                    }
                }
            }
            let ran = Math.floor(Math.random() * article.length);
            let rnd = 0;
            if(content[ran]==null){
                rnd = Math.floor(Math.random() * push_content_text.length);
            }
            else{
                rnd = ran;
            }
            if(article[ran] == null){
                alert("項目：" + e.point.get("x") + "\n出現頻率：" + e.point.get("value") + "次");
            }
            else{
            if(confirm("項目：" + e.point.get("x") + "\n出現頻率：" + e.point.get("value") + "次" +
                  "\n\n該篇文章內文或留言出現此關鍵字：" + article[ran] + "\n\n內文關鍵字出現段落：" + (content[ran]==null?"僅留言出現":content[ran]) + "\n內文情緒分析：" + (contentSentiment[ran]=='positive'?"正向內容":"負向內容") + "　內文分析準確度：" + content_score[ran].toFixed(2) + "\n\n關鍵字出現留言：" + push_content_text[rnd] + "\n留言情緒分析：" + (push_content_text_Sentiment[rnd]=='positive'?"正向內容":"負向內容") + "　留言分析準確度：" + push_content_text_score[rnd].toFixed(2) + "\n\n文章連結：" + url[ran] + "\n\n是否移至該文章連結？") == true){
                
                window.open(url[ran]);
            }
            }
        });
        chart3_3.tooltip().format("出現機率：{%yPercentOfTotal}% \n\n筆數：{%value}");
    },

    bar_chart_zoom(label, datas, index, hotArticles,label_month) {
        var ctx = document.getElementById("bar_chart_zoom").getContext("2d");
        var data = [];
        if (datas[index - 1] == null) {
            if (datas[index + 1] == null) {
                data[0] = null;
                data[1] = null;
                data[2] = datas[index]
                data[3] = null;
                data[4] = null;
            }
            else if (datas[index + 1] && datas[index + 2] == null) {
                data[0] = null;
                data[1] = null;
                data[2] = datas[index]
                data[3] = datas[index + 1];
                data[4] = null;
            }
            else {
                data[0] = null;
                data[1] = null;
                data[2] = datas[index]
                data[3] = datas[index + 1];
                data[4] = datas[index + 2];
            }
        }
        else if (datas[index - 1] && datas[index - 2] == null) {
            if (datas[index + 1] == null) {
                data[0] = null;
                data[1] = datas[index - 1];
                data[2] = datas[index]
                data[3] = null;
                data[4] = null;
            }
            else if (datas[index + 1] && datas[index + 2] == null) {
                data[0] = null;
                data[1] = datas[index - 1];
                data[2] = datas[index]
                data[3] = datas[index + 1];
                data[4] = null;
            }
            else {
                data[0] = null;
                data[1] = datas[index - 1];
                data[2] = datas[index]
                data[3] = datas[index + 1];
                data[4] = datas[index + 2];
            }
        }
        else if (datas[index + 1] == null) {
            if (datas[index - 1] == null) {
                data[0] = null;
                data[1] = null;
                data[2] = datas[index]
                data[3] = null;
                data[4] = null;
            }
            else if (datas[index - 1] && datas[index - 2] == null) {
                data[0] = null;
                data[1] = datas[index - 1];
                data[2] = datas[index]
                data[3] = null;
                data[4] = null;
            }
            else {
                data[0] = datas[index - 2];
                data[1] = datas[index - 1];
                data[2] = datas[index]
                data[3] = null;
                data[4] = null;
            }
        }
        else if (datas[index + 1] && datas[index + 2] == null) {
            if (datas[index - 1] == null) {
                data[0] = null;
                data[1] = null;
                data[2] = datas[index]
                data[3] = datas[index + 1];
                data[4] = null;
            }
            else if (datas[index - 1] && datas[index - 2] == null) {
                data[0] = null;
                data[1] = datas[index - 1];
                data[2] = datas[index]
                data[3] = datas[index + 1];
                data[4] = null;
            }
            else {
                data[0] = datas[index - 2];
                data[1] = datas[index - 1];
                data[2] = datas[index]
                data[3] = datas[index + 1];
                data[4] = null;
            }
        }
        else {
            data[0] = datas[index - 2];
            data[1] = datas[index - 1];
            data[2] = datas[index]
            data[3] = datas[index + 1];
            data[4] = datas[index + 2];
        }
        
        var labels = [
            label[index - 2],
            label[index - 1],
            label[index],
            label[index + 1],
            label[index + 2]
        ];
        
        var labels_month = [];
        if(labels[1] == null){
            if(labels[3] == null){
                labels_month[0] = [null];
                labels_month[1] = [null];
                labels_month[2] = [label_month[index][0],label_month[index][1]];
                labels_month[3] = [null];
                labels_month[4] = [null];
            }
            else if(labels[3] && labels[4] == null){
                labels_month[0] = [null];
                labels_month[1] = [null];
                labels_month[2] = [label_month[index][0],label_month[index][1]];
                labels_month[3] = [label_month[index + 1][0],label_month[index + 1][1]];
                labels_month[4] = [null];
            }
            else{
                labels_month[0] = [null];
                labels_month[1] = [null];
                labels_month[2] = [label_month[index][0],label_month[index][1]];
                labels_month[3] = [label_month[index + 1][0],label_month[index + 1][1]];
                labels_month[4] = [label_month[index + 2][0],label_month[index + 2][1]];
            }
            
        }
        else if(labels[1] && labels[0] == null){
            if(labels[3] == null){
                labels_month[0] = [null];
                labels_month[1] = [label_month[index - 1][0],label_month[index - 1][1]];
                labels_month[2] = [label_month[index][0],label_month[index][1]];
                labels_month[3] = [null];
                labels_month[4] = [null];
            }
            else if(labels[3] && labels[4] == null){
                labels_month[0] = [null];
                labels_month[1] = [label_month[index - 1][0],label_month[index - 1][1]];
                labels_month[2] = [label_month[index][0],label_month[index][1]];
                labels_month[3] = [label_month[index + 1][0],label_month[index + 1][1]];
                labels_month[4] = [null];
            }
            else{
                labels_month[0] = [null];
                labels_month[1] = [label_month[index - 1][0],label_month[index - 1][1]];
                labels_month[2] = [label_month[index][0],label_month[index][1]];
                labels_month[3] = [label_month[index + 1][0],label_month[index + 1][1]];
                labels_month[4] = [label_month[index + 2][0],label_month[index + 2][1]];
            }
            
        }
        else if(labels[3] == null){
            if(labels[1] == null){
                labels_month[0] = [null];
                labels_month[1] = [null];
                labels_month[2] = [label_month[index][0],label_month[index][1]];
                labels_month[3] = [null];
                labels_month[4] = [null];
            }
            else if(labels[1] && labels[0] == null){
                labels_month[0] = [null];
                labels_month[1] = [label_month[index - 1][0],label_month[index - 1][1]];
                labels_month[2] = [label_month[index][0],label_month[index][1]];
                labels_month[3] = [null];
                labels_month[4] = [null];
            }
            else{
                labels_month[0] = [label_month[index - 2][0],label_month[index - 2][1]];
                labels_month[1] = [label_month[index - 1][0],label_month[index - 1][1]];
                labels_month[2] = [label_month[index][0],label_month[index][1]];
                labels_month[3] = [null];
                labels_month[4] = [null];
            }
        }
        else if(labels[3] && labels[4] == null){
            if(labels[1] == null){
                labels_month[0] = [null];
                labels_month[1] = [null];
                labels_month[2] = [label_month[index][0],label_month[index][1]];
                labels_month[3] = [label_month[index + 1][0],label_month[index + 1][1]];
                labels_month[4] = [null];
            }
            else if(labels[1] && labels[0] == null){
                labels_month[0] = [null];
                labels_month[1] = [label_month[index - 1][0],label_month[index - 1][1]];
                labels_month[2] = [label_month[index][0],label_month[index][1]];
                labels_month[3] = [label_month[index + 1][0],label_month[index + 1][1]];
                labels_month[4] = [null];
            }
            else{
                labels_month[0] = [label_month[index - 2][0],label_month[index - 2][1]];
                labels_month[1] = [label_month[index - 1][0],label_month[index - 1][1]];
                labels_month[2] = [label_month[index][0],label_month[index][1]];
                labels_month[3] = [label_month[index + 1][0],label_month[index + 1][1]];
                labels_month[4] = [null]; 
            }
        }
        else{
            labels_month[0] = [label_month[index - 2][0],label_month[index - 2][1]];
            labels_month[1] = [label_month[index - 1][0],label_month[index - 1][1]];
            labels_month[2] = [label_month[index][0],label_month[index][1]];
            labels_month[3] = [label_month[index + 1][0],label_month[index + 1][1]];
            labels_month[4] = [label_month[index + 2][0],label_month[index + 2][1]];
        }
        
        var months = [];
        
        for(let i = 0; i < labels_month.length;i++){
            if(i == 0 || labels_month[i][0] != labels_month[i-1][0]){
                months.push(labels_month[i][0]+labels_month[i][1]);
            }
            else{
                months.push(labels_month[i][1]);
            }
        }
        
        var articles = [];
        var articles_content = [];
        var article_date = [];
        var push_contents = [];
        var url = [];
        var messageCount = [];
        for (var i = 0; i < labels.length; i++) {
            if (hotArticles[labels[i]] != null && hotArticles[labels[i]] != "") {
                articles.push(hotArticles[labels[i]][0].articleTitle);
                url.push(hotArticles[labels[i]][0].url);
                messageCount.push(hotArticles[labels[i]][0].messageCount);
                articles_content.push(hotArticles[labels[i]][0].articleContent);
                article_date.push(hotArticles[labels[i]][0].articleDate);
                push_contents.push(hotArticles[labels[i]][0].pushContents);
            }
            else {
                articles.push(null);
                url.push(null);
                messageCount.push(null);
                articles_content.push(null);
                article_date.push(null);
                push_contents.push(null);
            }
        }

        var graphique = Chart.getChart("bar_chart_zoom");
        if (graphique) {
            graphique.destroy();
        }
        
        var data_sort = [];
        for(var i = 0;i<data.length;i++){
            data_sort[i] = data[i];
        }
        data_sort.sort(function(a, b){return b - a});
        var color_arr = [];
        var color_n = 75;
        for(var i = 0;i<data_sort.length;i++){
            if(i == 0){
                color_arr[data.indexOf(data_sort[i])] = 'rgba(225,50,50,1)';
            }
            else if(data_sort != 0){
                color_arr[data.indexOf(data_sort[i])] = 'rgba(50,' + color_n + ',50,1)';
                color_n += 50;
            }
        }

        new Chart(ctx, {
            type: "bar",
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                    },
                    x:{
                        stacked:true,
                    }
                },
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    datalabels: {
                        color: "#36A2EB",
                        anchor: "end",
                        align: "end",
                        offset: -4,
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
                        if(messageCount[activeEls[0].index] == null){
                            document.getElementById("message_count").innerHTML = "　該篇文章留言數：" + "無"
                            document.getElementById("bar_link").innerHTML =
                            "　討論數最高文章：" + "無";
                        }
                        else{
                            document.getElementById("message_count").innerHTML = "　該篇文章留言數：" + messageCount[activeEls[0].index];
                            document.getElementById("bar_link").innerHTML =
                            "　討論數最高文章：" + "<a style='color:#4488ff' onclick='article_dialog_show(1)' role='button'>" + (articles[activeEls[0].index].length>25?articles[activeEls[0].index].substring(0,25) + "...":articles[activeEls[0].index]) + "</a>";
                            document.getElementById("bar_article_title").innerHTML = articles[activeEls[0].index]
                            document.getElementById("bar_article_date").innerHTML = "日期：" + article_date[activeEls[0].index]
                            document.getElementById("bar_article_content").innerHTML = articles_content[activeEls[0].index]
                            vm.bar_push = push_contents[activeEls[0].index];
                        }
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
                labels: months,
                datasets: [
                    {
                        label: "事件討論數",
                        data: data,
                        borderWidth: 1,
                        backgroundColor: color_arr,
                        //                        backgroundColor: ["#00CACA", "#FF5151", "#4A4AFF","#FF9224"],
                        datalabels: {
                            color: "#332233",
                        },
                    },
                    {
                        label: "最高討論區間",
                        data: null,
                        borderWidth: 1,
                        barPercentage: 0.1,
                        categoryPrecentage:1,
                        backgroundColor:'rgba(225,50,50,1)',
                    },
                ],
            },
        });
    },
    line_chart_pie_chart(label, data1, data2) {
        var width = window.innerWidth;
        var ctx = null;
        var graphique = null;
        if (width > 1024) {
            ctx = document.getElementById("line_chart_pie_chart_1").getContext("2d");
            graphique = Chart.getChart("line_chart_pie_chart_1");
        }
        else {
            ctx = document.getElementById("line_chart_pie_chart_2").getContext("2d");
            graphique = Chart.getChart("line_chart_pie_chart_2");
        }
        
        if(ctx == document.getElementById("line_chart_pie_chart_1").getContext("2d")){
            document.getElementById("line_chart_pie_chart_1").style.display = "block";
        }
        else{
            document.getElementById("line_chart_pie_chart_2").style.display = "block";
        }
        


        var data_list = [data1, data2];
        var data_sum = data1 + data2;

        if (graphique) {
            graphique.destroy();
        }
        
        if(data_sum != 0){
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
        }
        else{
            if(ctx == document.getElementById("line_chart_pie_chart_1").getContext("2d")){
                document.getElementById("line_chart_pie_chart_1").style.display = "none";
            }
            else{
                document.getElementById("line_chart_pie_chart_2").style.display = "none";
            }
        }
    },
    async draw_map(label, datas, index, hotArticles,addressDiscussNumber,input_data) {
        const topology = await fetch(
            'https://code.highcharts.com/mapdata/countries/tw/tw-all.topo.json'
        ).then(response => response.json());

        var address = [['Pingtung', 0,799000,'屏東縣'], ['Tainan', 0,1853000,'臺南市'], ['Yilan', 0,449000,'宜蘭縣'], ['Chiayi', 0,488000,'嘉義縣'],['Taitung', 0,213000,'臺東縣'], ['Penghu', 0,107000,'澎湖縣'], ['Kinmen', 0,141000,'金門縣'], ['Lienchiang', 0,14000,'連江縣'],['Taipei', 0,2481000,'臺北市'], ['ChiayiCity', 0,263000,'嘉義市'], ['Taichung', 0,2814000,'臺中市'], ['Yunlin', 0,664000,'雲林縣'],['Kaohsiung', 0,2728000,'高雄市'], ['NewTaipeiCity', 0, 3996000,'新北市'], ['HsinchuCity', 0,452000,'新竹市'], ['Hsinchu', 0,581000,'新竹縣'],['Keelung', 0,362000,'基隆市'], ['Miaoli', 0,535000,'苗栗縣'], ['Taoyuan', 0,2281000,'桃園市'], ['Changhua', 0,1245000,'彰化縣'],['Hualien', 0,319000,'花蓮縣'], ['Nantou', 0,480000,'南投縣'],['Other',0]];

            for(var i in addressDiscussNumber){
                        switch(i) {
                            case 'Pingtung':
                                    address[0][1] = addressDiscussNumber[i];
                                    break;
                            case 'Tainan':
                                    address[1][1] = addressDiscussNumber[i];
                                    break;
                            case 'Yilan':
                                    address[2][1] = addressDiscussNumber[i];
                                    break;
                            case 'Chiayi':
                                    address[3][1] = addressDiscussNumber[i];
                                    break;
                            case 'Taitung':
                                    address[4][1] = addressDiscussNumber[i];
                                    break;
                            case 'Penghu':
                                    address[5][1] = addressDiscussNumber[i];
                                    break;
                            case 'Kinmen':
                                    address[6][1] = addressDiscussNumber[i];
                                    break;
                            case 'Lienchiang':
                                    address[7][1] = addressDiscussNumber[i];
                                    break;
                            case 'Taipei':
                                    address[8][1] = addressDiscussNumber[i];
                                    break;
                            case 'TaipeiCity':
                                    address[8][1] = addressDiscussNumber[i];
                                    break;
                            case 'ChiayiCity':
                                    address[9][1] = addressDiscussNumber[i];
                                    break
                            case 'Taichung':
                                    address[10][1] = addressDiscussNumber[i];
                                    break;
                            case 'Yunlin':
                                    address[11][1] = addressDiscussNumber[i];
                                    break;
                            case 'Kaohsiung':
                                    address[12][1] = addressDiscussNumber[i];
                                    break;
                            case 'NewTaipeiCity':
                                    address[13][1] = addressDiscussNumber[i];
                                    break;
                            case 'HsinchuCity':
                                    address[14][1] = addressDiscussNumber[i];
                                    break;
                            case 'Hsinchu':
                                    address[15][1] = addressDiscussNumber[i];
                                    break;
                            case 'Keelung':
                                    address[16][1] = addressDiscussNumber[i];
                                    break;
                            case 'Miaoli':
                                    address[17][1] = addressDiscussNumber[i];
                                    break;
                            case 'Taoyuan':
                                    address[18][1] = addressDiscussNumber[i];
                                    break;
                            case 'Changhua':
                                    address[19][1] = addressDiscussNumber[i];
                                    break;
                            case 'Hualien':
                                    address[20][1] = addressDiscussNumber[i];
                                    break;
                            case 'Nantou':
                                    address[21][1] = addressDiscussNumber[i];
                                    break;
                            case 'Other':
                                    address[22][1] = addressDiscussNumber[i];
                                    break;
                        }
                }
        
        
        let max_area = 0,max_num = 0,max_address = "",discuss_num = 0,discuss_num_top = "";
        for(let i = 0;i<address.length;i++){
            if(address[i][1] > max_area){
                max_area = address[i][1];
                max_address = address[i][3];
            }
        }
        for(let i = 0;i<address.length;i++){
            if(address[i][1] > max_num && address[i][1]!=max_area){
                max_num = address[i][1];
            }
        }
        
        
        for(let i = 0;i<address.length;i++){
            if(address[i][1]/address[i][2] > discuss_num){
                discuss_num = address[i][1]/address[i][2];
                discuss_num_top = address[i][3];
            }
        }
        
        if(vm.discuss_num_set){
            vm.discuss_num = max_address;
            vm.discuss_other_num = address[22][1].toLocaleString();
            vm.now_area_discuss_num_top = discuss_num_top;
            vm.discuss_num_set = false;
        }

            
                const data = [
                ['tw-pt', address[0][1]], ['tw-tn', address[1][1]], ['tw-il', address[2][1]], ['tw-ch', address[3][1]],
                ['tw-tt', address[4][1]], ['tw-ph', address[5][1]], ['tw-km', address[6][1]], ['tw-lk', address[7][1]],
                ['tw-tw', address[8][1]], ['tw-cs', address[9][1]], ['tw-th', address[10][1]], ['tw-yl', address[11][1]],
                ['tw-kh', address[12][1]], ['tw-tp', address[13][1]], ['tw-hs', address[14][1]], ['tw-hh', address[15][1]],
                ['tw-cl', address[16][1]], ['tw-ml', address[17][1]], ['tw-ty', address[18][1]], ['tw-cg', address[19][1]],
                ['tw-hl', address[20][1]], ['tw-nt', address[21][1]]
            ];


                var address_name = {'Tainan City': [11,'臺南市'],'Yilan': [12,'宜蘭縣'],'Chiayi': [13,'嘉義縣'],'Taitung': [14,'臺東縣'],'Penghu': [15,'澎湖縣'],'Kinmen': [16,'金門縣'],'Lienchiang': [17,'連江縣'],'Taipei City': [18,'臺北市'],'Taipei':[18,'臺北市'],'Chiayi City': [19,'嘉義市'],'Taichung City': [20,'臺中市'],'Yunlin': [21,'雲林縣'],'Kaohsiung City': [22,'高雄市'],'New Taipei City': [23,'新北市'],'Hsinchu City': [24,'新竹市'],'Hsinchu': [25,'新竹縣'],'Keelung City': [26,'基隆市'],'Miaoli': [27,'苗栗縣'],'Taoyuan': [28,'桃園市'],'Changhua': [29,'彰化縣'],'Hualien': [30,'花蓮縣'],'Nantou': [31,'南投縣'],'Other':[100,'國外'],'Pingtung':[null,'屏東縣']}
                
            
        Highcharts.mapChart('map', {
            chart: {
                map: topology,
            },
            title: {
                text: '區域分布'
            },
            
            colorAxis: {
                min: 0,
                max:max_num + 50
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
                        var address_num = 0;
                        console.log(event.point.name);
                        console.log(event.point.options.value);
                         
                        for(i in address_name){
                            if(i == event.point.name){
                                address_num = address_name[i][0];
                                document.getElementById('now_area').innerHTML = "現在點選位置：" + address_name[i][1];
                                for(let j = 0;j<address.length;j++){
                                    if(address_name[i][1] == address[j][3]){
                                        document.getElementById('now_area_discuss_num').innerHTML = "討論密度：" + Math.floor(event.point.options.value/address[j][2] * Math.pow(10000,2) ) / Math.pow(10000,2);
                                    }
                                }
                            }
                        }
//                        document.getElementById('now_area_num').innerHTML = "點選地區數值：" + event.point.options.value;
                        search.search_btn(input_data.topic,input_data.start,input_data.end,input_data.dateRange,input_data.isEM,input_data.mode,chart,input_data.api_url,input_data.token,address_num);
//                        chart.bar_chart_zoom(label, datas, index, hotArticles);
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
//        document.getElementById("address").innerHTML =
//            //            "討論數集中區域：" + max_text;
//            "討論數集中區域：" + "台北";
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
            pos_data1[0].x + "：" + pos_data1[0].value.toLocaleString() + " 次<br>　2.關鍵字：" + pos_data1[1].x + "：" + pos_data1[1].value.toLocaleString() + " 次<br>　3.關鍵字：" + pos_data1[2].x + "：" + pos_data1[2].value.toLocaleString() + " 次";

        let line_table_data_all = "<th>無區分詞性</th>";
        for (let i = 0; i < pos_data1.length; i++) {
            line_table_data_all = line_table_data_all + "<tr><td>" + pos_data1[i].x + "：</td><td>" + pos_data1[i].value.toLocaleString() + "</td></tr>";
        }
        let line_table_data__nb = "<th>專有名詞關鍵字</th>";
        for (let i = 0; i < pos_data2.length; i++) {
            line_table_data__nb = line_table_data__nb + "<tr><td>" + pos_data2[i].x + "：</td><td>" + pos_data2[i].value.toLocaleString() + "</td></tr>";
        }
        let line_table_data_adj = "<th>形容詞關鍵字</th>";
        for (let i = 0; i < pos_data3.length; i++) {
            line_table_data_adj = line_table_data_adj + "<tr><td>" + pos_data3[i].x + "：</td><td>" + pos_data3[i].value.toLocaleString() + "</td></tr>";
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
            neg_data1[0].x + "：" + neg_data1[0].value.toLocaleString() + " 次<br>　2.關鍵字：" + neg_data1[1].x + "：" + neg_data1[1].value.toLocaleString() + " 次<br>　3.關鍵字：" + neg_data1[2].x + "：" + neg_data1[2].value.toLocaleString() + " 次";

        let line_table_data_all = "<th>無區分詞性</th>";
        for (let i = 0; i < neg_data1.length; i++) {
            line_table_data_all = line_table_data_all + "<tr><td>" + neg_data1[i].x + "：</td><td>" + neg_data1[i].value.toLocaleString() + "</td></tr>";
        }
        let line_table_data__nb = "<th>專有名詞關鍵字</th>";
        for (let i = 0; i < neg_data2.length; i++) {
            line_table_data__nb = line_table_data__nb + "<tr><td>" + neg_data2[i].x + "：</td><td>" + neg_data2[i].value.toLocaleString() + "</td></tr>";
        }
        let line_table_data_adj = "<th>形容詞關鍵字</th>";
        for (let i = 0; i < neg_data3.length; i++) {
            line_table_data_adj = line_table_data_adj + "<tr><td>" + neg_data3[i].x + "：</td><td>" + neg_data3[i].value.toLocaleString() + "</td></tr>";
        }

        document.getElementById("line_data_btn3").style.display = "block";
        document.getElementById("line_table_all_3").innerHTML = line_table_data_all;
        document.getElementById("line_table_nb_3").innerHTML = line_table_data__nb;
        document.getElementById("line_table_adj_3").innerHTML = line_table_data_adj;

        console.log(data);
        return data;
    },
//        async get_accuracy_img() {
//            var img_change = setInterval(function () {
//                fetch("https://dog.ceo/api/breeds/image/random")
//                .then((response) => {
//                    return response.json();
//                })
//                .then((response) => {
//                    document.getElementById("accuracy_img").src = response.message;
//                })
//                .catch((error) => {
//                    console.log(error);
//                });
//            }, 5000);
//        },
        async get_article_table_data() {
            await fetch(
                api_url +
                    "SentimentAnalysis/" +
                    topic +
                    "/StatrDate/" +
                    start +
                    "/EndDate/" +
                    end +
                    "?DateRange=" +
                    dateRange +
                    "&IsExactMatch=" +
                    isEM +
                    "&SearchMode=" +
                    mode,
                {
                    headers: {
                        Authorization: "Bearer " + token,
                        "Content-Type": "application/json",
                        Accept: "application/json",
                        'ngrok-skip-browser-warning':true,
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
                    data = example_data.Sentiment_data;
                });
            article_data = data;
            console.log(data);
            return data;
            
        },
    get_article_table_pos() {
        let text = "<tr><td style='width:300px;text-align:center;'><h4>正向評價</h4></td><td style='width:300px;text-align:center;'><h4>準確度</h4></td></tr>";
        let check = [];
        for (var i = 0; i < 10; i++) {
            let b = false;
            let num = Math.floor(Math.random() * article_data_pos.length);
            for(var j = 0;j<check.length;j++){
                if(article_data_neg[num] == check[j]){
                    b = true;
                }
            }
            if(b){
                continue;
            }
            else{
                check.push(article_data_neg[num]);
                text = text + "<tr><td>" + article_data_pos[num] + "</td><td>" + Math.floor(article_score_pos[num] * Math.pow(10,2) ) / Math.pow(10,2) + "</tr>";
            }
        }
        document.getElementById("article_dialog_table").innerHTML = text;

    },
    get_article_table_neg() {
        let text = "<tr><td style='width:300px;text-align:center;'><h4>負向評價</h4></td><td style='width:300px;text-align:center;'><h4>準確度</h4></td></tr>";
        let check = [];
        for (var i = 0; i < 10; i++) {
            let num = Math.floor(Math.random() * article_data_pos.length);
            for(var j = 0;j<check.length;j++){
                if(article_data_neg[num] == check[j]){
                    break;
                }
            }
            check.push(article_data_neg[num]);
            text = text + "<tr><td>" + article_data_neg[num] + "</td><td>" + Math.floor(article_score_neg[num] * Math.pow(10,2) ) / Math.pow(10,2) ; + "</tr>";
        }
        document.getElementById("article_dialog_table").innerHTML = text;
    }

};
export default chart;
