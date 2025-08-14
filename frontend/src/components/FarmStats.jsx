import React from "react";
import { useState, useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

const FarmStats = () => {
  const [details, setDetails] = useState({});
  const { user } = useAuthContext();

  useEffect(() => {
    if (!user.id) {
      return;
    }

    const fetchUser = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/users/${user.id}`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });

        const response = await res.json();
        setDetails(response.data);
      } catch (error) {
        console.log("error in fetching user");
      }
    };

    fetchUser();
  }, [user]);

  return (
    <div className="w-full col-span-2 h-full bg-black shadow-lg rounded-2xl bg-white p-6">
      <h1 className="font-bold text-2xl mb-3">Farm Stats</h1>
      <div className="border-b border-gray-300 mb-6"></div>

      <div className="flex justify-between font-semibold text-[var(--darkBrown)] text-xl">
        <h3>{details.username}</h3>
        <h3>Level: {details.level}</h3>
        <h3>XP: {details.totalXP}</h3>
      </div>
    </div>
  );
};

export default FarmStats;
