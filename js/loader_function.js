let return_home = true,is_searched = false;

function search() {
    display_all();
    setTimeout(function () {
        document.body.style.backgroundImage = "url('./search_bg.png')";
        document.body.style.backgroundSize = "100vw 120vh";
        document.getElementById("loader").style.display = "none";
        document.getElementById("search").style.display = "block";
        all_event();
    }, 3000);
}
function home() {
    display_all();
    setTimeout(function () {
        document.body.style.backgroundImage = "url('./search_bg.png')";
        document.body.style.backgroundSize = "100vw 120vh";
        document.getElementById("loader").style.display = "none";
        document.getElementById("search").style.display = "block";
        if(return_home && is_searched){
            document.getElementById("top_data").innerHTML = "上次搜尋：　" + vm.text; 
            return_home = false;
        }
        document.getElementById("top_data").style.display = "block";
        vm.topic = "";
        all_event();
    }, 3000);
}
function result() {
    if (
        document.getElementById("search_box").value != "" &&
        document.getElementById("search_start").value != "" &&
        document.getElementById("search_end").value != "" &&
        document.getElementById("search_start").value <
            document.getElementById("search_end").value
    ) {
        display_all();
        setTimeout(function () {
            document.getElementById("loader").style.display = "none";
            document.getElementById("result").style.display = "block";
            is_searched = true;
//            document.getElementById("c_left").style.height = 750 + "vh";
            all_event();
        }, 3000);
    }
}
function login() {
    display_all();
    setTimeout(function () {
        document.getElementById("loader").style.display = "none";
        document.getElementById("login").style.display = "block";
        all_event();
    }, 3000);
}
function register() {
    display_all();
    setTimeout(function () {
        document.getElementById("loader").style.display = "none";
        document.getElementById("register").style.display = "block";
        all_event();
    }, 3000);
}
function collection() {
    display_all();
    setTimeout(function () {
        document.getElementById("loader").style.display = "none";
        document.getElementById("collection").style.display = "block";
        all_event();
    }, 3000);
}
function news() {
    display_all();
    setTimeout(function () {
        document.getElementById("loader").style.display = "none";
        document.getElementById("news").style.display = "block";
        all_event();
    }, 3000);
}
function display_all() {
    var x = document.getElementsByClassName("nav_li");
    for (var i = 0; i < x.length; i++) {
        x[i].style.pointerEvents = "none";
    }
    document.getElementById("loader").style.display = "block";
    document.getElementById("register").style.display = "none";
    document.getElementById("result").style.display = "none";
    document.getElementById("search").style.display = "none";
    document.getElementById("login").style.display = "none";
    document.getElementById("register").style.display = "none";
    document.getElementById("collection").style.display = "none";
    document.getElementById("news").style.display = "none";
    document.getElementById("top_data").style.display = "none";
//    document.getElementById("c_left").style.height = 100 + "vh";
    
    document.body.style.backgroundImage = null;
    document.body.style.backgroundColor = "#f9f9f9";
}
function all_event() {
    AOS.init();
    var x = document.getElementsByClassName("nav_li");
    for (var i = 0; i < x.length; i++) {
        x[i].style.pointerEvents = "auto";
    }
}
