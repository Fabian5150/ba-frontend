import { useEffect, useRef } from "react";
import BpmnJS from "bpmn-js/dist/bpmn-modeler.development.js";
import "bpmn-js/dist/assets/diagram-js.css";
import "bpmn-js/dist/assets/bpmn-font/css/bpmn.css";
import { Card, Center } from "@chakra-ui/react";

import CustomPaletteProvider from "./canvas-config/CustomPaletteProvider";
import CustomContextPadProvider from "./canvas-config/CustomContextPadProvider";

const BpmnContainer = ({ bpmnString, modelerRef }) => {
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
            // TODO: Adjust Layout
            bpmn.importXML(bpmnString)
        }

        return () => bpmn.destroy();
    }, [bpmnString, modelerRef]);

    return (
        <Center height="92vh">
            <Card.Root
                variant="outline"
                borderRadius="md"
                height="100%"
                width="100%"
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