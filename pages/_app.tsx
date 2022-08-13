import "../styles/main.css";
import "../styles/utils.css";

import type { AppProps } from "next/app";
import { AuthProvider } from "../src/contexts/AuthContext";
import Layout from "../src/components/Layout";
import { DefaultSeo } from "next-seo";

import SEO from "../next-seo-config";
import { GlobalContextProvider } from "../src/contexts/GlobalContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <GlobalContextProvider>
      <AuthProvider>
        <DefaultSeo {...SEO} />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AuthProvider>
    </GlobalContextProvider>
  );
}

export default MyApp;
