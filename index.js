import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import postRoutes from './routes/posts.js';
import userRoutes from './routes/users.js';



const app = express();
dotenv.config();


app.use(express.json({ limit: '30mb', extended: true }));
app.use(express.urlencoded({ limit: '30mb', extended: true }));
app.use(cors({
  origin: ["http://localhost:3000"],
  methods: ["POST", "GET", "PATCH", "DELETE"],
  credentials: true
}));


app.use('/posts', postRoutes);
app.use('/user', userRoutes);

app.get('/', (req, res) => {
  res.send('Hello, welcome to memories server side')
})


// const CONNECTION_URL =`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.qb2bftr.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const CONNECTION_URL = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.qb2bftr.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority&appName=${process.env.DB_NAME}`


const PORT = process.env.PORT || 5000;

mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Server Run on Port: http://localhost:${PORT}`)
    )
  )
  .catch((error) => `${error} did not connect`);

mongoose.set("useFindAndModify", false);