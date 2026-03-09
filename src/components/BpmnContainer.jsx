import { useEffect, useRef } from "react";
import BpmnJS from "bpmn-js/dist/bpmn-modeler.development.js";
import "bpmn-js/dist/assets/diagram-js.css";
import "bpmn-js/dist/assets/bpmn-font/css/bpmn.css";
import { Card, Center, Spinner } from "@chakra-ui/react";

import CustomPaletteProvider from "./canvas-config/CustomPaletteProvider";
import CustomContextPadProvider from "./canvas-config/CustomContextPadProvider";

const BpmnContainer = ({
    bpmnString,
    modelerRef,
    loading,
    optimalPath
}) => {
    const containerRef = useRef(null);

    useEffect(() => {
        const bpmn = new BpmnJS({
            container: containerRef.current,
            additionalModules: [
                {
                    paletteProvider: ["type", CustomPaletteProvider],
                    contextPadProvider: ["type", CustomContextPadProvider],
                },
            ],
        });

        modelerRef.current = bpmn;

        if (bpmnString) {
            bpmn.importXML(bpmnString).then(() => {
                colorEdge(
                    bpmn,
                    "O_CREATED",
                    "O_SENT",
                    "#cc0000"
                );
            })
        }

        return () => bpmn.destroy();
    }, [bpmnString, modelerRef, loading]);

    const colorEdge = (modeler, sourceName, targetName, color = "#cc0000") => {
        if (!modeler) {
            return
        }

        const modeling = modeler.get("modeling");
        const elementRegistry = modeler.get("elementRegistry");

        const sourceElement = elementRegistry.filter(el =>
            el.businessObject?.name === sourceName
        )[0];

        const targetElement = elementRegistry.filter(el =>
            el.businessObject?.name === targetName
        )[0];

        if (!sourceElement) {
            console.log(`Source element not found: ${sourceName}`);
            return;
        }

        if (!targetElement) {
            console.log(`Target element not found: ${targetName}`);
            return;
        }

        const flow = sourceElement.outgoing?.find(
            out => out.target.id === targetElement.id
        );

        if (!flow) {
            console.log(`Edge not found: ${sourceName} to ${targetName}`);
            return;
        }

        modeling.setColor(flow, {
            stroke: color,
            fill: color
        });
    };

    return (
        <Center height="92vh">
            <Card.Root
                variant="outline"
                borderRadius="md"
                height="100%"
                width="100%"
            >
                {loading
                    ? <Center h="90vh">
                        <Spinner size="xl" />
                    </Center>
                    : <div
                        ref={containerRef}
                        style={{ width: "100%", height: "90vh" }}
                    />
                }
            </Card.Root>
        </Center>
    );
}

export default BpmnContainer