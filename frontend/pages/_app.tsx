import { Layout } from "../components/layout/Layout";
import "../styles/globals.css";
import { Auth0Provider, useAuth0 } from "@auth0/auth0-react";
import { useEffect, useMemo, useState } from "react";
import { SWRConfig } from "swr";
import { backend_fetcher } from "../lib/fetcher"


const AuthenticatedApp = ({ children }) => {
  // Fetch accessToken for api audience
  const [token, setToken] = useState("");
  const { getAccessTokenSilently } = useAuth0();
  useEffect(() => {
    getAccessTokenSilently().then((mytoken) => {
      setToken(mytoken);
    });
  }, []);

  return (
    <SWRConfig value={{ fetcher: backend_fetcher(token) }}>
      {children}
    </SWRConfig>
  );
};


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
      <AuthenticatedApp>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AuthenticatedApp>
    </Auth0Provider>
  );
};

export default MyApp;
