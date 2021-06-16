import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Heading } from '@chakra-ui/react';

const Home: React.FC = () => {
  return (
    <>
      <Head>
        <title>boilerplate</title>
        <meta
          property="og:image"
          content="https://nextjs.org/static/twitter-cards/home.jpg"
        />
      </Head>
      <Heading>Almost before we knew it, we had left the ground.</Heading>
      <Link href="/dashboard">Login</Link>
    </>
  );
};

export default Home;
