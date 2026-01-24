import { Center, Card, Heading } from "@chakra-ui/react"
import kpiPlaceholder from "../assets/kpi-placeholder-text.json"

const KpiContainer = () => {
    return (
        <Center
            height="100%"
            width="100%"
        >
            <Card.Root
                variant="outline"
                borderRadius="md"
                m={4}
            >
                <Card.Header>
                    <Heading>
                        Current Performance
                    </Heading>
                </Card.Header>
                <Card.Body>
                    {/* Placeholder values */}
                    <pre style={{ fontFamily: 'inherit' }}>
                        {kpiPlaceholder.text}
                    </pre>
                </Card.Body>
            </Card.Root>
        </Center >
    );
}

export default KpiContainer