# CRUD Application

A full-stack CRUD application with React frontend and Node.js/Express backend.

## 🚀 Tech Stack

### Frontend
- React 19
- Vite
- TailwindCSS
- Axios
- React Router DOM
- Lucide React (icons)

### Backend
- Node.js
- Express
- MongoDB (Mongoose)
- Multer (file uploads)
- CORS

## 📁 Project Structure

```
CRUD/
├── frontend/          # React frontend application
│   ├── src/
│   ├── public/
│   └── package.json
├── backend/           # Node.js backend API
│   ├── config/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── server.js
└── README.md
```

## 🛠️ Local Development

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```env
MONGODB_URI=your_mongodb_connection_string
PORT=5000
```

4. Start the server:
```bash
npm start
```

Backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```env
VITE_API_URL=http://localhost:5000
```

4. Start the dev server:
```bash
npm run dev
```

Frontend will run on `http://localhost:5173`

## 🌐 Deployment

### Frontend (Vercel)

1. Push code to GitHub
2. Import repository to Vercel
3. Vercel will auto-detect settings from `vercel.json`
4. Add environment variables in Vercel dashboard:
   - `VITE_API_URL`: Your backend URL

### Backend (Render/Railway)

#### Option 1: Render
1. Create new Web Service on Render
2. Connect your GitHub repository
3. Configure:
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
4. Add environment variables:
   - `MONGODB_URI`
   - `PORT` (Render provides this automatically)

#### Option 2: Railway
1. Create new project on Railway
2. Connect GitHub repository
3. Railway auto-detects Node.js
4. Set root directory to `backend`
5. Add environment variables

## 🔐 Environment Variables

### Frontend (.env)
```env
VITE_API_URL=your_backend_url
```

### Backend (.env)
```env
MONGODB_URI=your_mongodb_connection_string
PORT=5000
```

## 📝 API Endpoints

Document your API endpoints here as you build them.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

ISC
