import { Header } from "./js/Header";
import { Item } from "./js/Item";
import { TodoList } from "./js/TodoList";
import { Search } from "./js/Search";
import { Button } from "./js/Button";
import "./App.css";
import React from "react";

const tasks = [
  { text: "Revisar Exámenes", completed: false },
  { text: "Escribir", completed: true },
  { text: "Leer", completed: true },
  { text: "ver tik tok", completed: false },
  { text: "cocinar", completed: true },
];

function App() {
  return (
    <React.Fragment>
      <Header completados={10} total={15} />
      <Search />
      <TodoList>
        {tasks.map(task=><Item key={task.text}
        text={task.text}
        completed={task.completed}/>)}
      </TodoList>

      <Button />
    </React.Fragment>
  );
}

export default App;
