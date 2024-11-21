import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Layout from './components/Layout';
import AppRoutes from './routes';
import { useTheme } from './hooks/useTheme';

function App() {
  const { theme } = useTheme();

  return (
    <div className={theme}>
      <BrowserRouter>
        <Layout>
          <AppRoutes />
        </Layout>
      </BrowserRouter>
    </div>
  );
}

export default App;