import {
    DialogRoot,
    DialogCloseTrigger,
    DialogBackdrop,
    Box
} from "@chakra-ui/react"

const MenuModal = ({ open, onClose }) => {
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
                minW="400px"
            >
                <DialogCloseTrigger
                    position="absolute"
                    top={2}
                    right={2}
                    onClick={onClose}
                />
                <Box fontSize="xl" fontWeight="bold" mb={4}>
                    Menu
                </Box>
                <Box>
                    <p>Menu items coming soon...</p>
                </Box>
            </Box>
        </DialogRoot>
    )
}

export default MenuModal