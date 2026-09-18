import bcrypt from "bcrypt";

const passwordJohn = "123456";
const passwordJane = "654321";

//convierte una contraseña en hash para guardarlo
const hashJohn = await bcrypt.hash(passwordJohn, 10);
const hashJane = await bcrypt.hash(passwordJane, 10);

console.log("Hash John:", hashJohn);
console.log("Hash Jane", hashJane);

//comprueba una contraseña ingresada con el hash sin revelar la contraseña original
//const esCorrecta = await bcrypt.compare("123456", hash);
//console.log("¿La contraseña es correcta?", esCorrecta);
