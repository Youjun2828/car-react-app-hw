import React from 'react';
import SpectatorForm from './../../components/SpectatorForm/SpectatorForm';
import ErrorBoundary from './../../components/ErrorBoundary/ErrorBoundary';
import MainLayout from '../../layouts/MainLayout';

function AddSpectator() {
  return (
    <MainLayout>
      <h1
        style={{
          marginInlineStart: '15px',
        }}
      >
        AddSpectator
      </h1>
      <ErrorBoundary>
        <SpectatorForm />
      </ErrorBoundary>
    </MainLayout>
  );
}

export default AddSpectator;
