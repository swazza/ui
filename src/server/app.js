import React from "react";
import { renderToString } from "react-dom/server";
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";
import { StaticRouter as Router } from "react-router";
import { routerReducer } from "react-router-redux";
import { App } from "common/App";

export const renderApp = (html, url) => {
  let store = createStore(combineReducers({ router: routerReducer }));
  let context = {};
  let appString = renderToString(
    <Router location={url} context={context}>
      <App />
    </Router>
  );
  let preloadedState = store.getState();
  let renderedApp = html
    .replace("<!--ssr-->", appString)
    .replace(
      "$ssrState",
      JSON.stringify(preloadedState).replace(/</g, "\\u003c")
    );
  return renderedApp;
};
