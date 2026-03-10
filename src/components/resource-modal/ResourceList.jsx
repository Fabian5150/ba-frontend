import { Box, Flex } from "@chakra-ui/react"
import { Checkbox } from "@chakra-ui/react"
import { useCallback } from "react"

const ResourceList = ({
    activities,
    resources,
    resourceActivities,
    setResourceActivities
}) => {
    const handleToggle = useCallback((resource, activity) => {
        setResourceActivities(prev => {
            const currentActivities = prev[resource] || [];
            const isChecked = currentActivities.includes(activity);

            return {
                ...prev,
                [resource]: isChecked
                    ? currentActivities.filter(a => a !== activity)
                    : [...currentActivities, activity]
            };
        });
    }, [setResourceActivities]);

    const isChecked = useCallback((resource, activity) => {
        return resourceActivities[resource]?.includes(activity) || false;
    }, [resourceActivities]);

    return (
        <Box>
            {resources.map(resource => (
                <Box key={resource} mb={4} p={3} borderWidth="1px" borderRadius="md">
                    <Box fontWeight="bold" mb={2}>{resource}</Box>
                    <Flex gap={2} flexWrap="wrap">
                        {activities.map(activity => (
                            <Checkbox.Root
                                key={activity}
                                checked={isChecked(resource, activity)}
                                onCheckedChange={() => handleToggle(resource, activity)}
                                size="sm"
                            >
                                <Checkbox.HiddenInput />
                                <Checkbox.Control />
                                <Checkbox.Label fontSize="sm">{activity}</Checkbox.Label>
                            </Checkbox.Root>
                        ))}
                    </Flex>
                </Box>
            ))}
        </Box>
    );
}

export default ResourceList;