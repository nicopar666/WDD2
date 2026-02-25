import express from "express";
import cors from "cors";
import connectDB from './config/db.js';
import inventoryRoutes from './routes/InventoryRoutes.js';
import authRoutes from './routes/AuthRoutes.js';

const app = express();
const PORT = 5000;

connectDB();

app.use(cors());
app.use(express.json());

app.use('/api/inventory', inventoryRoutes);
app.use('/api', authRoutes);

app.get("/getName", (req, res) => {
  const name = "Nico";
  res.status(200).json(name);
});

app.listen(PORT, () => {
  console.log(`Running on port: ${PORT}`);
});
