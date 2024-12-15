import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Importa useNavigate
import axios from "axios";
import "./playersList.css";

const PlayersList = ({ club, onBack }) => {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const playersPerPage = 6;

  const navigate = useNavigate(); // Hook para navegación

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await axios.get(
          "https://675da98663b05ed079787cbf.mockapi.io/api/players"
        );
        setPlayers(response.data);
      } catch (error) {
        console.error("Error al cargar jugadores:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlayers();
  }, []);

  const indexOfLastPlayer = currentPage * playersPerPage;
  const indexOfFirstPlayer = indexOfLastPlayer - playersPerPage;
  const currentPlayers = players.slice(indexOfFirstPlayer, indexOfLastPlayer);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Función para manejar clic en un jugador
  const handlePlayerClick = (playerId) => {
    navigate(`/players/${playerId}`); // Navega a los detalles del jugador
  };

  return (
    <div className="players-list">
      <div className="card-header">
        <img
          src={`/src/assets/images/${club.logo}`}
          alt={`${club.name} logo`}
          className="club-logo-large"
        />
        <h2>{club.name} - Jugadores</h2>
        <button onClick={onBack} className="back-button">
          Volver a clubes
        </button>
      </div>
      {loading ? (
        <p>Cargando jugadores...</p>
      ) : (
        <div>
          <div className="players-grid">
            {currentPlayers.map((player) => (
              <div
                key={player.id}
                className="player-card"
                onClick={() => handlePlayerClick(player.id)} // Maneja clic
                style={{ cursor: "pointer" }} // Cursor interactivo
              >
                <img
                  src={player.photo}
                  alt={player.name}
                  className="player-photo"
                />
                <div className="player-details">
                  <h3 className="player-name">{player.name}</h3>
                  <p className="player-position">Posición: {player.position}</p>
                  <p className="player-value">
                    Valor de Mercado: ${player.marketValue}K
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="pagination">
            {Array.from(
              { length: Math.ceil(players.length / playersPerPage) },
              (_, i) => (
                <button
                  key={i + 1}
                  onClick={() => paginate(i + 1)}
                  className={currentPage === i + 1 ? "active" : ""}
                >
                  {i + 1}
                </button>
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PlayersList;
