import {
    DialogRoot,
    DialogCloseTrigger,
    DialogBackdrop,
    Box
} from "@chakra-ui/react"
import ResourceList from "./ResourceList";

const MenuModal = ({
    open,
    onClose,
    resourceActivities,
    setResourceActivities,
    resources,
    activities,
}) => {
    if (!open) return null;

    return (
        <DialogRoot open={open}>
            <DialogBackdrop
                onClick={onClose}
                bg="blackAlpha.600"
            />
            <Box
                position="fixed"
                top="50%"
                left="50%"
                transform="translate(-50%, -50%)"
                bg="white"
                p={6}
                borderRadius="md"
                boxShadow="xl"
                minW="600px"
                maxW="800px"
                maxH="90vh"
                display="flex"
                flexDirection="column"
            >
                <DialogCloseTrigger
                    position="absolute"
                    top={2}
                    right={2}
                    onClick={onClose}
                />

                <Box fontSize="xl" fontWeight="bold" mb={4}>
                    Adjust Resource Allocation
                </Box>

                <Box
                    overflowY="auto"
                    flex="1"
                    pr={2}
                >
                    <ResourceList
                        resourceActivities={resourceActivities}
                        setResourceActivities={setResourceActivities}
                        resources={resources}
                        activities={activities}
                    />
                </Box>
            </Box>
        </DialogRoot>
    )
}

export default MenuModal