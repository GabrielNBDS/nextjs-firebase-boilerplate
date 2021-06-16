import {
  Alert,
  AlertIcon,
  Button,
  FormControl,
  FormLabel,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FiEye, FiEyeOff, FiLock, FiMail, FiUser } from 'react-icons/fi';
import fire from '../../lib/firebase';
import { useAuth } from '../../hooks/auth';

interface IFormData {
  name?: string;
  email: string;
  password: string;
}

interface IProps {
  onSignIn?: () => void;
  onSignUp?: () => void;
  onSignInOrSignUp?: () => void;
}

const Auth: React.FC<IProps> = props => {
  const [authFormError, setAuthFormError] = useState('');
  const [resetPasswordError, setResetPasswordError] = useState('');

  const [show, setShow] = React.useState(false);
  const handleShow = () => setShow(!show);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();

  const [isSigningUp, setIsSigningUp] = useState(false);

  const { signUpWithEmailAndPassword, signInWithEmailAndPassword } = useAuth();

  const clearErrors = () => {
    setResetPasswordError('');
    setAuthFormError('');
  };

  const onSubmit = async ({ email, password, name }: IFormData) => {
    clearErrors();

    try {
      if (isSigningUp) {
        await signUpWithEmailAndPassword(name, email, password);

        if (props.onSignUp) {
          props.onSignUp();
        }
      } else {
        await signInWithEmailAndPassword(email, password);
        toast({
          title: 'Logado com sucesso!',
          status: 'success',
          duration: 2500,
          isClosable: true,
        });

        if (props.onSignIn) {
          props.onSignIn();
        }
      }

      if (props.onSignInOrSignUp) {
        props.onSignInOrSignUp();
      }
    } catch (error) {
      switch (error.code) {
        case 'auth/user-not-found':
          setAuthFormError('Usuário não encontrado.');
          break;

        case 'auth/email-already-in-use':
          setAuthFormError('E-mail em uso.');
          break;

        case 'auth/weak-password':
        case 'auth/invalid-password':
          setAuthFormError('A senha deve conter 6 caracteres.');
          break;

        case 'auth/wrong-password':
          setAuthFormError('Senha incorreta');
          break;

        default:
          setAuthFormError('Ocorreu um erro. Tente novamente.');
          break;
      }
    }
  };

  const {
    register: resetPasswordRegister,
    handleSubmit: resetPasswordHandleSubmit,
    formState: { isSubmitting: resetPasswordIsSubmitting },
  } = useForm();

  const resetPassword = ({ email }) => {
    clearErrors();

    fire
      .auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        toast({
          title: 'E-mail enviado!',
          status: 'success',
          duration: 2500,
          isClosable: true,
        });

        onClose();
        clearErrors();
      })
      .catch(() => {
        setResetPasswordError('E-mail não encontrado.');
      });
  };

  return (
    <>
      <Stack
        marginX="auto"
        maxW={400}
        as="form"
        onSubmit={handleSubmit(onSubmit)}
        spacing={4}
      >
        {isSigningUp && (
          <FormControl disabled={isSubmitting} id="name">
            <FormLabel>Nome</FormLabel>

            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={<Icon as={FiUser} color="gray.300" />}
              />
              <Input type="text" name="nome" {...register('name')} required />
            </InputGroup>
          </FormControl>
        )}

        <FormControl disabled={isSubmitting} id="email">
          <FormLabel>Email</FormLabel>

          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              color="gray.300"
              fontSize="1.2em"
              children={<Icon as={FiMail} color="gray.300" />}
            />
            <Input type="email" name="email" {...register('email')} required />
          </InputGroup>
        </FormControl>

        <FormControl isDisabled={isSubmitting} id="password">
          <FormLabel>Senha</FormLabel>

          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              color="gray.300"
              fontSize="1.2em"
              children={<Icon as={FiLock} color="gray.300" />}
            />
            <Input
              name="senha"
              type={show ? 'text' : 'password'}
              {...register('password')}
              required
            />
            <InputRightElement width="4.5rem">
              <IconButton
                isDisabled={isSubmitting}
                _focus={{ boxShadow: 'none' }}
                aria-label={show ? 'Esconder senha' : 'Exibir senha'}
                variant="unstyled"
                onClick={handleShow}
                icon={show ? <Icon as={FiEyeOff} /> : <Icon as={FiEye} />}
              />
            </InputRightElement>
          </InputGroup>
        </FormControl>

        {authFormError && (
          <Alert status="error">
            <AlertIcon />
            {authFormError}
          </Alert>
        )}

        <Button
          isLoading={isSubmitting}
          type="submit"
          colorScheme="blue"
          color="white"
          width="100%"
        >
          {isSigningUp ? 'Cadastrar' : 'Entrar'}
        </Button>

        <Button
          onClick={() => {
            clearErrors();
            setIsSigningUp(!isSigningUp);
          }}
          isDisabled={isSubmitting}
          colorScheme="blue"
          variant="outline"
        >
          {isSigningUp ? 'Entrar' : 'Cadastrar'}
        </Button>

        <Button isDisabled={isSubmitting} variant="unstyled" onClick={onOpen}>
          Recuperar senha
        </Button>
      </Stack>

      <Modal
        isOpen={isOpen}
        onClose={() => {
          onClose();
          clearErrors();
        }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Coloque seu email</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={resetPasswordHandleSubmit(resetPassword)}>
            <ModalBody>
              <Input
                name="email"
                type="email"
                {...resetPasswordRegister('email')}
                required
              />

              {resetPasswordError && (
                <Alert mt={4} status="error">
                  <AlertIcon />
                  {resetPasswordError}
                </Alert>
              )}
            </ModalBody>

            <ModalFooter>
              <Button
                isDisabled={resetPasswordIsSubmitting}
                variant="ghost"
                mr={3}
                onClick={onClose}
              >
                Fechar
              </Button>
              <Button
                isLoading={resetPasswordIsSubmitting}
                type="submit"
                color="white"
                colorScheme="blue"
              >
                Recuperar senha
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Auth;
