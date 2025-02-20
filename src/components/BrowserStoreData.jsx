import * as React from "react";
import Home from "./Home";

const BrowserStoreData = () => {
  const name = React.useRef();
  const priority = React.useRef();

  const [showHome, setShowHome] = React.useState(false);
  const localSignUp = JSON.parse(localStorage.getItem("task")) || [];

  React.useEffect(() => {
    if (localSignUp.length > 0) {
      setShowHome(true);
    }
  }, [localSignUp]);

  const clickHandler = () => {
    const users = JSON.parse(localStorage.getItem("task")) || [];
    const newUser = {
      id: users.length > 0 ? users[users.length - 1].id + 1 : 1,
      name: name.current.value,
      priority: priority.current.value,
    };

    if (newUser.name === "" || newUser.priority === "") {
      alert("Please fill all the fields!");
      return;
    }

    users.push(newUser);
    localStorage.setItem("task", JSON.stringify(users));
    // alert("Data Stored Successfully!");
    window.location.reload();
  };

  return (
    <section className="h-screen">
      <header className="flex flex-col justify-center items-center my-4 md:flex-row">
        {/* <button
          className="border-2 bg-amber-700 rounded-lg mr-3 text-white font-bold p-1"
          onClick={() => window.location.reload()}
        >
          Reload Window
        </button> */}
        <button
          className="border-2 bg-amber-900 rounded-lg text-white font-bold p-1"
          onClick={() => {
            window.localStorage.clear();
            window.location.reload();
          }}
        >
          Clear Local Storage
        </button>
      </header>

      <br />
      <br />

      <div className="flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold underline my-2 mx-2">ADD TASK</h1>
        <form
          action="submit"
          method="post"
          className="flex flex-col md:flex-row gap-3 md:gap-0"
        >
          <div className="flex flex-row justify-between items-center">
            <span className="mx-3 font-bold">Task Name:</span>
            <input
              type="text"
              placeholder="Enter Name"
              className="border-2 rounded-sm px-1 w-[130px] md:w-auto"
              ref={name}
            />
          </div>

          <div className="flex flex-row justify-between items-center">
            <span className="mx-3 font-bold ">Priority:</span>

            <select
              name="sort"
              className="border-2 rounded-sm left-[-40px] relative md:left-0"
              ref={priority}
            >
              <option value="High">HIGH</option>
              <option value="Medium">MEDIUM</option>
              <option value="Low">LOW</option>
            </select>
          </div>
        </form>
        <div className="flex flex-row justify-center items-center mt-3">
          <button
            className="my-2 bg-green-700 hover:bg-green-500 rounded-sm w-20 h-8 text-white "
            onClick={clickHandler}
          >
            Submit
          </button>
        </div>
      </div>

      <div className="flex flex-col items-center  ">
        {showHome ? <Home /> : "No Data Found!"}
      </div>
    </section>
  );
};

export default BrowserStoreData;
