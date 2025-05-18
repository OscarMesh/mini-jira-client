# Mini-JIRA Client

A modern task management application built with Next.js, featuring a beautiful UI and robust authentication system.

🌐 **Live Demo**: [https://mini-jira-client.vercel.app](https://mini-jira-client.vercel.app)

## Features

- 🔐 Secure authentication system
- 🎨 Modern UI with dark mode support
- 📱 Responsive design
- 🔄 Real-time updates
- 🎯 Task management and organization
- 🎨 Beautiful animations and transitions

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v18 or higher)
- npm, yarn, pnpm, or bun (package manager of your choice)

## Getting Started

1. Clone the repository:

```bash
git clone <repository-url>
cd mini-jira-client
```

2. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

3. Set up environment variables:

   - Copy `.env.example` to `.env.local`
   - Fill in the required environment variables:
     - `NEXT_PUBLIC_BASE_API_URL`: Your API base URL
     - `NEXT_PUBLIC_AUTH_SECRET`: A secure random string for authentication

4. Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Project Structure

```
mini-jira-client/
├── app/                 # Next.js app directory
├── components/         # React components
├── hooks/             # Custom React hooks
├── lib/               # Utility functions and constants
├── providers/         # React context providers
├── services/          # API services
└── public/            # Static assets
```

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the application for production
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint to check code quality

## Tech Stack

- [Next.js](https://nextjs.org/) - React framework
- [React Query](https://tanstack.com/query) - Data fetching and caching
- [NextAuth.js](https://next-auth.js.org/) - Authentication
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Radix UI](https://www.radix-ui.com/) - UI components
- [Zod](https://zod.dev/) - Schema validation
- [React Hook Form](https://react-hook-form.com/) - Form handling

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
