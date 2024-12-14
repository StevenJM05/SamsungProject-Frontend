import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Menu from "./components/Menu/Menu";
import ClubList from "./components/ClubList/ClubList";
import PlayersList from "./components/PlayersList/PlayersList";
import PlayerDetails from "./components/PlayerDetails/PlayerDetails";

const App = () => {
  const [selectedClub, setSelectedClub] = useState(null);

  const handleClubSelect = (club) => {
    setSelectedClub(club);
  };

  const handleBackToClubs = () => {
    setSelectedClub(null);
  };

  return (
    <Router>
      <div style={{ display: "flex" }}>
        <Menu />
        <div style={{ flex: 1, padding: "20px" }}>
          <Routes>
            <Route
              path="/"
              element={<ClubList onClubSelect={handleClubSelect} />}
            />
            {selectedClub && (
              <Route
                path={`/clubs/${selectedClub.id}/players`}
                element={
                  <PlayersList club={selectedClub} onBack={handleBackToClubs} />
                }
              />
            )}
            <Route path="/players/:playerId" element={<PlayerDetails />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
