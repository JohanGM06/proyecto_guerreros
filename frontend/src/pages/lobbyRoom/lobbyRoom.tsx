import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { getLobby } from "../../api/lobby";
import { useSocket } from "../../hooks/useSocket";

type Player = {
  Player_id: number;
  Player_name: string;
  Warrior_id: number;
  Warrior: { Warrior_name: string; Warrior_ki: number; Warrior_health: number };
};

function calcStatus(list: Player[]): "waiting" | "ready" | "full" {
  if (list.length >= 4) return "full";
  if (list.length >= 2) return "ready";
  return "waiting";
}

export default function LobbyRoom() {
  const { pin } = useParams<{ pin: string }>();
  const { state } = useLocation();
  const saved = localStorage.getItem("warriorsPlayer");
  const myself = saved ? JSON.parse(saved) : null;
  const isHost =
    state?.isHost === true ||
    (myself && myself.pin === pin && myself.name === "HOST");
  const [players, setPlayers] = useState<Player[]>([]);
  const [status, setStatus] = useState<"waiting" | "ready" | "full">("waiting");
  const socket = useSocket();
  const navigate = useNavigate();

  /* 1️⃣  carga inicial */
  useEffect(() => {
    if (!pin) return;

    /* 1)  carga inicial */
    (async () => {
      const { data } = await getLobby(pin);
      setPlayers(data);
      setStatus(calcStatus(data));
    })();

    socket.emit("watchLobby", { pin });

    const cameWithState = state && typeof state.isHost === "boolean";
    if (!cameWithState && myself && myself.pin === pin) {
      socket.emit("joinLobby", {
        pin,
        name: myself.name,
        warriorId: myself.warriorId,
      });
    }

    const handleUpdate = (list: Player[]) => {
      setPlayers(list);
      setStatus(calcStatus(list));
    };
    const handleStart = () => {
      localStorage.removeItem("warriorsPlayer");
      navigate(`/game/${pin}`);
    };

    socket.on("lobby:update", handleUpdate);
    socket.on("game:started", handleStart);

    return () => {
      socket.off("lobby:update", handleUpdate);
      socket.off("game:started", handleStart);
    };
  }, [socket, pin, navigate, state, myself]);

  /* 3️⃣  host inicia */
  const startGame = () => socket.emit("startGame", { pin });

  return (
    <main className="min-h-screen bg-neutral-900 text-white flex flex-col items-center py-10 px-4">
      <h1 className="text-4xl font-bold mb-6">Lobby {pin}</h1>

      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-md mb-8">
        {players.map((p) => (
          <li key={p.Player_id} className="p-4 bg-neutral-800 rounded-lg">
            <p className="font-semibold">{p.Player_name}</p>
            <p className="text-sm text-neutral-400">{p.Warrior.Warrior_name}</p>
          </li>
        ))}
      </ul>

      {isHost && (
        <button
          onClick={startGame}
          disabled={status === "waiting"}
          className={
            status === "waiting"
              ? "bg-gray-600 cursor-not-allowed px-6 py-3 rounded-xl font-semibold"
              : "bg-emerald-500 hover:bg-emerald-600 px-6 py-3 rounded-xl font-semibold"
          }
        >
          {status === "full" ? "Lobby lleno - iniciar" : "Iniciar partida"}
        </button>
      )}
    </main>
  );
}
