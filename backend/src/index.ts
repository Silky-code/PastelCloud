import express from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import userRoutes from "./routes/userRoutes";
import productRoutes from "./routes/productRoutes";
import providerRoutes from "./routes/providerRoutes";
import saleRoutes from "./routes/saleRoutes";
import businessRoutes from "./routes/businessRoutes";

mongoose
  .connect(process.env.MONGODB_CONNECTION_STRING as string)
  .then(() => console.log("Base de datos conectada"))
  .catch((err) => console.error("Error al conectar MongoDB:", err));

const app = express();
app.use(express.json());
app.use(cors({
  origin: [
    "https://localhost:5173",
    "https://pastelcloud-frontend.onrender.com"
  ]
}));

app.use("/api/user", userRoutes);
app.use("/api/product", productRoutes);
app.use("/api/provider", providerRoutes);
app.use("/api/sale", saleRoutes);
app.use("/api/business", businessRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});