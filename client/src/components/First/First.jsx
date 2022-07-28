import React from "react";
import { Link } from "react-router-dom";

function First() {
  return (
    <>
        <h1>Henry Food</h1>
      <Link to="/home"> <button>Home</button> </Link>
    </>
  );
}

export default First;
