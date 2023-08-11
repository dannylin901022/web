var bubble = {
    bubbly_create(){
        var userConfig = {
            animate: true, // default is true
            blur: 1, // default is 4
            bubbleFunc: () => `hsla(${150 + Math.random() * 100}, 100%, 50%, .6)`, // default is () => `hsla(0, 0%, 100%, ${r() * 0.1})`)
            bubbles: 30, // default is Math.floor((canvas.width + canvas.height) * 0.02);
            canvas: document.querySelector("#background"), // default is created and attached
            colorStart: "#f9f9f9", // default is blue-ish
            colorStop: "#f9f9f9",// default is blue-ish
            compose: "source-over", // default is "lighter"
            shadowColor: "#fff", // default is #fff
            angleFunc: () => Math.random() > 0.5 ? Math.PI : 2 * Math.PI, // default is this
            velocityFunc: () => 1 + Math.random() * 4, // default is this
            radiusFunc: () => 1 + Math.random() * 4 // default is 4 + Math.random() * width / 25
        };
    bubbly(userConfig);
}

}
export default bubble;