import { Box, Heading, Flex, IconButton } from "@chakra-ui/react"
import { useState, useEffect, useRef } from "react"
import { HiMenu } from "react-icons/hi"
import { getKpis } from "./actions/kpis"
import { getProcessModell } from "./actions/processModel"
import { getOptimalPath } from "./actions/pathfinder"
import { getResourceActivityData } from "./actions/resources"
import BpmnContainer from "./components/BpmnContainer"
import KpiContainer from "./components/KpiContainer"
import ButtonContainer from "./components/ButtonContainer"
import MenuModal from "./components/resource-modal/Modal"

const App = () => {
    const [kpis, setKpis] = useState({});
    const [processModel, setProcessModell] = useState("");
    const [loading, setLoading] = useState(false);
    const [optimalPath, setOptimalPath] = useState([]);

    const [resourceActivities, setResourceActivities] = useState({});
    const [resources, setResources] = useState([]);
    const [activities, setActivities] = useState([]);

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const bpmnModelerRef = useRef(null);

    useEffect(() => {
        // TODO: Use Memoization
        const fetchAll = async () => {
            console.log("Loading bpmn model")

            try {
                const [kpiRes, processModellRes, pathRes, resourceActivitiyRes] = await Promise.all([
                    getKpis(),
                    getProcessModell(),
                    getOptimalPath(),
                    getResourceActivityData()
                ]);

                setKpis(kpiRes);
                setProcessModell(processModellRes);
                setOptimalPath(pathRes);

                setResourceActivities(resourceActivitiyRes.resourceActivities);
                setResources(resourceActivitiyRes.resources);
                setActivities(resourceActivitiyRes.activities);
            } catch (e) {
                console.log("Error fetching kpis and/or process model:\n", e);
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
        <Box overflow="hidden" px={4} position="relative">
            <IconButton
                position="absolute"
                top={0}
                right={2}
                onClick={() => { setIsMenuOpen(true); }}
                variant="ghost"
                aria-label="Menu"
                zIndex={1000}
            >
                <HiMenu size={24} />
            </IconButton>

            <Heading textAlign="center" my={1}>
                Process Enhancement Toolkit with Reinforcement Agents (PETRA)
            </Heading>

            <Flex height="92vh">
                <Box flex={4} pr={2}>
                    <BpmnContainer
                        bpmnString={processModel}
                        modelerRef={bpmnModelerRef}
                        optimalPath={optimalPath}
                        loading={loading}
                    />
                </Box>
                <Flex flex={1} pl={2} direction="column">
                    <Box pb={2} flex={1} overflow="scroll">
                        <KpiContainer kpis={kpis} loading={loading} />
                    </Box>
                    <Box pt={2}>
                        <ButtonContainer
                            exportBpmn={exportBpmn}
                            resourceActivities={resourceActivities}
                            setLoading={setLoading}
                            loading={loading}
                        />
                    </Box>
                </Flex>
            </Flex>

            <MenuModal
                open={isMenuOpen}
                onClose={() => setIsMenuOpen(false)}
                resourceActivities={resourceActivities}
                setResourceActivities={setResourceActivities}
                resources={resources}
                activities={activities}
            />
        </Box>
    )
}

export default App