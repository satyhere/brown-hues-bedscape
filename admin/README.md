# Brown Hues Bedscape - Admin Panel

This is the admin panel for Brown Hues Bedscape, built with Next.js and Supabase.

## Features

- Secure authentication with Supabase
- Order management
- Product management
- Sales analytics dashboard
- Responsive design

## Prerequisites

- Node.js 18+ and npm
- Supabase project with the required tables

## Getting Started

1. Clone the repository
2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Create a `.env.local` file in the root directory and add your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXTAUTH_URL=http://localhost:3000/admin
NEXTAUTH_SECRET=your_nextauth_secret
```

4. Run the development server:

```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000/admin](http://localhost:3000/admin) in your browser

## Database Setup

Make sure your Supabase project has the following tables:

- `orders` - For storing order information
- `order_items` - For items in each order
- `admin_users` - For admin user authentication (you'll need to create this table)

## Deployment

You can deploy this admin panel to Vercel, Netlify, or any other platform that supports Next.js applications.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
