import { useEffect, useRef } from "react";
import { Box, Card, Center } from "@chakra-ui/react";
import { layoutProcess } from 'bpmn-auto-layout';
import BpmnModeler from "bpmn-js/lib/Modeler";

const BpmnContainer = () => {
    const bpmnContainerRef = useRef(null);
    const propertiesRef = useRef(null)
    const bpmnRef = useRef(null);

    useEffect(() => {
        if (!bpmnContainerRef.current) return;

        const bpmn = new BpmnModeler({
            container: bpmnContainerRef.current,
            width: "100%",
            height: "100%",
            keyboard: { bindTo: document },
        });

        bpmnRef.current = bpmn;

        fetch("/example-model.bpmn")
            .then(res => res.text())
            .then(xml => layoutProcess(xml))
            .then(xml => bpmn.importXML(xml).catch((e) => {
                console.error(e);
            }))
            .catch((e) => console.error(e));

        return () => {
            bpmn.destroy();
            bpmnRef.current = null;
        };
    }, []);

    return (
        <Center height="90vh">
            <Card.Root
                variant="outline"
                borderRadius="md"
                height="100%"
                width="100%"
                m={4}
            >
                {/* bpmn canvas */}
                <Box
                    ref={bpmnContainerRef}
                    height="100%"
                    minWidth="800px"
                    minHeight="600px"
                />
            </Card.Root>
        </Center>
    );
}

export default BpmnContainer;