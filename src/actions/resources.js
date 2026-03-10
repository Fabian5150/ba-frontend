// actions/resources.js
import api from "../api";

export const getResourceActivityData = async () => {
    const res = await api.get("/resource-activities");

    return res.data;
}

export const setResourceActivities = async (resourceActivityMapping) => {
    const res = await api.post("/resource-activities", resourceActivityMapping);

    return res.data;
}