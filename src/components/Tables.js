import React, { useState } from "react";

const Tables = (props) => {
  // console.log(`Table.js :: main :: props.tableData`, props.tableData);
  // console.log(
  //   `props.tableData.data[props.tableData.data.length - 1]`,
  //   props.tableData.data[props.tableData.data.length - 1]
  // );

  /**
   * Hooks Section name - useState hooks for the component
   * useState Hooks for  - url | fullName | email - values entered in the input elements for url, fullname and email
   */
  const [url, setUrl] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");

  /**
   * Function name - invokeError
   * Function work - change the error status to true and show error message on DOM
   * Params - {object} - error - details of error details
   */
  const invokeError = (error) => {
    props.setIsError(true);
    props.setErrMssg(error.message);
  };
  /**
   * Function name - formUrlHandler | formNameHandler | formEmailHandler
   * Function work - change the input fields value to the keyboard input entered by user
   * Params - {object} - event - event received when keyboard input given by user
   */
  const formUrlHandler = (event) => {
    setUrl(event.target.value);
  };
  const formNameHandler = (event) => {
    setFullName(event.target.value);
  };
  const formEmailHandler = (event) => {
    setEmail(event.target.value);
  };

  /**
   * Function name - userValidation
   * Function work - Validation criteria for the different input fields for adding user
   * Return - If all validation passes then return true else false
   * Params - None
   */
  const userValidation = () => {
    try {
      // throw new Error(
      //   "Error world : Manually created error to test error handling"
      // );
      if (url && url.slice(0, 4) !== "http") {
        alert("Please enter a valid url Ex - http://xyz....");
        return false;
      }
      let name = fullName.split(" ");
      console.log(`table.js :: userValidation :: fullName`, name[1]);
      if (
        !fullName ||
        fullName.length < 3 ||
        !fullName.includes(" ") ||
        name[0].length < 3 ||
        name[1].length < 3 ||
        fullName
          .split("")
          .some((element) =>
            ["!", "#", "$", "%", "^", "&", "*", "@", "("].includes(element)
          )
      ) {
        alert(
          "Please enter your full name (min 3 char)-> first_name last_name"
        );
        return false;
      }
      if (
        !email ||
        email.length < 3 ||
        !email.includes("@") ||
        email
          .split("")
          .some((element) =>
            ["!", "#", " ", "$", "%", "^", "&", "*"].includes(element)
          )
      ) {
        alert("Please enter a valid email id with min 3 char");
        return false;
      } else {
        return true;
      }
    } catch (error) {
      console.error(
        `Exception received :: Tables.js :: userValidation :: error name :: ${error.name}, error message :: `,
        error.message
      );
      invokeError(error);
    }
  };

  /**
   * Function name - addUserHandler
   * Function work - Will first check validation of input fields and then create newUser object
   * Params - None
   */
  const addUserHandler = () => {
    try {
      let isValidate = userValidation();
      if (isValidate) {
        let name = fullName.split(" ");
        let newUser = {
          id: props.tableData.length + 1,
          email: email,
          first_name: name[0],
          last_name: name[1],
          avatar: url
            ? url
            : "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=740&t=st=1664976045~exp=1664976645~hmac=51805a2d7bbafe5eafbefe9377d4e65dc058d1bb6e33c180dea0c5c6f6807dc9",
        };
        console.log(`Table.js :: addUserHandler :: newUser`, newUser);
        props.setNewUser(newUser);
        setEmail("");
        setUrl("");
        setFullName("");
      } else {
        console.log("Table.js :: addUserHandler :: Validation failed");
      }
    } catch (error) {
      console.error(
        `Exception received :: Tables.js :: addUserHandler :: error name :: ${error.name}, error message :: `,
        error.message
      );
      invokeError(error);
    }
  };
  return (
    <div>
      <div className="container text-left">
        <button
          type="button"
          className={`btn btn-${props.mode === "dark" ? "light" : "dark"} my-3`}
          onClick={addUserHandler}
        >
          Add User
        </button>
        <span className="mx-3">
          <strong>Instructions : </strong>* fields are mandatory while creating
          a new user
        </span>
      </div>

      {props.tableData && (
        <table
          className={`table table-bordered border-${
            props.mode === "dark" ? "light" : "dark"
          } `}
          style={{ color: props.mode === "dark" ? "white" : "black" }}
        >
          <thead>
            <tr>
              <th scope="col">Profile Pic</th>
              <th scope="col">Id</th>
              <th scope="col">Name *</th>
              <th scope="col">Email *</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">
                <input
                  type="url"
                  value={url}
                  onChange={formUrlHandler}
                  placeholder="Profile photo url"
                />
              </th>
              <td>
                <input type="text" value="" placeholder="ID" disabled />
              </td>
              <td>
                <input
                  type="text"
                  value={fullName}
                  onChange={formNameHandler}
                  placeholder="Full name"
                />
              </td>
              <td>
                <input
                  type="text"
                  value={email}
                  onChange={formEmailHandler}
                  placeholder="email"
                />
              </td>
            </tr>
            {props.tableData &&
              props.tableData.map((element, index) => {
                return (
                  <tr key={element.id}>
                    <th scope="row">
                      <img
                        src={element.avatar}
                        alt="Profile pic"
                        style={{ height: "128px", width: "128px" }}
                      ></img>
                    </th>
                    <td>{element.id}</td>
                    <td>{element.first_name + " " + element.last_name}</td>
                    <td>{element.email}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Tables;
