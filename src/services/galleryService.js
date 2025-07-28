const { CONFIG } = require("../../config");
const { fetchWithTimeout } = require("./apiService");


const getGalleryDetails = async (headers) => {
    const response = await fetchWithTimeout(`${CONFIG.BACKEND_URL}/gallery/get_gallery_details`, {
        method: "GET",
        headers: headers,
    })
    return await response.json()
}

module.exports = { getGalleryDetails }