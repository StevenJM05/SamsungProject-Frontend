import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaFutbol, FaFlag, FaUsers, FaTrophy, FaRunning, FaStar } from "react-icons/fa"; // Importa íconos
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
      {/* Sección Principal con Imagen y Nombre */}
      <div className="player-header">
        <img src={player.photo} alt={player.name} className="player-photo" />
        <div className="player-info">
          <h1>{player.name}</h1>
          <p className="player-position">
            <FaFutbol /> {player.position}
          </p>
          <p className="player-team">
            <FaUsers /> {player.team}
          </p>
        </div>
      </div>

      {/* Estadísticas Resaltadas */}
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
      <div className="player-additional-info">
        <div>
          <FaFlag /> <strong>Nacionalidad:</strong> {player.nationality}
        </div>
        <div>
          <FaRunning /> <strong>Altura:</strong> {player.height} m
        </div>
        <div>
          <FaRunning /> <strong>Peso:</strong> {player.weight} kg
        </div>
        <div>
          <FaStar /> <strong>Rating:</strong> {player.rating} / 10
        </div>
        <div>
          <FaTrophy /> <strong>Títulos ganados:</strong> {player.trophies}
        </div>
      </div>

      {/* Botones de Acción */}
      <div className="player-actions">
        <button
          className="action-button primary"
          onClick={() => navigate(-1)} 
        >
          Volver
        </button>
        <button
          className="action-button secondary"
          onClick={() => alert("¡Estadísticas avanzadas próximamente!")}
        >
          Ver estadísticas completas
        </button>
      </div>
    </div>
  );
};

export default PlayerDetails;
