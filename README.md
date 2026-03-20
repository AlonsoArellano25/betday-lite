# BetDay Lite

Mini aplicación desarrollada con Next.js 15, React 18, TypeScript, Redux Toolkit y NextAuth.

## Requisitos

- Node.js 20+
- npm 10+

## Instalación

```bash
npm install
cp .env.example .env.local
npm run dev
```

## Credenciales demo

- Email: `demo@betday.com`
- Password: `Betday123`

## Rutas

- `/` home con timeline del día
- `/profile` perfil protegido con apuestas del usuario
- `/bets/[betId]` detalle de apuesta

## Decisiones técnicas

- App Router con Server Components
- Fetch desde API Routes internas
- Redux Toolkit para estado global y persistencia local de apuestas simuladas
- NextAuth con CredentialsProvider
- Loading UI y Suspense
- Diseño responsive con estética inspirada en plataformas de apuestas deportivas
