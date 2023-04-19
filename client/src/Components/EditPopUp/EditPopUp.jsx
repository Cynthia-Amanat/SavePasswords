import React, { useState } from "react";
import "./EditPopUp.css";

const EditPopUp = ({ setOpen, item }) => {
  const [title, setTitle] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState("password");
  const url = `${process.env.REACT_APP_BASE_SERVER_URL}passwords/update/${item.password_id}`;
  const method = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, password }),
  };

  const editHandler = async () => {
    try {
      const request = await fetch(url, method);
       const data = await request.json();
       console.log(data)    
      setOpen(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="editPassword">
      <section className="form_editPassword">
        <div className="form__group_editPassword">
          <button className="close-btn btn" onClick={() => setOpen(false)}>
            Close
          </button>
          <input
            type="text"
            required
            placeholder={item.title}
            className="form__input_editPassword"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="form__group_editPassword">
          <input
            type={showPassword}
            required
            placeholder="password"
            className="form__input_editPassword"
            onChange={(e) => setPassword(e.target.value)}
          />
          <i
            style={{ position: "fixed", top: "50%", left: "70%" }}
            className={
              showPassword === "text"
                ? "fa-regular fa-eye"
                : "fa-regular fa-eye-slash"
            }
            onClick={() =>
              showPassword === "password"
                ? setShowPassword("text")
                : setShowPassword("password")
            }
          ></i>
        </div>
        <button
          className="btn_login"
          type="button"
          onClick={() => editHandler()}
        >
          Edit
        </button>
      </section>
    </div>
  );
};
export default EditPopUp;
