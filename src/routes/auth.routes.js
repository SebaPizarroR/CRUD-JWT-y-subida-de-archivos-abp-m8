import { Router } from "express";
import { pool } from "../db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = Router();

router.post("/login", async (req, res)=>{
    const { email, password } = req.body;

    const { rows } = await pool.query(
        "SELECT * FROM users WHERE email = $1", [email]
    );

    if (rows.length === 0) {
        return res.status(401).json({
            message: "Email o contraseña incorrectos"
        });
    }

    const user = rows[0];

    const correctPassword = await bcrypt.compare(
        password, user.password
    );

    if(!correctPassword) {
        return res.status(401).json({
            message: "Email o contraseña incorrectos"
        });
    }

    const token = jwt.sign(
        {
            id: user.id,
            email: user.email
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "1h"
        }
    );

    res.json({
        message: "Login exitoso",
        token: token
    });
});

export default router;