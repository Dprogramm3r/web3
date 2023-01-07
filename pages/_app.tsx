import '../styles/globals.css'
import type { AppProps } from 'next/app'
import "@rainbow-me/rainbowkit/styles.css";
import {configureChains, WagmiConfig,createClient  } from 'wagmi';
import { avalanche, bsc,optimism, arbitrum, mainnet,polygon, localhost } from '@wagmi/core/chains'
import { publicProvider } from '@wagmi/core/providers/public'
import { getDefaultWallets } from '@rainbow-me/rainbowkit';
import {
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';

const {chains, provider} = configureChains(
  [mainnet, avalanche, bsc,polygon, localhost,optimism, arbitrum],
  [publicProvider()]
);

const {connectors} = getDefaultWallets({
  appName: "multiwallet connect",
  chains,
})
const wagmiClient = createClient({
  autoConnect:true,
  connectors,
  provider
})

export default function App({ Component, pageProps }: AppProps) {
  return ( 
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
      <Component {...pageProps} />
      </RainbowKitProvider>
  </WagmiConfig>

  )
}
