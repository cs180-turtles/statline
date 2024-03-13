import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomeScreen from "./screens/home/HomeScreen";
import PlayerScreen from "./screens/player/PlayerScreen";

function App() {
  return (
    <>
      <Routes>
        <Route path="/*" element={<HomeScreen />} />
        <Route path="/players" element={<HomeScreen />} />
        <Route path="/players/:playerId" element={<PlayerScreen />} />
      </Routes>
    </>
  );
}

export default App;
