import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { HomePage } from '@pages';

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
    </Routes>
  );
};
