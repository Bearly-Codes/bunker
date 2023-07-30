import './App.css'
function NavBar({gameData, setGameData, elements}) {
    return (
        <div className="navbar">
            {elements.map((item) => (
                <div key={item.name} onClick={() => item.onClick(gameData, setGameData, item)} className={`nav-item ${gameData.activeNavBarElement === item.index ? 'selected' : ''}`}>
                    <p>{item.name}</p>
                </div>
            ))}
        </div>
    )
}

export default NavBar;