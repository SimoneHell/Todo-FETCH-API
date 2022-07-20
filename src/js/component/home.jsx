import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { faPlus} from '@fortawesome/free-solid-svg-icons'



const Home = () => {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const newTodo = {
      id: new Date().getTime(),
      text: todo,
      completed: false,
    };
    setTodos([...todos].concat(newTodo));
    setTodo("");
  };
  const deleteTodo = (id) => {
    const updatedTodos = [...todos].filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };
 
  return (<div className="Container">
    <div className="App">
      <h1>Things we gotta DO!</h1>
      <form onSubmit={handleSubmit}>
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
      {todos.map((todo) => (
        <div key={todo.id} className="text-center" >
          <div className="List" style={{display:"flex"}}>
            <div>{todo.text}</div>
            <button onClick={() => deleteTodo(todo.id)}>
            <FontAwesomeIcon icon={faTrashCan} />
            </button>
          </div>
        </div>
      ))}
	  </div>
    </div>
	</div>
  );
};

export default Home;