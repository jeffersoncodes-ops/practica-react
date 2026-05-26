import { Header } from "./js/Header";
import { Item } from "./js/Item";
import { TodoList } from "./js/TodoList";
import { Search } from "./js/Search";
import { Button } from "./js/Button";
import "./App.css";
import React from "react";

const tasks = [
  { text: "Revisar Exámenes", completed: true },
  { text: "Escribir", completed: true },
  { text: "Leer", completed: true },
  { text: "ver tik tok", completed: true },
  { text: "cocinar", completed: true },
];

function App() {
  const [completados, setCompletados] = React.useState(tasks);
  const [searchValue, setSearchValue] = React.useState("");
  const numberstakscomplete = completados.filter(t => t.completed).length;
  const total = completados.length;

  const completedTask = (text) => {
    const newTask = [...completados];
    const indexTask = newTask.findIndex(task => task.text === text);
    newTask[indexTask].completed = !newTask[indexTask].completed;
    setCompletados(newTask);
  };

  const deleteTask = (text) => {
    const newTask = [...completados];
    const indexTask = newTask.findIndex(task => task.text === text);
    newTask.splice(indexTask, 1);
    setCompletados(newTask);
  };

  const searchtodos = completados.filter(task => {
    return task.text.toLowerCase().includes(searchValue.toLowerCase());
  });

  return (
    <React.Fragment>
      <Header completados={numberstakscomplete} total={total} />
      <Search searchValue={searchValue} setSearchValue={setSearchValue} />
      <TodoList>
        {searchtodos.map(task=><Item key={task.text}
        {...task}
        onToggle={completedTask}
        onDelete={deleteTask}/>)}
      </TodoList>

      <Button />
    </React.Fragment>
  );
}

export default App;
