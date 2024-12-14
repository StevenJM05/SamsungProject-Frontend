import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./clubList.css";

const LogoLiga = "LaLiga.png";

const ClubList = ({ onClubSelect }) => {
  const clubs = [
    { id: 1, name: "Athletic Club", logo: "Athletic.png" },
    { id: 2, name: "Atlético Madrid", logo: "Atletico_Madrid.png" },
    { id: 3, name: "FC Barcelona", logo: "FC_BARCELONA.png" },
    { id: 4, name: "Real Madrid", logo: "Real_Madrid.png" },
    { id: 5, name: "Real Sociedad", logo: "RealSociedad.png" },
    { id: 6, name: "Villarreal", logo: "Villarreal.png" },
    { id: 7, name: "Celta de Vigo", logo: "Celta.png" },
    { id: 8, name: "Betis", logo: "Betis.png" },
    { id: 9, name: "Mallorca", logo: "Mallorca.png" },
    { id: 10, name: "Osasuna", logo: "Osasuna.png" },
    { id: 11, name: "Girona FC", logo: "Gironaa.png" },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const clubsPerPage = 6;

  const navigate = useNavigate();

  const filteredClubs = clubs.filter((club) =>
    club.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredClubs.length / clubsPerPage);
  const startIndex = (currentPage - 1) * clubsPerPage;
  const currentClubs = filteredClubs.slice(startIndex, startIndex + clubsPerPage);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleClubClick = (club) => {
    onClubSelect(club); 
    navigate(`/clubs/${club.id}/players`); 
  };

  return (
    <div className="club-list-card">
      <div className="card-header">
        <img src={`/src/assets/images/${LogoLiga}`} alt="La Liga Logo" className="logo-liga" />
        <h2>La Liga Clubs</h2>
        <input
          type="text"
          placeholder="Buscar clubes..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
      </div>
      <div className="club-container">
        {currentClubs.map((club) => (
          <div
            key={club.id}
            className="club-item"
            onClick={() => handleClubClick(club)} 
          >
            <img
              src={`/src/assets/images/${club.logo}`}
              alt={`${club.name} logo`}
              className="club-logo"
            />
            <p className="club-name">{club.name}</p>
          </div>
        ))}
      </div>
      <div className="pagination">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Anterior
        </button>
        <span>
          Página {currentPage} de {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default ClubList;
