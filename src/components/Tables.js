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
  const addUserHandler = () => {
    let firstName;
    let lastName;
    if (fullName.includes(" ")) {
      // { firstName, lastName } = fullName.split(" ");x
    } else {
      firstName = fullName;
    }
    let newUser = {
      id: Math.ceil(Math.random() * 100),
      email: email,
      first_name: firstName,
      last_name: lastName,
      avatar: url,
    };
    console.log(`Table.js :: addUserHandler :: newUser`, newUser);
    props.setNewUser(newUser);
    setEmail("");
    setUrl("");
    setFullName("");
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
                    <td>{element.first_name + element.last_name}</td>
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
