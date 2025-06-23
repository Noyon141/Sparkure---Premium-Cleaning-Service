# Sparkure - Premium Cleaning Service

A modern, real-time cleaning service management platform built with Next.js, Prisma, and Supabase.

## Features

### 🔐 Authentication & Authorization

- User registration and login
- Role-based access control (Customer, Employee, Admin)
- JWT-based authentication
- Protected routes

### 🧹 Cleaning Management

- Schedule cleaning services
- Real-time status updates
- Employee assignment
- Service tracking
- Priority management

### 💬 Real-time Communication

- In-app chat system
- Direct messaging between users
- Group chat rooms
- Message notifications

### 🔔 Notifications

- Real-time notifications
- Email notifications (configurable)
- Push notifications
- Status change alerts

### 💳 Payment System

- Multiple payment methods
- Payment tracking
- Invoice generation
- Refund management

### ⭐ Reviews & Ratings

- Customer reviews
- Employee ratings
- Public review display
- Review moderation

### 📊 Dashboard

- User dashboard with statistics
- Employee performance tracking
- Admin analytics
- Real-time data updates

## Tech Stack

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, Prisma ORM
- **Database**: PostgreSQL (via Supabase)
- **Authentication**: JWT, Supabase Auth
- **Real-time**: Supabase Realtime
- **UI Components**: shadcn/ui, Framer Motion
- **Forms**: React Hook Form, Zod validation
- **Notifications**: Sonner toast notifications

## Prerequisites

- Node.js 18+
- npm or yarn
- PostgreSQL database (Supabase recommended)
- Git

## Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd sparkure
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:

   ```env
   # Database
   DATABASE_URL="your-postgresql-connection-string"

   # Supabase
   NEXT_PUBLIC_SUPABASE_URL="your-supabase-url"
   NEXT_PUBLIC_SUPABASE_ANON_KEY="your-supabase-anon-key"
   SUPABASE_SERVICE_ROLE_KEY="your-supabase-service-role-key"

   # JWT Secret
   JWT_SECRET="your-jwt-secret-key"

   # Email (optional)
   SMTP_HOST="your-smtp-host"
   SMTP_PORT="587"
   SMTP_USER="your-smtp-username"
   SMTP_PASS="your-smtp-password"
   ```

4. **Set up the database**

   **Option A: Using Supabase (Recommended)**

   a. Create a new Supabase project
   b. Copy the connection string to your `.env.local`
   c. Run the Prisma migration:

   ```bash
   npx prisma migrate dev --name init
   ```

   d. Copy the SQL from `supabase-setup.sql` and run it in your Supabase SQL editor

   **Option B: Using local PostgreSQL**

   a. Install PostgreSQL locally
   b. Create a new database
   c. Update the DATABASE_URL in `.env.local`
   d. Run migrations:

   ```bash
   npx prisma migrate dev --name init
   ```

5. **Generate Prisma client**

   ```bash
   npx prisma generate
   ```

6. **Start the development server**

   ```bash
   npm run dev
   ```

7. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Database Setup

### Prisma Schema

The application uses a comprehensive Prisma schema with the following main models:

- **Users**: Authentication and user profiles
- **Cleanings**: Service bookings and management
- **ChatRooms & ChatMessages**: Real-time messaging
- **Notifications**: System notifications
- **Reviews**: Customer feedback
- **Payments**: Payment tracking
- **ServiceRequests**: Customer service requests

### Supabase Setup

1. Enable the following extensions in Supabase:

   - `uuid-ossp`
   - `pgcrypto`

2. Run the SQL setup script from `supabase-setup.sql` which includes:
   - Real-time configuration
   - Row Level Security (RLS) policies
   - Database triggers for notifications
   - Performance indexes
   - Sample data

## API Routes

### Authentication

- `POST /api/auth/sign-up` - User registration
- `POST /api/auth/sign-in` - User login
- `POST /api/auth/sign-out` - User logout
- `GET /api/auth/me` - Get current user

### Cleanings

- `GET /api/cleanings` - Get cleanings (filtered by user role)
- `POST /api/cleanings` - Create new cleaning
- `GET /api/cleanings/[id]` - Get specific cleaning
- `PATCH /api/cleanings/[id]` - Update cleaning
- `DELETE /api/cleanings/[id]` - Delete cleaning

### Chat

- `GET /api/chat` - Get chat rooms or messages
- `POST /api/chat` - Send message

### Notifications

- `GET /api/notifications` - Get notifications
- `PATCH /api/notifications` - Mark as read

### Contact

- `POST /api/contact` - Submit contact form

## Real-time Features

The application uses Supabase Realtime for:

- **Notifications**: Instant notification delivery
- **Chat Messages**: Real-time messaging
- **Cleaning Updates**: Live status changes
- **Service Requests**: Immediate request notifications

### Subscription Examples

```typescript
// Subscribe to notifications
supabase
  .channel("notifications")
  .on(
    "postgres_changes",
    {
      event: "INSERT",
      schema: "public",
      table: "notifications",
      filter: `user_id=eq.${userId}`,
    },
    (payload) => {
      console.log("New notification:", payload.new);
    }
  )
  .subscribe();

// Subscribe to chat messages
supabase
  .channel(`chat:${chatRoomId}`)
  .on(
    "postgres_changes",
    {
      event: "INSERT",
      schema: "public",
      table: "chat_messages",
      filter: `chat_room_id=eq.${chatRoomId}`,
    },
    (payload) => {
      console.log("New chat message:", payload.new);
    }
  )
  .subscribe();
```

## User Roles

### Customer (USER)

- Schedule cleaning services
- View their cleaning history
- Chat with employees
- Leave reviews
- Make payments

### Employee (EMPLOYEE)

- View assigned cleanings
- Update cleaning status
- Chat with customers
- View their performance metrics

### Admin (ADMIN)

- Manage all users
- Assign employees to cleanings
- View analytics and reports
- Manage service requests
- System configuration

## File Structure

```
sparkure/
├── app/                    # Next.js app directory
│   ├── (auth)/            # Authentication routes
│   ├── (routes)/          # Public routes
│   ├── api/               # API routes
│   └── dashboard/         # Dashboard pages
├── components/            # React components
│   ├── auth/             # Authentication components
│   ├── ui/               # UI components
│   └── layout/           # Layout components
├── lib/                  # Utility libraries
│   ├── hooks/            # Custom React hooks
│   ├── validations/      # Zod schemas
│   └── services/         # API service classes
├── prisma/               # Database schema and migrations
└── public/               # Static assets
```

## Development

### Available Scripts

```bash
# Development
npm run dev              # Start development server
npm run build            # Build for production
npm run start            # Start production server

# Database
npm run db:generate      # Generate Prisma client
npm run db:migrate       # Run migrations
npm run db:studio        # Open Prisma Studio

# Linting
npm run lint             # Run ESLint
npm run lint:fix         # Fix linting issues

# Type checking
npm run type-check       # Run TypeScript compiler
```

### Code Style

- Use TypeScript for type safety
- Follow ESLint configuration
- Use Prettier for code formatting
- Write meaningful commit messages

## Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Set up environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Other Platforms

The application can be deployed to any platform that supports Next.js:

- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support and questions:

- Create an issue in the GitHub repository
- Contact the development team
- Check the documentation

## Roadmap

- [ ] Mobile app (React Native)
- [ ] Advanced analytics dashboard
- [ ] Integration with payment gateways
- [ ] SMS notifications
- [ ] Multi-language support
- [ ] Advanced scheduling system
- [ ] Inventory management
- [ ] Customer loyalty program

#
