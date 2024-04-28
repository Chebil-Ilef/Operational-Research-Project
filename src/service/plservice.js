import axios from "axios";

export async function PLservice(data, endpoint) {
    const response = await axios.post(
        `http://127.0.0.1:5000/${endpoint}`,
        JSON.stringify(data),
        { headers: { "content-type": "application/json" } }
    );
    return response.data;
}
