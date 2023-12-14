import "../styles/globals.css"; // 导入全局样式
import "@rainbow-me/rainbowkit/styles.css";
import Layout from "../components/Layout";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { collectChains } from "@/contants/chains";
import { GlobalStore } from "@/store/global.store";
import { Provider } from "reto";

const { chains, publicClient } = configureChains(collectChains, [
  publicProvider(),
]);

const { connectors } = getDefaultWallets({
  appName: "RED-POCKET",
  projectId: "1434fcd28b4ae93f54487f7756c9641d",
  chains,
});

console.log(chains);

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});
function MyApp({ Component, pageProps }) {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains}>
        <Provider of={GlobalStore}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </Provider>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default MyApp;
