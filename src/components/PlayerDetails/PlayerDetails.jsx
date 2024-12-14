import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./playerDetails.css";

const PlayerDetails = () => {
  const { playerId } = useParams();
  const navigate = useNavigate();
  const [player, setPlayer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlayer = async () => {
      try {
        const response = await axios.get(
          `https://675da98663b05ed079787cbf.mockapi.io/api/players/${playerId}`
        );
        setPlayer(response.data);
      } catch (error) {
        console.error("Error al cargar los detalles del jugador:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlayer();
  }, [playerId]);

  if (loading) {
    return <p>Cargando detalles del jugador...</p>;
  }

  if (!player) {
    return <p>No se encontraron detalles para este jugador.</p>;
  }

  return (
    <div className="player-details-container">
      {/* Sección Principal */}
      <div className="player-header">
        <img src={player.photo} alt={player.name} className="player-photo" />
        <div className="player-info">
          <h1 className="player-name">{player.name}</h1>
          <p className="player-position">{player.nationality}</p>
          <p className="player-team">{player.team}</p>
        </div>
      </div>

      {/* Estadísticas */}
      <div className="player-stats">
        <div className="stat-item">
          <h3>{player.goals}</h3>
          <p>Goles</p>
        </div>
        <div className="stat-item">
          <h3>{player.assists}</h3>
          <p>Asistencias</p>
        </div>
        <div className="stat-item">
          <h3>{player.matches}</h3>
          <p>Partidos</p>
        </div>
      </div>

      {/* Información Adicional */}
      <div className="player-extra-info">
        <p>
          <strong>Edad:</strong> {player.age}
        </p>
        <p>
          <strong>Valor de Mercado:</strong> ${player.marketValue}K
        </p>
      </div>

      {/* Botones */}
      <div className="player-actions">
        <button className="action-button" onClick={() => navigate(-1)}>
          Volver
        </button>
        <button
          className="action-button primary"
          onClick={() => alert("¡Estadísticas avanzadas próximamente!")}
        >
          Ver estadísticas completas
        </button>
      </div>
    </div>
  );
};

export default PlayerDetails;
