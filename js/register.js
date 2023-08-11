var register = {
    async register_btn(url, account, password) {
        var re = await this.register_post_data(url, account, password);
        if (re.bool == 1) {
            document.getElementById("register").style.display = "none";
            setTimeout(function () {
                document.getElementById("search").style.display = "block";
                alert("註冊成功，請再次登入!!");
            }, 1000);
            return re;
        } else {
            alert("該帳號已註冊");
            return re;
        }
    },

    async register_post_data(api_url, account_input, password_input) {
        var bool = 0;
        var re = {
            response: "",
            bool: true,
        };
        var data = {
            account: account_input,
            password: password_input,
        };
        await fetch(api_url + "Member/register", {
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
export default register;
