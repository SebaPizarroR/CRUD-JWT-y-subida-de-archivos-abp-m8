import { Router } from "express";
import { getAllUsers, getUserById, createUser, deleteUserById, updateUser } from "../controllers/users.controllers.js";

import verifyToken from "../middlewares/auth.middleware.js";

const router = Router();

//OBTENER TODOS LOS USUARIOS, GET
router.get("/users", verifyToken, getAllUsers);


//OBTENER USUARIO POR ID, GET
router.get("/users/:id", verifyToken, getUserById)

// crear usuarios POST
router.post("/users", verifyToken, createUser)

// ELIMINAR USUARIO POR ID, DELETE
router.delete("/users/:id", verifyToken, deleteUserById)

// ACTUALIZAR USUARIO, PUT
router.put("/users/:id", verifyToken, updateUser)


export default router
