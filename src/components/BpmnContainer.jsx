import { useEffect, useRef } from "react";
import { Box, Card, Center } from "@chakra-ui/react";
import BpmnJS from "bpmn-js/lib/Modeler";

const emptyDiagram = `<?xml version="1.0" encoding="UTF-8"?>
<bpmn:definitions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL"
  id="Definitions_1"
  targetNamespace="http://bpmn.io/schema/bpmn">
  <bpmn:process id="Process_1" isExecutable="false">
  </bpmn:process>
</bpmn:definitions>
`;

const BpmnContainer = () => {
    const containerRef = useRef(null);
    const bpmnRef = useRef(null);

    useEffect(() => {
        if (!containerRef.current) return;

        const bpmn = new BpmnJS({
            container: containerRef.current,
        });

        bpmnRef.current = bpmn;

        bpmn.importXML(emptyDiagram).catch((err) => {
            //console.error("BPMN Import Fehler:", err);
        });

        return () => {
            bpmn.destroy();
            bpmnRef.current = null;
        };
    }, []);

    return (
        <Center>
            <Card.Root
                variant="outline"
                borderRadius="md"
                height="100%"
                m={4}
                width="100%"
            >
                < Box
                    ref={containerRef}
                />
            </Card.Root>
        </Center>
    );
}

export default BpmnContainer;