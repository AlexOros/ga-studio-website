// import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Roboto } from "@next/font/google";
import Layout from "components/Layout";
import { appWithTranslation } from "next-i18next";

// TODO add one or more font
const robot = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <main className={robot.className}>
        <Component {...pageProps} />
      </main>
    </Layout>
  );
}

export default appWithTranslation(App);
