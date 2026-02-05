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

3. Create `.env` file (or copy from `.env.example`):
```env
MONGO_URI=your_mongodb_connection_string
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

### Vercel (Full-Stack Deployment)

This project is configured to deploy both frontend and backend to Vercel using serverless functions.

#### Step 1: Set Up MongoDB Atlas

1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Go to **Database Access** → Add a database user with password
4. Go to **Network Access** → Add IP address `0.0.0.0/0` (allow from anywhere)
5. Get your connection string from **Connect** → **Connect your application**
   - Format: `mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>`

#### Step 2: Deploy to Vercel

1. Push your code to GitHub:
```bash
git add .
git commit -m "Configure MongoDB for deployment"
git push
```

2. Import repository to Vercel:
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click **Add New** → **Project**
   - Import your GitHub repository

3. **Add Environment Variables** in Vercel:
   - Go to **Settings** → **Environment Variables**
   - Add the following:
     - **Name**: `MONGO_URI`
     - **Value**: Your MongoDB Atlas connection string
     - **Environment**: Production, Preview, Development (select all)

4. Deploy:
   - Vercel will automatically deploy
   - Your API will be available at `https://your-app.vercel.app/api/employees`
   - Your frontend will be at `https://your-app.vercel.app`

#### Step 3: Update Frontend API URL

If needed, update your frontend to use the production API URL in `frontend/.env`:
```env
VITE_API_URL=https://your-app.vercel.app
```

### Alternative: Backend on Render/Railway

If you prefer to deploy backend separately:

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
VITE_API_URL=http://localhost:5000  # For local development
# VITE_API_URL=https://your-app.vercel.app  # For production
```

### Backend (.env)
```env
MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>
PORT=5000
```

**Important**: 
- Copy `backend/.env.example` to `backend/.env` and fill in your MongoDB connection string
- Never commit `.env` files to Git (already in `.gitignore`)
- For Vercel deployment, add `MONGO_URI` in the Vercel dashboard environment variables

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
