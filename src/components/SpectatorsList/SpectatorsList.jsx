import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './SpectatorsList.css';
import { SpectatorsContext } from './../../contexts/SpectatorsContext';
// import Loading from './../Loading/Loading';

function SpectatorsList() {
  const { fetchSpectators, deleteSpectator, loading, error, Spectators } =
    useContext(SpectatorsContext);

  useEffect(() => {
    fetchSpectators();
  }, []);

  return (
    <section className="spectators-list-section">
      <div className="container">
        <h1 className="section-heading">Spectators List</h1>
        {/* <Loading show={loading} /> */}
        {loading && <p>Loading ...</p>}
        {error && <p>{error}</p>}
        {Spectators?.length ? (
          <ul className="spectators-list">
            {Spectators.map(({ _id, firstName, lastName, email}) => (
              <li key={_id} className="spectators-list-item">
                <p>
                  {firstName} {lastName} (email: {email})
                </p>
                <Link to={`/spectators/update/${_id}`} className="update-link">
                  Update
                </Link>
                <button
                  onClick={() => deleteSpectator(_id)}
                  className="delete-btn"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No Spectators to display</p>
        )}
      </div>
    </section>
  );
}

export default SpectatorsList;
