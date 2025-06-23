import React from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSignup } from "../hooks/useSignup";

const LoginPage = () => {
  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
  });
  const { signup } = useSignup();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!userDetails.email || !userDetails.password) {
      console.log("Please fill in all fields");
      toast("Please fill in all fields");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userDetails),
      });

      const data = await res.json();

      if (res.status == 500) {
        toast("This user does nto exist");
      } else if (res.status == 409) {
        toast("Incorrect password");
      } else if (res.status == 500) {
        toast("Server error, please try again");
      } else {
        toast("Welcome, successfully logged in");
        await signup(data);
      }
    } catch (error) {
      console.error(error);
      toast("Something went wrong, please try again");
    }
  };

  return (
    <div className="relative w-screen h-screen flex items-center justify-center">
      <div className="absolute top-0 left-0 bg-[var(--backgroundGreen)] w-full h-1/2 z-0"></div>
      <div className="flex flex-col justify-between w-1/3 min-w-[200px] h-4/5 bg-[var(--offWhite)] m-auto shadow-md z-1 p-8">
        <h1 className="text-2xl text-[var(--darkText)]">
          Login to <span className="font-bold">StudySprout</span>
        </h1>

        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Email"
            className="border-b w-full mt-8 focus:outline-none focus:text-[var(--darkText)]"
            value={userDetails.email}
            onChange={(e) => {
              setUserDetails((prev) => ({ ...prev, email: e.target.value }));
            }}
          />
          <input
            type="password"
            placeholder="Password"
            className="border-b w-full mt-8 focus:outline-none"
            value={userDetails.password}
            onChange={(e) => {
              setUserDetails((prev) => ({ ...prev, password: e.target.value }));
            }}
          />
          <input
            type="submit"
            className="mt-8 text-center bg-[var(--backgroundGreen)] text-[var(--darkText)] text-xl p-2 shadow-sm font-bold cursor-pointer w-full hover:bg-[var(--backgroundDarkGreen)]"
          />
        </form>

        <p className="justify-self-end text-[var(--lightText)] text-sm">
          Don't have an account?{" "}
          <a href="/register" className="font-bold underline">
            Join now!
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
