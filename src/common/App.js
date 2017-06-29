import React from "react";
import { Route } from "react-router";
import { Link } from "react-router-dom";

const Home = ({ Router }) =>
  <div>
    <h2>Home</h2>
  </div>;

const About = () =>
  <div>
    <h2>About</h2>
  </div>;

export const App = () =>
  <div>
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/about">About</Link>
      </li>
    </ul>

    <hr />

    <Route exact path="/" component={Home} />
    <Route path="/about" component={About} />
  </div>;
