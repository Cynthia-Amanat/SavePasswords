 import crypto from  "crypto"
// The Buffer.from() method creates a new buffer filled with the specified string, array, or buffer.
// Creates a Cipher object using the specific algorithm, password and initialization vector
// cipher.final() return the buffer containing the value of cipher object
// cipher.update() used to update the cipher with data according to the given encoding format.


 export const encryption = (password)=>{
    const initializationVector = Buffer.from(crypto.randomBytes(16));
    const cipher = crypto.createCipheriv("aes-256-ctr",Buffer.from(process.env.KEY),initializationVector)

    const encryptedPassword = Buffer.concat([
    cipher.update(password),
    cipher.final()
])
return {iv:initializationVector.toString("hex"),password:encryptedPassword.toString("hex")}
 }

 export const decryption = (encryption) =>{
    const decipher = crypto.createDecipheriv("aes-256-ctr",Buffer.from(process.env.KEY),Buffer.from(encryption.iv ,"hex"))

    const decryptPassword = Buffer.concat([
    decipher.update(Buffer.from(encryption.password ,"hex")),
    decipher.final()
])
 return decryptPassword.toString()
 }