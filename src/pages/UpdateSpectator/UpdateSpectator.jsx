import React, { useContext } from "react";
import { useParams, useHistory} from "react-router-dom";
import { useToasts } from 'react-toast-notifications';
import SpectatorForm from "./../../components/SpectatorForm/SpectatorForm";
import { SpectatorsContext } from "./../../contexts/SpectatorsContext";
import ErrorBoundary from "./../../components/ErrorBoundary/ErrorBoundary";
import MainLayout from "../../layouts/MainLayout";

import "./UpdateSpectator.css";

function UpdateSpectator() {
  let { id } = useParams();
  let history = useHistory();
  const { Spectators } = useContext(SpectatorsContext);
  const { addToast } = useToasts();
  const SpectatorToBeUpdated = Spectators.find(({ id }) => id === id);

  if (!SpectatorToBeUpdated) {
    addToast(`Error: cannot find Spectator with id ${id}. Redirecting...`, {
      appearance: "error",
    });
    history.push("/");
    return null;
  }

  return (
    <MainLayout>
      <h1>Update Spectator</h1>
      <ErrorBoundary>
        <SpectatorForm Spectator={SpectatorToBeUpdated} />
      </ErrorBoundary>
    </MainLayout>
  );
}

export default UpdateSpectator;
