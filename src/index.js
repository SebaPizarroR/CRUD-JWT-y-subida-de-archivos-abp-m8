import express from "express"
import {PORT} from "./config.js"
import userRoutes from "./routes/users.routes.js"
import morgan from "morgan";

const app = express();

app.use(morgan("dev"))

//middlewares globales
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use (userRoutes);

app.listen(PORT);
console.log("Server on port", PORT);