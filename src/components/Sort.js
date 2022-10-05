import React, { useState } from "react";

const Sort = (props) => {
  let options = [
    "Sort by id INC",
    "Sort by id DEC",
    "Sort by name INC",
    "Sort by name DEC",
    "Sort by email INC",
    "Sort by email DEC",
  ];
  /**
   * Hooks Section name - useState hooks for the component
   * useState Hooks for  -selectedOption - value selected in sort type dropdown
   */
  const [selectedOption, setSelectedOption] = useState(options[0]);
  /**
   * Function name - sortOptionHandler
   * Function work - get the value of type of sort selected by user, to be performed in the table list
   * Params - {object} - event - the event for dropdown with different types of sort
   */
  const sortOptionHandler = (event) => {
    console.log(
      `Sort.js :: sortOptionHandler :: event.target.value`,
      event.target.value
    );
    console.log(
      `Sort.js :: sortOptionHandler :: options[event.target.value]`,
      options[event.target.value]
    );
    setSelectedOption(options[event.target.value]);
    props.setSelectedOptionValue(options[event.target.value]);
  };

  return (
    <div className="align">
      <label htmlFor="sort">Sort table items</label>
      <select
        name="sort"
        id="sort"
        defaultValue={selectedOption}
        onChange={sortOptionHandler}
        className={"mx-3"}
      >
        {options.map((element, index) => {
          return (
            <option value={index} key={index}>
              {element}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default Sort;
