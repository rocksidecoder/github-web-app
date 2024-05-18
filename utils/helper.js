/**
 * Github APIs request handler function
 * @param {string} method Request Method 
 * @param {string} url Request URL 
 * @param {object} query Request Query Params
 * @param {object} body Request Body 
 * @returns Return results of APIs
 */
const handleFetchRequest = async (method, url, query = null) => {
    // Configure headers
    const headers = {
        "Accept": "application/vnd.github+json",
        "Authorization": `Bearer ${process.env.GITHUB_TOKEN}`,
        "X-GitHub-Api-Version": "2022-11-28"
    }

    // Attach query params in URL 
    if (query) {
        url = `${url}?${new URLSearchParams(query)}`;
    }

    const response = await fetch(url, { method, headers })

    if (![200, 204].includes(response.status)) {
        throw { status: response.status, message: response.statusText }
    }

    return response;
}

export default handleFetchRequest