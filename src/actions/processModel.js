import api from "../api";

export const getProcessModell = async () => {
    const res = await api.get("/process-model", { responseType: "text" });

    return res.data;
}

export const updateProcessModelManual = async (bpmnString, setLoading) => {
    setLoading(true);

    // blocking response until simulation is done
    await api.post(
        "/process-model-simulation",
        bpmnString,
        {
            headers: {
                "Content-Type": "text/plain"
            }
        }
    )

    setLoading(false)
}