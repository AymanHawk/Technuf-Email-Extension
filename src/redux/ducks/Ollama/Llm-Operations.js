import { watchers as OllamaWatcher} from "./llm/llmQuery/llmQuery-Operations";

const OllamaSagas = [
    ...OllamaWatcher,
];

export default OllamaSagas;