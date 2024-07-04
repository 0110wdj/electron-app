import React from 'react';
import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';

const App = () => {
  return <h1>Hello, Electron and React!</h1>;
};

const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<App tab="home" />);