<div align="center">

# 🧬 DS Lab Portfolio Backend

**A comprehensive Node.js backend API for managing Data Science Lab portfolio data**

[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-4.19+-blue.svg)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-6.8+-green.svg)](https://mongodb.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

*Powering data science education with modern web technologies*

</div>

---

## 📋 Table of Contents

- [✨ Features](#-features)
- [🚀 Quick Start](#-quick-start)
- [🛠️ Tech Stack](#️-tech-stack)
- [📡 API Documentation](#-api-documentation)
- [🗂️ Project Structure](#️-project-structure)
- [🔧 Configuration](#-configuration)
- [📊 Database Schema](#-database-schema)
- [🔒 Security Features](#-security-features)
- [🐛 Troubleshooting](#-troubleshooting)
- [🤝 Contributing](#-contributing)

---

## ✨ Features

### 🎯 Core Functionality
- **Club Management** - Complete CRUD operations for DS club information
- **Events & News** - Dynamic event management with registration links
- **Club Events** - Specialized workshop and bootcamp management
- **Project Portfolio** - Comprehensive project showcase with multiple link types
- **File Upload** - Secure image upload with automatic URL generation

### 🔧 Technical Features
- **RESTful API** - Clean, consistent endpoint design
- **MongoDB Integration** - Native driver implementation (no Mongoose)
- **Image Processing** - Multer-based file handling
- **Error Handling** - Comprehensive validation and error responses
- **Admin Dashboard** - Secure admin interface with authentication
- **Mobile Responsive** - Full mobile support with hamburger navigation

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- MongoDB 6.8+
- npm or yarn

### Installation

\`\`\`bash
# Clone the repository
git clone <repository-url>
cd ds-lab-backend

# Install dependencies
npm install

# Create uploads directory
npm run setup

# Configure environment
cp .env.example .env
# Edit .env with your MongoDB URI

# Seed database (optional)
node scripts/seedData.js

# Start development server
npm run dev
\`\`\`

### 🎉 You're ready to go!
Server will be running at `http://localhost:5000`

---

## 🛠️ Tech Stack

| Technology | Purpose | Version |
|------------|---------|---------|
| **Node.js** | Runtime Environment | 18+ |
| **Express.js** | Web Framework | 4.19+ |
| **MongoDB** | Database | 6.8+ |
| **Multer** | File Upload | 1.4+ |
| **CORS** | Cross-Origin Requests | 2.8+ |
| **Dotenv** | Environment Variables | 16.4+ |

---

## 📡 API Documentation

### 🔐 Authentication
Admin dashboard protected with session-based authentication (30-minute expiry)

### 📁 File Upload
```http
POST /api/upload
Content-Type: multipart/form-data

# Response
{
  "success": true,
  "data": {
    "url": "http://localhost:5000/uploads/image-1234567890.jpg",
    "filename": "image-1234567890.jpg",
    "originalName": "your-image.jpg",
    "size": 245760
  }
}
