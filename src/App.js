import "./App.css";
import Tables from "./components/Tables";
import { useState, useEffect } from "react";
import NavBar from "./components/NavBar";
import Sort from "./components/Sort";
import ErrorComponent from "./components/ErrorComponent";

function App() {
  // const tableData = {
  //   page: 1,
  //   per_page: 6,
  //   total: 12,
  //   total_pages: 2,
  //   data: [
  //     {
  //       id: 1,
  //       email: "george.bluth@reqres.in",
  //       first_name: "George",
  //       last_name: "Bluth",
  //       avatar: "https://reqres.in/img/faces/1-image.jpg",
  //     },
  //     {
  //       id: 2,
  //       email: "janet.weaver@reqres.in",
  //       first_name: "Janet",
  //       last_name: "Weaver",
  //       avatar: "https://reqres.in/img/faces/2-image.jpg",
  //     },
  //     {
  //       id: 3,
  //       email: "emma.wong@reqres.in",
  //       first_name: "Emma",
  //       last_name: "Wong",
  //       avatar: "https://reqres.in/img/faces/3-image.jpg",
  //     },
  //     {
  //       id: 4,
  //       email: "eve.holt@reqres.in",
  //       first_name: "Eve",
  //       last_name: "Holt",
  //       avatar: "https://reqres.in/img/faces/4-image.jpg",
  //     },
  //     {
  //       id: 5,
  //       email: "charles.morris@reqres.in",
  //       first_name: "Charles",
  //       last_name: "Morris",
  //       avatar: "https://reqres.in/img/faces/5-image.jpg",
  //     },
  //     {
  //       id: 6,
  //       email: "tracey.ramos@reqres.in",
  //       first_name: "Tracey",
  //       last_name: "Ramos",
  //       avatar: "https://reqres.in/img/faces/6-image.jpg",
  //     },
  //   ],
  //   support: {
  //     url: "https://reqres.in/#support-heading",
  //     text: "To keep ReqRes free, contributions towards server costs are appreciated!",
  //   },
  // };

  /**
   * Hooks Section name - useState hooks for the component
   * useState Hooks for  -selectedOptionValue | userlist |  newUser
   */
  const [selectedOptionValue, setSelectedOptionValue] =
    useState("Sort by id INC");

  console.log(`App.js :: main :: selectedOptionValue : ${selectedOptionValue}`);

  const [userlist, setUserlist] = useState([]);
  const [newUser, setNewUser] = useState({});

  console.log(`App.js :: main :: newUser`, newUser);

  /**
   * Hooks Section name - useState hooks to manage errors
   * useState Hooks for  -isError | errMssg
   */
  const [isError, setIsError] = useState(false);
  const [errMssg, setErrMssg] = useState("");

  /**
   * Hooks Section name - useState hooks for dark theme
   * useState Hooks for  - mode - will check if current mode is dark or light
   */
  const [mode, setMode] = useState("light");

  /**
   * Function name - handleToggleMode
   * Function work - Toggle theme from dark to light and vice-versa based on current theme
   * Params - NA
   */
  const handleToggleMode = () => {
    if (mode === "light") {
      setMode("dark");
      document.body.style.backgroundColor = "#042743";
      document.body.style.color = "white";
    } else {
      setMode("light");
      document.body.style.backgroundColor = "white";
      document.body.style.color = "black";
    }
  };

  /**
   * Function name - fetchUsers
   * Function work - Fetch user list with GET request
   * Params - NA
   */
  const fetchUsers = () => {
    let url = "https://reqres.in/api/users";
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log(`SUCCESS :: App.js :: fetchUsers :: data`, data);
        setUserlist(data.data);
      })
      .catch((error) => {
        console.error("ERROR: App.js :: fetchUsers :: ", error);
      });
  };

  /**
   * Function name - addNewUser
   * Function work - Add a new user to user list with POST request
   * Params - {object} - newUserData - new user data obtained from the form will be stored stored in an object and passed as parameter to this function
   */
  const addNewUser = (newUserData) => {
    let url = "https://reqres.in/api/users";
    let params = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUserData),
    };
    console.log(`App.js :: addNewUser :: newUserData.id`, newUserData.id);
    if (newUserData.id) {
      fetch(url, params)
        .then((response) => response.json())
        .then((newData) => {
          console.log(`SUCCESS :: App.js :: addNewUser :: newData`, newData);
          // fetchUsers();
          let userData = [...userlist];
          userData.push(newData);
          console.log(`App.js :: addNewUser :: userlist`, userData);
          setUserlist(userData);
          console.log(
            `App.js :: addNewUser :: userlist after update`,
            userlist
          );
          alert("User added successfully");
        })
        .catch((error) => {
          console.error("ERROR: App.js :: addNewUser :: ", error);
        });
    } else {
      console.log("App.js :: addNewUser :: No new user to add");
    }
  };

  /**
   * Hooks section name - useeffect hook for GET request
   * Dependency - None
   * Behavior - Will load only on Mount of react component - componentDidMount
   */
  useEffect(() => {
    fetchUsers();
    console.log("i fire once");
  }, []);

  /**
   * Hooks section name - useeffect hook for POST request
   * Dependency - newUser
   * Behavior - Will load only on Mount of react component and whenever we are updating value for new user, i.e creating a new user - componentDidMount, componentDidUpdate with dependency
   */
  useEffect(() => {
    addNewUser(newUser);
    console.log(`App.js :: useEffect - addNewUser :: `);
  }, [newUser]);

  /**
   * Function name - sortFields
   * Function work - sort the input array based on the field passed in either increasing or decreasing order
   * Params - {array} - arr - input array to be sorted
   * Params - {string} - field - field based on which sorting has to be done
   * Params - {boolean} - isReverse - if array to be sorted in increasing order then false and for decreasing order true
   */
  const sortFields = (arr, field, isReverse = false) => {
    try {
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
    } catch (error) {
      console.error(
        `Exception received :: App.js :: sortFields :: error name :: ${error.name}, error message :: `,
        error.message
      );
      setIsError(true);
      setErrMssg(error.message);
    }
  };

  /**
   * Function name - sortData
   * Function work - Will read the option selected from sort dropdown and will call a function to sort the table items
   * Params - {string} - option - value selected in dropdown
   * Params - {array} - userlist - list of users to be sorted
   */
  const sortData = (option, userlist) => {
    try {
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
      // throw new Error(
      //   "Error world : Manually created error to test error handling"
      // );
    } catch (error) {
      console.error(
        `Exception received :: App.js :: sortData :: error name :: ${error.name}, error message :: `,
        error.message
      );
      setIsError(true);
      setErrMssg(error.message);
    }
  };

  /**
   * Hooks section name - useeffect hook for updating table based on every sort option
   * Dependency - selectedOptionValue
   * Behavior - Will load only on Mount of react component and whenever we are updating value for option to sort the table, i.e sort the table data - componentDidMount, componentDidUpdate with dependency
   */
  useEffect(() => {
    sortData(selectedOptionValue, userlist);
  }, [selectedOptionValue]);

  return (
    <div>
      <NavBar mode={mode} toggleMode={handleToggleMode} />
      <h1 className="text-center my-3">User List</h1>
      {isError && <ErrorComponent isError={isError} errMssg={errMssg} />}
      <div className="container my-4">
        <Sort setSelectedOptionValue={setSelectedOptionValue} />
        <Tables
          tableData={userlist}
          selectedOptionValue={selectedOptionValue}
          setNewUser={setNewUser}
          mode={mode}
          setIsError={setIsError}
          setErrMssg={setErrMssg}
        />
      </div>
    </div>
  );
}

export default App;
