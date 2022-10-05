import React from "react";

const ErrorComponent = (props) => {
  return (
    <div>
      <h3 className="container text-danger">
        <strong>Error received : </strong>
        {props.errMssg}
      </h3>
    </div>
  );
};

export default ErrorComponent;
