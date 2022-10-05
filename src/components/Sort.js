import React, { useState } from "react";

const Sort = (props) => {
  const sortOptionHandler = (event) => {
    console.log(event.target.value);
    console.log(options[event.target.value]);
    setSelectedOption(options[event.target.value]);
    props.setSelectedOptionValue(options[event.target.value]);
  };

  let options = [
    "Sort by id INC",
    "Sort by id DEC",
    "Sort by name INC",
    "Sort by name DEC",
    "Sort by email INC",
    "Sort by email DEC",
  ];

  const [selectedOption, setSelectedOption] = useState(options[0]);

  return (
    <div>
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
