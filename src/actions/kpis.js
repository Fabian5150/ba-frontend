import api from "../api";

export const getKpis = async () => {
    const res = await api.get('/kpis');

    return res.data;
}