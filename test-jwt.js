import jwt from "jsonwebtoken";

const usuario = {
    id: 1,
    email: "john@gmail.com"
};

const token = jwt.sign(
    usuario, process.env.JWT_SECRET, { expiresIn: "1h" }
);

console.log("Token:", token);