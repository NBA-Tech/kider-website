const { CONFIG } = require("../../config");
const { fetchWithTimeout } = require("./apiService");



const getEventData=async (headers={},payload={}) => {
    const response = await fetchWithTimeout(`${CONFIG.BACKEND_URL}/event/get_event_list`, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(payload),
    })
    return await response.json()
}

module.exports={
    getEventData
}