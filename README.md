# Nextjs + Firebase + Chakra UI + ESLint

<div align="center">
  <img width="300" src="https://raw.githubusercontent.com/rocketseat-content/youtube-nextjs-design-system/master/.github/assets/Nextjs-ChakraUI.png" />
</div>
<div align="center">
  <img width="40" src="https://firebase.google.com/downloads/brand-guidelines/SVG/logo-logomark.svg" />
</div>

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
