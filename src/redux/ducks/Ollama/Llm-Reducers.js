import { combineReducers } from "redux";

import executeLlmQuery from "./llm/llmQuery/llmQuery-Reducers";

const ollamaReducers = combineReducers({
    ollama: executeLlmQuery,
});

export default ollamaReducers;