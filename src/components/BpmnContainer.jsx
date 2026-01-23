import React, { useEffect, useRef } from "react";
import BpmnJS from "bpmn-js/dist/bpmn-modeler.development.js";
import { layoutProcess } from 'bpmn-auto-layout';
import "bpmn-js/dist/assets/diagram-js.css";
import "bpmn-js/dist/assets/bpmn-font/css/bpmn.css";
import { Card, Center } from "@chakra-ui/react";

export default function BpmnModeler() {
    const containerRef = useRef(null);
    const modelerRef = useRef(null);

    useEffect(() => {
        const bpmn = new BpmnJS({
            container: containerRef.current,
            width: "100%",
            height: "100%",
        });
        modelerRef.current = bpmn;

        fetch("/example-model.bpmn")
            .then((res) => res.text())
            .then((xml) => layoutProcess(xml))
            .then((xml) => bpmn.importXML(xml))
            .catch(console.error);

        return () => bpmn.destroy();
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
                <div
                    ref={containerRef}
                    style={{ width: "100%", height: "90vh" }}
                />
            </Card.Root>
        </Center>

    );
}
