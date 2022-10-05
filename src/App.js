import logo from "./logo.svg";
import "./App.css";
import Tables from "./components/Tables";
import { useState, useEffect } from "react";
import NavBar from "./components/NavBar";
import Sort from "./components/Sort";

function App() {
  const tableData = {
    page: 1,
    per_page: 6,
    total: 12,
    total_pages: 2,
    data: [
      {
        id: 1,
        email: "george.bluth@reqres.in",
        first_name: "George",
        last_name: "Bluth",
        avatar: "https://reqres.in/img/faces/1-image.jpg",
      },
      {
        id: 2,
        email: "janet.weaver@reqres.in",
        first_name: "Janet",
        last_name: "Weaver",
        avatar: "https://reqres.in/img/faces/2-image.jpg",
      },
      {
        id: 3,
        email: "emma.wong@reqres.in",
        first_name: "Emma",
        last_name: "Wong",
        avatar: "https://reqres.in/img/faces/3-image.jpg",
      },
      {
        id: 4,
        email: "eve.holt@reqres.in",
        first_name: "Eve",
        last_name: "Holt",
        avatar: "https://reqres.in/img/faces/4-image.jpg",
      },
      {
        id: 5,
        email: "charles.morris@reqres.in",
        first_name: "Charles",
        last_name: "Morris",
        avatar: "https://reqres.in/img/faces/5-image.jpg",
      },
      {
        id: 6,
        email: "tracey.ramos@reqres.in",
        first_name: "Tracey",
        last_name: "Ramos",
        avatar: "https://reqres.in/img/faces/6-image.jpg",
      },
    ],
    support: {
      url: "https://reqres.in/#support-heading",
      text: "To keep ReqRes free, contributions towards server costs are appreciated!",
    },
  };

  const [selectedOptionValue, setSelectedOptionValue] =
    useState("Sort by id INC");
  console.log(`selectedOptionValue : ${selectedOptionValue}`);

  const [userlist, setUserlist] = useState([]);
  const [newUser, setNewUser] = useState({});
  console.log(`App.js :: main :: newUser`, newUser);

  const fetchUsers = () => {
    let url = "https://reqres.in/api/users";
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setUserlist(data.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const addNewUser = (newUserData) => {
    let url = "https://reqres.in/api/users";
    let params = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUserData),
    };
    console.log("newUserData.id", newUserData.id);
    if (newUserData.id) {
      fetch(url, params)
        .then((response) => response.json())
        .then((newData) => {
          console.log("Success ", newData);
          // fetchUsers();
          let userData = [...userlist];
          userData.push(newData);
          console.log(`App.js :: addNewUser :: userlist.data`, userData);
          setUserlist(userData);
          console.log(
            `App.js :: addNewUser :: userlist after update`,
            userlist
          );
          // setUserlist(data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } else {
      console.log("No new user to add");
    }
  };

  useEffect(() => {
    fetchUsers();
    console.log("i fire once");
  }, []);

  useEffect(() => {
    addNewUser(newUser);
    console.log(`App.js :: useEffect - addNewUser :: `);
  }, [newUser]);

  const sortFields = (arr, field, isReverse = false) => {
    let fieldValues = [];

    arr.forEach((element) => {
      console.log(`App.js :: sortFields :: element.field `, element[field]);
      fieldValues.push(element[field]);
    });

    if (field === "id") {
      fieldValues.sort((a, b) => a - b);
    } else {
      fieldValues.sort();
    }

    if (isReverse) {
      console.log("Reverse called", isReverse);
      fieldValues.reverse();
    }

    console.log(`App.js :: sortFields :: fieldValues `, fieldValues);
    let sortedArray = [];

    fieldValues.forEach((element, index) => {
      for (let i = 0; i < arr.length; i++) {
        if (element === arr[i][field]) {
          sortedArray.push(arr[i]);
        }
      }
    });

    console.log(`App.js :: sortFields :: sortedArray `, sortedArray);
    setUserlist(sortedArray);
    return sortedArray;
  };

  const sortData = (option, userlist) => {
    switch (option) {
      case "Sort by id INC":
        sortFields(userlist, "id", false);

        break;

      case "Sort by id DEC":
        sortFields(userlist, "id", true);

        break;

      case "Sort by name INC":
        sortFields(userlist, "first_name", false);

        break;

      case "Sort by name DEC":
        sortFields(userlist, "first_name", true);

        break;

      case "Sort by email INC":
        sortFields(userlist, "email", false);

        break;

      case "Sort by email DEC":
        sortFields(userlist, "email", true);

        break;

      default:
        sortFields(userlist, "id", false);
        break;
    }
  };

  useEffect(() => {
    sortData(selectedOptionValue, userlist);
  }, [selectedOptionValue]);

  return (
    <div>
      <NavBar />
      <div className="container my-4">
        <Sort setSelectedOptionValue={setSelectedOptionValue} />
        <Tables
          tableData={userlist}
          selectedOptionValue={selectedOptionValue}
          setNewUser={setNewUser}
        />
      </div>
    </div>
  );
}

export default App;
