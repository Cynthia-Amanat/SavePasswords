module.exports = {
    "up": `CREATE TABLE IF NOT EXISTS registration (registration_id INT AUTO_INCREMENT NOT NULL,  
     name VARCHAR(225) , email VARCHAR(225), password VARCHAR(225),
         dob VARCHAR(225), PRIMARY KEY (registration_id))`,
    "down": "DROP TABLE registration"
}