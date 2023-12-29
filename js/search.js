import { getSummary } from "./summary.js"
import example_data from "./example_data.js"

var search = {
    async search_btn(
        topic,
        start,
        end,
        dateRange,
        isEM,
        mode,
        chart,
        api_url,
        token,
        address
    ) 
    {
        let input_data = {
                topic:topic,
                start:start,
                end:end,
                dateRange:dateRange,
                isEM:isEM,
                mode:mode,
                api_url:api_url,
                token:token,
                address:address
            }
        
        let start_date = parseInt(document.getElementById("search_start").value.substr(8,3));
        let end_date = parseInt(document.getElementById("search_end").value.substr(8,3));
        let month_gap = (parseInt(document.getElementById("search_end").value.substr(5,3)) - parseInt(document.getElementById("search_start").value.substr(5,3))) * 30;
        
        if (start > end) {
            alert("結束日期小於開始日期，請重新輸入");
            document.getElementById("search_start").value = "";
            document.getElementById("search_end").value = "";
            document.getElementById("dateRange").value = "";
        }
        else if(end_date - start_date + month_gap <= dateRange){
            alert("日期間隔小於開始日期到結束日期間隔");
            alert(parseInt(document.getElementById("search_start").value.substr(5,3)));
            document.getElementById("search_start").value = "";
            document.getElementById("search_end").value = "";
            document.getElementById("dateRange").value = "";
        }
        else{
            vm.summary = ""
            vm.discuss_rank_address = []
            document.getElementById("search_box").value = "";
            document.getElementById("search_start").value = "";
            document.getElementById("search_end").value = "";
            document.getElementById("dateRange").value = "";

            document.getElementById("search").style.display = "none";
            setTimeout(function () {
                document.getElementById("result").style.display = "block";
            }, 3000);

            const data_PA = await this.get_data_PopularityAnalysis(
                topic,
                start,
                end,
                dateRange,
                isEM,
                mode,
                api_url,
                token,
                address
            );
            chart.bar_chart(data_PA.dates, data_PA.discussNumber,data_PA.hotArticles,data_PA.addressDiscussNumber,input_data);
            
            chart.draw_map(data_PA.dates, data_PA.discussNumber,null,data_PA.hotArticles,data_PA.addressDiscussNumber,input_data); 

            const data_SA = await this.get_data_SentimentAnalysis(
                topic,
                start,
                end,
                dateRange,
                isEM,
                mode,
                api_url,
                token,
                address
            );

            chart.line_chart(
                data_SA.dates,
                data_SA.positiveNumber,
                data_SA.negativeNumber,
                data_SA.posHotArticle,
                data_SA.negHotArticle,
                data_SA.wordCloudAnalysisResults,
                input_data,
            );

            const data_WC_all = await this.get_data_WordCloud_all(
                topic,
                start,
                end,
                dateRange,
                isEM,
                mode,
                api_url,
                token,
                address
            );
            const get_data_WordCloud_pos =
                await this.get_data_WordCloud_positive(
                    topic,
                    start,
                    end,
                    dateRange,
                    isEM,
                    mode,
                    api_url,
                    token,
                    address
                );
            const get_data_WordCloud_neg =
                await this.get_data_WordCloud_negative(
                    topic,
                    start,
                    end,
                    dateRange,
                    isEM,
                    mode,
                    api_url,
                    token,
                    address
                );

            chart.word_chart_all(
                data_WC_all.relatedArticle,
                data_WC_all.wordSegment,
                data_WC_all.wordSegmentFrequency,
                data_WC_all.wordSegmentNb,
                data_WC_all.wordSegmentNbFrequency,
                data_WC_all.wordSegmentAdj,
                data_WC_all.wordSegmentAdjFrequency,
                
            );
            chart.word_chart_positive(
                get_data_WordCloud_pos.relatedArticle,
                get_data_WordCloud_pos.wordSegment,
                get_data_WordCloud_pos.wordSegmentFrequency,
                get_data_WordCloud_pos.wordSegmentNb,
                get_data_WordCloud_pos.wordSegmentNbFrequency,
                get_data_WordCloud_pos.wordSegmentAdj,
                get_data_WordCloud_pos.wordSegmentAdjFrequency,
            );
            chart.word_chart_negative(
                get_data_WordCloud_neg.relatedArticle,
                get_data_WordCloud_neg.wordSegment,
                get_data_WordCloud_neg.wordSegmentFrequency,
                get_data_WordCloud_neg.wordSegmentNb,
                get_data_WordCloud_neg.wordSegmentNbFrequency,
                get_data_WordCloud_neg.wordSegmentAdj,
                get_data_WordCloud_neg.wordSegmentAdjFrequency,
            );
            
            await getSummary(address)
        }
    },
    async get_data_PopularityAnalysis(
        topic,
        start,
        end,
        dateRange,
        isEM,
        mode,
        api_url,
        token,
        address
    ) {
        var data = {};
        //fake/
        await fetch(address == null ? 
            api_url +
                "PopularityAnalysis/" +
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
                mode:
                    
            api_url +
                "PopularityAnalysis/" +
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
                mode +
                "&AddressTypes=" +
                address
            ,{
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
                data = example_data.Popularity_data;
                vm.search_input.topic = "Example Data";
            });
        console.log(data);
        return data;
    },

    async get_data_SentimentAnalysis(
        topic,
        start,
        end,
        dateRange,
        isEM,
        mode,
        api_url,
        token,
        address
    ) {
        var data = {};
        //fake/
        await fetch(address == null ? 
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
                mode :
                    
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
                mode +
                "&AddressTypes=" +
                address   
            ,{
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
        console.log(data);
        return data;
    },

    async get_data_WordCloud_all(
        topic,
        start,
        end,
        dateRange,
        isEM,
        mode,
        api_url,
        token,
        address
    ) {
        var data = {};
        //fake/
        await fetch(address == null ? 
            api_url +
                "WordCloud/" +
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
                mode:
                    
                api_url +
                "WordCloud/" +
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
                mode +
                "&AddressTypes=" +
                address
            ,{
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
                data = example_data.WordCloud_all_data;
            });
        console.log(data);
        return data;
    },
    async get_data_WordCloud_positive(
        topic,
        start,
        end,
        dateRange,
        isEM,
        mode,
        api_url,
        token,
        address
    ) {
        var data = {};

        await fetch(address == null ? 
            api_url +
                "WordCloud/" +
                topic +
                "/StatrDate/" +
                start +
                "/EndDate/" +
                end +
                "/Positive" +
                "?DateRange=" +
                dateRange +
                "&IsExactMatch=" +
                isEM +
                "&SearchMode=" +
                mode:
                    
                api_url +
                "WordCloud/" +
                topic +
                "/StatrDate/" +
                start +
                "/EndDate/" +
                end +
                "/Positive" +
                "?DateRange=" +
                dateRange +
                "&IsExactMatch=" +
                isEM +
                "&SearchMode=" +
                mode +
                "&AddressTypes=" +
                address
            ,{
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
                data = example_data.WordCloud_pos_data;
            });
        console.log(data);
        return data;
    },
    async get_data_WordCloud_negative(
        topic,
        start,
        end,
        dateRange,
        isEM,
        mode,
        api_url,
        token,
        address
    ) {
        var data = {};

        await fetch(address == null ? 
            api_url +
                "WordCloud/" +
                topic +
                "/StatrDate/" +
                start +
                "/EndDate/" +
                end +
                "/Negative" +
                "?DateRange=" +
                dateRange +
                "&IsExactMatch=" +
                isEM +
                "&SearchMode=" +
                mode:
                    
                api_url +
                "WordCloud/" +
                topic +
                "/StatrDate/" +
                start +
                "/EndDate/" +
                end +
                "/Negative" +
                "?DateRange=" +
                dateRange +
                "&IsExactMatch=" +
                isEM +
                "&SearchMode=" +
                mode +
                "&AddressTypes=" +
                address,
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
                data = example_data.WordCloud_neg_data;
            });
        console.log(data);
        return data;
    },
    
    async get_data_TrendingTopic(
        api_url,
         token,
    ) {
        var data = {};
        await fetch(
            api_url +
            "TrendingTopic",
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
                data = example_data.Trending_data;
            });
        console.log(data);
        return data;
    },


};
export default search;
