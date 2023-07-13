var logout ={
    logout_btn(){
        if (confirm("確定要登出嗎？")) {
            document.getElementById("loader").style.display = "block";
            document.getElementById("dropdown").style.display = 'block';
            document.getElementById("register").style.display = "none";
            document.getElementById("result").style.display = "none";
            document.getElementById("search").style.display = "none";
            document.getElementById("login").style.display = "none";
            document.getElementById("register").style.display = "none";
            document.getElementById("collection").style.display = "none";
            document.getElementById("news").style.display = "none";
            document.getElementById("logout").style.display = 'none';
            document.getElementById("user_account").style.display = 'none';
            document.getElementById("user_collection").style.display = 'none';
            document.getElementById("c_left").style.height = 100 + 'vh';
            
            setTimeout(function(){
                document.getElementById("loader").style.display = "none";
                document.getElementById("search").style.display = "block";
                document.getElementById("dropdown_login").style.display = 'block';
                document.getElementById("dropdown_register").style.display = 'block';
            }, 3000);
        }
    }
}
export default logout;