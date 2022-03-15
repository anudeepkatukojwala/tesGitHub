import "./about.css";
import { Link, Switch, Route } from "react-router-dom";
import React, { useState } from "react";
import Cat from "./cat";
import Gurinder from "./gurinder";
import Zubin from "./zubin";
import Brandon from "./brandon";
import Sebastian from "./sebastian";
import Anudeep from "./anudeep.js";
import TestHomePage from "./testHomePage";
import TestResultPage from "./testResultPage";
import { searchDataContext } from "./Context";

function App() {
  // Define the global state(data) that will be shared
  // among components.
  const [searchData, setSearchData] = useState([]);

  return (
    // Change: Removed the unnecessary body tag
    <header>
      <nav>
        <p>CSC 648</p>
        <ul className="nav_links">
          <li>
            <a href="/src/home.html">Home</a>
          </li>
          <li>
            <a href="/">Service1</a>
          </li>
          <li>
            <a href="/">Service2</a>
          </li>
          <li>
            <a href="/">Service3</a>
          </li>
          <li>
            {/* Change: added new test home page component
            and also added corresponding styles in about.css */}
            <Link to="/TestHomePage">Test Home Page</Link>
          </li>
          <li>
            <a href="/">About Us</a>
            <ul>
              <li>
                {/* Change: Removed the anchor tags to remove the warnings 
                 Also changed 'class' to its jsx equivalent 'className' in 
                 our individual files like: gurinder.js, ...*/}
                <Link to="/zubin">Zubin Kanga</Link>
                <Link to="/brandon">Brandon Butler</Link>
                <Link to="/anudeep">Anudeep Katukojwala</Link>
                <Link to="/sebastian">Sebastian Wcislo</Link>
                <Link to="/cat">Cat Tuong Vu</Link>
                <Link to="/gurinder">Gurinder Singh</Link>
              </li>
            </ul>
          </li>
        </ul>
      </nav>

      <Switch>
        <Route path="/zubin">
          <Zubin />
        </Route>
        <Route path="/brandon">
          <Brandon />
        </Route>
        <Route path="/Anudeep">
          <Anudeep />
        </Route>
        <Route path="/sebastian">
          <Sebastian />
        </Route>
        <Route path="/cat">
          <Cat />
        </Route>
        <Route path="/gurinder">
          <Gurinder />
        </Route>
        {/* searchDataContext.Provider  basically wraps around
        the components in which we want to access our global state(data)
        */}
        <searchDataContext.Provider value={{ searchData, setSearchData }}>
          <Route path="/testHomePage">
            <TestHomePage />
          </Route>
          <Route path="/testResultPage">
            <TestResultPage />
          </Route>
        </searchDataContext.Provider>
      </Switch>
    </header>
  );
}

export default App;
