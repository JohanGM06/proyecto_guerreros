import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import socket from "../socket";

type Player = {
  Player_id: number;
  Player_name: string;
  Warrior: {
    Warrior_name: string;
    Warrior_ki: number;
    Warrior_health: number;
  };
};

// 🔁 Reordena los jugadores para que el jugador local siempre esté primero
function reorderPlayers(players: Player[], myName: string | null): Player[] {
  if (!myName) return players;
  const myIndex = players.findIndex(
    (p) => p.Player_name.toLowerCase() === myName.toLowerCase()
  );
  if (myIndex === -1) return players;
  return [...players.slice(myIndex), ...players.slice(0, myIndex)];
}

function Game() {
  const { lobbyId } = useParams();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const location = useLocation();
  const [players, setPlayers] = useState<Player[]>([]);
  const [myName, setMyName] = useState<string | null>(null);

  // 🔁 Cargar el nombre del jugador desde localStorage
  useEffect(() => {
    const storedName = localStorage.getItem("myName");
    setMyName(storedName);
  }, []);

  useEffect(() => {
    if (!lobbyId) return;

    socket.emit("watchLobby", { pin: lobbyId });

    fetch(`http://localhost:4000/api/lobbies/${lobbyId}`)
      .then((res) => res.json())
      .then((fetchedPlayers: Player[]) => {
        console.log("🌐 Jugadores desde fetch:", fetchedPlayers);
        setPlayers(fetchedPlayers);
      });

    socket.on("game:started", ({ players }: { players: Player[] }) => {
      console.log("🎮 Jugadores desde socket (game:started):", players);
      setPlayers(players);
    });

    return () => {
      socket.off("game:started");
    };
  }, [lobbyId]);

  if (players.length === 0 || !myName) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white bg-black">
        Esperando datos del juego...
      </div>
    );
  }

  const orderedPlayers = reorderPlayers(players, myName);

  const me = orderedPlayers[0];
  const top = orderedPlayers[1];
  const right = orderedPlayers[2];
  const left = orderedPlayers[3];

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center relative">
      {/* TOP */}
      {top && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2">
          <PlayerCard player={top} />
        </div>
      )}

      {/* RIGHT */}
      {right && (
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
          <PlayerCard player={right} />
        </div>
      )}

      {/* LEFT */}
      {left && (
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
          <PlayerCard player={left} />
        </div>
      )}

      {/* ME (bottom) */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
        <PlayerCard player={me} highlight />
      </div>
    </div>
  );
}

function PlayerCard({
  player,
  highlight,
}: {
  player: Player;
  highlight?: boolean;
}) {
  return (
    <div
      className={`p-4 rounded-lg shadow-md text-center w-40 ${
        highlight ? "bg-green-600" : "bg-slate-700"
      }`}
    >
      <p className="font-bold text-lg">{player.Player_name}</p>
      <hr className="my-2 border-gray-400" />
      <p className="text-sm">
        🧙‍♂️ <strong>{player.Warrior?.Warrior_name ?? "Sin guerrero"}</strong>
      </p>
      <p className="text-xs mt-1">💥 Ki: {player.Warrior?.Warrior_ki ?? "-"}</p>
      <p className="text-xs">
        ❤️ Salud: {player.Warrior?.Warrior_health ?? "-"}
      </p>
    </div>
  );
}

export default Game;
