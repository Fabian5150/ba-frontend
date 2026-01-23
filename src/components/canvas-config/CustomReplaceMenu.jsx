function CustomReplaceMenu(popupMenu, bpmnReplace) {
    console.log("CustomReplaceMenu initialized");

    popupMenu.registerProvider("bpmn-replace", {
        priority: 2000,
        getEntries: function (element) {
            const type = element.type;

            if (type.endsWith("Event")) return {};

            if (type.endsWith("Gateway")) {
                return {
                    "replace-exclusive-gateway": {
                        id: "replace-exclusive-gateway",
                        label: "Exclusive Gateway",
                        className: "bpmn-icon-gateway-xor",
                        action: () =>
                            bpmnReplace.replaceElement(element, { type: "bpmn:ExclusiveGateway" }),
                    },
                    "replace-parallel-gateway": {
                        id: "replace-parallel-gateway",
                        label: "Parallel Gateway",
                        className: "bpmn-icon-gateway-parallel",
                        action: () =>
                            bpmnReplace.replaceElement(element, { type: "bpmn:ParallelGateway" }),
                    },
                    "replace-inclusive-gateway": {
                        id: "replace-inclusive-gateway",
                        label: "Inclusive Gateway",
                        className: "bpmn-icon-gateway-or",
                        action: () =>
                            bpmnReplace.replaceElement(element, { type: "bpmn:InclusiveGateway" }),
                    },
                };
            }

            if (type === "bpmn:Task" || type === "bpmn:ServiceTask") {
                return {
                    "replace-task": {
                        id: "replace-task",
                        label: "Task",
                        className: "bpmn-icon-task",
                        action: () =>
                            bpmnReplace.replaceElement(element, { type: "bpmn:Task" }),
                    },
                    "replace-service-task": {
                        id: "replace-service-task",
                        label: "Service Task",
                        className: "bpmn-icon-service-task",
                        action: () =>
                            bpmnReplace.replaceElement(element, { type: "bpmn:ServiceTask" }),
                    },
                };
            }

            return {};
        },
    });
}


export default CustomReplaceMenu