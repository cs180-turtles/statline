import { Routes, Route } from "react-router-dom";
import HomeScreen from "./screens/home/HomeScreen";
import PlayerScreen from "./screens/player/PlayerScreen";
import "./App.css";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/home" element={<HomeScreen />} />
        <Route path="/player/:playerId" element={<PlayerScreen />} />
      </Routes>
    </>
  );
}

export default App;
