import api from "../api";

export const getProcessModell = async () => {
    const res = await api.get('/process-model', { responseType: "text" });

    return res.data;
}