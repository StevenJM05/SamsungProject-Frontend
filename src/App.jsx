import React, { useState } from "react";
import Menu from "./components/Menu/Menu";
import ClubList from "./components/ClubList/ClubList";
import PlayersList from "./components/PlayersList/PlayersList";

const App = () => {
  const [selectedClub, setSelectedClub] = useState(null); 


  const handleClubSelect = (club) => {
    setSelectedClub(club);
  };
  const handleBackToClubs = () => {
    setSelectedClub(null);
  };

  return (
    <div style={{ display: "flex" }}>
      <Menu />
      <div style={{ flex: 1, padding: "20px" }}>
        {selectedClub ? (
          <PlayersList club={selectedClub} onBack={handleBackToClubs} />
        ) : (
          <ClubList onClubSelect={handleClubSelect} />
        )}
      </div>
    </div>
  );
};

export default App;
