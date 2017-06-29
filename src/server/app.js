import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter as Router } from "react-router";
import { App } from "common/App";

export const renderApp = (html, url) => {
  let context = {};
  let appString = renderToString(
    <Router location={url} context={context}>
      <App />
    </Router>
  );
  let renderedApp = html.replace("<!--ssr-->", appString);
  return renderedApp;
};
