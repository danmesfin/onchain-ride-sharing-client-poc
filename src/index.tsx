import React from 'react'
import ReactDOM from 'react-dom/client'
import { Avalanche } from '@particle-network/chains';
import { AuthCoreContextProvider } from '@particle-network/auth-core-modal';
import App from './App'

import('buffer').then(({ Buffer }) => {
  window.Buffer = Buffer;
});

console.log('xo',  import.meta.env.VITE_PARTICLE_PROJECT_ID)

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AuthCoreContextProvider
      options={{
        projectId: import.meta.env.VITE_PARTICLE_PROJECT_ID,
        clientKey: import.meta.env.VITE_PARTICLE_CLIENT_KEY,
        appId: import.meta.env.VITE_PARTICLE_APP_ID,
        erc4337: {
          name: 'SIMPLE',
          version: '1.0.0',
        },
        wallet: {
          visible: true,
          customStyle: {
              supportChains: [Avalanche],
          }
        }
      }}
    >
    <App />
      </AuthCoreContextProvider>
  </React.StrictMode>
)