import { Layout } from "../components/layout/Layout";
import "../styles/globals.css";
import { Auth0Provider, useAuth0 } from "@auth0/auth0-react";
import { useMemo } from "react";

const MyApp = ({ Component, pageProps }) => {
  const origin = useMemo(() => {
    if (typeof window != "undefined") {
      return window.location.origin;
    }
  }, []);
  return (
    <Auth0Provider
      domain={process.env.NEXT_PUBLIC_AUTH0_DOMAIN}
      clientId={process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID}
      redirectUri={origin}
    >
    <Layout>
      <Component {...pageProps} />
    </Layout>
    </Auth0Provider>
  );
};

export default MyApp;
