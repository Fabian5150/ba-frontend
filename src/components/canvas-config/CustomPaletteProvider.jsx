function CustomPaletteProvider(palette, create, elementFactory, handTool, lassoTool, globalConnect) {
    this.getPaletteEntries = () => ({
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

export default CustomPaletteProvider