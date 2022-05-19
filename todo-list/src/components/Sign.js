import React, { useState } from "react";
import Signin from "./SignIn";
import Signup from "./SignUp";

const Sign = () => {
  const [index, setIndex] = useState(false);
  const toggleIndex = () => {
    setIndex((prevState) => !prevState);
  };
  return (
    <div className="container">
      {!index ? <Signin /> : <Signup />}
      <button className="btn btn-primary mt-2" onClick={toggleIndex}>
        {!index ? "Click here to create new user! " : "Already have an acount?"}
      </button>
    </div>
  );
};

export default Sign;