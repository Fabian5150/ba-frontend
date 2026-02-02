import { Center, Card, Button as IconButton, VStack } from "@chakra-ui/react"
import { RiFlowChart, RiRobot2Line } from "react-icons/ri";
import { BiBrain } from "react-icons/bi";

import { getKpis } from "../actions/kpis";

const ButtonContainer = () => {
    const ah = async () => {
        try {
            const data = await getKpis()

            console.log(data)
        } catch (e) {
            console.error("Can't get kpis", e);
        };
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
                    <IconButton
                        width="100%"
                        onClick={ah}
                    >
                        <RiFlowChart />
                        Run Heuristic Pattern Search
                    </IconButton>
                    <IconButton width="100%">
                        <BiBrain />
                        Run RL Bottleneck Enhancer
                    </IconButton>
                    <IconButton width="100%">
                        <RiRobot2Line />
                        Run Simulation
                    </IconButton>
                </VStack>
            </Card.Root>
        </Center >
    );
}

export default ButtonContainer