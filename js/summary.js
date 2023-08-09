import { summary_api_url, api_url } from "./config.js";

export async function getSummary() {
    const key = await getRedisKey();
    fetchSummary(key);
}

async function getRedisKey() {
    const topic = "戰爭";
    const start = "2022-01-03";
    const end = "2022-01-31";
    const dateRange = 30;
    const isExactMatch = false;
    const searchMode = 0;
    const response = await fetch(
        `${api_url}Redis/${topic}/StatrDate/${start}/EndDate/${end}?DateRange=${dateRange}&IsExactMatch=${isExactMatch}&SearchMode=${searchMode}`,
        {
            method: "GET",
            cache: "no-cache",
            keepalive: true,
            headers: {
                "Content-Type": "application/json",
                "ngrok-skip-browser-warning": "true",
            },
        }
    );
    return response.text();
}

async function fetchSummary(key) {
    const vm = window.vm;
    const converter = OpenCC.Converter({ from: "cn", to: "tw" });

    const response = await fetch(`${summary_api_url}/summary`, {
        method: "POST",
        cache: "no-cache",
        keepalive: true,
        headers: {
            "Content-Type": "application/json",
            Accept: "text/event-stream",
        },
        body: JSON.stringify({ content: key }),
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
