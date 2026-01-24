import { Box, Heading, Flex } from "@chakra-ui/react"

import BpmnContainer from "./components/BpmnContainer"
import KpiContainer from "./components/KpiContainer"
import ButtonContainer from "./components/ButtonContainer"

const App = () => {
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
                    <Box pb={2}>
                        <KpiContainer />
                    </Box>
                    <Box pt={2} height="100%" width="100%">
                        <ButtonContainer />
                    </Box>
                </Flex>
            </Flex>
        </Box >
    )
}

export default App