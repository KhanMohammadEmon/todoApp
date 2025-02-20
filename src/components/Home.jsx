import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import TodoImage from "../assets/todo_icon.png";
// import DeleteImage from "../assets/delete.png";
import { MdDeleteForever, MdEditDocument } from "react-icons/md";
import { BsDatabaseFillX } from "react-icons/bs";
import { FaCheckCircle } from "react-icons/fa";
const Home = () => {
  const Data = JSON.parse(localStorage.getItem("task"));
  const [tasks, setTasks] = useState(Data);
  const [editingTask, setEditingTask] = useState(null);
  const [editedName, setEditedName] = useState("");

  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("all");

  const deleteTask = (id) => {
    const newTask = tasks.filter((task) => task.id !== id);
    setTasks(newTask);
    localStorage.setItem("task", JSON.stringify(newTask));
  };

  const startEditing = (task) => {
    setEditingTask(task.id);
    setEditedName(task.name);
  };

  const saveTask = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, name: editedName } : task
    );
    setTasks(updatedTasks);
    localStorage.setItem("task", JSON.stringify(updatedTasks));
    setEditingTask(null);
  };

  const priorityOrders = {
    high: ["High", "Medium", "Low"],
    medium: ["Medium", "High", "Low"],
    low: ["Low", "High", "Medium"],
  };

  const filteredTasks = tasks
    .filter((task) =>
      task.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOption === "all") {
        return 0;
      }
      const order = priorityOrders[sortOption];
      return order.indexOf(a.priority) - order.indexOf(b.priority);
    })
    .sort((c, d) => {
      if (c.completed === d.completed) {
        return 0;
      }
      return c.completed ? 1 : -1;
    });

  const toggleTaskCompletion = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
    localStorage.setItem("task", JSON.stringify(updatedTasks));
  };

  return (
    <section className="h-screen">
      <div className="flex flex-col my-[2px] border-2 border-black/60  bg-white/70 p-4 rounded-md shadow-lg w-[550px] h-[563px] overflow-auto">
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-row items-center ">
            <img src={TodoImage} alt="" className="w-[35px] h-[35px]" />
            <p className="my-3 font-bold text-[30px] justify-center items-center flex font-bold ">
              TODO LIST
            </p>
          </div>

          <div className="flex flex-row items-center justify-center gap-2">
            <span className="font-bold text-[20px] text-black/50">
              Clear Storage:
            </span>
            <BsDatabaseFillX
              className="text-red-500 cursor-pointer text-[20px] hover:text-red-700"
              onClick={() => {
                window.localStorage.clear();
                window.location.reload();
              }}
            />
          </div>

          {/* <button
            className="border-2 bg-amber-900 rounded-lg text-white font-bold p-1"
            onClick={() => {
              window.localStorage.clear();
              window.location.reload();
            }}
          >
            Clear Local Storage
          </button> */}
        </div>

        <div className="flex flex-col md:flex-row gap-4 justify-center items-center mb-3">
          <div className="relative flex flex-row justify-center items-center">
            <FaSearch className="absolute text-gray-500 left-3 top-[5px]" />
            <input
              type="text"
              className="border-2 border-black/60 rounded-sm shadow-sm md:w-[400px] px-[35px]"
              placeholder="Search task..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex flex-row justify-center items-center ">
            <select
              name="sort"
              className="border-2 rounded-sm border-black/60 "
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
            >
              <option value="all">ALL</option>
              <option value="high">HIGH</option>
              <option value="medium">MEDIUM</option>
              <option value="low">LOW</option>
            </select>
          </div>
        </div>

        {filteredTasks.map((task) => (
          <div key={task.id} className="flex flex-col gap-2 ">
            <div className="flex flex-col md:flex-row justify-center md:justify-between gap-3 py-1 ">
              <div className="flex flex-row items-center gap-3 font-bold">
                <input
                  type="checkbox"
                  className="w-5 h-5 border border-black/60 rounded-full appearance-none checked:bg-black checked:border-transparent"
                  checked={task.completed || false}
                  onChange={() => toggleTaskCompletion(task.id)}
                />
                {editingTask === task.id ? (
                  <input
                    type="text"
                    value={editedName}
                    onChange={(e) => setEditedName(e.target.value)}
                    className="border rounded-sm px-2 py-1 border-black/60"
                  />
                ) : (
                  <p
                    className={
                      task.completed ? "line-through text-gray-500" : ""
                    }
                  >
                    {"Task: " + task.name}
                  </p>
                )}
                <p
                  className={task.completed ? "line-through text-gray-500" : ""}
                >
                  {"Priority: " + task.priority}
                </p>
              </div>
              {task.completed ? (
                ""
              ) : (
                <div className="flex flex-row gap-3 right-[-80px] md:right-0 relative">
                  {editingTask === task.id ? (
                    <button onClick={() => saveTask(task.id)} className="">
                      <FaCheckCircle className="w-[30px] h-[30px] text-green-700 hover:text-green-500" />
                    </button>
                  ) : (
                    <div className="flex flex-row gap-3">
                      <button
                        onClick={() => deleteTask(task.id)}
                        className="bg-red-700 text-white rounded-sm p-1 hover:bg-red-500"
                      >
                        <MdDeleteForever />
                      </button>

                      <button
                        onClick={() => startEditing(task)}
                        className="bg-blue-700 text-white rounded-sm p-1 hover:bg-blue-500"
                      >
                        <MdEditDocument />
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
            <div>
              <hr
                className="border-t border-gray-800 mb-3"
                style={{ borderTopWidth: "4px" }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Home;
