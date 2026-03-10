import { Center, Card, Button as IconButton, VStack } from "@chakra-ui/react"
import { RiFlowChart, RiRobot2Line } from "react-icons/ri";
import { BiBrain } from "react-icons/bi";

import { updateProcessModelManual } from "../actions/processModel";
import { updateResourceActivities } from "../actions/resources";
import { runPathFinder } from "../actions/pathfinder";

const ButtonContainer = ({ exportBpmn, setLoading, loading, resourceActivities }) => {
    const sendProcessModelAndResourceActivities = async () => {
        const model = await exportBpmn();

        setLoading(true)
        await updateResourceActivities(resourceActivities)
        await updateProcessModelManual(model);
        setLoading(false)
    }

    const sendModelPathFinder = async () => {
        const model = await exportBpmn();

        setLoading(true)
        await updateResourceActivities(resourceActivities)
        await runPathFinder(model);
        setLoading(false)
    }

    return (
        <Center
            height="160px"
            width="100%"
        >
            <Card.Root
                variant="outline"
                borderRadius="md"
                height="100%"
                width="100%"
            >
                <VStack spacing={4} height="100%" justify="space-around" p={5}>
                    {/* <IconButton width="100%" disabled={loading}>
                        <RiFlowChart />
                        Run Heuristic Pattern Search
                    </IconButton> */}
                    <IconButton
                        onClick={sendModelPathFinder}
                        width="100%"
                        disabled={loading}
                    >
                        <BiBrain />
                        Run RL Bottleneck Pathfinder
                    </IconButton>
                    <IconButton
                        onClick={sendProcessModelAndResourceActivities}
                        width="100%"
                        disabled={loading}
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