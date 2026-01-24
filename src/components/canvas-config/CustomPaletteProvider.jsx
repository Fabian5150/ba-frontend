function CustomPaletteProvider(palette, create, elementFactory, handTool, lassoTool, globalConnect) {
    this.getPaletteEntries = () => ({
        // allowed tools
        "hand-tool": {
            group: "tools",
            className: "bpmn-icon-hand-tool",
            title: "Hand Tool",
            action: {
                click: () => handTool.activateHand(),
            },
        },
        "lasso-tool": {
            group: "tools",
            className: "bpmn-icon-lasso-tool",
            title: "Lasso Tool",
            action: {
                click: () => lassoTool.activateSelection(),
            },
        },
        "global-connect-tool": {
            group: "tools",
            className: "bpmn-icon-connection-multi",
            title: "Global Connect",
            action: {
                click: () => globalConnect.toggle(),
            },
        },

        // allowed event types
        "create.start-event": {
            group: "event",
            className: "bpmn-icon-start-event-none",
            title: "Start Event",
            action: {
                dragstart: (event) =>
                    create.start(event, elementFactory.createShape({ type: "bpmn:StartEvent" })),
                click: (event) =>
                    create.start(event, elementFactory.createShape({ type: "bpmn:StartEvent" })),
            },
        },

        "create.end-event": {
            group: "event",
            className: "bpmn-icon-end-event-none",
            title: "End Event",
            action: {
                dragstart: (event) =>
                    create.start(event, elementFactory.createShape({ type: "bpmn:EndEvent" })),
                click: (event) =>
                    create.start(event, elementFactory.createShape({ type: "bpmn:EndEvent" })),
            },
        },

        // allowed task types
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
        "create.service-task": {
            group: "activity",
            className: "bpmn-icon-service-task",
            title: "Service Task",
            action: {
                dragstart: (event) =>
                    create.start(event, elementFactory.createShape({ type: "bpmn:ServiceTask" })),
                click: (event) =>
                    create.start(event, elementFactory.createShape({ type: "bpmn:ServiceTask" })),
            },
        },

        // allowed gateway types
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
        "create.inclusive-gateway": {
            group: "gateway",
            className: "bpmn-icon-gateway-or",
            title: "Inclusive Gateway",
            action: {
                dragstart: (event) =>
                    create.start(event, elementFactory.createShape({ type: "bpmn:InclusiveGateway" })),
                click: (event) =>
                    create.start(event, elementFactory.createShape({ type: "bpmn:InclusiveGateway" })),
            },
        },
    });

    palette.registerProvider(this);
}

export default CustomPaletteProvider