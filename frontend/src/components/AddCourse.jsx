import React from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { toast } from "react-toastify";

const AddCourse = ({ hidden }) => {
  const { user } = useAuthContext();

  const handleAddCourse = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    formData.append("userId", user.id);

    const jdata = Object.fromEntries(formData.entries());

    try {
      const res = await fetch("http://localhost:5000/api/courses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(jdata),
      });

      if (res.ok) {
        toast("Course Created!");
      } else if (res.status === 400) {
        toast("Please fill in all fields");
      } else {
        toast("Error, please try again");
      }
    } catch (error) {}
  };

  return (
    <div>
      {!hidden ? (
        <div className="flex flex-col p-4 w-full m-auto">
          <div className="w-1/2 h-1/2 bg-black shadow-lg rounded-2xl bg-white p-6 m-auto ">
            <h1 className="font-bold text-2xl mb-3">Add a course</h1>
            <div className="border-b border-gray-300 mb-6"></div>

            <form
              className="w-full bg-[var(--skyBlue)] shadow-md rounded px-8 pt-6 pb-8 mb-8"
              onSubmit={handleAddCourse}
            >
              <div className="flex justify-between">
                <div className="mb-4">
                  <label
                    className="block text-black text-xl font-bold mb-2"
                    htmlFor="title"
                  >
                    Title
                  </label>
                  <input
                    name="title"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                    id="title"
                    type="text"
                    placeholder="title..."
                  />
                </div>
                <div>
                  <label
                    className="block text-black text-xl font-bold mb-2"
                    htmlFor="deadline"
                  >
                    Exam Date
                  </label>
                  <input
                    name="deadline"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                    id="deadline"
                    type="date"
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-black0 text-xl font-bold mb-2"
                    htmlFor="priority"
                  >
                    Priority
                  </label>
                  <select
                    name="priority"
                    id="priority"
                    className="border py-2 px-3 rounded"
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                    <option value="Urgent">Urgent</option>
                  </select>
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-[var(--darkText)] py-2 rounded-xl text-white font-semibold hover:bg-[var(--darkBrown)] transition duration-100 ease-in-out transform hover:scale-105"
              >
                Add
              </button>
            </form>
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default AddCourse;
