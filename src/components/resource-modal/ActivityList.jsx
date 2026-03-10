import { useState } from "react"
import { Box, Flex } from "@chakra-ui/react"
import { Checkbox } from "@chakra-ui/react"

const activities = ["A", "B", "C", "D"]
const resources = ["Hans", "Klaus", "Bärbel"]

const ActivityList = () => {
    const [resourceActivities, setResourceActivities] = useState(
        resources.reduce((acc, resource) => ({
            ...acc,
            [resource]: activities.reduce((a, activity) => ({ ...a, [activity]: false }), {})
        }), {})
    );

    const handleToggle = (resource, activity) => {
        setResourceActivities(prev => ({
            ...prev,
            [resource]: {
                ...prev[resource],
                [activity]: !prev[resource][activity]
            }
        }));
    };

    return (
        <Box>
            {resources.map(resource => (
                <Box key={resource} mb={4} p={3} borderWidth="1px" borderRadius="md">
                    <Box fontWeight="bold" mb={2}>{resource}</Box>
                    <Flex gap={4} flexWrap="wrap">
                        {activities.map(activity => (
                            <Checkbox.Root
                                key={activity}
                                checked={resourceActivities[resource][activity]}
                                onCheckedChange={() => handleToggle(resource, activity)}
                            >
                                <Checkbox.HiddenInput />
                                <Checkbox.Control />
                                <Checkbox.Label>{activity}</Checkbox.Label>
                            </Checkbox.Root>
                        ))}
                    </Flex>
                </Box>
            ))}
        </Box>
    );
}

export default ActivityList;