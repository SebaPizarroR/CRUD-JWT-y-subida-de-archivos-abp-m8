import express from "express";
import {PORT} from "./config.js";
import userRoutes from "./routes/users.routes.js";
import authRoutes from "./routes/auth.routes.js";
import morgan from "morgan";
import fileUpload from "express-fileupload";
import uploadRoutes from "./routes/upload.routes.js";

const app = express();

app.use(morgan("dev"))

//middlewares globales
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(fileUpload())

app.use (userRoutes);

app.listen(PORT);
console.log("Server on port", PORT);

//Ruta carga de archivos
app.use("/", uploadRoutes);
app.use("/uploads", express.static("uploads"));

//Rutas de autenticación (registro de usuarios/login)
app.use("/auth", authRoutes);







console.log("JWT_SECRET configurado:", !!process.env.JWT_SECRET);




