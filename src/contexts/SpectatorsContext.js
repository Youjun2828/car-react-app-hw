import React, { createContext, useState } from 'react';
import { useToasts } from 'react-toast-notifications';
// import cloneDeep from 'lodash.cloneDeep' <-- use if your objects get complex

export const SpectatorsContext = createContext({
  fetchSpectators: () => [],
  addSpectator: () => {},
  updateSpectator: () => {},
  deleteSpectator: () => {},
  loaded: false,
  loading: false,
  error: null,
  Spectators: [],
});

export const SpectatorsProvider = (props) => {
  const [Spectators, setSpectators] = useState(() => {
    return JSON.parse(localStorage.getItem('Spectators')) || [];
  });
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(null);
  // const [search, setSearch] = useState("");
  const { addToast } = useToasts();

  const SPECTATORS_ENDPOINT =
    'http://react-cars-server.herokuapp.com/spectators/';

  const fetchSpectators = async () => {
    // console.log('loading', loading);
    // console.log('error', error);
    if (loading || loaded || error) {
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(SPECTATORS_ENDPOINT);
      if (response.status !== 200) {
        throw response;
      }
      const data = await response.json();
      localStorage.setItem('Spectators', JSON.stringify(data));
      setSpectators(data);

      // setLoading(false);
      // console.log('Spectators from context', Spectators);
    } catch (err) {
      setError(err.message || err.statusText);
    } finally {
      setLoaded(true);
      setLoading(false);
    }
  };

  const addSpectator = async (formData) => {
    console.log('about to add', formData);
    try {
      const response = await fetch(SPECTATORS_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(formData),
      });
      if (response.status !== 201) {
        throw response;
      }
      const savedSpectator = await response.json();
      console.log('got data', savedSpectator);
      const newSpectators = [...Spectators, savedSpectator];
      localStorage.setItem('Spectators', JSON.stringify(newSpectators));
      setSpectators(newSpectators);
      // addToast(`Saved ${savedSpectator.name}`, {
      //   appearance: "success",
      // });
    } catch (err) {
      console.log(err);
      addToast(`Error ${err.message || err.statusText}`, {
        appearance: 'error',
      });
    }
  };

  const updateSpectator = async (id, formData) => {
    console.log('updating', id, formData);
    let updatedSpectator = null;
    // Get index
    const index = Spectators.findIndex((Spectator) => Spectator.id === id);
    console.log(index);
    if (index === -1) throw new Error(`Spectator with index ${id} not found`);
    // Get actual Spectator
    const oldSpectator = Spectators[index];
    console.log('oldSpectator', oldSpectator);

    // Send the differences, not the whole update
    const updates = {};

    for (const key of Object.keys(oldSpectator)) {
      if (key === 'id') continue;
      if (oldSpectator[key] !== formData[key]) {
        updates[key] = formData[key];
      }
    }

    try {
      const response = await fetch(`${SPECTATORS_ENDPOINT}${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(updates),
      });

      if (response.status !== 200) {
        throw response;
      }

      // Merge with formData
      updatedSpectator = {
        ...oldSpectator,
        ...formData, // order here is important for the override!!
      };
      console.log('updatedSpectator', updatedSpectator);
      // recreate the Spectators array
      const updatedSpectators = [
        ...Spectators.slice(0, index),
        updatedSpectator,
        ...Spectators.slice(index + 1),
      ];
      localStorage.setItem('Spectators', JSON.stringify(updatedSpectators));
      // addToast(`Updated ${updatedSpectator.name}`, {
      //   appearance: "success",
      // });
      setSpectators(updatedSpectators);
    } catch (err) {
      console.log(err);
      addToast(
        `Error: Failed to update ${oldSpectator ? oldSpectator?.name : id}`,
        {
          appearance: 'error',
        },
      );
    }
  };

  const deleteSpectator = async (id) => {
    let deletedSpectator = null;
    try {
      const response = await fetch(`${SPECTATORS_ENDPOINT}${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
      if (response.status !== 204) {
        throw response;
      }
      // Get index
      const index = Spectators.findIndex((Spectator) => Spectator.id === id);
      deletedSpectator = Spectators[index];
      // recreate the Spectators array without that Spectator
      const updatedSpectators = [
        ...Spectators.slice(0, index),
        ...Spectators.slice(index + 1),
      ];
      localStorage.setItem('Spectators', JSON.stringify(updatedSpectators));
      setSpectators(updatedSpectators);
      console.log(`Deleted ${deletedSpectator.name}`);
      // addToast(`Deleted ${deletedSpectator.name}`, {
      //   appearance: "success",
      // });
    } catch (err) {
      console.log(err);
      addToast(`Error: Failed to update ${deletedSpectator.name}`, {
        appearance: 'error',
      });
    }
  };

  return (
    <SpectatorsContext.Provider
      value={{
        Spectators,
        loading,
        error,
        fetchSpectators,
        addSpectator,
        updateSpectator,
        deleteSpectator,
      }}
    >
      {props.children}
    </SpectatorsContext.Provider>
  );
};
