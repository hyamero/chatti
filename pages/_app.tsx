import "../styles/globals.css";
import "../styles/tailwind.css";
import "../styles/utils.css";

import type { AppProps } from "next/app";
import { AuthProvider } from "../src/contexts/AuthContext";
import Layout from "../src/components/Layout";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthProvider>
  );
}

export default MyApp;
