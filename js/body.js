Vue.createApp({
    data() {
        return {
            search_input: "",
        };
    },
    methods: {
        search_btn() {
            document.getElementById("search").style.display = "none";
            setTimeout(function () {
                document.getElementById("result").style.display = "block";
            }, 3000);
        },
    },
    mounted: function () {},
}).mount("#all_body");
