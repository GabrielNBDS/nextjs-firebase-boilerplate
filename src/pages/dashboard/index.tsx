import React from 'react';
import { Button, Heading, Text } from '@chakra-ui/react';
import { useAuth } from '../../hooks/auth';
import withAuth from '../../components/auth/WithAuth';

const Dashboard: React.FC = () => {
  const { user, signOut } = useAuth();

  return (
    <>
      <Heading>{user?.displayName}</Heading>
      <Text>{user?.email}</Text>
      <Button onClick={signOut}>Sign Out</Button>
    </>
  );
};

export default withAuth(Dashboard);
