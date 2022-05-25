import React from "react";

const Input = ({ name, label, error, ...rest }) => {
  return (
    <div className="form-group w-50">
      <label htmlFor={name}>{label}</label>
      <input {...rest} name={name} id={name} className="form-control w-30 " />
      {error && (
        <div className="alert alert-danger">
          {error.message ? error.message : error}
        </div>
      )}
    </div>
  );
};

export default Input;
