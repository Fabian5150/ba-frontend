import { Box, Heading } from "@chakra-ui/react"
import BpmnContainer from "./components/BpmnContainer"

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
            <BpmnContainer />
        </Box>
    )
}

export default App