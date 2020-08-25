import React from "react";

function Errors({errors, message}) {

  return (
    <React.Fragment>
      <div className={`alert alert-${message}`}>
        {errors.map((error) => (
          <li key={errors.indexOf(error)}>{error}</li>
        ))}
      </div>
    </React.Fragment>
  );
}

export default Errors;
