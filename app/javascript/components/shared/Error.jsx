import React from "react";

function Errors({errors, message}) {

  return (
    <React.Fragment>
      <div className={`d-flex justify-content-center {}`}>
        <div className={`alert alert-${message}`}>
          {errors.map((error) => (
            <li key={errors.indexOf(error)}>{error}</li>
          ))}
        </div>
      </div>
    </React.Fragment>
  );
}

export default Errors;
