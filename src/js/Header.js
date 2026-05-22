import '../css/Header.css'


function Header({ total, completados }) {
  return (
    <h1 className='TodoCounter'>
      Has completado <strong>{completados}</strong> de <strong>{total}</strong> tareas
    </h1>
  );
}

export { Header };
