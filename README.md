This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

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

## Admin panel

The admin panel is available at [http://localhost:3000/admin/login](http://localhost:3000/admin/login).

It lets authenticated users manage projects, services, testimonials, contact enquiries, and admin accounts.

Before starting the app, configure `DATABASE_URL` and `AUTH_SECRET` in `.env`:

```env
DATABASE_URL="postgresql://..."
AUTH_SECRET="replace-with-a-random-string-at-least-32-characters"
```

Create or reset an admin account with:

```bash
npm run admin:create -- you@example.com "Your Name"
```

The command asks for the password securely and never accepts it as a command-line argument.

Seed the database with:

```bash
npm run db:seed
```

Admin routes require a valid signed session. Every admin page and mutation also performs server-side authentication checks.

### Project portfolio images

Put local project photos in `public/assets/images/`; for example, `public/assets/images/living-room.jpg` is referenced in the admin form as `/assets/images/living-room.jpg`. You can also use direct HTTPS image URLs. In a project's admin form, set the cover image, add project details, then list additional gallery image URLs or paths one per line. Clicking a project card opens its portfolio detail page.

After pulling database schema changes, apply migrations with:

```bash
npx prisma migrate deploy
```

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
