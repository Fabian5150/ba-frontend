import { Box, Heading, Flex } from "@chakra-ui/react"

import BpmnContainer from "./components/BpmnContainer"
import KpiContainer from "./components/KpiContainer"

const App = () => {
    return (
        <Box
            overflow="hidden"
        >
            <Heading
                textAlign="center"
                my={1}
            >
                Process Enhancement Toolkit with Reinforcement Agents (PETRA)
            </Heading>
            <Flex height="90vh">
                <Box flex={4}>
                    <BpmnContainer />
                </Box>
                <Box flex={1}>
                    <KpiContainer />
                </Box>
            </Flex>
        </Box >
    )
}

export default App