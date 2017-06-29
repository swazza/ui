import React from "react";
import { render } from "react-dom";
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import {
  ConnectedRouter as Router,
  routerReducer,
  routerMiddleware,
  push
} from "react-router-redux";
import createHistory from "history/createBrowserHistory";
import { App } from "common/App";

const history = createHistory(),
  middleware = routerMiddleware(history),
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose,
  store = createStore(
    combineReducers({ router: routerReducer }),
    composeEnhancers(applyMiddleware(middleware))
  );

const renderApp = () =>
  render(
    <Provider store={store}>
      <Router history={history}>
        <App />
      </Router>
    </Provider>,
    document.querySelector("#mount")
  );

renderApp();

if (module.hot) {
  module.hot.accept("common/App", () => {
    renderApp();
  });
}
