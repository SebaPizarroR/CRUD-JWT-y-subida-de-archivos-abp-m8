import { Router } from "express";
import { getAllUsers, getUserById, createUser, deleteUserById, updateUser } from "../controllers/users.controllers.js";

const router = Router();

//OBTENER TODOS LOS USUARIOS, GET
router.get("/users", getAllUsers);


//OBTENER USUARIO POR ID, GET
router.get("/users/:id", getUserById)

// crear usuarios POST
router.post("/users", createUser)

// ELIMINAR USUARIO POR ID, DELETE
router.delete("/users/:id", deleteUserById)

// ACTUALIZAR USUARIO, PUT
router.put("/users/:id", updateUser)


export default router
