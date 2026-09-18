import {pool} from "../db.js"


// OBTENER TODOS LOS USUARIOS, GET
export const getAllUsers = async (req, res) => {
    try {
        const { rows } = await pool.query('SELECT id, name, email, created_at FROM users')
        res.json(rows);
    } catch (error) {
        res.status(500).json({message: "Error interno del servidor"})
    }

};


// OBRENER UN USUARIO POR ID, GET
export const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const { rows } = await pool.query("SELECT id, name, email, created_at FROM users WHERE id = $1", [id]);

        if (rows.length === 0) {
            return res.status(404).json({ message: "Usuario no encontrado" })
        }

        const user = rows[0];
        res.json({
            ...user, profile_image_url: user.profile_image_url ? `/uploads/${user.profile_image}` : null
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Error interno del servidor"})
    }
}

//CREAR USUARIO, POST
export const createUser = async (req, res) => {
    try {
        const data = req.body
        const {rows} = await pool.query("INSERT INTO users (name, email) VALUES ($1, $2) RETURNING id, name, email, created_at, profile_image", [data.name, data.email]);

        return res.json(rows[0]);

    } catch (error) {
        console.error(error);

        if (error?.code === "23505"){
            return res.status(409).json({message: "El email ya existe"})
        }

        return res.status(500).json({message: "Error interno del servidor"})
    }

}


// ELIMINAR USUARIO POR ID, DELETE
export const deleteUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const {rowCount} = await pool.query("DELETE FROM users WHERE id = $1 RETURNING *", [id]);

        if (rowCount === 0) {
            return res.status(404).json({ message: "Usuario no encontrado" })
        }

        return res.sendStatus(204).json;

    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Error interno del servidor"})
    }
}


//ACTUALIZAR
export const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;

        const {rows} = await pool.query("UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING id, name, email, created_at, profile_image", [data.name, data.email, id])

        return res.json(rows[0]);
        
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Error interno del servidor"})
    }
}