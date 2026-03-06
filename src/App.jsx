import { Box, Heading, Flex } from "@chakra-ui/react"
import { useState, useEffect, useRef } from "react"

import { getKpis } from "./actions/kpis"
import { getProcessModell } from "./actions/processModel"

import BpmnContainer from "./components/BpmnContainer"
import KpiContainer from "./components/KpiContainer"
import ButtonContainer from "./components/ButtonContainer"

const App = () => {
    const [kpis, setKpis] = useState({});
    const [processModel, setProcessModell] = useState("");
    const [loading, setLoading] = useState(false);
    const bpmnModelerRef = useRef(null);

    useEffect(() => {
        // TODO: Use Memoization
        const fetchAll = async () => {
            console.log("Loading bpmn model")

            try {
                const [kpiRes, processModellRes] = await Promise.all([
                    getKpis(),
                    getProcessModell()
                ]);

                setKpis(kpiRes);
                setProcessModell(processModellRes);
            } catch (e) {
                console.log("Error fetching kpis and/or process model:\n", e)
            }
        }

        if (!loading) {
            fetchAll();
        }
    }, [loading]);

    const exportBpmn = async () => {
        if (!bpmnModelerRef.current) return;

        try {
            const { xml } = await bpmnModelerRef.current.saveXML({ format: true });

            return xml
        } catch (e) {
            console.error("Error getting bpmn model:", e)
        }
    }

    return (
        <Box
            overflow="hidden"
            px={4}
        >
            <Heading
                textAlign="center"
                my={1}
            >
                Process Enhancement Toolkit with Reinforcement Agents (PETRA)
            </Heading>
            <Flex height="92vh">
                <Box flex={4} pr={2}>
                    <BpmnContainer
                        bpmnString={processModel}
                        modelerRef={bpmnModelerRef}
                        loading={loading}
                    />
                </Box>
                <Flex flex={1} pl={2} direction="column">
                    <Box
                        pb={2}
                        flex={1}
                        overflow="scroll"
                    >
                        <KpiContainer
                            kpis={kpis}
                            loading={loading}
                        />
                    </Box>
                    <Box pt={2}>
                        <ButtonContainer
                            exportBpmn={exportBpmn}
                            setLoading={setLoading}
                            loading={loading}
                        />
                    </Box>
                </Flex>
            </Flex>
        </Box>
    )
}

export default App