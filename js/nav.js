$(document).ready(function(){
    $("#collapse").on("click",function(){
      $(".container-left").toggleClass("active");
      $("#siderbar").toggleClass("active");
      $(".hr").toggleClass("active");
      $(".fa-align-left").toggleClass(".fa-chevron-circle-right");
    })
})