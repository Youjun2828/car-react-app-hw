import React from 'react';
import MainLayout  from '../../layouts/MainLayout';
import SpectatorsList from '../../components/SpectatorsList/SpectatorsList';

function Spectators(){
  return (
    <MainLayout>
      <SpectatorsList />
    </MainLayout>
  );
}

export default Spectators;