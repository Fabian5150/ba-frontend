function CustomContextPadProvider(
    contextPad,
    modeling,
    elementFactory,
    connect,
    create,
    popupMenu
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

        actions["append.task"] = {
            group: "model",
            className: "bpmn-icon-task",
            title: "Append Task",
            action: {
                click: (event) => {
                    const shape = elementFactory.createShape({ type: "bpmn:Task" });
                    create.start(event, shape, element);
                },
            },
        };

        actions["append.gateway"] = {
            group: "model",
            className: "bpmn-icon-gateway-xor",
            title: "Append Gateway",
            action: {
                click: (event) => {
                    const shape = elementFactory.createShape({ type: "bpmn:ExclusiveGateway" });
                    create.start(event, shape, element);
                },
            },
        };

        if (!type.endsWith("EndEvent")) {
            actions["append.end-event"] = {
                group: "model",
                className: "bpmn-icon-end-event-none",
                title: "Append End Event",
                action: {
                    click: (event) => {
                        const shape = elementFactory.createShape({ type: "bpmn:EndEvent" });
                        create.start(event, shape, element);
                    },
                },
            };
        }

        // Reactivate, when this shit finally works

        /* if (isTask || isGateway) {
            actions["replace"] = {
                group: "edit",
                className: "bpmn-icon-screw-wrench",
                title: "Change Element",
                action: {
                    click: (event) => {
                        const e = event.originalEvent || event;
                        popupMenu.open(
                            element,
                            "bpmn-replace",
                            {
                                x: e.clientX,
                                y: e.clientY,
                            }
                        );
                    },
                },
            };
        } */

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