import '../css/Button.css';

// Botón flotante "+" para agregar nuevas tareas
function Button({ onClick }){
    return(
        <button className="CreateTodoButton"
            onClick={onClick}
        >+</button>
    );
}

export {Button}
