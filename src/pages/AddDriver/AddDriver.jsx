import React from 'react';
import DriverForm from './../../components/DriverForm/DriverForm';
import ErrorBoundary from './../../components/ErrorBoundary/ErrorBoundary';
import MainLayout from '../../layouts/MainLayout';

function AddDriver() {
  return (
    <MainLayout>
      <h1
        style={{
          marginInlineStart: '15px',
        }}
      >
        AddDriver
      </h1>
      <ErrorBoundary>
        <DriverForm />
      </ErrorBoundary>
    </MainLayout>
  );
}

export default AddDriver;
