import React, { useContext } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { searchDataContext } from "./Context";

// Axios is a library used to send requests
// to our backend server.
import Axios from "axios";

const TestHomePage = () => {
  // UseState hook(special function provided by React) is
  // used to manage state(data), for example - freeSearch is
  // initialized to "", and later according to user input
  // we update it using the setFreeSearch().
  const [freeSearch, setFreeSearch] = useState("");
  const [displayLink, setDisplayLink] = useState(false);
  const [category, setcategory] = useState("all");
  const { searchData, setSearchData } = useContext(searchDataContext);

  const handleSearch = () => {
    // Inside the get request we are inserting
    // query parameters that contains user-entered
    // text, and user-entered category.
    Axios.get("/api/get", {
      params: { searchTerm: freeSearch, category: category },
    })
      .then((response) => {
        setSearchData([response.data]);
        setDisplayLink(true);
      })
      .catch((err) => {
        console.log(`failed because of ${err}`);
        setDisplayLink(false);
      });
  };

  return (
    <section className="testHomePage">
      <article className="teamInfo">
        <h2>CSC648-02</h2>
        <p>Gurinder Singh</p>
        <p>Anudeep Katukojwala</p>
        <p>Sebastian Wcislo</p>
        <p>Cat Tuong Vu</p>
        <p>Zubin Kanga</p>
      </article>
      <article className="search">
        <input
          type="text"
          placeholder="Search"
          name="freeTextEntry"
          value={freeSearch}
          // As the name imply onChange
          // function helps us to update
          // a state(data), in this case
          // we are updating the freeSearch
          onChange={(e) => {
            setFreeSearch(e.target.value);
          }}
        />
        <select
          id="catagories"
          value={category}
          onChange={(e) => {
            setcategory(e.target.value);
          }}
        >
          <option value="all">All</option>
          <option value="city">City</option>
          <option value="tech_area">Tech Area</option>
          <option value="jobType">Job Type</option>
        </select>
        {/* Once the user is done entering the search
        query, they can decide to hit the sumbit button, which
        will trigger the call to the handleSearch() where we
        handle the logic regarding sending request to our server */}
        <button onClick={() => handleSearch()}>Submit</button>
      </article>
      <article className="test-result-message">
        {/* Once the user has hit the sumbit button and the server
        has sent the appropriate data, then we can prompt the user to
        view the results by following the provided link. If nothing has
        happened then there is no need for user to see the link*/}
        {displayLink && (
          <>
            <h2>
              Results are available please click on the provided link
              <Link to="/TestResultPage"> Results</Link>
            </h2>
          </>
        )}
      </article>
    </section>
  );
};

export default TestHomePage;
