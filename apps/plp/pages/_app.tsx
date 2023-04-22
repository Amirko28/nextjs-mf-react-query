import { AppProps } from 'next/app';
import Head from 'next/head';

import { GlobalStyles } from '../components/GlobalStyles';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Welcome to plp!</title>
      </Head>
      <main className="app">
        <GlobalStyles />
        <Component {...pageProps} />
      </main>
    </>
  );
}

export default CustomApp;
