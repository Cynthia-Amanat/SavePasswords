import pool from "../database.js";
import { promisify } from "util";
import { encryption, decryption } from "./encryptionHandlers.js";

const exceQuery = promisify(pool.query).bind(pool);

export const addPassword = async (req, res) => {
  const { title, password, registration_id } = req.body;
  const encryptedPassword = encryption(password);

  const query = `INSERT INTO passwords (title, iv, password, registration_id) Values(?,?,?,?)`;
  try {
    const addPassword = await exceQuery(query, [
      title,
      encryptedPassword.iv,
      encryptedPassword.password,
      registration_id,
    ]);
    if (addPassword) {
      const allPasswords = await exceQuery("Select * from passwords");

      return res.status(200).json({ success: true, data: allPasswords });
    }
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

export const getPasswords = async (req, res) => {
  const registration_id = req.params.id;

  const query = `SELECT * FROM passwords Where registration_id = "${registration_id}"`;
  try {
    const getPasswords = await exceQuery(query);
    if (getPasswords) {
      return res.status(200).json({ success: true, result: getPasswords });
    }
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

export const decrypt = (req, res) => {
  try {
    res.status(200).json(decryption(req.body));
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const UpdatePasswordsAndTitle = async (req, res) => {
  const id = req.params.id;
  const title = req.body.title;
  const password = req.body.password;

  const queryTitle = `UPDATE passwords SET title = ? WHERE password_id = ${id}`;

  const queryPassword = `UPDATE passwords SET iv = ? , password = ? WHERE password_id = ${id}`;
  try {
    if (title) {
      const updatedTitle = await exceQuery(
        queryTitle,
        [title, id],
        (error, result) => {
          if (error) throw error;
          res
            .status(200)
            .json({ success: true, message: "title updated", });
        }
      );
    }
    if (password) {
      const encryptedPassword = encryption(password);
      await exceQuery(
        queryPassword,
        [encryptedPassword.password, encryptedPassword.iv, id],
        (error, result) => {
          if (error) throw error;
          res
            .status(200)
            .json({
              success: true,
              message: " passsword successfully updated",
            });
        }
      );
    }
  } catch (error) {
    res.status(409).json({ success: false, message: error.message });
  }
};
export const deletePassword = async (req, res) => {
  const id = req.params.id;
  const query = `DELETE FROM passwords WHERE password_id = ${id}`;

  try {
    const deletePassword = await exceQuery(query);
    if (deletePassword) {
      res.status(200).json({ success: true, message: "successfully deleted" });
    }
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
