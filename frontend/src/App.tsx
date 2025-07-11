import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import CreateLobby from "./pages/createLobby";
import JoinLobby from "./pages/joinLobby";
import Lobby from "./pages/lobby.tsx";
import Game from "./pages/game.tsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/join" element={<JoinLobby />} />
        <Route path="/create" element={<CreateLobby />} />
        <Route path="/lobby/:lobbyId" element={<Lobby />} />
        <Route path="/game/:lobbyId" element={<Game />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
