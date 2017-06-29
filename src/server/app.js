import React from "react";
import { renderToString } from "react-dom/server";
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";
import { StaticRouter as Router } from "react-router";
import { routerReducer } from "react-router-redux";
import { ApolloClient, ApolloProvider, createNetworkInterface } from "react-apollo";
import { App } from "common/App";

export const renderApp = (html, url) => {
  const networkInterface = createNetworkInterface({ uri: "http://localhost:4000/graphql" }),
    client = new ApolloClient({ networkInterface, ssrMode: true }),
    store = createStore(combineReducers({ router: routerReducer, apollo: client.reducer() }));

  let context = {};
  let appString = renderToString(
    <ApolloProvider client={client}>
      <Router location={url} context={context}>
        <App />
      </Router>
    </ApolloProvider>
  );
  let preloadedState = store.getState();
  let renderedApp = html
    .replace("<!--ssr-->", appString)
    .replace("$ssrState", JSON.stringify(preloadedState).replace(/</g, "\\u003c"));
  return renderedApp;
};
