import { all } from "redux-saga/effects";
import OllamaSagas from "./ducks/Ollama/Llm-Operations";

const allSagas = [
    ...OllamaSagas,
]

function* rootSaga() {
    yield all(allSagas)
}

export default rootSaga;

