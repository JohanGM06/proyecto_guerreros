import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import socket from "../socket";

type Player = {
  Player_id: number;
  Player_name: string;
  Warrior_id: number;
  Warrior: {
    Warrior_name: string;
    Warrior_ki: number;
    Warrior_health: number;
  };
};

function Lobby() {
  const { lobbyId } = useParams();
  const navigate = useNavigate();
  const [players, setPlayers] = useState<Player[]>([]);

  // useRef para que no se reinicie entre renderizaciones
  const isCreatorRef = useRef(localStorage.getItem("isCreator") === "true");
  const isCreator = isCreatorRef.current;

  // Obtener jugadores actuales y suscribirse al lobby
  useEffect(() => {
    if (!lobbyId) return;

    socket.emit("watchLobby", { pin: lobbyId });

    fetch(`http://localhost:4000/api/lobbies/${lobbyId}`)
      .then((res) => res.json())
      .then((players: Player[]) => {
        setPlayers(players);
      });

    socket.on("lobby:update", (updatedPlayers: Player[]) => {
      setPlayers(updatedPlayers);
    });

    socket.on("lobby:error", (err) => {
      alert("❌ " + err.message);
    });

    return () => {
      socket.off("lobby:update");
      socket.off("lobby:error");
    };
  }, [lobbyId]);

  // Escuchar cuando el juego empieza
  useEffect(() => {
    socket.on("game:started", () => {
      navigate(`/game/${lobbyId}`);
    });

    return () => {
      socket.off("game:started");
    };
  }, [lobbyId, navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-800 text-white gap-4 px-4">
      <h1 className="text-4xl font-bold">🧩 Lobby: {lobbyId}</h1>

      <div className="w-full max-w-md bg-slate-700 rounded-lg p-4 mt-4 shadow-lg">
        <h2 className="text-2xl mb-2">👥 Jugadores</h2>
        <ul className="space-y-2">
          {players.map((player) => (
            <li
              key={player.Player_id}
              className="bg-slate-600 p-2 rounded-md text-center"
            >
              {player.Player_name} — {player.Warrior.Warrior_name}
            </li>
          ))}
        </ul>
      </div>

      {isCreator && players.length >= 2 && (
        <button
          className="mt-4 px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600"
          onClick={() => socket.emit("startGame", { pin: lobbyId })}
        >
          Iniciar partida
        </button>
      )}
    </div>
  );
}

export default Lobby;
