import React from 'react';
import { createRoot } from 'react-dom/client';

const App: React.FC = () => {


  return (
    <>Hello world</>
  );
};

createRoot(document.getElementById('root')!).render(<App />);
