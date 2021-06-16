import { Container, Flex, Spinner, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import Auth from '.';

import { useAuth } from '../../hooks/auth';
import VerifyEmail from './VerifyEmail';

const withAuth = (Component: React.FC) => (): JSX.Element => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [shouldLogin, setShouldLogin] = useState(false);
  const [timeouts, setTimeouts] = useState<NodeJS.Timeout[]>([]);

  useEffect(() => {
    if (!user) {
      const timeoutRef = setTimeout(() => setShouldLogin(true), 1000);

      setTimeouts([...timeouts, timeoutRef]);
    }

    if (user) {
      setIsLoading(false);
      setShouldLogin(false);
      timeouts.map(timeout => clearTimeout(timeout));
    }
  }, [user]);

  // if isLoading return a loader
  if (isLoading && !shouldLogin) {
    return (
      <Flex height="10vh" align="center" justify="center">
        <Spinner />
      </Flex>
    );
  }

  if (shouldLogin) {
    return (
      <Container>
        <Text fontWeight="600" fontSize={24} textAlign="center" py={8}>
          Faça login para continuar
        </Text>
        <Auth onSignInOrSignUp={() => setShouldLogin(false)} />
      </Container>
    );
  }

  // if is not loading and email is verified returns the component
  if (user?.emailVerified) {
    return <Component />;
  }

  // if is not loading and email is not verified asks to verify
  if (user && !user?.emailVerified) {
    return <VerifyEmail />;
  }

  return (
    <Flex height="10vh" align="center" justify="center">
      <Spinner />
    </Flex>
  );
};

export default withAuth;
