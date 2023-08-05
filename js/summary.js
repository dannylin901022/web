import { summary_api_url } from "./config.js";

export async function getSummary(payload) {
    const vm = window.vm
    const converter = OpenCC.Converter({ from: 'cn', to: 'tw' });

    const response = await fetch(`${summary_api_url}/summary`, {
        method: "POST",
        cache: "no-cache",
        keepalive: true,
        headers: {
            "Content-Type": "application/json",
            Accept: "text/event-stream",
        },
        body: JSON.stringify(payload),
    });

    const reader = response.body.getReader();

    while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        new TextDecoder()
            .decode(value)
            .replace(/\r/g, "")
            .split("\n")
            .filter((line) => line?.length > 0)
            .map((line) => {
                const regex = /^: ping/;
                if (regex.test(line)) return { text: "" };
                const _temp = line.replace(/^data: /, "").replace(/'/g, '"');
                let jsonObj;
                try {
                    jsonObj = JSON.parse(_temp);
                } catch (error) {
                    jsonObj = { text: "" };
                }
                return jsonObj;
            })
            .forEach((line) => {
                vm.summary += converter(line.text);
            });
    }
}
