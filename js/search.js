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
        token
    ) {
        if (start > end) {
            alert("結束日期小於開始日期，請重新輸入");
            document.getElementById("search_start").value = "";
            document.getElementById("search_end").value = "";
            document.getElementById("dateRange").value = "";
        } else {
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
                token
            );
            chart.bar_chart(data_PA.dates, data_PA.discussNumber,data_PA.hotArticles);

            const data_SA = await this.get_data_SentimentAnalysis(
                topic,
                start,
                end,
                dateRange,
                isEM,
                mode,
                api_url,
                token
            );

            chart.line_chart(
                data_SA.dates,
                data_SA.positiveNumber,
                data_SA.negativeNumber,
                data_SA.posHotArticle,
                data_SA.negHotArticle
            );

            const data_WC_all = await this.get_data_WordCloud_all(
                topic,
                start,
                end,
                dateRange,
                isEM,
                mode,
                api_url,
                token
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
                    token
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
                    token
                );

            chart.word_chart_all(
                data_WC_all.wordSegment,
                data_WC_all.wordSegmentFrequency,
                data_WC_all.wordSegmentNb,
                data_WC_all.wordSegmentNbFrequency,
                data_WC_all.wordSegmentAdj,
                data_WC_all.wordSegmentAdjFrequency,
                
            );
            chart.word_chart_positive(
                get_data_WordCloud_pos.wordSegment,
                get_data_WordCloud_pos.wordSegmentFrequency,
                get_data_WordCloud_pos.wordSegmentNb,
                get_data_WordCloud_pos.wordSegmentNbFrequency,
                get_data_WordCloud_pos.wordSegmentAdj,
                get_data_WordCloud_pos.wordSegmentAdjFrequency,
            );
            chart.word_chart_negative(
                get_data_WordCloud_neg.wordSegment,
                get_data_WordCloud_neg.wordSegmentFrequency,
                get_data_WordCloud_neg.wordSegmentNb,
                get_data_WordCloud_neg.wordSegmentNbFrequency,
                get_data_WordCloud_neg.wordSegmentAdj,
                get_data_WordCloud_neg.wordSegmentAdjFrequency,
            );
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
        token
    ) {
        var data = {};
        //fake/
        await fetch(
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
        token
    ) {
        var data = {};
        //fake/
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
        token
    ) {
        var data = {};
        //fake/
        await fetch(
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
        token
    ) {
        var data = {};

        await fetch(
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
        token
    ) {
        var data = {};

        await fetch(
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
            });
        console.log(data);
        return data;
    },
};
export default search;
