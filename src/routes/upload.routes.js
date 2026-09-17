import { Router } from "express";
import path from "path";
import fs from "fs";
import { pool } from "../db.js";
import verifyToken from "../middlewares/auth.middleware.js";

const router = Router();

const allowedExtensions = [".jpg", ".jpeg", ".webp", ".avif"];

router.post("/upload", verifyToken, async (req, res) => {

    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            message: "No se ha seleccionado ningún archivo"
        });
    }

    const file = req.files.archivo;

    if (!file) {
        return res.status(400).json({
            message: "El archivo debe enviarse con el campo 'archivo'"
        });
    }

    const extension = path.extname(file.name).toLowerCase();


    if (!allowedExtensions.includes(extension)) {
        return res.status(400).json({
            message: "Formato de imagen no permitido. Usa JPG, JPEG, WEBP o AVIF"
        });
    }

    if (file.size > 2 * 1024 * 1024) {
        return res.status(400).json({
            message: "La imagen no puede superar los 2mb"
        });
    }

    const fileName = `${Date.now()}${extension}`;

    const uploadPath = path.join("uploads", fileName);

    const { rows } = await pool.query(
        "SELECT profile_image FROM users WHERE id = $1",
        [req.user.id]
    );

    const oldFileName = rows[0]?.profile_image;

    file.mv(uploadPath, async (error) => {
        if (error) {
            console.error(error);

            return res.status(500).json({
                message: "Error al guardar la imagen"
            });
        }

        await pool.query(
            "UPDATE users SET profile_image = $1 WHERE id = $2",
            [fileName, req.user.id]
        );

        if (oldFileName) {
            const oldFilePath = path.join("uploads", oldFileName);

            if (fs.existsSync(oldFilePath)) {
                fs.unlinkSync(oldFilePath);
            }
        }

        res.json({
            message: "Imagen subida correctamente",
            fileName: fileName
        });
    });

});

export default router;
