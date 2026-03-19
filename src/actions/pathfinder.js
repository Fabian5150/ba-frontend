import api from "../api";

export const getOptimalPath = async () => {
    const res = await api.get("/optimal-path");

    return res.data.path;
}

export const runPathFinder = async (bpmnString, activityDefaults = {}) => {
    await api.post("/pathfinder", {
        bpmnString,
        activityDefaults
    })
}

export const getBottleneck = async () => {
    const res = await api.get("/bottleneck");

    return res.data.bottleneck;
}