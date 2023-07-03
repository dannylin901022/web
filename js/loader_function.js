function search() {
     display_all();
     setTimeout(function(){
            document.getElementById("loader").style.display = "none";
            document.getElementById("search").style.display = "block";
     }, 3000);    
}
function home(){
    display_all();
    setTimeout(function(){
            document.getElementById("loader").style.display = "none";
            document.getElementById("search").style.display = "block";
     }, 3000); 
}
function result() {
     display_all();
     setTimeout(function(){
            document.getElementById("loader").style.display = "none";
            document.getElementById("result").style.display = "block";
            document.getElementById("c_left").style.height = 200 + 'vh';
     }, 3000);    
}
function login() {
     display_all();
     setTimeout(function(){
            document.getElementById("loader").style.display = "none";
            document.getElementById("login").style.display = "block";
     }, 3000);    
}
function register() {
     display_all();
     setTimeout(function(){
            document.getElementById("loader").style.display = "none";
            document.getElementById("register").style.display = "block";
     }, 3000);    
}
function collection() {
     display_all();
     setTimeout(function(){
            document.getElementById("loader").style.display = "none";
            document.getElementById("collection").style.display = "block";
     }, 3000);    
}
function news() {
     display_all();
     setTimeout(function(){
            document.getElementById("loader").style.display = "none";
            document.getElementById("news").style.display = "block";
            document.getElementById("c_left").style.height = 200 + 'vh';
     }, 3000);    
}
function display_all(){
     document.getElementById("loader").style.display = "block";
     document.getElementById("register").style.display = "none";
     document.getElementById("result").style.display = "none";
     document.getElementById("search").style.display = "none";
     document.getElementById("login").style.display = "none";
     document.getElementById("register").style.display = "none";
     document.getElementById("collection").style.display = "none";
     document.getElementById("news").style.display = "none";
     document.getElementById("c_left").style.height = 100 + 'vh';
}