import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './DriversList.css';
import { DriversContext } from './../../contexts/DriversContext';
// import Loading from './../Loading/Loading';

function DriversList() {
  const { fetchDrivers, deleteDriver, loading, error, Drivers } =
    useContext(DriversContext);

  useEffect(() => {
    fetchDrivers();
  }, []);

  return (
    <section className="Drivers-list-section">
      <div className="container">
        <h1 className="section-heading">Drivers List</h1>
        {/* <Loading show={loading} /> */}
        {loading && <p>Loading ...</p>}
        {error && <p>{error}</p>}
        {Drivers?.length ? (
          <ul className="Drivers-list">
            {Drivers.map(({ _id, firstname, lastname, email, age }) => (
              <li key={_id} className="Drivers-list-item">
                <p>
                  {firstname} {lastname} ({age} years old) (email: {email})
                </p>
                <Link to={`/Drivers/update/${_id}`} className="update-link">
                  Update
                </Link>
                <button
                  onClick={() => deleteDriver(_id)}
                  className="delete-btn"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No Drivers to display</p>
        )}
      </div>
    </section>
  );
}

export default DriversList;
