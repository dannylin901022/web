import { summary_api_url, api_url } from "./config.js";

export async function getSummary(address = null) {
    const key = await getRedisKey(address);
    fetchBardSummary(key, address);
}

async function getRedisKey(address) {
    const condition = window.vm.search_input;
    const topic = condition.topic;
    const start = condition.startDate;
    const end = condition.endDate;
    const dateRange = condition.dateRange;
    const isExactMatch = condition.isExactMatch;
    const searchMode = condition.mode;
    const params = {
        DateRange: dateRange,
        IsExactMatch: isExactMatch,
        SearchMode: searchMode,
    };
    if (address) {
        params["AddressTypes"] = address;
    }
    const res = await axios.get(
        `${api_url}Redis/${topic}/StatrDate/${start}/EndDate/${end}`,
        { params, headers: { "ngrok-skip-browser-warning": "true" } }
    );
    return res.data;
}

async function fetchBardSummary(key, address) {
    const condition = window.vm.search_input;
    const addressParams = address ? `/${address}` : "";

    const { data } = await axios.post(
        `${summary_api_url}/summary${addressParams}`,
        {
            key,
            topic: condition.topic,
        }
    );
    vm.summary = marked.parse(data.summary);
    if (!address) {
        vm.discuss_rank_address = data.address
    }
}
