var login = {
    async login_btn(url, account, password) {
        var re = await this.login_post_data(url, account, password);
        if (re.bool == 1) {
            document.getElementById("login").style.display = "none";
            alert("登入成功");
            setTimeout(function () {
                document.getElementById("search").style.display = "block";
                document.getElementById("dropdown").style.display = "none";
                document.getElementById("dropdown_login").style.display =
                    "none";
                document.getElementById("dropdown_register").style.display =
                    "none";
                document.getElementById("user_account").style.display = "block";
                document.getElementById("user_collection").style.display =
                    "block";
                document.getElementById("logout").style.display = "block";
            }, 2000);
            return re;
        } else {
            alert("帳號或密碼錯誤");
            return re;
        }
    },

    async login_post_data(api_url, account_input, password_input) {
        var bool = 0;
        var re = {
            response: "",
            bool: true,
        };
        var data = {
            account: account_input,
            password: password_input,
        };

        await fetch(api_url + "Member/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                'ngrok-skip-browser-warning':true,
            },
            body: JSON.stringify(data),
        })
            .then((response) => {
                if (response.status < 200 || response.status >= 300) {
                    console.log("connect fail");
                    throw Error;
                } else {
                    return response.json();
                }
            })
            .then((response) => {
                console.log(response);
                console.log("success");
                re.bool = 1;
                re.response = response;
            })
            .catch((error) => {
                console.log(error);
                console.log("fail");
                re.bool = 0;
                re.response = error;
            });
        return re;
    },
};
export default login;
