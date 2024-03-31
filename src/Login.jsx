/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-undef */
import { useState } from "react";
import "./App.css";
import logo from "./assets/stockkeep.png";
import { Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [message, setMessage] = useState("");
  const [message1, setMessage1] = useState("");

  const emailvalidation = (email) => {
    if (!email.match(/^[a-zA-Z0-9._%+-]+@esi-sba\.dz$/) && email !== "") {
      setMessage("Email is not valid");
    } else if (email === "") {
      setMessage("Email is required");
    } else {
      setMessage("");
    }
  };
  const Passwordvalidation = (password) => {
    if (password === "") {
      setMessage1("Password is required");
    } else {
      setMessage1("");
    }
  };

  async function handleLogin(event) {
    event.preventDefault();

    const response = await fetch("http://127.0.0.1:8000/user/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await response.json();
    console.log(data);

    if (response.status === 200) {
      localStorage.setItem(" access token", data.tokens.access);
      localStorage.setItem(" refresh token", data.tokens.refresh);
      alert("Login successful");
      window.location.href = "/dashboard";
    } else if (response.status === 401) {
      alert("Please check your username and password");
      return 0;
    }
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white p-8 rounded-[40px] shadow-lg w-96">
        <img src={logo} alt="Logo" className="mx-auto h-[50px] my-7" />
        <div className="my-9">
          <h2 className="text-2xl text-center poppins-bold">Welcome back</h2>
          <p className="text-[#888888] text-center mb-6 poppins-regular">
            Login to access your account
          </p>
        </div>
        <input
          type="email"
          className="w-full h-[50px] bg-[#2184d523] px-4 py-2 rounded-[8px] poppins-regular placeholder:text-[#2185D5] text-[15px]"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            emailvalidation(e.target.value);
          }}
        />
        <div className="flex justify-start mx-2">
          <p className="text-[15px] text-red-600 mb-4 ">{message}</p>
        </div>
        <input
          type="password"
          className="w-full h-[50px] bg-[#2184d523] px-4 py-2 rounded-[8px] poppins-regular placeholder:text-[#2185D5] text-[15px] "
          placeholder="Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            Passwordvalidation(e.target.value);
          }}
        />
        <div className="flex justify-start mx-2">
          <p className="text-[15px] text-red-600 mb-4 ">{message1}</p>
        </div>
        <div className="flex items-center justify-between mb-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              className="form-checkbox h-4 w-4 text-[#2185D5] rounded-[8px] mr-2 poppins-regular"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
            />
            <span className="text-[#888888] text-[14px] poppins-regular">
              Remember me
            </span>
          </label>
          <Link
            to="/ForgetPassword"
            className="text-[14px] text-[#2185D5] hover:underline poppins-semibold"
          >
            Forgot password ?
          </Link>
        </div>
        <button
          className="w-full h-[50px] bg-[#2185D5] text-white py-2 rounded-[8px] hover:bg-[#196aac] my-5 poppins-regular"
          onClick={handleLogin}
        >
          Login
        </button>
      </div>
    </div>
  );
}
export default Login;
