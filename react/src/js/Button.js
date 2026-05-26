import '../css/Button.css';

function Button(){
    return(
        <button className="CreateTodoButton"
            onClick={()=>{
                console.log('Hola como vas')
            }}
        >+</button>
    );
}

export {Button}