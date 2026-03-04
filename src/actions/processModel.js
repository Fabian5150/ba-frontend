import api from "../api";

export const getProcessModell = async () => {
    const res = await api.get("/process-model", { responseType: "text" });

    return res.data;
}

export const updateProcessModelManual = async (bpmnString) => {
    await api.post(
        "/process-model-simulation",
        bpmnString,
        {
            headers: {
                "Content-Type": "text/plain"
            }
        }
    )
}