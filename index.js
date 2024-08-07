import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import postRoutes from './routes/posts.js';
import userRoutes from './routes/users.js';

const app = express();
dotenv.config();

// Middleware
app.use(express.json({ limit: '30mb', extended: true }));
app.use(express.urlencoded({ limit: '30mb', extended: true }));
app.use(cors({
  origin: ["https://memories24.vercel.app"],
  methods: ["POST", "GET", "PATCH", "DELETE"],
  credentials: true
}));

app.options('*', cors()); // Handle preflight requests

// Routes
app.use('/posts', postRoutes);
app.use('/user', userRoutes);

app.get('/', (req, res) => {
  res.send('Hello, welcome to memories server side');
});

// MongoDB Connection
const CONNECTION_URL = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.qb2bftr.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority&appName=${process.env.DB_NAME}`;
const PORT = process.env.PORT || 5000;

mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(PORT, () =>
      console.log(`Server running on Port: http://localhost:${PORT}`)
    );
  })
  .catch((error) => console.error('MongoDB connection error:', error));

mongoose.set("useFindAndModify", false);
