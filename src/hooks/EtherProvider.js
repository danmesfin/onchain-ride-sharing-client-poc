// ethereumProvider.js

import { ethers } from 'ethers';
import { useEthereum } from '@particle-network/auth-core-modal';
import { AAWrapProvider, SendTransactionMode, SmartAccount } from '@particle-network/aa';
import { Avalanche, AvalancheTestnet } from '@particle-network/chains';

export const useCustomProvider = () => {
  const { provider } = useEthereum();

  const smartAccount = new SmartAccount(provider, {
    projectId: import.meta.env.VITE_PARTICLE_PROJECT_ID ?? '',
    clientKey: import.meta.env.VITE_PARTICLE_CLIENT_KEY ?? '',
    appId: import.meta.env.VITE_PARTICLE_APP_ID ?? '',
    aaOptions: {
      simple: [{ chainId:  AvalancheTestnet.id, version: '1.0.0' }]
    }
  });

  const customProvider = new ethers.providers.Web3Provider(new AAWrapProvider(smartAccount, SendTransactionMode.Gasless), "any");

  return {customProvider, smartAccount};
};
