import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/home";
import CreateLobby from "./pages/createLobby/createLobby";
import JoinLobby from "./pages/joinLobby/joinLobby";
import LobbyRoom from "./pages/lobbyRoom/lobbyRoom";
import GameBoard from "./pages/gameBoard/gameBoard";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<CreateLobby />} />
        <Route path="/join" element={<JoinLobby />} />
        <Route path="/lobby/:pin" element={<LobbyRoom />} />
        <Route path="/game/:pin" element={<GameBoard />} />
      </Routes>
    </BrowserRouter>
  );
}
