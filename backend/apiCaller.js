import fetch from "node-fetch";
import { API_URL } from "./config/index.js";

/**
 * Calls fetch() for API, appends cursor value to get next set of data.
 * If response status is 429 Too Many Requests, retries after timeout (value of which defined in error
 * response).
 */
async function fetchData(cursor) {
    let url = API_URL;
    if (cursor !== "") {
        url = cursor;
		let pos = url.search("page=");
		console.log(url.substring(pos));
    }
    try {
        let success = false;
        let response;
        let tries = 0;
        let timeout;
        let data;
        while (!success && tries < 2) {
            response = await fetch(url);
            if (response.ok) success = true;
            else {
                if (response.status === 429) {
                    data = await response.json();
                    timeout = Number(data.retryAfterMs);
                    timeout += 10;
                }
                tries++;
            }
        }
        if (!success) return "error";

        data = await response.json();
        return data;
    } catch (error) {
        console.error(error.message);
        throw new Error(error);
    }
}

export default fetchData;
