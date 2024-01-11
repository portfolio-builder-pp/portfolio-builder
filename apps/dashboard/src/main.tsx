import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './app';

import './styles.scss';
import { TRPCQueryProvider } from './shared/trpc-query';
import { ScopedCssBaseline } from '@mui/material';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <ScopedCssBaseline>
      <BrowserRouter>
        <TRPCQueryProvider>
          <App />
        </TRPCQueryProvider>
      </BrowserRouter>
    </ScopedCssBaseline>
  </StrictMode>
);
