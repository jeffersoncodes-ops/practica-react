import { Header } from "./js/Header";
import { Item } from "./js/Item";
import { TodoList } from "./js/TodoList";
import { Search } from "./js/Search";
import { Button } from "./js/Button";
import "./App.css";
import React from "react";

/*const tasks = [
  { text: "Revisar Exámenes", completed: true },
  { text: "Escribir", completed: true },
  { text: "Leer", completed: true },
  { text: "ver tik tok", completed: true },
  { text: "cocinar", completed: true },
];*/

function App() {
  const API_URL = "http://localhost/react-service/servicio.php";

  const [completados, setCompletados] = React.useState([]);
  const [loading, setLoading] = React.useState(true); //constante para controlar el estado de carga
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

  const loadTasks = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setCompletados(data);
      setLoading(false);
    } catch (error) {
      console.error("Error al cargar tareas:", error);
      setLoading(false);
    }
  };

  React.useEffect(() => {
    loadTasks();
  }, []);

  return (
    <React.Fragment>
      <Header completados={numberstakscomplete} total={total} />
      <Search searchValue={searchValue} setSearchValue={setSearchValue} />
      {loading ? (
        <p>Cargando tareas...</p>
      ) : (
        <TodoList>
          {searchtodos.map(task=><Item key={task.text}
          {...task}
          onToggle={completedTask}
          onDelete={deleteTask}/>)}
        </TodoList>
      )}
      <Button />
    </React.Fragment>
  );
}

export default App;
