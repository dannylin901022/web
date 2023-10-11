import { summary_api_url, api_url } from "./config.js";

export async function getSummary() {
    const key = await getRedisKey();
    fetchBardSummary(key);
}

async function getRedisKey() {
    const condition = window.vm.search_input;
    const topic = condition.topic;
    const start = condition.startDate;
    const end = condition.endDate;
    const dateRange = condition.dateRange;
    const isExactMatch = condition.isExactMatch;
    const searchMode = condition.mode;
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
    const condition = window.vm.search_input;

    const converter = OpenCC.Converter({ from: "cn", to: "tw" });

    const response = await fetch(`${summary_api_url}/summary`, {
        method: "POST",
        cache: "no-cache",
        keepalive: true,
        headers: {
            "Content-Type": "application/json",
            Accept: "text/event-stream",
        },
        body: JSON.stringify({ content: key, topic: condition.topic }),
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

async function fetchBardSummary(key) {
    const condition = window.vm.search_input;

    const { data } = await axios.post(`${summary_api_url}/summary`, {
        content: key,
        topic: condition.topic,
    });
    vm.summary = marked.parse(data.summary);
}
