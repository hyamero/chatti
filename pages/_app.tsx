import "../styles/main.css";
import "../styles/utils.css";

import type { AppProps } from "next/app";
import { AuthProvider } from "../src/contexts/AuthContext";
import Layout from "../src/components/Layout";
import { DefaultSeo } from "next-seo";

import SEO from "../next-seo-config";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <DefaultSeo {...SEO} />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthProvider>
  );
}

export default MyApp;
