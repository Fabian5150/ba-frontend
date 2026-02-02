import { Box, Heading, Flex } from "@chakra-ui/react"
import { useState, useEffect } from "react"

import { getKpis } from "./actions/kpis"

import BpmnContainer from "./components/BpmnContainer"
import KpiContainer from "./components/KpiContainer"
import ButtonContainer from "./components/ButtonContainer"

const App = () => {
    const [kpis, setKpis] = useState({});

    // TODO: Use Memoization, especially for the bpmn string later
    useEffect(() => {
        const fetchKpis = async () => {
            try {
                const data = await getKpis();

                setKpis(data);
            } catch (e) {
                console.error("Error fetching kpis:\n", e);
            };
        }

        fetchKpis();
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
                    <BpmnContainer />
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