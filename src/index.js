import ReactDOM from "react-dom/client";
import { ChakraProvider, createSystem, defaultConfig } from "@chakra-ui/react";
import App from "./App";

const system = createSystem(defaultConfig);

ReactDOM.createRoot(document.getElementById("root")).render(
	<ChakraProvider value={system} overflow="hidden">
		<App />
	</ChakraProvider>
);