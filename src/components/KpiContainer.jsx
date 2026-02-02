import { Center, Card, Heading, List } from "@chakra-ui/react"

const KpiContainer = ({ kpis }) => {
    const objToJsx = o => {
        if (Object.keys(o).length === 0) return;

        const arr = Object.entries(o);

        if (typeof (arr[0][1]) === "object" && arr[0][1] !== null) {
            return arr.map(elem => (
                <List.Item>
                    <List.Root ps="5">
                        {elem[0]}
                    </List.Root>
                    {objToJsx(elem[1])}
                </List.Item>
            ))
        } else {
            return arr.map(elem => (
                <List.Item>{`${elem}`}</List.Item>
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
                <List.Root>
                    {objToJsx(kpis)}
                </List.Root>
            </Card.Root>
        </Center >
    );
}

export default KpiContainer