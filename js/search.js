var search = {
    search_btn(start,end,chart){
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
                    
                        const label = ['小燈泡', '內湖', '新聞', '警方', '母親','死刑','嫌犯','台北','殺害','兒童','生命'];
                        const datas = [1090000000, 983000000, 527000000, 281000000, 267000000, 229000000,129000000,100000000,91000000,40000000,20000000];
                        chart.bar_chart(label,datas);
			            chart.word_chart(); 
                        chart.line_chart();
                    } 
                }
};
export default search;


