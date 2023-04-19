/** @format */

import React, { useState } from "react";
import BrokenImage from "../PasswordsList/noAppLogo.png";
import { PasswordsListContext } from "../../Context/PasswordContext";
import EditPopUp from "../EditPopUp/EditPopUp";
const PasswordCard = ({ item }) => {
  const { passwordsList, setPasswordList, setError } = PasswordsListContext();
  const [open, setOpen] = useState(false);

  const decryptPassword = async (encryption) => {
    const url = "http://localhost:8000/passwords/decryptpassword";
    const methods = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        password: encryption.password,
        iv: encryption.iv,
      }),
    };
    try {
      const response = await fetch(url, methods);
      const data = await response.json();
      
      setPasswordList(
        passwordsList.map((item) => {
          return item.password_id === encryption.password_id
            ? {
                password_id: item.password_id,
                title: data,
                iv: item.iv,
              }
            : item;
        })
      );
   
    } catch (error) {
      console.log(error)
      setError(error);
    }
  };
  // on imageError
  const imageOnError = (event) => {
    event.currentTarget.src = BrokenImage;
    event.currentTarget.className = "error_on_image";
  }; // delete handler
  const deleteHandler = async (id) => {
    const url = `${process.env.REACT_APP_BASE_SERVER_URL}passwords/delete/${id}`;
    const method = {
      method: "DELETE",
    };
    try {
      await fetch(url, method);
      const newPasswordsList = passwordsList.filter(
        (list) => list.password_id !== id
      );
      setPasswordList(newPasswordsList);
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <tr>
      <td>
        <img
          className="app_logo"
          src={`https://logo.clearbit.com/${item.title}.com?size=100`}
          alt="logo"
          onError={imageOnError}
        />
      </td>
      <td
        onClick={() => {
          decryptPassword({
            password: item.password,
            iv: item.iv,
            password_id: item.password_id,
          });
        }}
      >
        {item.title}
      </td>
      <td>
        <button className="btn-edit" onClick={() => setOpen(!open)}>
          <i className="fas fa-edit"></i>
        </button>
      </td>
      <td>
        <button
          className="btn-edit"
          onClick={() => deleteHandler(item.password_id)}
        >
          <i className="fa-solid fa-trash-can"></i>
        </button>
      </td>
      <td>
        {open ? (
          <div className="update-profile-popup-container">
            <EditPopUp setOpen={setOpen} item={item} />
          </div>
        ) : null}
      </td>
    </tr>
  );
};
export default PasswordCard;
