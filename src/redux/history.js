import { createBrowserHistory, createMemoryHistory } from 'history';

const configureHistory = (url) => {
    let history = null;

    if (typeof window !== 'undefined') {
        history = createBrowserHistory();
    } else {
        const config = {};
        if (url) {
            config.initialEntries = [url];
        }
        history = createMemoryHistory(config);
    }

    return history;
};

const history = configureHistory();

export default history;



