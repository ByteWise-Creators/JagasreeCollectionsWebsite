import { useState } from "react";
import PropTypes from "prop-types";

import Button from "./Button";
import Input from "./Input";
import { login } from "../Utils";

const Login = ({ closeFunction, setIsLogin }) => {
  const [user, setUser] = useState({ email: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) =>
    setUser((pv) => ({ ...pv, [e.target.name]: e.target.value }));

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const res = await login(user);
    setMessage(res.message);
    if (res.message === "LoggedIn Sucessfully") {
      localStorage.setItem("_userAuthToken", JSON.stringify(res.data.id));
      setTimeout(() => {
        closeFunction();
      }, 1000);
    } else {
      setTimeout(() => {
        setIsLogin(false);
      }, 1000);
    }
  };

  return (
    <div>
      <h2 className="text-xl text-center leading-5 font-semibold font-heading text-gray-400 mb-4">
        Already have an account? <br /> Login to continue
        {message && (
          <span className="text-green-500 font-heading text-md block mt-2">
            {message}
          </span>
        )}
      </h2>
      <form onSubmit={handleFormSubmit} className="flex flex-col gap-3">
        <Input
          type="email"
          name="email"
          placeholder="Email"
          required
          value={user.email}
          onChange={handleChange}
        />
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
};

Login.propTypes = {
  closeFunction: PropTypes.func,
  setIsLogin: PropTypes.func,
};

export default Login;
