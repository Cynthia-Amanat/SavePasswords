import React from "react";
import { PasswordsListContext } from "../../Context/PasswordContext";
import PulseLoader from "react-spinners/PulseLoader";
import "./passwordList.css";
import PasswordCard from "../PasswordCard/PasswordCard";
import emptyList from "./empty-list.png";
import errorImg from "../../assest/error.png";

const PasswordsList = () => {
  const { passwordsList, loading, error } = PasswordsListContext();
  if (passwordsList.length === 0) {
    return (
      <div className="nothing_to_show">
        <div className="empty-list">
          <img src={emptyList} alt="empty-list" />
          <p>Nothing to show add passwords to save</p>
        </div>
      </div>
    );
  }
  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-gif">
          <PulseLoader
            color="#f9a01b"
            size={60}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      </div>
    );
  }
  if (error) {
    return (
      <div className="error-container">
        <div className="error-gif">
          <img src={errorImg} alt="error" />
        </div>
      </div>
    );
  }
  return (
    <>
      <div className="passwords_list_div">
        <table className="passwords_table">
          <thead>
            <tr className="tr-head">
              <th>Logo</th>
              <th>Title</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {passwordsList.map((item, key) => {
              return <PasswordCard item={item} key={key} />;
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default PasswordsList;
