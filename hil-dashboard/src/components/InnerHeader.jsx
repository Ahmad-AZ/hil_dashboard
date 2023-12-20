import React, { useState } from "react";
import { Link, useNavigate  } from "react-router-dom";

const Header = (props) => {
  const navigate = useNavigate();
  const [name, setName] = useState();  
  const handleSubmit = (event) => {
    event.preventDefault();
    // alert(`The name you entered was: ${name}`)
    navigate(`/search/${name}`);
  }
  return (
    <>
      <nav className="navbar bg-body-tertiary navbar-dark bg-dark mb-4">
        <div className="container-lg">
          <div className="d-flex align-items-center">
            <Link className="navbar-brand" to="/">
              Home
            </Link>
            
            {/* <button className="btn btn-primary ms-3" type="submit">
              <Link to="/gencalendar">Calendar</Link>
            </button> */}
          </div>

          <form className="d-flex" role="search" onSubmit={handleSubmit}>
            <input
              className="form-control me-2"
              type="text"
              placeholder="Search"
              aria-label="Search"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <button className="btn btn-outline-success" type="submit">
              Search
            </button>
          </form>
        </div>
      </nav>

      
    </>
  );
};

export default Header;
