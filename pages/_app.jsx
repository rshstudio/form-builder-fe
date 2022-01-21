import "@styles/globals.css";
import Layout from "@components/Layout";
import { LayoutProvider } from "@context/layout";

function MyApp({ Component, pageProps }) {
  return (
    <LayoutProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </LayoutProvider>
  );
}

export default MyApp;
