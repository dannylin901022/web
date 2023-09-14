function search() {
    display_all();
    setTimeout(function () {
        document.getElementById("loader").style.display = "none";
        document.getElementById("search").style.display = "block";
        all_event();
    }, 3000);
}
function home() {
    display_all();
    setTimeout(function () {
        document.getElementById("loader").style.display = "none";
        document.getElementById("search").style.display = "block";
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
            document.getElementById("c_left").style.height = 750 + "vh";
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
        document.getElementById("c_left").style.height = 200 + "vh";
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
    document.getElementById("c_left").style.height = 100 + "vh";
}
function all_event() {
    var x = document.getElementsByClassName("nav_li");
    for (var i = 0; i < x.length; i++) {
        x[i].style.pointerEvents = "auto";
    }
}
