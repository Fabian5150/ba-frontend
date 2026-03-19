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
    optimalPath,
    bottleneck,
    activityDefaultsRef
}) => {
    const containerRef = useRef(null);
    const isImportingRef = useRef(false);

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
                isImportingRef.current = false;

                if (optimalPath && optimalPath.length > 0) {
                    colorPathSkipGateways(modelerRef.current, optimalPath, "#b415a7");
                }
                if (bottleneck) {
                    colorActivity(modelerRef.current, bottleneck, '#cc0000');
                }

                const eventBus = bpmn.get("eventBus");
                eventBus.on("shape.added", ({ element }) => {
                    if (element.type === "bpmn:Task" && !isImportingRef.current) {
                        const minutes = prompt(
                            `Estimated execution time for new activity (in minutes)?`,
                            "60"
                        );
                        if (minutes !== null) {
                            activityDefaultsRef.current[element.id] = parseFloat(minutes) * 60;
                        }
                    }
                });
            });
        }

        return () => bpmn.destroy();
    }, [bpmnString, modelerRef, loading, optimalPath]);

    const colorActivity = (modeler, activityName, color) => {
        const modeling = modeler.get("modeling");
        const elementRegistry = modeler.get("elementRegistry");

        const ActivityElement = elementRegistry.filter(el =>
            el.businessObject?.name === activityName
        )[0];

        if (ActivityElement) {
            modeling.setColor(ActivityElement, {
                stroke: color,
                fill: color
            });
        }
    };

    const colorPathSkipGateways = (modeler, path, color = "#b415a7") => {
        if (!modeler || !path || path.length < 2) {
            return;
        }

        const modeling = modeler.get("modeling");
        const elementRegistry = modeler.get("elementRegistry");

        for (let i = 0; i < path.length - 1; i++) {
            const fromName = path[i];
            const toName = path[i + 1];

            const fromElement = elementRegistry.filter(el =>
                el.businessObject?.name === fromName
            )[0];

            const toElement = elementRegistry.filter(el =>
                el.businessObject?.name === toName
            )[0];

            if (!fromElement || !toElement) {
                continue;
            }

            colorAllFlowsRecursive(modeling, fromElement, toElement, color, new Set());
        }
    };

    const colorAllFlowsRecursive = (modeling, current, target, color, visited) => {
        if (current.id === target.id) {
            return true;
        }

        if (visited.has(current.id)) {
            return false;
        }
        visited.add(current.id);

        const outgoing = current.outgoing || [];
        for (const flow of outgoing) {
            const next = flow.target;

            if (colorAllFlowsRecursive(modeling, next, target, color, visited)) {
                modeling.setColor(flow, { stroke: color, fill: color });
                return true;
            }
        }

        return false;
    };

    // Colors a single edge between two activties, given they exist and are direct neighbours
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