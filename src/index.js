import React from 'react';
import { createRoot } from 'react-dom/client';
import MainApp from './app'; 

const App = () => {
  return <MainApp />;
};

const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<App tab="home" />);