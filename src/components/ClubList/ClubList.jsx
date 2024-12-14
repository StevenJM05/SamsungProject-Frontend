import React, { useState } from "react";
import "./clubList.css";

const LogoLiga = "LaLiga.png";

const ClubList = () => {
  const clubs = [
    { name: "Athletic Club", logo: "Athletic.png" },
    { name: "Atlético Madrid", logo: "Atletico_Madrid.png" },
    { name: "FC Barcelona", logo: "FC_BARCELONA.png" },
    { name: "Real Madrid", logo: "Real_Madrid.png" },
    { name: "Real Sociedad", logo: "RealSociedad.png" },
    { name: "Villarreal", logo: "Villarreal.png" },
    { name: "Celta de Vigo", logo: "Celta.png" },
    { name: "Betis", logo: "Betis.png" },
    { name: "Mallorca", logo: "Mallorca.png" },
    { name: "Osasuna", logo: "Osasuna.png" },
    { name: "Girona FC", logo: "Gironaa.png" },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const clubsPerPage = 6;

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

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1); 
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
          onChange={handleSearchChange}
          className="search-input"
        />
      </div>
      <div className="club-container">
        {currentClubs.map((club, index) => (
          <div key={index} className="club-item">
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
