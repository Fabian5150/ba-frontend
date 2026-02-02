import { Center, Card, Heading, List, Text } from "@chakra-ui/react"

const KpiContainer = ({ kpis }) => {
    const objToJsx = o => {
        if (Object.keys(o).length === 0) return;

        const arr = Object.entries(o)

        if (typeof (arr[0][1]) === "object" && arr[0][1] !== null) {
            return arr.map(elem => (
                <List.Item key={elem}>
                    <Text fontWeight="semibold">
                        {elem[0]}
                    </Text>
                    <List.Root ps={5}>
                        {objToJsx(elem[1])}
                    </List.Root>
                </List.Item>
            ))
        } else {
            return arr.map(elem => (
                <List.Item key={elem}>
                    {`${elem[0]}: ${elem[1]}`}
                </List.Item>
            ))
        }
    }

    return (
        <Center height="100%">
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
                <List.Root pl={2}>
                    {objToJsx(kpis)}
                </List.Root>
            </Card.Root>
        </Center >
    );
}

export default KpiContainer