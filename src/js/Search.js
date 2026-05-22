import '../css/Search.css'

function Search({ searchValue, setSearchValue}) {
    return (
        <input
            placeholder="Cortar cebolla"
            className="TodoSearch"
            value={searchValue}
            onChange={(e) => {
                console.log('estas escribiendo...');
                setSearchValue(e.target.value);
            }}
        />
    );
}

export { Search };