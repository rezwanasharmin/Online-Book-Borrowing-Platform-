
# 📚 BookBorrow - Online Book Borrowing Platform

**A seamless and modern web application designed to digitize the traditional library experience.**



## 📋 Project Overview
BookBorrow is a full-stack web application that allows users to explore a vast collection of books, filter by categories, and borrow titles digitally. The platform prioritizes security and performance using modern technologies like BetterAuth for authentication, Next.js for the frontend/backend, and MongoDB for data persistence.

## ✨ Key Features

### 1. **Authentication & Security**
- User registration with email and password
- User login with email/password
- Google OAuth integration for social login
- Session-based authentication with BetterAuth
- Profile update functionality with photo URL and name

### 2. **Book Management**
- Browse a curated collection of 12+ books
- Advanced search by book title
- Filter books by category (Story, Tech, Science)
- View detailed book information including author, description, and availability
- "Borrow This Book" functionality for logged-in users

### 3. **User Features**
- **My Profile Page**: View and manage user information
- **Update Profile**: Change profile picture and name
- **Private Routes**: Protected pages for authenticated users only
- **Responsive Design**: Fully responsive on mobile, tablet, and desktop

### 4. **UI/UX Enhancements**
- Animated banner with call-to-action
- Marquee scrolling text for new arrivals
- Swiper carousel for featured books
- Category sidebar for easy filtering
- Toast notifications for user feedback
- DaisyUI components for modern design

## 🛠️ Tech Stack

| Technology | Purpose |
|-----------|---------|
| **Next.js 16.2.4** | Full-stack framework |
| **React 19.2.4** | UI library |
| **Tailwind CSS 4** | Styling |
| **DaisyUI** | UI component library |
| **BetterAuth 1.6.9** | Authentication |
| **MongoDB** | Database (optional setup) |
| **Mongoose 9.6.1** | MongoDB ODM |
| **Swiper 12.1.4** | Carousel & animations |
| **React Hot Toast 2.6.0** | Notifications |
| **React Icons 5.6.0** | Icon library |
| **bcryptjs 3.0.3** | Password hashing |

## 📦 NPM Packages Used

```json
{
  "dependencies": {
    "bcryptjs": "^3.0.3",
    "better-auth": "^1.6.9",
    "mongoose": "^9.6.1",
    "next": "16.2.4",
    "react": "19.2.4",
    "react-dom": "19.2.4",
    "react-hot-toast": "^2.6.0",
    "react-icons": "^5.6.0",
    "swiper": "^12.1.4"
  }
}
```

## 📂 Project Structure

```
online-book-borrowing/
├── app/(auth)/[login, register pages]
├── app/api/[authentication, books, users endpoints]
├── app/books/[all books, book details pages]
├── app/profile/[user profile pages]
├── components/[Header, Footer, BookCard, CategorySidebar]
├── data/books.json
├── lib/[auth, database, models]
└── public/[assets]
```

## 🚀 Getting Started

### Installation
```bash
npm install
npm run dev
```

Open `http://localhost:3000`

### Environment Variables
Create `.env.local`:
```env
MONGODB_URI=mongodb://localhost:27017/book-borrowing
BETTER_AUTH_SECRET=your_secret_key
BETTER_AUTH_URL=http://localhost:3000
GOOGLE_CLIENT_ID=your_google_id
GOOGLE_CLIENT_SECRET=your_google_secret
```

## 📱 Features Overview

### Pages
- **Home**: Banner, Marquee, Featured Books, Extra Sections
- **All Books**: Search Bar, Book Cards, Category Sidebar
- **Book Details** (Private): Full book info, Borrow button
- **My Profile** (Private): User info, Update profile
- **Login/Register**: Email/Password or Google OAuth

### Responsive Design
- Mobile, Tablet, Desktop optimized
- Tailwind CSS with DaisyUI
- Smooth animations with Swiper

## 🔐 Security
- Password hashing with bcryptjs
- Session-based auth with BetterAuth
- Private routes protected
- Environment variables for sensitive data

## 👨‍💻 Author
Your Name - [Portfolio](#) | [GitHub](#) | Email: your.email@example.com

## 📞 Support
For support, email support@bookborrow.com or open an issue on GitHub.

---
