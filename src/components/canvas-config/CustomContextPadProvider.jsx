function CustomContextPadProvider(
    contextPad,
    modeling,
    connect,
    bpmnReplace
) {
    this.getContextPadEntries = function (element) {
        const actions = {};

        const type = element.type;

        const isTask = type === "bpmn:Task" || type === "bpmn:ServiceTask";
        const isGateway = type.endsWith("Gateway");
        const isEvent = type.endsWith("Event");

        if (!isTask && !isGateway && !isEvent) {
            return actions;
        }

        actions["connect"] = {
            group: "connect",
            className: "bpmn-icon-connection-multi",
            title: "Connect",
            action: {
                click: (event) => connect.start(event, element),
                dragstart: (event) => connect.start(event, element),
            },
        };

        // Allowed replacements for tasks
        if (isTask) {
            actions["replace-task"] = {
                group: "edit",
                className: "bpmn-icon-task",
                title: "Replace with Normal Task",
                action: {
                    click: () => bpmnReplace.replaceElement(element, { type: "bpmn:Task" }),
                },
            };

            actions["replace-service-task"] = {
                group: "edit",
                className: "bpmn-icon-service-task",
                title: "Replace with Service Task",
                action: {
                    click: () =>
                        bpmnReplace.replaceElement(element, { type: "bpmn:ServiceTask" }),
                },
            };
        }

        // Allowed replacements for gateways
        if (isGateway) {
            actions["replace-exclusive-gateway"] = {
                group: "edit",
                className: "bpmn-icon-gateway-xor",
                title: "Replace with Exclusive Gateway",
                action: {
                    click: () =>
                        bpmnReplace.replaceElement(element, { type: "bpmn:ExclusiveGateway" }),
                },
            };

            actions["replace-parallel-gateway"] = {
                group: "edit",
                className: "bpmn-icon-gateway-parallel",
                title: "Replace with Parallel Gateway",
                action: {
                    click: () =>
                        bpmnReplace.replaceElement(element, { type: "bpmn:ParallelGateway" }),
                },
            };

            actions["replace-inclusive-gateway"] = {
                group: "edit",
                className: "bpmn-icon-gateway-or",
                title: "Replace with Inclusive Gateway",
                action: {
                    click: () =>
                        bpmnReplace.replaceElement(element, { type: "bpmn:InclusiveGateway" }),
                },
            };
        }

        actions["delete"] = {
            group: "edit",
            className: "bpmn-icon-trash",
            title: "Delete",
            action: {
                click: () => modeling.removeElements([element]),
            },
        };

        return actions;
    };

    contextPad.registerProvider(this);
}

export default CustomContextPadProvider