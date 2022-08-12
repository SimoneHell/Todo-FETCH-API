import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const Home = () => {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState("");

  const createTodo =(e) =>{   
    e.preventDefault();
    const newTodo = {
      id: new Date().getTime(),
      label: todo,
      done: false,
    };
    editTodos(todos.concat(newTodo))
  }

  const editTodos =(list) => {
    fetch("https://assets.breatheco.de/apis/fake/todos/user/simonehell", {
      method: "PUT",
      body: JSON.stringify(list),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          loader() 
        }
      })
      
      .catch((error) => {
        //error handling
        console.log(error);
      });
  }

  const loader = async () => {
    await fetch("https://assets.breatheco.de/apis/fake/todos/user/simonehell")
      .then((response) => response.json())
      .then((data) => setTodos(data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    loader();
  }, []);

  const deleteTodo = (id) => {
    const updatedTodos = [...todos].filter((todo) => todo.id !== id);
    editTodos(updatedTodos)
  };

  return (
    <div className="Container">
      <div className="App">
        <h1>Things we gotta DO!</h1>
        <form onSubmit={createTodo}>
          <input
            type="text"
            onChange={(e) => setTodo(e.target.value)}
            value={todo}
          />
          <button type="submit">
            <FontAwesomeIcon icon={faPlus} />
          </button>
        </form>
        <div>
          {todos.map((todo) => {
            if (todo.id) {
              return (
                <div key={todo.id} className="text-center">
                  <div className="list" style={{ display: "flex" }}>
                    <div>{todo.label}</div>
                    <button onClick={() => deleteTodo(todo.id)}>
                      <FontAwesomeIcon icon={faTrashCan} />
                    </button>
                  </div>
                </div>
              );
            }
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;
