import * as React from "react";
import { render } from "react-dom";
import { App } from "./components/App";
import { Provider } from 'react-redux'
import { createStore, combineReducers, compose } from 'redux'

const rootEl = document.getElementById("root");

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    combineReducers({
    }),
    composeEnhancers()
)


render(
    <Provider store={store}>
        <App />
    </Provider>
    , rootEl);
