import api from "../api";

export const getOptimalPath = async () => {
    const res = await api.get("/optimal-path");

    return res.data.path;
}

export const runPathFinder = async (bpmnString) => {
    // blocking response until pathfinder is done
    await api.post(
        "/pathfinder",
        bpmnString,
        {
            headers: {
                "Content-Type": "text/plain"
            }
        }
    )
}