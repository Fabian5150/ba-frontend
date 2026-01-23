import { useEffect, useRef } from "react";
import { Box, Card, Center } from "@chakra-ui/react";
import BpmnJS from "bpmn-js/lib/Modeler";
import { layoutProcess } from 'bpmn-auto-layout';

const BpmnContainer = () => {
    const containerRef = useRef(null);
    const bpmnRef = useRef(null);

    useEffect(() => {
        if (!containerRef.current) return;

        fetch("/example-model.bpmn")
            .then(res => res.text())
            .then(xml => layoutProcess(xml))
            .then(xml => bpmn.importXML(xml).catch((e) => {
                console.error(e);
            }))
            .catch((e) => console.error(e));

        const bpmn = new BpmnJS({
            container: containerRef.current,
        });

        bpmnRef.current = bpmn;

        return () => {
            bpmn.destroy();
            bpmnRef.current = null;
        };
    }, []);

    return (
        <Center
            height="90vh"
        >
            <Card.Root
                variant="outline"
                borderRadius="md"
                height="100%"
                width="100%"
                m={4}
            >
                < Box
                    ref={containerRef}
                    height="100%"
                />
            </Card.Root>
        </Center>
    );
}

export default BpmnContainer;