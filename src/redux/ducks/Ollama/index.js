import * as LlmQueryActions from './llm/llmQuery/llmQuery-Actions';
import * as LlmQueryActionTypes from './llm/llmQuery/llmQuery-ActionTypes';
import * as LlmQueryOperations from './llm/llmQuery/llmQuery-Operations';


import ollamaReducers from './Llm-Reducers';

const LlmQueryWatcherSagas = [
    ...LlmQueryOperations.watchers,
];

export {
    LlmQueryActions,
    LlmQueryActionTypes,
    LlmQueryOperations,

    LlmQueryWatcherSagas
}

export default ollamaReducers;