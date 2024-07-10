import {
    LLM_QUERY_REQUEST,
    LOAD_LLM_QUERY,
    LLM_QUERY_ERROR,
    LLM_QUERY_IS_LOADING,
    CLEAR_LLM_QUERY,
} from "./llmQuery-ActionTypes";

export const llmQueryRequest = (
    model,
    query,
    role,
    format,
    expectedFormat,
    additionalInfo,
    phishingJson,
    safeJson
) => ({
    type: LLM_QUERY_REQUEST,
    data: {
        model,
        query,
        role,
        format,
        expectedFormat,
        additionalInfo,
        phishingJson,
        safeJson
    },
});

export const loadLlmQuery = (data) => ({
    type: LOAD_LLM_QUERY,
    data,
});

export const llmQueryError = (data) => ({
    type: LLM_QUERY_ERROR,
    data,
});

export const llmQueryIsLoading = (data) => ({
    type: LLM_QUERY_IS_LOADING,
    data,
});

export const clearLlmQuery = () => ({
    type: CLEAR_LLM_QUERY,
});
