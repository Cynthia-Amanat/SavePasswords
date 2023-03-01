
module.exports = {
    "up": `CREATE TABLE IF NOT EXISTS passwords (password_id INT AUTO_INCREMENT NOT NULL, title VARCHAR(225) , iv VARCHAR(225), password VARCHAR(225),
    registration_id INT,
    PRIMARY KEY (password_id),
    FOREIGN KEY (registration_id) REFERENCES  registration (registration_id))`,
    "down": "DROP TABLE passwords"
}