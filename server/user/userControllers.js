import bcrypt from "bcrypt";
import pool from "../database.js";
import jwt from "jsonwebtoken";
import { promisify } from "util";
import { OAuth2Client } from "google-auth-library";

const exceQuery = promisify(pool.query).bind(pool);
const client = new OAuth2Client(process.env.CLIENT_ID);

// crating user
export const createUser = async (req, res) => {
  let hashPassword = req.body.password;
  const salt = await bcrypt.genSalt(10);
  hashPassword = await bcrypt.hash(hashPassword, salt);

  const data = {
    name: req.body.name,
    email: req.body.email,
    password: hashPassword,
    dob: req.body.dob,
  };
  const queryFind = `SELECT * FROM registration where "${data.email}"`;
  const queryInsert = `INSERT INTO registration SET ?`;
  try {
    const existingUser = await exceQuery(queryFind);
    if (existingUser.length) {
      return res
        .status(400)
        .json({ success: false, message: `user already ${data.email} exist` });
    }
    const registerNewUser = await exceQuery(queryInsert, data);
    if (registerNewUser) {
      return res.status(200).json({
        success: true,
        data: registerNewUser,
      });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// get user
export const getUser = async (req, res) => {
  const email = req.user;
  const query = ` select * from registration where email = "${email}" `;
  try {
    const result = await exceQuery(query);
    if (result) {
      return res.status(200).json({ success: true, user: result[0] });
    }
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

// login with database

export const login = async (req, res) => {
  let email = req.body.email;
  const query = ` select * from registration where email = "${email}" `;

  try {
    const results = await exceQuery(query);
    if (results.length > 0) {
      bcrypt.compare(
        req.body.password,
        results[0].password,
        function (error, result) {
          if (error) throw error;
          if (result) {
            const accessToken = jwt.sign(
              email,
              process.env.ACCESS_TOKEN_SECRET
            );
            return res
              .status(200)
              .json({
                success: true,
                accessToken: accessToken,
                message: "logged in",
                user: results[0],
              });
          } else {
            return res
              .status(400)
              .json({ message: "Invalid Password or Email" });
          }
        }
      );
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// login with google
export const loginWithGoogle = async (req, res) => {
  try {
    const token = req.body.token;
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.CLIENT_ID,
    });
    const payload = ticket.getPayload();
    const { sub, email, name } = payload;
    try {
      const selectQuery =
        "SELECT * FROM registration WHERE google_id = ? LIMIT 1";
      const selectValues = [sub];
      const [existingUser] = await exceQuery(selectQuery, selectValues);
      if (existingUser) {
        const jwtToken = jwt.sign({ id: sub }, process.env.ACCESS_TOKEN_SECRET);
        res.json({ token: jwtToken, user: existingUser });
      } else {
        const insertQuery =
          "INSERT INTO registration (email, name, google_id) VALUES (?, ?, ?)";
        const insertValues = [email, name, sub];
        const result = await exceQuery(insertQuery, insertValues);
        const jwtToken = jwt.sign({ id: sub }, process.env.ACCESS_TOKEN_SECRET);
        res.json({ token: jwtToken, user: result });
        return result.insertId;
      }
    } catch (error) {
      console.error(error);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
