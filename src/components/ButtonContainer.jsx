import { Center, Card, Button as IconButton, VStack } from "@chakra-ui/react"
import { RiFlowChart, RiRobot2Line } from "react-icons/ri";
import { BiBrain } from "react-icons/bi";

import { updateProcessModell } from "../actions/processModel";

const ButtonContainer = ({ exportBpmn }) => {
    const sendProcessModel = async () => {
        const model = await exportBpmn()

        updateProcessModell(model)
    }

    return (
        <Center
            height="200px"
            width="100%"
        >
            <Card.Root
                variant="outline"
                borderRadius="md"
                height="100%"
                width="100%"
            >
                <VStack spacing={4} height="100%" justify="space-around" p={5}>
                    <IconButton width="100%">
                        <RiFlowChart />
                        Run Heuristic Pattern Search
                    </IconButton>
                    <IconButton width="100%">
                        <BiBrain />
                        Run RL Bottleneck Enhancer
                    </IconButton>
                    <IconButton
                        onClick={sendProcessModel}
                        width="100%"
                    >
                        <RiRobot2Line />
                        Run Simulation
                    </IconButton>
                </VStack>
            </Card.Root>
        </Center >
    );
}

export default ButtonContainer