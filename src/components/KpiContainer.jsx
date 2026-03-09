import { Center, Card, Heading, List, Text, Spinner } from "@chakra-ui/react"

const KpiContainer = ({ kpis, loading }) => {
    const objToJsx = o => {
        if (Object.keys(o).length === 0) return;

        const arr = Object.entries(o);

        return arr.map(elem => {
            if (typeof elem[1] === "object" && elem[1] !== null) {
                return (
                    <List.Item key={elem[0]}>
                        <Text fontWeight="semibold">
                            {elem[0]}
                        </Text>
                        <List.Root ps={5}>
                            {objToJsx(elem[1])}
                        </List.Root>
                    </List.Item>
                );
            } else {
                return (
                    <List.Item key={elem[0]}>
                        {`${elem[0]}: ${elem[1]}`}
                    </List.Item>
                );
            }
        });
    }

    return (
        <Center>
            <Card.Root
                variant="outline"
                borderRadius="md"
                height="100%"
                width="100%"
                p={3}
            >
                <Heading>
                    Current Performance
                </Heading>
                {loading
                    ? <Center h="90vh">
                        <Spinner size="xl" />
                    </Center>
                    : <List.Root pl={2}>
                        {objToJsx(kpis)}
                    </List.Root>}
            </Card.Root>
        </Center >
    );
}

export default KpiContainer;