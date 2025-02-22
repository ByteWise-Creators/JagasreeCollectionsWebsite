import { useState } from "react";
import PropTypes from "prop-types";

import Input from "./Input";
import Button from "./Button";

import { signup, verifyOTP } from "../Utils";

const Signup = ({ closeFunction, setIsLogin = () => {} }) => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showOTPField, setShowOTPField] = useState(false);
  const [OTP, setOTP] = useState("");
  const [message, setMessage] = useState("");

  const handleChange = (e) =>
    setUser((pv) => ({ ...pv, [e.target.name]: e.target.value }));

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const message = await signup(user);
    setMessage(message);
    if (message === "OTP sent successfully") {
      setShowOTPField(true);
      setTimeout(() => setMessage(""), 1000);
    }
    if (message === "User already exists") {
      setTimeout(() => setIsLogin(true), 1000);
      setMessage(message + ". Please go login");
    }

    setIsLoading(false);
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const res = await verifyOTP(user.email, OTP);
    if (res.message === "OTP verified successfully") {
      localStorage.setItem("_userAuthToken", JSON.stringify(res.data.id));
    }
    setMessage(res.message);
    setIsLoading(false);
    setTimeout(() => closeFunction(), 1000);
  };

  return (
    <div>
      <h2 className="text-xl text-center leading-5 font-semibold font-heading text-gray-400 mb-4">
        {showOTPField ? (
          <>Check your email for OTP</>
        ) : (
          <>
            New to Jagasree collection? <br /> Create an account <br />
          </>
        )}
        {message && (
          <span className="text-green-600 font-heading text-md block mt-2">
            {message}
          </span>
        )}
      </h2>
      {!showOTPField ? (
        <form onSubmit={handleFormSubmit} className="flex flex-col gap-3">
          <Input
            type="text"
            name="name"
            placeholder="Name"
            required
            value={user.name}
            onChange={handleChange}
          />
          <Input
            type="email"
            name="email"
            placeholder="Email"
            required
            value={user.email}
            onChange={handleChange}
          />
          <Input
            type="text"
            name="phone"
            placeholder="Mobile no."
            maxLength="10"
            required
            value={user.phone}
            onChange={handleChange}
          />
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Sending OTP..." : "Submit"}
          </Button>
        </form>
      ) : (
        <form onSubmit={handleVerifyOTP} className="flex flex-col gap-3">
          <Input
            type="text"
            name="otp"
            placeholder="Enter OTP"
            value={OTP}
            onChange={(e) => setOTP(e.target.value)}
          />
          <Button type="submit">
            {isLoading ? "Verifying..." : "Verify OTP"}
          </Button>
        </form>
      )}
    </div>
  );
};

Signup.propTypes = {
  closeFunction: PropTypes.func,
  setIsLogin: PropTypes.func,
};

export default Signup;
