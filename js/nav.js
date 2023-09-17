$(document).ready(function () {
    $("#collapse").on("click", function () {
        $(".container-left").toggleClass("active");
        $("#siderbar").toggleClass("active");
        $("#sliderbar_top").toggleClass("active");
        $(".hr").toggleClass("active");
        $(".container-right").toggleClass("active");
        $(".fa-align-left").toggleClass(".fa-chevron-circle-right");
    });
});