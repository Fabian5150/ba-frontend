import { useEffect, useRef } from "react";
import BpmnJS from "bpmn-js/dist/bpmn-modeler.development.js";
import { layoutProcess } from 'bpmn-auto-layout';
import "bpmn-js/dist/assets/diagram-js.css";
import "bpmn-js/dist/assets/bpmn-font/css/bpmn.css";
import { Card, Center } from "@chakra-ui/react";

function CustomPaletteProvider(palette, create, elementFactory) {
    this.getPaletteEntries = () => ({
        "create.task": {
            group: "activity",
            className: "bpmn-icon-task",
            title: "Task",
            action: {
                dragstart: (event) =>
                    create.start(event, elementFactory.createShape({ type: "bpmn:Task" })),
                click: (event) =>
                    create.start(event, elementFactory.createShape({ type: "bpmn:Task" })),
            },
        },
        "create.exclusive-gateway": {
            group: "gateway",
            className: "bpmn-icon-gateway-xor",
            title: "Exclusive Gateway",
            action: {
                dragstart: (event) =>
                    create.start(event, elementFactory.createShape({ type: "bpmn:ExclusiveGateway" })),
                click: (event) =>
                    create.start(event, elementFactory.createShape({ type: "bpmn:ExclusiveGateway" })),
            },
        },
        "create.parallel-gateway": {
            group: "gateway",
            className: "bpmn-icon-gateway-parallel",
            title: "Parallel Gateway",
            action: {
                dragstart: (event) =>
                    create.start(event, elementFactory.createShape({ type: "bpmn:ParallelGateway" })),
                click: (event) =>
                    create.start(event, elementFactory.createShape({ type: "bpmn:ParallelGateway" })),
            },
        },
    });
    palette.registerProvider(this);
}

const BpmnContainer = () => {
    const containerRef = useRef(null);
    const modelerRef = useRef(null);

    useEffect(() => {
        const bpmn = new BpmnJS({
            container: containerRef.current,
            additionalModules: [
                {
                    paletteProvider: ["type", CustomPaletteProvider],
                },
            ],
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

export default BpmnContainer