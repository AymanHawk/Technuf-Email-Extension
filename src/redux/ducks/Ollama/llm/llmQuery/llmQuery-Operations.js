//src/redux/ducks/Ollama/llm/llmQuery/llmQuery-Operations.js

import { call, fork, put, takeEvery, takeLeading } from "redux-saga/effects";
import {
    llmQueryRequest,
    loadLlmQuery,
    llmQueryError,
    llmQueryIsLoading,
} from "./llmQuery-Actions";
import { apiHub } from "../../../../../api";

function* workerGetLlmQuery(action) {
    yield put(llmQueryError(''))
    yield put(llmQueryIsLoading(true))
    try {

        const { model, query, role, format, expectedFormat, additionalInfo, phishingJson, safeJson } = action.data
        const response = yield call(apiHub.llmQuery, {
            model,
            query,
            role,
            format,
            expectedFormat,
            additionalInfo,
            phishingJson,
            safeJson
        })
        yield put(loadLlmQuery(response))
    } catch (error) {
        let errorMessage = error?.response?.data?.errorMessage || 'Failed To Get Email Reponse';
        yield put(llmQueryError(errorMessage));
        console.log(error);
    }
    yield put(llmQueryIsLoading(false));
}

function* watcherGetLlmQuery() {
    yield takeEvery(llmQueryRequest().type, workerGetLlmQuery);
}

export const watchers = [
    fork(watcherGetLlmQuery),
];