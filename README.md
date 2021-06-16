# Nextjs + Firebase + Chakra UI + ESLint

<div align="center">
  <img width="300" src="https://raw.githubusercontent.com/rocketseat-content/youtube-nextjs-design-system/master/.github/assets/Nextjs-ChakraUI.png" />
</div>
<div align="center">
  <img width="60" src="https://www.gstatic.com/devrel-devsite/prod/vbd4700e58d826f0eab371eadc20e0e343567df356800794a790eebf2ac059db2/firebase/images/touchicon-180.png" />
</div>

<h3 align="center">Link para o app: https://nextjs-boilerplate-azure.vercel.app// </h3>

## O que é?

Um boilerplate com: NextsJs, Firebase, ChakraUI, Typescript, ESlint, Prettier e EditorConfig.

A funcionalidade de login com rotas protegidas está implementada

## Rodando na sua máquina

1. Faça o clone
2. Instale as dependências com `npm i` ou `yarn`
3. Habilite o que precisar no painel do firebase. Auth, Firestore, Storage e Analytics já está configurado.
4. Coloque a sua config do firebase em `src/lib/firebase.ts` (Por padrão ele vem com a config de um dummy project onde somente a autenticação por email está habilitada)
5. Rode `npm run dev` ou `yarn dev`

ps: Para fazer uma rota privada basta chama o componente `withAuth`no export default. Deixei a `/dashboard` privada como exemplo.
