import { Header } from "./js/Header";
import { Item } from "./js/Item";
import { TodoList } from "./js/TodoList";
import { Search } from "./js/Search";
import { Button } from "./js/Button";
import { Modal } from "./js/Modal";
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
  const [openModal, setOpenModal] = React.useState(false); // controla si el modal está visible
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

  // Agrega una tarea al state local y la envía al backend
  const addTask = async (text) => {
    const tempId = Date.now(); // ID temporal hasta que el backend responda
    const newTask = {
      text: text,
      completed: false
    };

    // Actualiza el state local inmediatamente (optimistic update)
    setCompletados(prev => [...prev, { ...newTask, id: tempId }]);
    setOpenModal(false);

    // Envía la tarea al backend
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTask),
      });
      if (!response.ok) {
        console.error("Error al guardar en el backend:", response.status);
      }
    } catch (error) {
      console.error("Error de red al guardar tarea:", error);
    }
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
          {searchtodos.map(task=><Item key={task.id ?? task.text}
          {...task}
          onToggle={completedTask}
          onDelete={deleteTask}/>)}
        </TodoList>
      )}
      {/* botón flotante "+": abre el modal al hacer clic */}
      <Button onClick={() => setOpenModal(true)} />
      {/* modal para crear tarea, visible solo cuando openModal es true */}
      {openModal && (
        <Modal
          onAdd={addTask}
          onClose={() => setOpenModal(false)}
        />
      )}
    </React.Fragment>
  );
}

export default App;
