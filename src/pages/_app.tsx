import React, { useEffect } from 'react';
import NProgress from 'nprogress';
import Router from 'next/router';
import { AppProps } from 'next/app';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { FuegoProvider } from '@nandorojo/swr-firestore';

import Fuego from '../lib/swr-firestore';
import myTheme from '../styles/theme';
import AppProvider from '../hooks';
import fire, { firebaseConfig } from '../lib/firebase';

Router.events.on('routeChangeStart', () => {
  NProgress.start();
});

Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

const theme = extendTheme(myTheme);

const fuego = new Fuego(firebaseConfig);

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  useEffect(() => {
    const logEvent = url => {
      fire.analytics().setCurrentScreen(url);
      fire.analytics().logEvent('page_view', {});
    };

    Router.events.on('routeChangeComplete', logEvent);
    // For First Page
    logEvent(window.location.pathname);

    // Remove Event Listener after un-mount
    return () => {
      Router.events.off('routeChangeComplete', logEvent);
    };
  }, []);

  return (
    <AppProvider>
      <FuegoProvider fuego={fuego}>
        <ChakraProvider theme={theme}>
          <Component {...pageProps} />
        </ChakraProvider>
      </FuegoProvider>
    </AppProvider>
  );
};

export default MyApp;
