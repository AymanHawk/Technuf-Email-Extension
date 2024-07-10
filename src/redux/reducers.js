import {
    combineReducers,
} from 'redux';

import ollamaReducers from './ducks/Ollama';

const reducer = combineReducers({
    llm: ollamaReducers,
})

export default reducer;
