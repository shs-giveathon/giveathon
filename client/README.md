This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Technical Overview

The frontend of the Giveathon Leaderboard project is built using Next.js, a React framework for building server-side rendered and statically generated web applications. It provides a responsive and interactive user interface for viewing the leaderboard and other related information.

### Components

The frontend consists of the following main components:

- `pages`: A directory containing the main pages of the application, such as the leaderboard and user profile pages.
- `components`: A directory containing reusable UI components used throughout the application.
- `lib`: A directory containing utility functions and configuration files.

### Pages

- `leaderboards/affiliations`: Displays the leaderboard for affiliations.
- `leaderboards/users`: Displays the leaderboard for users.
- `user/[userId]`: Displays the profile page for a specific user.
- `affiliation/[affiliationId]`: Displays the profile page for a specific affiliation.
