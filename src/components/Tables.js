import React, { useState } from "react";

const Tables = (props) => {
  console.log(`Table.js :: main :: props.tableData`, props.tableData);
  // console.log(
  //   `props.tableData.data[props.tableData.data.length - 1]`,
  //   props.tableData.data[props.tableData.data.length - 1]
  // );
  const [url, setUrl] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");

  const formUrlHandler = (event) => {
    setUrl(event.target.value);
  };
  const formNameHandler = (event) => {
    setFullName(event.target.value);
  };
  const formEmailHandler = (event) => {
    setEmail(event.target.value);
  };
  const userValidation = () => {
    if (!url || url.slice(0, 4) !== "http") {
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
      alert("Please enter your full name (min 3 char)-> first_name last_name");
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
  };
  const addUserHandler = () => {
    let isValidate = userValidation();
    if (isValidate) {
      let name = fullName.split(" ");
      let newUser = {
        id: Math.ceil(Math.random() * 100),
        email: email,
        first_name: name[0],
        last_name: name[1],
        avatar: url,
      };
      console.log(`Table.js :: addUserHandler :: newUser`, newUser);
      props.setNewUser(newUser);
      setEmail("");
      setUrl("");
      setFullName("");
    } else {
      console.log("Validation failed");
    }
  };
  return (
    <div>
      <h1>User List</h1>
      <button
        type="button"
        className="btn btn-dark my-3"
        onClick={addUserHandler}
      >
        Add User
      </button>
      {props.tableData && (
        <table className="table table-bordered border-dark">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Id</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
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
                      <img src={element.avatar} alt="Profile pic"></img>
                    </th>
                    <td>{element.id}</td>
                    <td>{element.first_name + " " + element.last_name}</td>
                    <td>@{element.email}</td>
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
