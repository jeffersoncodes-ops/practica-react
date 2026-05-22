import '../css/Item.css'

function Item(task) {
  return (
    <li className="TodoItem">
      <span className={`Icon Icon-check ${task.completed ? "Icon-check--active" : ""}`}>
        V
      </span>
      <p className={`TodoItem-p ${task.completed ? "TodoItem-p--complete" : ""}`}>
        {task.text}
      </p>
      <span className="Icon Icon-delete">X</span>
    </li>
  );
}

export { Item };