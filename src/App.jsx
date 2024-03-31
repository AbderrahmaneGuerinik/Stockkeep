/* eslint-disable react/no-unknown-property */
import "./App.css";
import Login from "./Login";
import ForgetPassword from "./ForgetPassword";
import ResetPassword from "./ResetPassword";
import { Routes, Route } from "react-router-dom";
import Home from "./dashboard";

function App() {
  return (
    <div className="flex justify-center items-center  bg-center h-screen bg-[url('./assets/background.png')] bg-cover bg-fixed">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/ForgetPassword" element={<ForgetPassword />} />
        <Route path="/ResetPassword/:uid/:token" element={<ResetPassword />} />
        <Route path="/dashboard" element={<Home />} />
      </Routes>
    </div>
  );
}
export default App;
