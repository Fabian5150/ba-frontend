import { Box, Heading, Flex } from "@chakra-ui/react"
import { useState, useEffect } from "react"

import { getKpis } from "./actions/kpis"
import { getProcessModell } from "./actions/processModel"

import BpmnContainer from "./components/BpmnContainer"
import KpiContainer from "./components/KpiContainer"
import ButtonContainer from "./components/ButtonContainer"

const App = () => {
    const [kpis, setKpis] = useState({});
    const [processModel, setProcessModell] = useState("");

    // TODO: Use Memoization
    useEffect(() => {
        const fetchAll = async () => {
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

        fetchAll();
    }, []);

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
                    <BpmnContainer bpmnString={processModel} />
                </Box>
                <Flex flex={1} pl={2} direction="column">
                    <Box pb={2} flex={1}>
                        <KpiContainer kpis={kpis} />
                    </Box>
                    <Box pt={2}>
                        <ButtonContainer />
                    </Box>
                </Flex>
            </Flex>
        </Box>
    )
}

export default App