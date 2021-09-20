import React from 'react';
import CarsList from './../../components/CarsList/CarsList';
import DriversList from '../../components/DriversList/DriversList';
import MainLayout  from '../../layouts/MainLayout';

function Home(){
  return (
    <MainLayout>
      <CarsList />
      <DriversList />
    </MainLayout>
  );
}

export default Home;