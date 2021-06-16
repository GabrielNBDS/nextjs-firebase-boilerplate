import {
  Button,
  Container,
  Heading,
  Stack,
  Text,
  useToast,
} from '@chakra-ui/react';
import React from 'react';
import fire from '../../lib/firebase';
import { useAuth } from '../../hooks/auth';

const VerifyEmail: React.FC = () => {
  const toast = useToast();
  const { signOut } = useAuth();

  const sendAgain = () => {
    const { currentUser } = fire.auth();

    currentUser.sendEmailVerification();

    toast({
      title: 'Email enviado!',
      status: 'success',
      duration: 2500,
      isClosable: true,
    });
  };

  return (
    <Container mt="12vw" maxWidth={400} textAlign="center">
      <Stack spacing={4}>
        <Heading as="h1" fontSize={24}>
          Verifique seu e-mail
        </Heading>

        <Text>Verifique seu email para continuar.</Text>

        <Button
          colorScheme="blue"
          onClick={() => {
            window.location.reload();
          }}
        >
          Já verifiquei
        </Button>

        <Button colorScheme="blue" variant="outline" onClick={sendAgain}>
          Enviar email novamente
        </Button>

        <Button colorScheme="blue" variant="ghost" onClick={signOut}>
          Trocar de conta
        </Button>
      </Stack>
    </Container>
  );
};

export default VerifyEmail;
