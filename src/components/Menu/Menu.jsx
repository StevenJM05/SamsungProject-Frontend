import React, { useState } from "react";
import "./menu.css";

const LogoLiga= 'LaLiga.png';

const Sidebar = () => {
  const [isClosed, setIsClosed] = useState(false);

  const toggleSidebar = () => {
    setIsClosed(!isClosed);
  };

  return (
    <div className={`body`}>
      <nav className={`sidebar ${isClosed ? "close" : ""}`}>
        <header>
          <div className="image-text">
            <span className="image"><img src={`/src/assets/images/${LogoLiga}`}/></span>
            <div className="text logo-text">
              <span className="name">La Liga</span>
              <span className="profession">Samsung Devs</span>
            </div>
          </div>
          <i className="bx bx-chevron-right toggle" onClick={toggleSidebar}></i>
        </header>

        <div className="menu-bar">
          <div className="menu">
            <ul className="menu-links">
              <li className="nav-link">
                <a href="/">
                  <img src={`/src/assets/images/${LogoLiga}`}/>
                  <span className="text nav-text">Inicio</span>
                </a>
              </li>
              <li className="nav-link">
                <a href="/escuelas">
                  <i className="fa-solid fa-school icon"></i>
                  <span className="text nav-text">Clubes</span>
                </a>
              </li>
              <li className="nav-link">
                <a href="/carreras">
                  <i className="fa-solid fa-graduation-cap icon"></i>
                  <span className="text nav-text">Jugadores</span>
                </a>
              </li>
              <li className="nav-link">
                <a href="/alumnos">
                  <i className="fa-regular fa-id-card icon"></i>
                  <span className="text nav-text">Estadísticas</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
