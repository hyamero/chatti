import "../styles/globals.css";
import "../styles/tailwind.css";

import type { AppProps } from "next/app";
import { AuthProvider } from "../src/contexts/AuthContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;
