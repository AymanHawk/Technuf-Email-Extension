import {
    LLM_QUERY_ERROR,
    CLEAR_LLM_QUERY,
    LOAD_LLM_QUERY,
    LLM_QUERY_IS_LOADING,
} from "./llmQuery-ActionTypes";

const initialState = {
    data: {},
    error: '', 
    isLoading: false,
}

const executeLlmQuery = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_LLM_QUERY:
            return {
                ...state,
                data: action.data,
            }
        case LLM_QUERY_ERROR:
            return {
                ...state,
                error: action.data,
            }
        case LLM_QUERY_IS_LOADING:
            return {
                ...state,
                isLoading: action.data,
            }
        case CLEAR_LLM_QUERY:
            return initialState
        default:
            return state;
    }
}

export default executeLlmQuery;