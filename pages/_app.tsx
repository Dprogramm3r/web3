import '../styles/globals.css'
import type { AppProps } from 'next/app'
import "@rainbow-me/rainbowkit/styles.css";
import {configureChains, WagmiConfig,createClient  } from 'wagmi';
import { avalanche, bsc,optimism, arbitrum, mainnet,polygon, localhost } from '@wagmi/core/chains'
import { publicProvider } from '@wagmi/core/providers/public'
import { getDefaultWallets } from '@rainbow-me/rainbowkit';
import {
  RainbowKitProvider,connectorsForWallets
} from '@rainbow-me/rainbowkit';
import {
  injectedWallet,
  rainbowWallet,
  walletConnectWallet,metaMaskWallet,trustWallet,coinbaseWallet,omniWallet,ledgerWallet,braveWallet 
} from '@rainbow-me/rainbowkit/wallets';

const {chains, provider} = configureChains(
  [mainnet, avalanche, bsc,polygon, localhost,optimism, arbitrum],
  [publicProvider()]
);

const connectors = connectorsForWallets([
  {
    groupName: 'Recommended',
    wallets: [
      injectedWallet({ chains }),
      rainbowWallet({ chains }),
      metaMaskWallet({ chains }),
      trustWallet({ chains }),
    ],
  },
  {
    groupName: 'Others',
    wallets: [
      coinbaseWallet({ chains, appName: 'Others' }),
      walletConnectWallet({ chains }),
      ledgerWallet({ chains }),
      braveWallet({ chains }),
      omniWallet({ chains }),
    ],
  },
]);

const wagmiClient = createClient({
  autoConnect:true,
  connectors,
  provider
})

export default function App({ Component, pageProps }: AppProps) {
  return ( 
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}  modalSize="compact" >
      <Component {...pageProps} />
      </RainbowKitProvider>
  </WagmiConfig>

  )
}
