import { useEffect, useRef } from "react";
import BpmnJS from "bpmn-js/dist/bpmn-modeler.development.js";
import "bpmn-js/dist/assets/diagram-js.css";
import "bpmn-js/dist/assets/bpmn-font/css/bpmn.css";
import { layoutProcess } from "bpmn-auto-layout";
import { Card, Center } from "@chakra-ui/react";

import CustomPaletteProvider from "./canvas-config/CustomPaletteProvider";
import CustomContextPadProvider from "./canvas-config/CustomContextPadProvider";
import CustomReplaceMenu from "./canvas-config/CustomReplaceMenu";

const BpmnContainer = () => {
    const containerRef = useRef(null);
    const modelerRef = useRef(null);

    useEffect(() => {
        const bpmn = new BpmnJS({
            container: containerRef.current,
            additionalModules: [
                {
                    __init__: ["customReplaceMenu", "contextPadProvider"],
                    paletteProvider: ["type", CustomPaletteProvider],
                    contextPadProvider: ["type", CustomContextPadProvider],
                    customReplaceMenu: ["type", CustomReplaceMenu],
                },
            ],
        });

        modelerRef.current = bpmn;

        fetch("/example-model.bpmn")
            .then(res => res.text())
            .then(xml => layoutProcess(xml))
            .then(xml => bpmn.importXML(xml))
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