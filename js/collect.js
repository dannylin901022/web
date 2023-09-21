import example_data from "./example_data.js";

var collect = {
    //    抓取收藏列表
    async get_data_collect(api_url, token) {
        var data = {};
        await fetch(api_url + "FavoriteFolders", {
            headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "application/json",
                Accept: "application/json",
                'ngrok-skip-browser-warning':true,
            },
        })
            .then((response) => {
                return response.json();
            })
            .then((response) => {
                data = response;
            })
            .catch((error) => {
                console.log(error);
                console.log("Example Data：");
                data = example_data.FavoriteFolders_data;
            });
        console.log(data);
        var collect_list = await this.display_collect(data);
        return collect_list;
    },

    //==========================================================================================
    //                顯示收藏
    async display_collect(data) {
        var collect_list = "";
        for (var i = 0; i < data.length; i++) {
            collect_list +=
                "<a href='#sublist" +
                i +
                "' data-bs-toggle='collapse' id='dropdown' aria-expanded='false' style='font-size:30px;margin-left:20px;'>" +
                data[i].favoriteFolderName +
                "</a><ul id='sublist" +
                i +
                "'  class='list-unstyled collapse'>";

            for (var j = 0; j < data[i].favoriteFolderItems.length; j++) {
                collect_list +=
                    "<li><a href='#' id='dropdown_folder' style='text-decoration: none;font-size: 20px; margin-left:50px; line-height: 2; color: #555555;  font-family: 'Noto Sans TC', sans-serif;'>" +
                    data[i].favoriteFolderItems[j].favoriteItem
                        .favoriteItemName +
                    "</a></li>";
            }

            collect_list += "</ul><hr>";
        }
        return collect_list;
    },

    //==========================================================================================
    //                新增資料夾
    async collect_post_data(api_url, token, string) {
        var data = {
            favoriteFolderName: string,
        };
        await fetch(api_url + "FavoriteFolders", {
            method: "POST",
            headers: {
                Authorization: "Bearer " + token,
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
            })
            .catch((error) => {
                console.log(error);
                console.log("fail");
            });
    },
    //==========================================================================================
    //                新增項目
    async collect_post_item(api_url, token, string, id) {
        const api = api_url.substr(0, api_url.length - 4);
        var data = {
            favoriteItemName: string,
        };
        await fetch(api + "FavoriteFolder/" + id + "/FavoriteFolderItem", {
            method: "POST",
            headers: {
                Authorization: "Bearer " + token,
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
            })
            .catch((error) => {
                console.log(error);
                console.log("fail");
            });
    },

    //==========================================================================================
    //                更新資料夾名稱
    async collect_patch_data(api_url, token, string, id) {
        var data = {
            favoriteFolderName: string,
        };
        await fetch(
            api_url + "FavoriteFolders/" + id + "?favoriteFolderName=" + string,
            {
                method: "PATCH",
                headers: {
                    Authorization: "Bearer " + token,
                    "Content-type": "application/json",
                    'ngrok-skip-browser-warning':true,
                },
                body: JSON.stringify(data),
            }
        ).then((response) => {
            console.log(response);
            console.log("success");
        });
    },

    //==========================================================================================
    //                抓取資料夾
    async get_save_collect(api_url, token) {
        var data = {};
        var re = {
            return_data: {},
            collect_list: "",
        };
        await fetch(api_url + "FavoriteFolders", {
            headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "application/json",
                Accept: "application/json",
                'ngrok-skip-browser-warning':true,
            },
        })
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
        re.return_data = data;
        re.collect_list = await this.display_folder(data);
        return re;
    },

    //==========================================================================================
    //                更新資料夾名稱
    async collect_patch_data(api_url, token, string, id) {
        var data = {
            favoriteFolderName: string,
        };
        await fetch(
            api_url + "FavoriteFolders/" + id + "?favoriteFolderName=" + string,
            {
                method: "PATCH",
                headers: {
                    Authorization: "Bearer " + token,
                    "Content-type": "application/json",
                    'ngrok-skip-browser-warning':true,
                },
                body: JSON.stringify(data),
            }
        ).then((response) => {
            console.log(response);
            console.log("success");
        });
    },

    //==========================================================================================
    //                刪除資料夾
    async collect_delete_data(api_url, token, id) {
        await fetch(api_url + "FavoriteFolders/" + id, {
            method: "DELETE",
            headers: {
                Authorization: "Bearer " + token,
                "Content-type": "application/json",
            },
        }).then((response) => {
            console.log(response);
            console.log("success");
        });
    },
    //==========================================================================================
    //                刪除項目
    async collect_delete_item_data(api_url, token, id) {
        await fetch(api_url + "FavoriteFolders/FavoriteFolderItem/" + id, {
            method: "DELETE",
            headers: {
                Authorization: "Bearer " + token,
                "Content-type": "application/json",
                'ngrok-skip-browser-warning':true,
            },
        }).then((response) => {
            console.log(response);
            console.log("success");
        });
    },

    //==========================================================================================
    //                顯示資料夾
    async display_folder(data) {
        var collect_list = "<option selected>請選擇資料夾</option>";
        for (var i = 0; i < data.length; i++) {
            collect_list +=
                "<option>" + data[i].favoriteFolderName + "</option>";
        }
        return collect_list;
    },
    //==========================================================================================
    //                顯示項目
    async display_item(data, id) {
        var collect_list = "<option selected>請選擇項目</option>";
        for (var i = 0; i < data[id].favoriteFolderItems.length; i++) {
            collect_list +=
                "<option>" +
                data[id].favoriteFolderItems[i].favoriteItem.favoriteItemName +
                "</option>";
        }
        return collect_list;
    },
};
export default collect;
