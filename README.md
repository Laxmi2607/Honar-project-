# Aura | Enterprise Content Management Platform

Aura is a highly advanced, futuristic, enterprise-grade Blog Management System and Social Media Automation Platform designed for influencers, creators, brands, and businesses. 

With Aura, you can seamlessly create, manage, and publish content across multiple channels—all from a breathtaking, ultra-modern SaaS dashboard.

## 🌟 Key Features

- **Centralized Content Dashboard:** Create, edit, and organize blogs, articles, and newsletters effortlessly.
- **Social Media Automation:** Directly publish your content to platforms like Twitter and LinkedIn with live status tracking.
- **Enterprise-Grade Database:** Built on **SQLite** with **Prisma ORM** for highly scalable, persistent content and analytics tracking.
- **Real-Time Analytics:** Track your views, likes, and published distributions in an intuitive, beautifully designed interface.
- **Premium UI/UX:** Features a sleek dark mode, glassmorphism aesthetics, dynamic animations, and responsive layouts for a best-in-class user experience.

## 🛠️ Technology Stack

- **Framework:** [Next.js 15 (App Router)](https://nextjs.org/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Database:** [SQLite](https://www.sqlite.org/)
- **ORM:** [Prisma v6](https://www.prisma.io/)
- **State Management:** [Zustand](https://github.com/pmndrs/zustand)
- **Icons & Components:** [Lucide React](https://lucide.dev/), [Shadcn UI](https://ui.shadcn.com/), and [Framer Motion](https://www.framer.com/motion/)

## 🚀 Getting Started

Follow these instructions to set up the project locally.

### Prerequisites

- Node.js (v18+)
- npm or yarn

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Laxmi2607/Honar-project-.git
   cd Honar-project-
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Database Setup:**
   Generate the Prisma client and sync the schema to your local SQLite database:
   ```bash
   npx prisma generate
   npx prisma db push
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```

5. **Open the platform:**
   Navigate to [http://localhost:3000/dashboard](http://localhost:3000/dashboard) (or the port specified in your console, e.g., 3001) to explore the Aura platform.

## 📂 Project Structure

- `/src/app/api`: Backend RESTful API routes powering CRUD operations and social integrations.
- `/src/app/dashboard`: The primary application views (Overview, Content, Social Media, etc.).
- `/src/lib`: Core utility functions, the `blog-store` (Zustand), and the Prisma database client (`db.ts`).
- `/src/components`: Reusable UI components including inputs, cards, badges, and modals.
- `/prisma`: Contains the `schema.prisma` file defining the database architecture.

## 🤝 Contributing

Contributions are welcome! If you're on the team, ensure you pull the latest changes from your branch before starting development.

Branches configured for the team:
- `laxmi`
- `falguni`
- `rajeshri`

---
*Built with passion for creators worldwide.*
