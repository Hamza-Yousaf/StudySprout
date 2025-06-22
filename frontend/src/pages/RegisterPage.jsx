import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [newUser, setNewUser] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleSubmit = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });

      if (res.ok) {
        toast("Account has been successfully created");
        navigate("/dashboard");
      } else {
        toast("Email is already linked to an account");
        return;
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
          Sign Up to <span className="font-bold">StudySprout</span>
        </h1>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={newUser.username}
            className="border-b w-full mt-8 focus:outline-none focus:text-[var(--darkText)]"
            onChange={(e) => {
              setNewUser((prev) => ({ ...prev, username: e.target.value }));
            }}
          />
          <input
            type="email"
            placeholder="Email"
            value={newUser.email}
            className="border-b w-full mt-8 focus:outline-none focus:text-[var(--darkText)]"
            onChange={(e) => {
              setNewUser((prev) => ({ ...prev, email: e.target.value }));
            }}
          />
          <input
            type="password"
            placeholder="Password"
            value={newUser.password}
            className="border-b w-full mt-8 focus:outline-none"
            onChange={(e) => {
              setNewUser((prev) => ({ ...prev, password: e.target.value }));
            }}
          />
          <input
            type="submit"
            className="mt-8 text-center bg-[var(--backgroundGreen)] text-[var(--darkText)] text-xl p-2 shadow-sm font-bold cursor-pointer w-full hover:bg-[var(--backgroundDarkGreen)]"
          />
        </form>

        <p className="justify-self-end text-[var(--lightText)] text-sm">
          Join StudySprout, level up and build your{" "}
          <span className="font-bold">custom</span> farm with XP gained by
          staying productive!
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
