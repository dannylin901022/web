var news = {
    news(news_box) {
        var news_text = "";
        for (var i = 0; i < news_box.length; i++) {
            news_text +=
                "<h4 style='margin-top: 10px;'>" + news_box[i] + "</h4>";
        }
        return news_text;
    },
};
export default news;
