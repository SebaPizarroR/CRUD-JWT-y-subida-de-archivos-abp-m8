//Creando tabla users
CREATE TABLE users (
	id serial PRIMARY KEY,
	name varchar(255) NOT NULL,
	email varchar(255) NOT NULL UNIQUE,
	created_at timestamp DEFAULT current_timestamp
);

//Insertando usuarios a la tabla users
INSERT INTO users (name, email)
VALUES ('John Doe', 'john@gmail.com'),
	   ('Jane Doe', 'jane@gmail.com');




//Consulta a la tabla users
SELECT * FROM users;