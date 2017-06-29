import React from "react";
import { render } from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import createHistory from "history/createBrowserHistory";
import { App } from "common/App";

const history = createHistory();
const renderApp = () =>
  render(
    <Router history={history}>
      <App />
    </Router>,
    document.querySelector("#mount")
  );

renderApp();

if (module.hot) {
  module.hot.accept("common/App", () => {
    renderApp();
  });
}
