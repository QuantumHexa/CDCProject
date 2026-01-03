# Admin Dashboard - Server-Rendered E-Commerce Panel

A premium, server-side rendered (SSR) administrative dashboard build with Next.js 16, designed for managing an e-commerce platform's products and orders.

## 🚀 Features

-   **Dashboard Overview**: Real-time sales and revenue visualization using **Recharts**.
-   **Product Managment (CRUD)**:
    -   Create, Read, Update, and Delete products.
    -   Secure image upload with **Cloudinary**.
    -   Server-side validation using **Zod**.
-   **Authentication**: Secure admin access via **NextAuth.js** (Credentials Provider).
-   **Premium UI**:
    -   Built with **Shadcn UI** and **Tailwind CSS**.
    -   Fully responsive design.
    -   Built with **Shadcn UI** and **Tailwind CSS**.
    -   Fully responsive design.
    -   Dark/Light mode support.
-   **Advanced Features**:
    -   **Real-time Search**: Debounced product search.
    -   **Bulk Actions**: Select and delete multiple products.
    -   **Data Export**: Download product data as CSV.
    -   **Feedback**: Toast notifications for all actions.

## 🛠️ Tech Stack

-   **Framework**: Next.js 16 (App Router)
-   **Language**: TypeScript
-   **Database**: MongoDB (Mongoose ORM)
-   **Authentication**: NextAuth.js
-   **Styling**: Tailwind CSS, Shadcn UI, Lucide Icons
-   **Forms**: React Hook Form + Zod
-   **Charts**: Recharts

## 📦 Getting Started

### Prerequisites

-   Node.js 18+
-   MongoDB Atlas Account
-   Cloudinary Account

### 1. Clone & Install

```bash
git clone <repository-url>
cd admin-dashboard
npm install
```

### 2. Configure Environment

Create a `.env.local` file in the root directory:

```env
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/dashboard
NEXTAUTH_SECRET=your_super_secret_key
NEXTAUTH_URL=http://localhost:3000

# Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=your_unsigned_preset
```

### 3. Run Development Server

```bash
npm run dev
```

Visit `http://localhost:3000` in your browser.

### 4. Initialize Database (Important!)

On the first run, your database will be empty. To create the initial Admin account:

1.  Keep the server running.
2.  Visit this URL in your browser: `http://localhost:3000/api/seed`
3.  You will see a success message: `Admin user created successfully`.

## 🚀 Deployment (Vercel)

This project is optimized for **Vercel**. Follow these steps to go live:

1.  **Push to GitHub**: Make sure your latest code is on GitHub.
2.  **Go to Vercel**: Import your repository.
3.  **Environment Variables**: You **MUST** add these in Vercel settings during deployment:
    *   `MONGODB_URI`
    *   `NEXTAUTH_SECRET`
    *   `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`
    *   `NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET`
4.  **MongoDB Network Access**: Go to MongoDB Atlas -> Network Access -> Add IP Address -> Allow Access from Anywhere (`0.0.0.0/0`).
5.  **Deploy**: Click "Deploy" and wait for the success confetti! 🎉

## 🔑 Default Credentials

The system will allow login with these fallback credentials if no database user is found (for demo purposes):

-   **Email**: `admin@example.com`
-   **Password**: `admin123`

