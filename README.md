# DigitalHub - Digital Marketing Platform

A complete digital marketing and advertising platform built with React, TypeScript, and Supabase.

## Features

- 🎯 Campaign Management
- 📊 Advanced Analytics
- 💳 Payment Integration (PayU & Cashfree)
- 👥 User Management with RBAC
- 📈 Usage Tracking
- 🔐 Secure Authentication
- 💰 Subscription Management

## Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **UI**: Tailwind CSS, shadcn/ui, Framer Motion
- **Backend**: Supabase (PostgreSQL, Auth, Storage)
- **Payments**: PayU, Cashfree
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Supabase account

### Installation

1. Clone the repository
```bash
git clone <your-repo-url>
cd digitalhub
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```bash
cp .env.example .env
# Edit .env with your Supabase credentials
```

4. Run database migrations
```bash
npx supabase db push
```

5. Start development server
```bash
npm run dev
```

### Build for Production

```bash
npm run build
```

## Environment Variables

See `.env.example` for required environment variables.

## Documentation

- [Backend Systems](./BACKEND_SYSTEMS.md)
- [Quick Start Guide](./QUICK_START.md)

## License

MIT

## Support

For support, email support@digitalhub.com
