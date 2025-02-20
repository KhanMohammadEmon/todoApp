import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

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
      <div className="flex flex-col my-4 ">
        <p className="my-3 font-bold text-[30px] justify-center items-center flex">
          TODO LIST
        </p>
        <div className="flex flex-col md:flex-row gap-4 justify-center items-center mb-3">
          <div className="relative flex flex-row justify-center items-center">
            <FaSearch className="absolute text-gray-500 left-3 top-[5px]" />
            <input
              type="text"
              className="border-2 rounded-sm shadow-sm md:w-[400px] px-[35px]"
              placeholder="Search task..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex flex-row justify-center items-center">
            <select
              name="sort"
              className="border-2 rounded-sm"
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
                  className="w-[20px] h-[20px] border-gray-300 rounded"
                  checked={task.completed || false}
                  onChange={() => toggleTaskCompletion(task.id)}
                />
                {editingTask === task.id ? (
                  <input
                    type="text"
                    value={editedName}
                    onChange={(e) => setEditedName(e.target.value)}
                    className="border rounded-sm px-2 py-1"
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
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="bg-red-700 text-white rounded-sm p-1 hover:bg-red-500"
                  >
                    Delete Task
                  </button>
                  {editingTask === task.id ? (
                    <button
                      onClick={() => saveTask(task.id)}
                      className="bg-green-700 text-white rounded-sm p-1 hover:bg-green-500"
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      onClick={() => startEditing(task)}
                      className="bg-blue-700 text-white rounded-sm p-1 hover:bg-blue-500"
                    >
                      Edit Task
                    </button>
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
