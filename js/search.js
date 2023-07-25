var search = {
    async search_btn(topic,start,end,chart,api_url,token){
        if(start > end){
                        alert("結束日期小於開始日期，請重新輸入");
                        document.getElementById("search_start").value = "";
                        document.getElementById("search_end").value = "";
                    }
                    else{
                        document.getElementById("search_box").value = "";
                        document.getElementById("search_start").value = "";
                        document.getElementById("search_end").value = "";
                    
                        document.getElementById("search").style.display = 'none';
                        setTimeout(function(){
                                document.getElementById("result").style.display = 'block';
                        }, 3000);
                        
                        const data_PA = await this.get_data_PopularityAnalysis(topic,start,end,api_url,token);
                        chart.bar_chart(data_PA.dates,data_PA.discussNumber);
                        
                        const data_SA = await this.get_data_SentimentAnalysis(topic,start,end,api_url,token);
                        chart.line_chart(data_SA.dates,data_SA.positiveNumber,data_SA.negativeNumber);
                        
                        const data_WC = await this.get_data_WordCloud(topic,start,end,api_url,token);
			            chart.word_chart(data_WC.wordSegment,data_WC.frequency); 
                        
                        
                    } 
                },
        async get_data_PopularityAnalysis(topic,start,end,api_url,token) {
                var data = {};
                    await fetch(api_url + "PopularityAnalysis/fake/" + topic + "/StatrDate/" +start + "/EndDate/" + end,{
                        headers: {"Authorization": 'Bearer ' +  token,
                                  "Content-Type": "application/json",
                                  "Accept": "application/json"} 
                    })
                    .then((response) => {
                        return response.json();
                    })
                    .then((response) => {
                        data = response;
                    })
                    .catch((error) => {
                        console.log(error);
                    })
        console.log(data);
        return data;
                },
    
        async get_data_SentimentAnalysis(topic,start,end,api_url,token) {
                var data = {};
                    await fetch(api_url + "SentimentAnalysis/fake/" + topic + "/StatrDate/" +start + "/EndDate/" + end,{
                        headers: {"Authorization": 'Bearer ' +  token,
                                  "Content-Type": "application/json",
                                  "Accept": "application/json"} 
                    })
                    .then((response) => {
                        return response.json();
                    })
                    .then((response) => {
                        data = response;
                    })
                    .catch((error) => {
                        console.log(error);
                    })
        console.log(data);
        return data;
                },
    
    async get_data_WordCloud(topic,start,end,api_url,token) {
                var data = {};
                    await fetch(api_url + "WordCloud/fake/" + topic + "/StatrDate/" +start + "/EndDate/" + end,{
                        headers: {"Authorization": 'Bearer ' +  token,
                                  "Content-Type": "application/json",
                                  "Accept": "application/json"} 
                    })
                    .then((response) => {
                        return response.json();
                    })
                    .then((response) => {
                        data = response;
                    })
                    .catch((error) => {
                        console.log(error);
                    })
        console.log(data);
        return data;
                },
};
export default search;


