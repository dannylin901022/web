var login = {
    async login_btn(url,account,password){
                    var b = true;
                    b = await this.login_post_data(url,account,password);
                    console.log(b);
                    if(b == 1){
                        document.getElementById("login").style.display = 'none';
                        alert("登入成功");
                        setTimeout(function(){
                            document.getElementById("search").style.display = 'block';
                            document.getElementById("dropdown").style.display = 'none';
                            document.getElementById("dropdown_login").style.display = 'none';
                            document.getElementById("dropdown_register").style.display = 'none';
                            document.getElementById("user_account").style.display = 'block';
                            document.getElementById("user_collection").style.display = 'block';
                            document.getElementById("logout").style.display = 'block';
                        }, 1000);  
                    }
                    else{
                        alert("帳號或密碼錯誤");
                        this.account_input = "";
                        this.password_input = "";
                    }
                },
    
    async login_post_data(api_url,account_input,password_input) {
                    var bool = 0
                    let data = {
//                        "account": 'user',
//                        "password": 'user'
                    }
                    let headers = {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                    }
                    
                    const act = account_input;
                    const psd = password_input;
                    const url = api_url + "Member/login"
                    await fetch(url+"?account="+act+"&password="+psd,{
                        method: "POST",
                        headers: headers,
                        body: JSON.stringify(data)
                    })
                    .then((response) => {
                        if(response.status != 200){
                            console.log("connect fail");
                            throw Error;
                        }
                        else{
                            return response.json();
                        }
                    })
                    .then((response) => {
                        console.log(response);
                        console.log("success");
                        bool = 1;
                    })
                    .catch((error) => {
                        console.log(error);
                        console.log("fail");
                        bool =  0;
                    })
                    console.log("this b is " + bool);
                    return bool;
                },

}
export default login;